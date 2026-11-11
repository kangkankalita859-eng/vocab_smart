import { useEffect, useMemo, useRef, useState } from "react";
import useMobile from "../hooks/useMobile";
import FlashCard from "../components/FlashCard";
import SessionNav from "../components/SessionNav";
import { fetchVocab } from "../services/vocabService";
import {
  loadUnknownDeck,
  loadSavedDecks,
  loadInProgressSession,
} from "../services/deckPersistenceService";
import {
  activateVocabDeck,
  classifyVocabCard,
  createVocabDeckCollection,
  extractVocabRange,
  getVocabDeckSessionCards,
  loadVocabDeckCollection,
  mergeVocabDecks,
  removeVocabDeck,
  reorderVocabDeckSession,
  saveVocabDeckCollection,
  undoVocabDeckAction,
} from "../services/vocabDeckCollectionService";
import shuffle from "../utils/shuffle";
import "../styles/session.css";

function MiniStack({ title, count, className }) {
  return (
    <div style={miniStack} className={`flash-session-mini-stack ${className}`}>
      <h4>
        <span>{count}</span> {title}
      </h4>
      <div style={{ position: "relative", width: "90px", height: "90px", margin: "8px auto" }}>
        {Array.from({ length: Math.min(count, 5) }).map((_, index) => (
          <div
            key={index}
            style={{
              ...miniCard,
              top: index * 6,
              left: index * 4,
              zIndex: Math.min(count, 5) - index,
            }}
          />
        ))}
      </div>
    </div>
  );
}

export default function Session({
  config,
  reviewUnknownDeck,
  onComplete,
  onGoRead,
  onGoHome,
  onUpdateConfig,
}) {
  const { isMobile, isTablet } = useMobile();
  const isCompactNav = isMobile || isTablet;
  const collectionRef = useRef(null);
  const [collection, setCollection] = useState(null);
  const [selectedDeckIds, setSelectedDeckIds] = useState([]);
  const [deckPanelVisible, setDeckPanelVisible] = useState(true);
  const [loading, setLoading] = useState(true);
  const [isShuffling, setIsShuffling] = useState(false);
  const [isProgressSaved, setIsProgressSaved] = useState(true);
  const [notice, setNotice] = useState("");
  const [persistenceError, setPersistenceError] = useState("");
  const [isDarkTheme, setIsDarkTheme] = useState(
    () => localStorage.getItem("vocab-theme") === "dark"
  );

  useEffect(() => {
    localStorage.setItem("vocab-theme", isDarkTheme ? "dark" : "light");
  }, [isDarkTheme]);

  useEffect(() => {
    let isCurrent = true;

    const initialize = async () => {
      try {
        let next = loadVocabDeckCollection();
        if (!next) {
          const response = await fetchVocab(0, null);
          if (response.status !== "success") {
            throw new Error(response.message || "Unable to load vocabulary.");
          }

          next = createVocabDeckCollection(response.data, {
            unknownDeck: loadUnknownDeck("vocab"),
            savedDecks: loadSavedDecks("vocab"),
            inProgressSession: loadInProgressSession("vocab"),
          });
          const initialRange = extractVocabRange(next, config);
          next = initialRange.collection;
          if (reviewUnknownDeck) {
            const unknownDeck = next.decks.find(
              (deck) => deck.kind === "unknown" && deck.cards.length > 0
            );
            if (unknownDeck) next = activateVocabDeck(next, unknownDeck.id);
          }
          if (initialRange.extractedCount === 0 && !next.activeDeckId) {
            next.activeDeckId =
              next.decks.find((deck) => deck.kind === "current" && deck.cards.length)?.id ||
              next.decks.find((deck) => deck.kind !== "main" && deck.cards.length)?.id ||
              null;
          }
          saveVocabDeckCollection(next);
          if (next.history.some((event) => event.type === "legacy-import")) {
            setNotice("Your previously saved vocabulary decks were restored.");
          }
        } else {
          const requestedUnknownDeck = reviewUnknownDeck
            ? next.decks.find(
                (deck) =>
                  deck.kind === "unknown" &&
                  deck.cards.length > 0
              )
            : null;
          if (requestedUnknownDeck) {
            next = activateVocabDeck(next, requestedUnknownDeck.id);
            saveVocabDeckCollection(next);
          } else if (!next.activeDeckId) {
            const availableDeck =
              next.decks.find((deck) => deck.kind === "current" && deck.cards.length > 0) ||
              next.decks.find((deck) => deck.kind !== "main" && deck.cards.length > 0);
            if (availableDeck) {
              next = activateVocabDeck(next, availableDeck.id);
              saveVocabDeckCollection(next);
            } else {
              const extracted = extractVocabRange(next, config);
              next = extracted.collection;
              if (extracted.extractedCount > 0) saveVocabDeckCollection(next);
            }
          }
        }

        if (isCurrent) {
          collectionRef.current = next;
          setCollection(next);
        }
      } catch (error) {
        console.error("Failed to load saved vocabulary decks:", error);
        if (isCurrent) setPersistenceError(error.message);
      } finally {
        if (isCurrent) setLoading(false);
      }
    };

    initialize();
    return () => {
      isCurrent = false;
    };
  }, []);

  const activeDeck = collection?.decks.find(
    (deck) => deck.id === collection.activeDeckId
  );
  const activeSession = collection?.sessions.find(
    (session) => session.sourceDeckId === collection.activeDeckId
  );
  const activeCards = useMemo(
    () =>
      collection && collection.activeDeckId
        ? getVocabDeckSessionCards(collection, collection.activeDeckId)
        : [],
    [collection]
  );
  const visibleDecks = collection
    ? [
        ...collection.decks.filter((deck) => deck.kind === "main"),
        ...collection.decks.filter(
          (deck) => deck.kind !== "main" && deck.cards.length > 0
        ),
      ]
    : [];
  const lastAction = activeSession?.lastAction || null;
  const isDeckFinished = Boolean(activeDeck && activeCards.length === 0);

  const commit = (next) => {
    try {
      saveVocabDeckCollection(next);
      collectionRef.current = next;
      setCollection(next);
      setPersistenceError("");
      setIsProgressSaved(true);
      return true;
    } catch (error) {
      console.error("Failed to save vocabulary deck changes:", error);
      setPersistenceError(`Could not save deck changes: ${error.message}`);
      return false;
    }
  };

  const handleApplyRange = (range) => {
    onUpdateConfig(range);
    const currentCollection = collectionRef.current;
    if (!currentCollection) return;

    const result = extractVocabRange(currentCollection, range);
    if (result.matchedCount === 0) {
      setNotice("No cards in this range are available to move into Current Deck.");
      return;
    }
    setSelectedDeckIds([]);
    setNotice(
      result.extractedCount > 0
        ? `${result.extractedCount} cards gathered into Current Deck.`
        : "Matching cards are already in Current Deck."
    );
    commit(result.collection);
  };

  const reviseDeck = (deck) => {
    if (deck.kind === "main") return;
    const currentCollection = collectionRef.current;
    if (!currentCollection) return;
    commit(activateVocabDeck(currentCollection, deck.id));
    setIsProgressSaved(true);
  };

  const handleKnown = (cardId, deckId) => {
    const currentCollection = collectionRef.current;
    const card = currentCollection && getVocabDeckSessionCards(currentCollection, deckId)[0];
    if (card && currentCollection.activeDeckId === deckId && card.id === cardId) {
      commit(classifyVocabCard(currentCollection, deckId, cardId, "known"));
    }
  };

  const handleUnknown = (cardId, deckId) => {
    const currentCollection = collectionRef.current;
    const card = currentCollection && getVocabDeckSessionCards(currentCollection, deckId)[0];
    if (card && currentCollection.activeDeckId === deckId && card.id === cardId) {
      commit(classifyVocabCard(currentCollection, deckId, cardId, "unknown"));
    }
  };

  const handleUndo = () => {
    const currentCollection = collectionRef.current;
    const currentSession = currentCollection?.sessions.find(
      (session) => session.sourceDeckId === currentCollection.activeDeckId
    );
    if (currentCollection?.activeDeckId && currentSession?.lastAction) {
      commit(undoVocabDeckAction(currentCollection, currentCollection.activeDeckId));
    }
  };

  const handleSaveProgress = () => {
    if (collectionRef.current) commit(collectionRef.current);
  };

  const handleRemoveDeck = (deck) => {
    if (deck.kind === "main") return;
    const confirmed = window.confirm(
      `Remove ${deck.name}? Its ${deck.cards.length} remaining cards will return to Main Deck.`
    );
    if (!confirmed) return;

    setSelectedDeckIds((ids) => ids.filter((id) => id !== deck.id));
    if (collectionRef.current) {
      commit(removeVocabDeck(collectionRef.current, deck.id));
    }
  };

  const handleMerge = () => {
    const currentCollection = collectionRef.current;
    if (!currentCollection || selectedDeckIds.length < 2) return;
    const result = mergeVocabDecks(currentCollection, selectedDeckIds);
    if (!result.mergedDeckId) return;
    setSelectedDeckIds([]);
    setNotice("Selected decks were merged into a new independent deck.");
    commit(result.collection);
  };

  const handleReviseSelected = () => {
    if (selectedDeckIds.length !== 1) return;
    const deck = visibleDecks.find((item) => item.id === selectedDeckIds[0]);
    if (deck && deck.kind !== "main") reviseDeck(deck);
  };

  const shuffleDeck = () => {
    const currentCollection = collectionRef.current;
    const deckId = currentCollection?.activeDeckId;
    const cards = currentCollection && deckId
      ? getVocabDeckSessionCards(currentCollection, deckId)
      : [];
    if (cards.length <= 1 || !deckId) return;
    setIsShuffling(true);
    window.setTimeout(() => {
      const latestCollection = collectionRef.current;
      if (latestCollection?.activeDeckId === deckId) {
        const latestCards = getVocabDeckSessionCards(latestCollection, deckId);
        commit(
          reorderVocabDeckSession(latestCollection, deckId, shuffle(latestCards))
        );
      }
      setIsShuffling(false);
    }, 650);
  };

  const unshuffleDeck = () => {
    const currentCollection = collectionRef.current;
    const deckId = currentCollection?.activeDeckId;
    const deck = currentCollection?.decks.find((item) => item.id === deckId);
    if (!deckId || !deck) return;
    commit(
      reorderVocabDeckSession(currentCollection, deckId, deck.cards)
    );
  };

  if (loading) return <p style={{ textAlign: "center" }}>Loading…</p>;

  const deckManager = (
    <div style={deckPanel} className="flash-session-deck-panel flash-vocab-deck-panel">
      <div className="flash-vocab-deck-scroll">
        {visibleDecks.map((deck) => (
          <div
            key={deck.id}
            style={deckChip}
            className={`flash-session-deck-chip flash-vocab-deck-chip${deck.kind === "main" ? " flash-vocab-deck-chip--main" : ""}`}
          >
            <label style={deckLabel}>
              <input
                type="checkbox"
                checked={selectedDeckIds.includes(deck.id)}
                onChange={(event) =>
                  setSelectedDeckIds((ids) =>
                    event.target.checked
                      ? [...ids, deck.id]
                      : ids.filter((id) => id !== deck.id)
                  )
                }
              />
              <strong>{deck.name}</strong>
            </label>
            <div style={deckCount}>🗂️ {deck.cards.length} cards</div>
            {deck.kind !== "main" && (
              <div
                style={deckCardActions}
                className="flash-vocab-deck-card-actions"
              >
                <button style={deckActionBtn} onClick={() => reviseDeck(deck)}>
                  ▶ Revise
                </button>
                <button
                  style={removeBtn}
                  className="flash-session-remove-button"
                  onClick={() => handleRemoveDeck(deck)}
                >
                  Remove
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="flash-vocab-deck-actions">
        <button
          style={secondaryBtn}
          disabled={
            selectedDeckIds.length !== 1 ||
            visibleDecks.find((deck) => deck.id === selectedDeckIds[0])?.kind === "main"
          }
          title="Select one saved deck to revise; select two or more decks to merge."
          onClick={handleReviseSelected}
        >
          Revise Selected
        </button>
        <button
          style={primaryBtn}
          disabled={selectedDeckIds.length < 2}
          onClick={handleMerge}
        >
          Merge
        </button>
      </div>
    </div>
  );

  return (
    <div className={`flash-session${isDarkTheme ? " flash-session--dark" : ""}`}>
      <SessionNav
        mode="Cards"
        isMobile={isCompactNav}
        isDarkTheme={isDarkTheme}
        onToggleTheme={() => setIsDarkTheme((isDark) => !isDark)}
        config={config}
        onApplyRange={handleApplyRange}
        onGoRead={onGoRead}
        onGoHome={onGoHome}
        deckPanelVisible={deckPanelVisible}
        onToggleDeckPanel={() => setDeckPanelVisible((visible) => !visible)}
      />

      {deckPanelVisible && deckManager}

      {(notice || persistenceError) && (
        <div
          style={persistenceError ? errorNotice : statusNotice}
          className={persistenceError ? "flash-session-notice--error" : ""}
          role="status"
        >
          {persistenceError || notice}
          <button
            style={noticeClose}
            aria-label="Dismiss message"
            onClick={() => {
              setNotice("");
              setPersistenceError("");
            }}
          >
            ✕
          </button>
        </div>
      )}

      {isDeckFinished ? (
        <div style={center}>
          <h2>Deck Finished</h2>
          <p>
            Known: {activeSession?.knownCount || 0} | Unknown:{" "}
            {activeSession?.unknownCount || 0}
          </p>
          <button style={secondaryBtn} disabled={!lastAction} onClick={handleUndo}>
            ↩ Undo Last Card
          </button>
        </div>
      ) : (
        <div style={container} className="flash-session-layout">
          <div
            style={{ ...stats, marginTop: deckPanelVisible ? "120px" : "60px" }}
            className="flash-session-stats flash-session-stats--unknown"
          >
            <MiniStack
              title="Unknown"
              count={activeSession?.unknownCount || 0}
              className="flash-session-mini-stack--unknown"
            />
          </div>

          <div style={deckWrapper} className="flash-session-deck-wrapper">
            <div style={deckArea} className="flash-session-deck-area">
              {activeCards.slice(0, 6).map((card, index) => (
                <div
                  key={card.id}
                  style={{
                    position: "absolute",
                    top: index * 10 + (isShuffling ? Math.random() * 12 : 0),
                    left: index * 8 + (isShuffling ? Math.random() * 24 - 12 : 0),
                    transform: isShuffling
                      ? `rotate(${Math.random() * 20 - 10}deg)`
                      : "rotate(0deg)",
                    transition: "all 0.65s cubic-bezier(.4,0,.2,1)",
                    zIndex: 100 - index,
                    pointerEvents: index === 0 ? "auto" : "none",
                  }}
                >
                  <FlashCard
                    card={card}
                    onKnown={() => handleKnown(card.id, collection.activeDeckId)}
                    onUnknown={() => handleUnknown(card.id, collection.activeDeckId)}
                    showActions={index === 0}
                  />
                </div>
              ))}
            </div>

            <div style={shuffleBar} className="flash-session-controls">
              <button style={secondaryBtn} onClick={shuffleDeck}>
                🔀 Shuffle
              </button>
              <button style={secondaryBtn} onClick={unshuffleDeck}>
                ↩️ Unshuffle
              </button>
              <button style={secondaryBtn} disabled={!lastAction} onClick={handleUndo}>
                ↩ Undo
              </button>
              <button style={secondaryBtn} onClick={handleSaveProgress}>
                {isProgressSaved ? "✓ Progress Saved" : "💾 Save Progress"}
              </button>
            </div>
          </div>

          <div style={stats} className="flash-session-stats flash-session-stats--summary">
            <MiniStack
              title="Known"
              count={activeSession?.knownCount || 0}
              className="flash-session-mini-stack--known"
            />
            <MiniStack
              title="Remaining"
              count={activeCards.length}
              className="flash-session-mini-stack--remaining"
            />
          </div>
        </div>
      )}
    </div>
  );
}

const deckPanel = {
  display: "flex",
  gap: 8,
  padding: "8px 12px",
  borderBottom: "1px solid #ddd",
  background: "#fafafa",
  alignItems: "center",
  marginTop: "60px",
  position: "relative",
  zIndex: 999,
  minWidth: 0,
};

const deckChip = {
  padding: "7px 10px",
  borderRadius: 6,
  background: "#e3f2fd",
  fontSize: 12,
};

const deckLabel = {
  display: "flex",
  gap: 6,
  alignItems: "center",
  whiteSpace: "nowrap",
};

const deckCount = {
  fontSize: 12,
  marginTop: 4,
  whiteSpace: "nowrap",
};

const deckCardActions = {
  display: "flex",
  gap: 4,
  marginTop: 6,
  minWidth: 0,
};

const container = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "flex-start",
  height: "calc(100vh - 60px)",
  padding: 40,
  paddingTop: "80px",
};

const deckWrapper = { display: "flex", flexDirection: "column", alignItems: "center" };

const deckArea = { position: "relative", width: 340, height: 440 };

const shuffleBar = { marginTop: 18, display: "flex", gap: 12 };

const miniStack = { width: 140, textAlign: "center" };

const miniCard = {
  position: "absolute",
  width: 70,
  height: 59,
  background: "#e0e0e0",
  borderRadius: 6,
  boxShadow: "0 3px 8px rgba(0,0,0,.2)",
};

const center = {
  height: "calc(100vh - 60px)",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
};

const primaryBtn = {
  padding: "12px 20px",
  borderRadius: 8,
  border: "none",
  background: "#1976d2",
  color: "#fff",
  cursor: "pointer",
  whiteSpace: "nowrap",
};

const secondaryBtn = {
  padding: "8px 14px",
  borderRadius: 6,
  border: "1px solid #aaa",
  background: "#fff",
  cursor: "pointer",
  whiteSpace: "nowrap",
};

const deckActionBtn = {
  ...secondaryBtn,
  padding: "7px 4px",
  fontSize: 11,
  minWidth: 0,
};

const removeBtn = {
  ...deckActionBtn,
  color: "#c62828",
  backgroundColor: "#ffebee",
  borderColor: "#f44336",
};

const stats = {
  display: "flex",
  flexDirection: "column",
  gap: 20,
  marginTop: "100px",
};

const statusNotice = {
  position: "fixed",
  top: "126px",
  left: "50%",
  transform: "translateX(-50%)",
  background: "#e3f2fd",
  color: "#174a73",
  padding: "10px 14px",
  borderRadius: 8,
  zIndex: 1001,
  display: "flex",
  alignItems: "center",
  gap: 12,
};

const errorNotice = {
  ...statusNotice,
  background: "#ffebee",
  color: "#b71c1c",
};

const noticeClose = {
  background: "transparent",
  border: "none",
  cursor: "pointer",
  color: "inherit",
};
