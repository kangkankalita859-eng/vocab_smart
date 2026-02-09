import { useEffect, useState } from "react";
import FlashCard from "../components/FlashCard";
import SessionNav from "../components/SessionNav";
import MobileSidebar from "../components/MobileSidebar";
import useAuth from "../hooks/useAuth";
import LoginModal from "../components/LoginModal";
import useMobile from "../hooks/useMobile";
import { fetchVocab } from "../services/vocabService";

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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { isMobile } = useMobile();
  const { user, showLoginModal, setShowLoginModal, requireAuth } = useAuth();

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
    setUnknownDeck((p) => [...p, card]);
    setActiveDeck((p) => p.slice(1));
  };

  // Require authentication for flashcard progress saving
  const handleCardAction = (action) => {
    if (!requireAuth()) return;
    
    if (action === 'known') {
      handleKnown();
    } else if (action === 'unknown') {
      handleUnknown();
    }
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
    }, 650); // ⬅ animation duration
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
  };

  /* ---------------- SAVE DECK ---------------- */

  const handleAddDeck = () => {
    if (unknownDeck.length === 0) return;

    setSavedDecks((p) => [
      ...p,
      { id: Date.now(), unknownCards: [...unknownDeck] },
    ]);

    setActiveDeck([]);
    setOriginalDeck([]);
    setKnownDeck([]);
    setUnknownDeck([]);
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
        isMobile={isMobile}
        onMenuToggle={() => setMobileMenuOpen(true)}
      />

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

      <div style={container}>
        <MiniStack title="❌ Unknown" count={unknownDeck.length} />

        <div style={deckWrapper}>
          <div style={deckArea}>
            {activeDeck.slice(0, 6).map((card, index) => (
              <div
                key={card.id}
                className={isShuffling ? "flashcard shuffle" : "flashcard"}
                style={{
                  position: "absolute",
                  top: index * 10 + (isShuffling ? Math.random() * 12 : 0),
                  left: index * 8 + (isShuffling ? Math.random() * 24 - 12 : 0),
                  zIndex: index,
                  width: 320,
                  height: 210,
                }}
              >
                {index === 0 ? (
                  <FlashCard
                    card={card}
                    onKnown={() => handleCardAction('known')}
                    onUnknown={() => handleCardAction('unknown')}
                    showActions={true}
                  />
                ) : (
                  <div style={{
                    width: "100%",
                    height: "100%",
                    background: "linear-gradient(180deg, #ffffff 0%, #fafafa 100%)",
                    borderRadius: "16px",
                    border: "1px solid #e6e6e6",
                    boxShadow: "0 10px 24px rgba(0, 0, 0, 0.12), 0 2px 6px rgba(0, 0, 0, 0.06)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: "24px",
                    textAlign: "center",
                    backfaceVisibility: "hidden",
                  }}>
                    <h2 style={{
                      fontSize: "30px",
                      fontWeight: "600",
                      letterSpacing: "0.4px",
                      color: "#111",
                    }}>{card.word}</h2>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div style={shuffleBar}>
            <button style={secondaryBtn} onClick={shuffleDeck} disabled={isShuffling}>
              🔀 Shuffle
            </button>
            <button style={secondaryBtn} onClick={unshuffleDeck}>
              ↩️ Unshuffle
            </button>
          </div>
        </div>

        <div style={stats}>
          <MiniStack title="Known" count={knownDeck.length} />
          <MiniStack title="Unknown" count={unknownDeck.length} />
          <MiniStack title="Remaining" count={activeDeck.length} />
        </div>
      </div>

      {/* Mobile sidebar only */}
      {isMobile && (
        <MobileSidebar
          isOpen={mobileMenuOpen}
          onClose={() => setMobileMenuOpen(false)}
          onSubjectSelect={() => {}}
          onSubtopicSelect={() => {}}
        />
      )}

      {/* Login Modal */}
      <LoginModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        onLoginSuccess={(userData) => {
          console.log('User logged in:', userData);
        }}
      />
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
  height: "calc(100vh - 120px)",
  padding: 40,
  paddingTop: "80px", // Add padding for fixed navbar
};

const deckWrapper = { display: "flex", flexDirection: "column", alignItems: "center" };

const deckArea = { position: "relative", width: 320, height: 210 };

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







