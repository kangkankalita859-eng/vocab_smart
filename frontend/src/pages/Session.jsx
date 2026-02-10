import { useEffect, useState } from "react";
import FlashCard from "../components/FlashCard";
import SessionNav from "../components/SessionNav";
import { fetchVocab } from "../services/vocabService";
import {
  saveUnknownDeck,
  loadUnknownDeck,
  saveSavedDecks,
  loadSavedDecks,
  clearUnknownDeck,
  hasPersistedData
} from "../services/deckPersistenceService";

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

export default function Session({
  config,
  onComplete,
  onGoRead,
  onGoHome,
  onUpdateConfig,
}) {
  const [activeDeck, setActiveDeck] = useState([]);
  const [originalDeck, setOriginalDeck] = useState([]);
  const [knownDeck, setKnownDeck] = useState([]);
  const [unknownDeck, setUnknownDeck] = useState([]);

  const [savedDecks, setSavedDecks] = useState([]);
  const [selectedDeckIds, setSelectedDeckIds] = useState([]);

  const [loading, setLoading] = useState(true);
  const [isShuffling, setIsShuffling] = useState(false);
  const [showPersistedNotification, setShowPersistedNotification] = useState(false);

  /* ---------------- LOAD PERSISTED DATA ---------------- */

  useEffect(() => {
    // Load persisted data on component mount
    const persistedUnknownDeck = loadUnknownDeck();
    const persistedSavedDecks = loadSavedDecks();
    
    if (persistedUnknownDeck.length > 0 || persistedSavedDecks.length > 0) {
      setUnknownDeck(persistedUnknownDeck);
      setSavedDecks(persistedSavedDecks);
      setShowPersistedNotification(true);
      
      // Hide notification after 5 seconds
      setTimeout(() => {
        setShowPersistedNotification(false);
      }, 5000);
    }
  }, []);

  /* ---------------- AUTO-SAVE UNKNOWN DECK ---------------- */

  useEffect(() => {
    // Auto-save unknown deck whenever it changes
    if (unknownDeck.length > 0) {
      saveUnknownDeck(unknownDeck);
    }
  }, [unknownDeck]);

  /* ---------------- AUTO-SAVE SAVED DECKS ---------------- */

  useEffect(() => {
    // Auto-save saved decks whenever they change
    if (savedDecks.length > 0) {
      saveSavedDecks(savedDecks);
    }
  }, [savedDecks]);

  /* ---------------- FETCH VOCAB ---------------- */

  useEffect(() => {
    if (!config) return;

    setLoading(true);
    fetchVocab(config.start, config.limit)
      .then((data) => {
        if (data.status === 'success') {
          setActiveDeck(data.data);
          setOriginalDeck(data.data);
        } else {
          console.error('API Error:', data.message);
        }
        setKnownDeck([]);
        setUnknownDeck([]);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Fetch error:', error);
        setLoading(false);
      });
  }, [config]);

  /* ---------------- CARD ACTIONS ---------------- */

  const handleKnown = () => {
    const card = activeDeck[0];
    setKnownDeck((p) => [...p, card]);
    setActiveDeck((p) => p.slice(1));
  };

  const handleUnknown = () => {
    const card = activeDeck[0];
    const newUnknownDeck = [...unknownDeck, card];
    setUnknownDeck(newUnknownDeck);
    setActiveDeck((p) => p.slice(1));
    
    // Auto-save is handled by useEffect
  };

  /* ---------------- SHUFFLE (ANIMATED) ---------------- */

  const shuffleDeck = () => {
    if (activeDeck.length <= 1) return;

    setIsShuffling(true);

    setTimeout(() => {
      const shuffled = [...activeDeck];
      for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
      }
      setActiveDeck(shuffled);
      setIsShuffling(false);
    }, 650);
  };

  const unshuffleDeck = () => {
    setActiveDeck(originalDeck);
  };

  /* ---------------- REVISION ---------------- */

  const handleReviseUnknown = () => {
    setActiveDeck(unknownDeck);
    setOriginalDeck(unknownDeck);
    setKnownDeck([]);
    setUnknownDeck([]);
    
    // Clear persisted unknown deck since we're now using it
    clearUnknownDeck();
  };

  /* ---------------- SAVE DECK ---------------- */

  const handleAddDeck = () => {
    if (unknownDeck.length === 0) return;

    const newSavedDecks = [
      ...savedDecks,
      { id: Date.now(), unknownCards: [...unknownDeck] },
    ];
    
    setSavedDecks(newSavedDecks);
    
    setActiveDeck([]);
    setOriginalDeck([]);
    setKnownDeck([]);
    setUnknownDeck([]);
    
    // Clear persisted unknown deck since it's now saved
    clearUnknownDeck();
    
    // Auto-save is handled by useEffect
  };

  /* ---------------- SAVED DECK REVISION ---------------- */

  const reviseSingleDeck = (deck) => {
    setActiveDeck(deck.unknownCards);
    setOriginalDeck(deck.unknownCards);
    setKnownDeck([]);
    setUnknownDeck([]);

    setSavedDecks((p) => p.filter((d) => d.id !== deck.id));
    setSelectedDeckIds([]);
  };

  const reviseSelectedDecks = () => {
    const cards = savedDecks
      .filter((d) => selectedDeckIds.includes(d.id))
      .flatMap((d) => d.unknownCards);

    setActiveDeck(cards);
    setOriginalDeck(cards);
    setKnownDeck([]);
    setUnknownDeck([]);

    setSavedDecks((p) =>
      p.filter((d) => !selectedDeckIds.includes(d.id))
    );
    setSelectedDeckIds([]);
  };

  const reviseAllDecks = () => {
    const cards = savedDecks.flatMap((d) => d.unknownCards);
    setActiveDeck(cards);
    setOriginalDeck(cards);
    setKnownDeck([]);
    setUnknownDeck([]);
    setSavedDecks([]);
    setSelectedDeckIds([]);
  };

  /* ---------------- RANGE APPLY ---------------- */

  const handleApplyRange = (c) => onUpdateConfig(c);

  /* ---------------- LOADING ---------------- */

  if (loading) return <p style={{ textAlign: "center" }}>Loading…</p>;

  /* ---------------- DECK FINISHED ---------------- */

  if (activeDeck.length === 0 && originalDeck.length > 0) {
    return (
      <>
        <SessionNav
          mode="Cards"
          config={config}
          onApplyRange={handleApplyRange}
          onGoRead={onGoRead}
          onGoHome={onGoHome}
        />

        <div style={center}>
          <h2>Deck Finished</h2>
          <p>Known: {knownDeck.length} | Unknown: {unknownDeck.length}</p>

          <div style={{ display: "flex", gap: "14px" }}>
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
        mode="Cards"
        config={config}
        onApplyRange={handleApplyRange}
        onGoRead={onGoRead}
        onGoHome={onGoHome}
      />

      {/* PERSISTED DATA NOTIFICATION */}
      {showPersistedNotification && (
        <div style={notification}>
          <span>📚 Previous unknown deck data restored!</span>
          <button 
            style={notificationClose}
            onClick={() => setShowPersistedNotification(false)}
          >
            ✕
          </button>
        </div>
      )}

      {/* DECK PANEL - OUTSIDE CONTAINER */}
      {savedDecks.length > 0 && (
        <div style={deckPanel}>
          {savedDecks.map((d, i) => (
            <div key={d.id} style={deckChip}>
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
                <strong style={{ marginLeft: 6 }}>Deck {i + 1}</strong>
              </label>

              <div style={{ fontSize: 12 }}>❌ {d.unknownCards.length}</div>

              <button
                style={{ ...secondaryBtn, marginTop: 6 }}
                onClick={() => reviseSingleDeck(d)}
              >
                ▶ Revise
              </button>
            </div>
          ))}

          <div style={{ marginLeft: "auto", display: "flex", gap: 10 }}>
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

      {/* MAIN CONTAINER */}
      <div style={container}>
        <MiniStack title="❌ Unknown" count={unknownDeck.length} />

        <div style={deckWrapper}>
          <div style={deckArea}>
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
                <FlashCard
                  card={card}
                  onKnown={handleKnown}
                  onUnknown={handleUnknown}
                  showActions={index === 0}
                />
              </div>
            ))}
          </div>

          <div style={shuffleBar}>
            <button style={secondaryBtn} onClick={shuffleDeck}>
              🔀 Shuffle
            </button>
            <button style={secondaryBtn} onClick={unshuffleDeck}>
              ↩️ Unshuffle
            </button>
          </div>
        </div>

        <div style={stats}>
          <MiniStack title="Known" count={knownDeck.length} />
          <MiniStack title="Remaining" count={activeDeck.length} />
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
  marginTop: "0px",
};

const deckChip = {
  padding: "6px 10px",
  borderRadius: 6,
  background: "#e3f2fd",
  fontSize: 12,
  minWidth: 120,
};

const container = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  height: "calc(100vh - 60px)",
  padding: 40,
  paddingTop: "100px",
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
  background: "#1976d2",
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

const stats = {
  display: "flex",
  flexDirection: "column",
  gap: 20,
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
  zIndex: 1001,
  display: "flex",
  alignItems: "center",
  gap: "12px",
  fontSize: "14px",
  fontWeight: "500",
};

const notificationClose = {
  background: "rgba(255,255,255,0.2)",
  border: "none",
  color: "white",
  borderRadius: "4px",
  padding: "4px 8px",
  cursor: "pointer",
  fontSize: "12px",
  fontWeight: "bold",
};
