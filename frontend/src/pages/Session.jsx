import { useState } from "react";
import FlashCard from "../components/FlashCard";
import SessionNav from "../components/SessionNav";
import MobileSidebar from "../components/MobileSidebar";
import useFlashcards from "../hooks/useFlashcards";
import useAuth from "../hooks/useAuth";
import LoginModal from "../components/LoginModal";
import useMobile from "../hooks/useMobile";

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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { isMobile } = useMobile();
  
  const {
    cards,
    known,
    unknown,
    currentIndex,
    loading,
    user,
    markKnown,
    markUnknown,
    reviseUnknown,
    reset,
    isComplete,
    currentCard,
    remainingCards,
    progressLoaded
  } = useFlashcards(config);

  const { showLoginModal, setShowLoginModal, login, logout, requireAuth } = useAuth();

  // Require authentication for flashcard progress saving
  const handleCardAction = (action) => {
    if (!requireAuth()) return;
    
    if (action === 'known') {
      markKnown();
    } else if (action === 'unknown') {
      markUnknown();
    }
  };

  /* ---------------- LOADING ---------------- */

  if (loading) return <p style={{ textAlign: "center" }}>Loading…</p>;

  /* ---------------- DECK FINISHED ---------------- */

  if (isComplete && cards.length > 0) {
    return (
      <>
        <SessionNav
          mode="Cards"
          config={config}
          onApplyRange={onUpdateConfig}
          onGoRead={onGoRead}
          onGoHome={onGoHome}
          isMobile={isMobile}
          onMenuToggle={() => setMobileMenuOpen(true)}
        />

        <div style={container}>
          <h2>Deck Finished</h2>
          <p>Known: {known.length} | Unknown: {unknown.length}</p>

          <div style={{ display: "flex", gap: "14px" }}>
            {unknown.length > 0 && (
              <button style={secondaryBtn} onClick={reviseUnknown}>
                🔁 Revise Unknown ({unknown.length})
              </button>
            )}
            <button style={primaryBtn} onClick={reset}>
              🔄 Restart Deck
            </button>
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
      </>
    );
  }

  /* ---------------- UI ---------------- */

  return (
    <>
      <SessionNav
        mode="Cards"
        config={config}
        onApplyRange={onUpdateConfig}
        onGoRead={onGoRead}
        onGoHome={onGoHome}
        isMobile={isMobile}
        onMenuToggle={() => setMobileMenuOpen(true)}
      />

      <div style={container}>
        <div style={deckWrapper}>
          <div style={deckArea}>
            {currentCard ? (
              <FlashCard
                card={currentCard}
                onKnown={() => handleCardAction('known')}
                onUnknown={() => handleCardAction('unknown')}
                showActions={!!user}
              />
            ) : (
              <div style={emptyDeck}>
                <h3>No cards available</h3>
                <button style={primaryBtn} onClick={reset}>
                  🔄 Restart
                </button>
              </div>
            )}
          </div>

          <div style={shuffleBar}>
            <button style={secondaryBtn} onClick={reset}>
              🔄 Restart
            </button>
            {unknown.length > 0 && (
              <button style={secondaryBtn} onClick={reviseUnknown}>
                🔁 Revise Unknown ({unknown.length})
              </button>
            )}
          </div>
        </div>

        <div style={stats}>
          <MiniStack title="Known" count={known.length} />
          <MiniStack title="Unknown" count={unknown.length} />
          <MiniStack title="Remaining" count={remainingCards} />
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
          setShowLoginModal(false);
        }}
      />
    </>
  );
}

/* ---------------- STYLES ---------------- */

const miniCard = {
  width: "60px",
  height: "80px",
  background: "#fff",
  border: "1px solid #ccc",
  borderRadius: "6px",
  position: "absolute",
  boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
};

const miniStack = {
  width: "140px",
  textAlign: "center",
};

const container = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  height: "calc(100vh - 120px)",
  padding: 40,
  paddingTop: "80px",
  marginLeft: "0px",
};

const deckWrapper = { display: "flex", flexDirection: "column", alignItems: "center" };

const deckArea = { position: "relative", width: 340, height: 440 };

const shuffleBar = { marginTop: 18, display: "flex", gap: 12 };

const stats = {
  display: "flex",
  flexDirection: "column",
  gap: 20,
};

const primaryBtn = {
  padding: "10px 20px",
  borderRadius: "8px",
  border: "none",
  background: "#1976d2",
  color: "#fff",
  cursor: "pointer",
  fontSize: "14px",
};

const secondaryBtn = {
  padding: "10px 20px",
  borderRadius: "8px",
  border: "1px solid #ccc",
  background: "#fff",
  cursor: "pointer",
  fontSize: "14px",
};

const emptyDeck = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  height: "100%",
  gap: "20px",
};
