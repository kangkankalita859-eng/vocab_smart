import { useState } from "react";
import "../styles/flashcard.css";

export default function IdiomFlashCard({ card, onKnown, onUnknown, showActions }) {
  const [flipped, setFlipped] = useState(false);
  const [animating, setAnimating] = useState(null); 
  // null | "known" | "unknown"

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
            <h2>{card.phrase}</h2>
            <div style={{ 
              fontSize: "14px", 
              color: "#e74c3c", 
              marginTop: "8px",
              fontWeight: "600"
            }}>
              SSC: {card.sscCount} times
            </div>
          </div>
          <div className="flashcard-back">
            <div className="meaning-english">
              {card.meaning}
            </div>
            <div className="meaning-hindi">
              {card.hindiMeaning}
            </div>
            <div style={{
              marginTop: "12px",
              padding: "8px",
              backgroundColor: "#f8f9fa",
              borderRadius: "4px",
              fontSize: "13px",
              fontStyle: "italic",
              color: "#555"
            }}>
              <strong>Example:</strong> {card.example}
            </div>
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
