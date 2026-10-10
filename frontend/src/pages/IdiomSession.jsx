import { useEffect, useState } from "react";
import IdiomFlashCard from "../components/IdiomFlashCard";
import SessionNav from "../components/SessionNav";
import { fetchIdioms } from "../services/idiomsService";
import {
  saveUnknownDeck,
  loadUnknownDeck,
  saveSavedDecks,
  loadSavedDecks,
  clearUnknownDeck,
  clearInProgressSession,
  loadInProgressSession,
  saveInProgressSession,
  hasPersistedData
} from "../services/deckPersistenceService";
import shuffle from "../utils/shuffle";
import "../styles/session.css";

/* ---------------- MINI STACK ---------------- */

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

/* ---------------- MAIN SESSION ---------------- */

export default function IdiomSession({
  config,
  reviewUnknownDeck,
  onGoRead,
  onGoHome,
  onUpdateConfig,
}) {
  const [savedProgress] = useState(() => loadInProgressSession("idiom"));
  const [activeDeck, setActiveDeck] = useState(() => savedProgress?.activeDeck || []);
  const [originalDeck, setOriginalDeck] = useState(
    () => savedProgress?.originalDeck || savedProgress?.activeDeck || []
  );
  const [knownDeck, setKnownDeck] = useState(() => savedProgress?.knownDeck || []);
  const [unknownDeck, setUnknownDeck] = useState(() => savedProgress?.unknownDeck || []);
  const [lastAction, setLastAction] = useState(() => savedProgress?.lastAction || null);

  const [savedDecks, setSavedDecks] = useState([]);
  const [selectedDeckIds, setSelectedDeckIds] = useState([]);
  const [showPersistedNotification, setShowPersistedNotification] = useState(false);
  const [progressLoaded, setProgressLoaded] = useState(false);

  const [loading, setLoading] = useState(() => !savedProgress);
  const [isShuffling, setIsShuffling] = useState(false);
  const [isResumingProgress, setIsResumingProgress] = useState(() => Boolean(savedProgress));
  const [isProgressSaved, setIsProgressSaved] = useState(() => Boolean(savedProgress));

  /* ---------------- FETCH IDIOMS ---------------- */

  useEffect(() => {
    if (!config || !progressLoaded) return;

    if (isResumingProgress) {
      setLoading(false);
      return;
    }

    setLoading(true);
    fetchIdioms(config.start, config.limit)
      .then((data) => {
        if (data.status === 'success') {
          setActiveDeck(data.data);
          setOriginalDeck(data.data);
        } else {
          console.error('API Error:', data.message);
        }
        setKnownDeck([]);
        setUnknownDeck([]);
        setLastAction(null);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Fetch error:', error);
        setLoading(false);
      });
  }, [config, progressLoaded]);

  /* ---------------- LOAD PERSISTED DATA ---------------- */

  useEffect(() => {
    // Load persisted data on component mount
    const persistedUnknownDeck = loadUnknownDeck('idiom');
    const persistedSavedDecks = loadSavedDecks('idiom');
    
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
        clearUnknownDeck('idiom');
      } else {
        setShowPersistedNotification(true);
        
        // Hide notification after 5 seconds
        setTimeout(() => {
          setShowPersistedNotification(false);
        }, 5000);
      }
    }
    setProgressLoaded(true);
  }, [reviewUnknownDeck]);

  /* ---------------- AUTO-SAVE UNKNOWN DECK ---------------- */

  useEffect(() => {
    // Auto-save unknown deck whenever it changes
    if (!progressLoaded) return;
    saveUnknownDeck(unknownDeck, 'idiom');
  }, [unknownDeck, progressLoaded]);

  /* ---------------- AUTO-SAVE SAVED DECKS ---------------- */

  useEffect(() => {
    // Auto-save saved decks whenever they change
    if (!progressLoaded) return;
    saveSavedDecks(savedDecks, 'idiom');
  }, [savedDecks, progressLoaded]);

  useEffect(() => {
    if (!isProgressSaved) return;

    if (activeDeck.length === 0) {
      clearInProgressSession("idiom");
      setIsProgressSaved(false);
      return;
    }

    saveInProgressSession(
      { activeDeck, originalDeck, knownDeck, unknownDeck, lastAction, savedAt: Date.now() },
      "idiom"
    );
  }, [activeDeck, originalDeck, knownDeck, unknownDeck, lastAction, isProgressSaved]);

  /* ---------------- CARD ACTIONS ---------------- */

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
      "idiom"
    );
    setIsProgressSaved(saved);
  };

  const clearSavedProgress = () => {
    clearInProgressSession("idiom");
    setIsProgressSaved(false);
    setIsResumingProgress(false);
  };

  /* ---------------- SHUFFLE (ANIMATED) ---------------- */

  const shuffleDeck = () => {
    if (activeDeck.length <= 1) return;

    setIsShuffling(true);

    setTimeout(() => {
      const shuffled = shuffle(activeDeck);
      setActiveDeck(shuffled);
      setIsShuffling(false);
    }, 650); // ⬅ animation duration
  };

  const unshuffleDeck = () => {
    setActiveDeck(originalDeck);
    setLastAction(null);
  };

  /* ---------------- REVISION ---------------- */

  const handleReviseUnknown = () => {
    clearSavedProgress();
    const shuffled = shuffle(unknownDeck);
    setActiveDeck(shuffled);
    setOriginalDeck([...unknownDeck]);
    setKnownDeck([]);
    setUnknownDeck([]);
    setLastAction(null);
    // Clear persisted unknown deck since we're now revising it
    clearUnknownDeck('idiom');
  };

  /* ---------------- SAVE DECK ---------------- */

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
  };

  /* ---------------- SAVED DECK REVISION ---------------- */

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

  const removeDeck = (deck) => {
    if (window.confirm(`Are you sure you want to remove Idiom Deck ${savedDecks.indexOf(deck) + 1} with ${deck.unknownCards.length} cards?`)) {
      setSavedDecks((p) => p.filter((d) => d.id !== deck.id));
      setSelectedDeckIds((p) => p.filter((id) => id !== deck.id));
    }
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

    setSavedDecks((p) =>
      p.filter((d) => !selectedDeckIds.includes(d.id))
    );
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

  /* ---------------- RANGE APPLY ---------------- */

  const handleApplyRange = (c) => {
    clearSavedProgress();
    setLastAction(null);
    onUpdateConfig(c);
  };

  /* ---------------- LOADING ---------------- */

  if (loading) return <p style={{ textAlign: "center" }}>Loading idioms…</p>;

  /* ---------------- DECK FINISHED ---------------- */

  if (activeDeck.length === 0 && originalDeck.length > 0) {
    return (
      <>
        <SessionNav
          mode="Idiom Cards"
          config={config}
          onApplyRange={handleApplyRange}
          onGoRead={onGoRead}
          onGoHome={onGoHome}
        />

        <div style={center}>
          <h2>Idiom Deck Finished</h2>
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
        </div>
      </>
    );
  }

  /* ---------------- UI ---------------- */

  return (
    <>
      <SessionNav
        mode="Idiom Cards"
        config={config}
        onApplyRange={handleApplyRange}
        onGoRead={onGoRead}
        onGoHome={onGoHome}
      />

      {/* PERSISTED DATA NOTIFICATION */}
      {showPersistedNotification && (
        <div style={notification}>
          <span>📚 Previous idiom unknown deck data restored!</span>
          <button 
            style={notificationClose}
            onClick={() => setShowPersistedNotification(false)}
          >
            ✕
          </button>
        </div>
      )}

      {savedDecks.length > 0 && (
        <div style={deckPanel} className="flash-session-deck-panel">
          {savedDecks.map((d, i) => (
            <div key={d.id} style={deckChip} className="flash-session-deck-chip">
              <label>
                <input
                  type="checkbox"
                  checked={selectedDeckIds.includes(d.id)}
                  onChange={(e) =>
                    setSelectedDeckIds((p) =>
                      e.target.checked
                        ? [...p, d.id]
                        : p.filter((id) => id !== d.id)
                    )
                  }
                />
                <strong style={{ marginLeft: 6 }}>Idiom Deck {i + 1}</strong>
              </label>

              <div style={{ fontSize: 12 }}>❌ {d.unknownCards.length}</div>

              <div style={{ display: "flex", gap: "6px", marginTop: 6 }}>
                <button
                  style={{ ...secondaryBtn, flex: 1 }}
                  onClick={() => reviseSingleDeck(d)}
                >
                  ▶ Revise
                </button>
                <button
                  style={{ ...secondaryBtn, backgroundColor: "#ffebee", borderColor: "#f44336", color: "#c62828", flex: 1 }}
                  onClick={() => removeDeck(d)}
                >
                  🗑️ Remove
                </button>
              </div>
            </div>
          ))}

          <div
            className="flash-session-deck-actions"
            style={{ marginLeft: "auto", display: "flex", gap: 10 }}
          >
            <button
              style={secondaryBtn}
              disabled={!selectedDeckIds.length}
              onClick={reviseSelectedDecks}
            >
              🔀 Revise Selected
            </button>
            <button style={primaryBtn} onClick={reviseAllDecks}>
              🔁 Revise All
            </button>
          </div>
        </div>
      )}

      <div style={container} className="flash-session-layout">
        <div className="flash-session-stats flash-session-stats--unknown">
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
                <IdiomFlashCard
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
              ↩ Unshuffle
            </button>
            <button style={secondaryBtn} disabled={!lastAction} onClick={handleUndo}>
              ↩ Undo
            </button>
            <button style={secondaryBtn} onClick={handleSaveProgress}>
              {isProgressSaved ? "✓ Progress Saved" : "💾 Save Progress"}
            </button>
          </div>
        </div>

        <div className="flash-session-stats flash-session-stats--summary">
          <MiniStack title="✅ Known" count={knownDeck.length} />
        </div>
      </div>
    </>
  );
}

/* ---------------- STYLES ---------------- */

const deckPanel = {
  display: "flex",
  gap: 10,
  padding: "10px 24px",
  borderBottom: "1px solid #ddd",
  background: "#fafafa",
  alignItems: "center",
  marginTop: "60px", // Add margin to avoid navbar overlap
  position: "relative",
  zIndex: 999,
};

const deckChip = {
  padding: "6px 10px",
  borderRadius: 6,
  background: "#fff3e0",
  fontSize: 12,
  minWidth: 120,
};

const container = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "flex-start", // Change from center to flex-start
  height: "calc(100vh - 60px)",
  padding: 40,
  paddingTop: "80px", // Ensure content clears 60px navbar
  marginLeft: "0px", // Remove sidebar margin on desktop
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
  background: "#e67e22",
  color: "#fff",
  cursor: "pointer",
};

const secondaryBtn = {
  padding: "8px 14px",
  borderRadius: 6,
  border: "1px solid #aaa",
  background: "#fff",
  cursor: "pointer",
};

const notification = {
  position: "fixed",
  top: "70px",
  left: "50%",
  transform: "translateX(-50%)",
  background: "#4caf50",
  color: "white",
  padding: "12px 20px",
  borderRadius: "8px",
  boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
  zIndex: 1000,
  display: "flex",
  alignItems: "center",
  gap: "12px",
  fontSize: "14px",
};

const notificationClose = {
  background: "none",
  border: "none",
  color: "white",
  fontSize: "16px",
  cursor: "pointer",
  padding: "0",
  width: "20px",
  height: "20px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};
