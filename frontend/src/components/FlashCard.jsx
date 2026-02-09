import { useState } from "react";
import "../styles/flashcard.css";

export default function FlashCard({ card, onKnown, onUnknown, showActions }) {
  const [flipped, setFlipped] = useState(false);
  const [animating, setAnimating] = useState(null); // null | "known" | "unknown"

  // Debug: Check if card data exists
  if (!card) {
    return <div>No card data</div>;
  }

  const handleKnown = () => {
    console.log('Known button clicked');
    setAnimating("known");
    setTimeout(onKnown, 300);
  };

  const handleUnknown = () => {
    console.log('Unknown button clicked');
    setAnimating("unknown");
    setTimeout(onUnknown, 300);
  };

  const handleCardClick = () => {
    console.log('Card clicked', { flipped, animating });
    if (!animating) {
      setFlipped((f) => !f);
    }
  };

  return (
    <div className="flashcard-wrapper">
      <div
        className={`flashcard ${flipped ? "flipped" : ""} ${
          animating === "known" ? "to-known" : ""
        } ${animating === "unknown" ? "to-unknown" : ""}`}
        onClick={handleCardClick}
      >
        <div className="flashcard-inner">
          <div className="flashcard-front">
            <h2>{card.word || 'No word'}</h2>
          </div>
          <div className="flashcard-back">
            <div className="meaning-hindi">
              {card.hindiMeaning || 'No Hindi meaning'}
            </div>

            <div className="meaning-english">
              {card.meaning || 'No English meaning'}
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


