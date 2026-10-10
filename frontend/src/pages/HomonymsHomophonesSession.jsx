import { useEffect, useState } from "react";
import useMobile from "../hooks/useMobile";

import HomonymsHomophonesFlashCard from "../components/HomonymsHomophonesFlashCard";
import SessionNav from "../components/SessionNav";

import { fetchHomonymsHomophones } from "../services/homonymsHomophonesService";

import {
  saveUnknownDeck,
  loadUnknownDeck,
  saveSavedDecks,
  loadSavedDecks,
  clearUnknownDeck,
  clearInProgressSession,
  loadInProgressSession,
  saveInProgressSession,
} from "../services/deckPersistenceService";
import shuffle from "../utils/shuffle";
import "../styles/session.css";

function MiniStack({ title, count }) {
  return (
    <div style={miniStack}>
      <h4>{title}</h4>
      <div style={{ position: "relative", height: "90px", margin: "8px 0" }}>
        {Array.from({ length: Math.min(count, 5) }).map((_, i) => (
          <div
            key={i}
            style={{
              ...miniCard,
              top: i * 6,
              left: i * 4,
              zIndex: i,
            }}
          />
        ))}
      </div>
      <p>{count}</p>
    </div>
  );
}

export default function HomonymsHomophonesSession({
  config,
  reviewUnknownDeck,
  onGoRead,
  onGoHome,
  onUpdateConfig,
}) {
  const { isMobile, isTablet } = useMobile();
  const isCompactNav = isMobile || isTablet;
  const [savedProgress] = useState(() => loadInProgressSession("homonyms"));
  const [activeDeck, setActiveDeck] = useState(() => savedProgress?.activeDeck || []);
  const [originalDeck, setOriginalDeck] = useState(
    () => savedProgress?.originalDeck || savedProgress?.activeDeck || []
  );
  const [knownDeck, setKnownDeck] = useState(() => savedProgress?.knownDeck || []);
  const [unknownDeck, setUnknownDeck] = useState(() => savedProgress?.unknownDeck || []);
  const [lastAction, setLastAction] = useState(() => savedProgress?.lastAction || null);

  const [savedDecks, setSavedDecks] = useState([]);
  const [selectedDeckIds, setSelectedDeckIds] = useState([]);
  const [progressLoaded, setProgressLoaded] = useState(false);

  const [loading, setLoading] = useState(() => !savedProgress);
  const [isShuffling, setIsShuffling] = useState(false);
  const [isResumingProgress, setIsResumingProgress] = useState(() => Boolean(savedProgress));
  const [isProgressSaved, setIsProgressSaved] = useState(() => Boolean(savedProgress));

  useEffect(() => {
    if (!config || !progressLoaded) return;

    if (isResumingProgress) {
      setLoading(false);
      return;
    }

    setLoading(true);
    fetchHomonymsHomophones(config.start, config.limit)
      .then((data) => {
        if (data.status === "success") {
          setActiveDeck(data.data);
          setOriginalDeck(data.data);
        } else {
          console.error("API Error:", data.message);
        }
        setKnownDeck([]);
        setUnknownDeck([]);
        setLastAction(null);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Fetch error:", error);
        setLoading(false);
      });
  }, [config, progressLoaded]);

  useEffect(() => {
    const persistedUnknownDeck = loadUnknownDeck('homonyms');
    const persistedSavedDecks = loadSavedDecks('homonyms');

    if (isResumingProgress) {
      setSavedDecks(persistedSavedDecks);
      setProgressLoaded(true);
      return;
    }

    if (persistedUnknownDeck.length > 0 || persistedSavedDecks.length > 0) {
      setUnknownDeck(persistedUnknownDeck);
      setSavedDecks(persistedSavedDecks);
      
      // If user is coming from "Go to Flash Cards" to review unknown deck
      if (reviewUnknownDeck && persistedUnknownDeck.length > 0) {
        setActiveDeck(persistedUnknownDeck);
        setOriginalDeck(persistedUnknownDeck);
        setKnownDeck([]);
        setUnknownDeck([]);
        
        // Clear persisted unknown deck since we're now using it
        clearUnknownDeck('homonyms');
      }
    }
    setProgressLoaded(true);
  }, [reviewUnknownDeck]);

  useEffect(() => {
    if (!progressLoaded) return;
    saveUnknownDeck(unknownDeck, 'homonyms');
  }, [unknownDeck, progressLoaded]);

  useEffect(() => {
    if (!progressLoaded) return;
    saveSavedDecks(savedDecks, 'homonyms');
  }, [savedDecks, progressLoaded]);

  useEffect(() => {
    if (!isProgressSaved) return;

    if (activeDeck.length === 0) {
      clearInProgressSession("homonyms");
      setIsProgressSaved(false);
      return;
    }

    saveInProgressSession(
      { activeDeck, originalDeck, knownDeck, unknownDeck, lastAction, savedAt: Date.now() },
      "homonyms"
    );
  }, [activeDeck, originalDeck, knownDeck, unknownDeck, lastAction, isProgressSaved]);

  const handleKnown = () => {
    const card = activeDeck[0];
    if (!card) return;
    setKnownDeck((p) => [...p, card]);
    setActiveDeck((p) => p.slice(1));
    setLastAction({ card, deck: "known" });
  };

  const handleUnknown = () => {
    const card = activeDeck[0];
    if (!card) return;
    setUnknownDeck((p) => [...p, card]);
    setActiveDeck((p) => p.slice(1));
    setLastAction({ card, deck: "unknown" });
  };

  const handleUndo = () => {
    if (!lastAction) return;

    setActiveDeck((p) => [lastAction.card, ...p]);
    if (lastAction.deck === "known") {
      setKnownDeck((p) => p.slice(0, -1));
    } else {
      setUnknownDeck((p) => p.slice(0, -1));
    }
    setLastAction(null);
  };

  const handleSaveProgress = () => {
    if (activeDeck.length === 0) return;

    const saved = saveInProgressSession(
      { activeDeck, originalDeck, knownDeck, unknownDeck, lastAction, savedAt: Date.now() },
      "homonyms"
    );
    setIsProgressSaved(saved);
  };

  const clearSavedProgress = () => {
    clearInProgressSession("homonyms");
    setIsProgressSaved(false);
    setIsResumingProgress(false);
  };

  const shuffleDeck = () => {
    if (activeDeck.length <= 1) return;

    setIsShuffling(true);

    setTimeout(() => {
      const shuffled = shuffle(activeDeck);
      setActiveDeck(shuffled);
      setIsShuffling(false);
    }, 650);
  };

  const unshuffleDeck = () => {
    setActiveDeck(originalDeck);
    setLastAction(null);
  };

  const handleReviseUnknown = () => {
    clearSavedProgress();
    const shuffled = shuffle(unknownDeck);
    setActiveDeck(shuffled);
    setOriginalDeck([...unknownDeck]);
    setKnownDeck([]);
    setUnknownDeck([]);
    setLastAction(null);
    clearUnknownDeck('homonyms');
  };

  const handleAddDeck = () => {
    if (unknownDeck.length === 0) return;

    clearSavedProgress();

    setSavedDecks((p) => [
      ...p,
      { id: Date.now(), unknownCards: [...unknownDeck] },
    ]);

    setActiveDeck([]);
    setOriginalDeck([]);
    setKnownDeck([]);
    setUnknownDeck([]);
    setLastAction(null);
    clearUnknownDeck('homonyms');
  };

  const reviseSingleDeck = (deck) => {
    clearSavedProgress();
    setActiveDeck(deck.unknownCards);
    setOriginalDeck(deck.unknownCards);
    setKnownDeck([]);
    setUnknownDeck([]);
    setLastAction(null);

    setSavedDecks((p) => p.filter((d) => d.id !== deck.id));
    setSelectedDeckIds([]);
  };

  const reviseSelectedDecks = () => {
    clearSavedProgress();
    const cards = savedDecks
      .filter((d) => selectedDeckIds.includes(d.id))
      .flatMap((d) => d.unknownCards);

    setActiveDeck(cards);
    setOriginalDeck(cards);
    setKnownDeck([]);
    setUnknownDeck([]);
    setLastAction(null);

    setSavedDecks((p) => p.filter((d) => !selectedDeckIds.includes(d.id)));
    setSelectedDeckIds([]);
  };

  const reviseAllDecks = () => {
    clearSavedProgress();
    const cards = savedDecks.flatMap((d) => d.unknownCards);

    setActiveDeck(cards);
    setOriginalDeck(cards);
    setKnownDeck([]);
    setUnknownDeck([]);
    setLastAction(null);

    setSavedDecks([]);
    setSelectedDeckIds([]);
  };

  const removeDeck = (deck) => {
    if (
      window.confirm(
        `Are you sure you want to remove Deck ${savedDecks.indexOf(deck) + 1} with ${deck.unknownCards.length} cards?`
      )
    ) {
      setSavedDecks((p) => p.filter((d) => d.id !== deck.id));
      setSelectedDeckIds((p) => p.filter((id) => id !== deck.id));
    }
  };

  const handleApplyRange = (c) => {
    clearSavedProgress();
    setLastAction(null);
    onUpdateConfig(c);
  };

  if (loading) return <p style={{ textAlign: "center" }}>Loading…</p>;

  if (activeDeck.length === 0 && originalDeck.length > 0) {
    return (
      <>
        <SessionNav
          mode="Cards"
          isMobile={isCompactNav}
          config={config}
          onApplyRange={handleApplyRange}
          onGoRead={onGoRead}
          onGoHome={onGoHome}
        />

        <div style={center}>
          <h2>Deck Finished</h2>
          <p>Known: {knownDeck.length} | Unknown: {unknownDeck.length}</p>

          <div style={{ display: "flex", gap: "14px" }}>
            <button style={secondaryBtn} disabled={!lastAction} onClick={handleUndo}>
              ↩ Undo Last Card
            </button>
            {unknownDeck.length > 0 && (
              <button style={secondaryBtn} onClick={handleReviseUnknown}>
                🔁 Revise Unknown
              </button>
            )}
            <button style={primaryBtn} onClick={handleAddDeck}>
              ➕ Add Deck
            </button>
          </div>

          <div style={{ marginTop: "28px", width: "90%", maxWidth: "900px" }}>
            <h3>Saved Decks</h3>
            {savedDecks.length === 0 && <p style={{ color: "#777" }}>No saved decks yet.</p>}

            {savedDecks.map((deck, i) => (
              <div key={deck.id} style={deckRow}>
                <label style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <input
                    type="checkbox"
                    checked={selectedDeckIds.includes(deck.id)}
                    onChange={(e) => {
                      const checked = e.target.checked;
                      setSelectedDeckIds((p) => (checked ? [...p, deck.id] : p.filter((id) => id !== deck.id)));
                    }}
                  />
                  <strong>Deck {i + 1}</strong> ({deck.unknownCards.length} cards)
                </label>

                <div style={{ display: "flex", gap: "10px" }}>
                  <button style={secondaryBtn} onClick={() => reviseSingleDeck(deck)}>
                    ▶ Revise
                  </button>
                  <button style={dangerBtn} onClick={() => removeDeck(deck)}>
                    🗑 Remove
                  </button>
                </div>
              </div>
            ))}

            {savedDecks.length > 0 && (
              <div style={{ display: "flex", gap: "10px", marginTop: "14px" }}>
                <button
                  style={secondaryBtn}
                  disabled={selectedDeckIds.length === 0}
                  onClick={reviseSelectedDecks}
                >
                  ▶ Revise Selected
                </button>
                <button style={secondaryBtn} onClick={reviseAllDecks}>
                  ▶ Revise All
                </button>
              </div>
            )}
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <SessionNav
        mode="Cards"
        isMobile={isCompactNav}
        config={config}
        onApplyRange={handleApplyRange}
        onGoRead={onGoRead}
        onGoHome={onGoHome}
      />

      <div style={container} className="flash-session-layout">
        <div
          style={{ ...stats, marginTop: "120px" }}
          className="flash-session-stats flash-session-stats--unknown"
        >
          <MiniStack title="❌ Unknown" count={unknownDeck.length} />
        </div>

        <div style={deckWrapper} className="flash-session-deck-wrapper">
          <div style={deckArea} className="flash-session-deck-area">
            {activeDeck.slice(0, 6).map((card, index) => (
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
                <HomonymsHomophonesFlashCard
                  card={card}
                  onKnown={handleKnown}
                  onUnknown={handleUnknown}
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
          <MiniStack title="Known" count={knownDeck.length} />
          <MiniStack title="Remaining" count={activeDeck.length} />
        </div>
      </div>
    </>
  );
}

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
  height: 45,
  background: "#e0e0e0",
  borderRadius: 6,
  boxShadow: "0 3px 8px rgba(0,0,0,.2)",
};

const center = {
  minHeight: "calc(100vh - 60px)",
  paddingTop: "100px",
  background: "#f5f5f5",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
};

const deckRow = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "10px 12px",
  border: "1px solid #ddd",
  borderRadius: "10px",
  marginTop: "10px",
  background: "#fff",
};

const primaryBtn = {
  padding: "10px 14px",
  background: "#1976d2",
  color: "white",
  border: "none",
  borderRadius: "10px",
  cursor: "pointer",
};

const secondaryBtn = {
  padding: "10px 14px",
  background: "#fff",
  color: "#111",
  border: "1px solid #ccc",
  borderRadius: "10px",
  cursor: "pointer",
};

const disabledBtn = {
  ...secondaryBtn,
  opacity: 0.5,
  cursor: "not-allowed",
};

const dangerBtn = {
  padding: "10px 14px",
  background: "#fff",
  color: "#d32f2f",
  border: "1px solid #d32f2f",
  borderRadius: "10px",
  cursor: "pointer",
};

const stats = {
  display: "flex",
  flexDirection: "column",
  gap: 20,
  marginTop: "100px",
};
