import { useState } from "react";
import "../styles/flashcard.css";

export default function HomonymsHomophonesFlashCard({ card, onKnown, onUnknown, showActions }) {
  const [flipped, setFlipped] = useState(false);
  const [animating, setAnimating] = useState(null);

  const handleKnown = () => {
    setAnimating("known");
    setTimeout(onKnown, 300);
  };

  const handleUnknown = () => {
    setAnimating("unknown");
    setTimeout(onUnknown, 300);
  };

  return (
    <div className="flashcard-wrapper">
      <div
        className={`flashcard ${flipped ? "flipped" : ""} ${
          animating === "known" ? "to-known" : ""
        } ${animating === "unknown" ? "to-unknown" : ""}`}
        onClick={() => !animating && setFlipped((f) => !f)}
      >
        <div className="flashcard-inner">
          <div className="flashcard-front">
            <h2>{card.word}</h2>
          </div>

          <div className="flashcard-back">
            {card.image ? (
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  backgroundImage: `url(/${card.image.replace(/^\/+/, "")})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  opacity: 0.1,
                  pointerEvents: "none",
                }}
              />
            ) : (
              ""
            )}

            {(card.pairWord || card.type || card.pronunciation) && (
              <div
                style={{
                  marginBottom: "12px",
                  padding: "10px",
                  backgroundColor: "#f8f9fa",
                  borderRadius: "6px",
                  fontSize: "13px",
                  color: "#333",
                }}
              >
                {card.pairWord && (
                  <div style={{ marginBottom: "6px" }}>
                    <strong>Pair:</strong> {card.pairWord}
                  </div>
                )}
                {card.type && (
                  <div style={{ marginBottom: "6px" }}>
                    <strong>Type:</strong> {card.type}
                  </div>
                )}
                {card.pronunciation && (
                  <div>
                    <strong>Pronunciation:</strong> {card.pronunciation}
                  </div>
                )}
              </div>
            )}

            <div className="meaning-english">{card.meaning || ""}</div>
            <div className="meaning-hindi">{card.hindiMeaning || ""}</div>

            {card.example ? (
              <div
                style={{
                  marginTop: "12px",
                  padding: "8px",
                  backgroundColor: "#f8f9fa",
                  borderRadius: "4px",
                  fontSize: "13px",
                  fontStyle: "italic",
                  color: "#555",
                }}
              >
                <strong>Example:</strong> {card.example}
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>

      {showActions && (
        <div className="action-buttons">
          <button className="unknown-btn" onClick={handleUnknown}>
            ❌ Unknown
          </button>
          <button className="known-btn" onClick={handleKnown}>
            ✅ Known
          </button>
        </div>
      )}
    </div>
  );
}
