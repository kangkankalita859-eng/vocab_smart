import { useState, useEffect } from "react";
import { fetchSentenceImprovements } from "../services/sentenceImprovementService";

export default function ReadSentenceImprovement({ config, onUpdateConfig, onGoHome }) {
  const [improvements, setImprovements] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadImprovements();
  }, [config]);

  const loadImprovements = async () => {
    setLoading(true);
    const data = await fetchSentenceImprovements(config.start, config.limit);
    setImprovements(data);
    setCurrentIndex(0);
    setLoading(false);
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < improvements.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  if (loading) {
    return (
      <div style={container}>
        <h2>Loading...</h2>
      </div>
    );
  }

  if (improvements.length === 0) {
    return (
      <div style={container}>
        <h2>No sentence improvements found</h2>
        <button onClick={onGoHome} style={homeButton}>
          Go Home
        </button>
      </div>
    );
  }

  const currentImprovement = improvements[currentIndex];

  return (
    <div style={container}>
      <div style={header}>
        <button onClick={onGoHome} style={homeButton}>
          🏠 Home
        </button>
        <h1>Improvement of Sentences</h1>
      </div>

      <div style={cardContainer}>
        <div style={card}>
          <div style={techniqueTag}>
            {currentImprovement.technique}
          </div>

          <div style={section}>
            <h3 style={sectionTitle}>Original Sentence:</h3>
            <p style={originalText}>{currentImprovement.original}</p>
          </div>

          <div style={section}>
            <h3 style={sectionTitle}>✨ Improved Sentence:</h3>
            <p style={improvedText}>{currentImprovement.improved}</p>
          </div>

          <div style={section}>
            <h3 style={sectionTitle}>📖 Explanation:</h3>
            <p style={explanation}>{currentImprovement.explanation}</p>
          </div>

          <div style={section}>
            <h3 style={sectionTitle}>📚 हिंदी व्याख्या:</h3>
            <p style={explanation}>{currentImprovement.hindiExplanation}</p>
          </div>
        </div>

        <div style={navigation}>
          <button 
            onClick={handlePrevious} 
            disabled={currentIndex === 0}
            style={{...navButton, opacity: currentIndex === 0 ? 0.5 : 1}}
          >
            ← Previous
          </button>

          <span style={counter}>
            {currentIndex + 1} / {improvements.length}
          </span>

          <button 
            onClick={handleNext} 
            disabled={currentIndex === improvements.length - 1}
            style={{...navButton, opacity: currentIndex === improvements.length - 1 ? 0.5 : 1}}
          >
            Next →
          </button>
        </div>
      </div>
    </div>
  );
}

const container = {
  padding: "20px",
  maxWidth: "900px",
  margin: "0 auto",
};

const header = {
  display: "flex",
  alignItems: "center",
  gap: "20px",
  marginBottom: "30px",
  borderBottom: "2px solid #007bff",
  paddingBottom: "20px",
};

const homeButton = {
  padding: "10px 20px",
  backgroundColor: "#007bff",
  color: "white",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer",
  fontSize: "14px",
};

const cardContainer = {
  display: "flex",
  flexDirection: "column",
  gap: "30px",
};

const card = {
  backgroundColor: "#f9f9f9",
  border: "1px solid #e0e0e0",
  borderRadius: "8px",
  padding: "30px",
  boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
};

const techniqueTag = {
  display: "inline-block",
  backgroundColor: "#2196f3",
  color: "white",
  padding: "6px 12px",
  borderRadius: "20px",
  fontSize: "12px",
  fontWeight: "600",
  marginBottom: "20px",
};

const section = {
  marginBottom: "25px",
};

const sectionTitle = {
  fontSize: "16px",
  fontWeight: "600",
  color: "#333",
  marginBottom: "10px",
};

const originalText = {
  backgroundColor: "#fff3cd",
  padding: "15px",
  borderRadius: "6px",
  color: "#856404",
  fontSize: "15px",
  lineHeight: "1.6",
  border: "1px solid #ffeaa7",
};

const improvedText = {
  backgroundColor: "#d4edda",
  padding: "15px",
  borderRadius: "6px",
  color: "#155724",
  fontSize: "15px",
  lineHeight: "1.6",
  border: "1px solid #c3e6cb",
};

const explanation = {
  backgroundColor: "#e7f3ff",
  padding: "15px",
  borderRadius: "6px",
  color: "#333",
  fontSize: "14px",
  lineHeight: "1.6",
  border: "1px solid #b3d9ff",
};

const navigation = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  gap: "20px",
};

const navButton = {
  padding: "10px 20px",
  backgroundColor: "#007bff",
  color: "white",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer",
  fontSize: "14px",
};

const counter = {
  fontSize: "14px",
  fontWeight: "600",
  color: "#666",
};
