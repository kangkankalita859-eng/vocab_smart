import { useState } from "react";
import "../styles/flashcard.css";

export default function FlashCard({ card, onKnown, onUnknown, showActions }) {
  const [flipped, setFlipped] = useState(false);
  const [animating, setAnimating] = useState(null); // null | "known" | "unknown"

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
            <div className="meaning-hindi">
              {card.hindiMeaning}
            </div>

            <div className="meaning-english">
              {card.meaning}
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


