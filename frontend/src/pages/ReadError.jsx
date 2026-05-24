import { useState, useEffect } from "react";
import { fetchAllErrors, validateErrorAnswer } from "../services/errorService";

export default function ReadError({ config, onUpdateConfig, onGoHome }) {
  const [errors, setErrors] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [selectedOption, setSelectedOption] = useState(null);
  const [result, setResult] = useState(null);

  useEffect(() => {
    loadErrors();
  }, []);

  const loadErrors = async () => {
    setLoading(true);
    const data = await fetchAllErrors();
    setErrors(data);
    setCurrentIndex(0);
    setSelectedOption(null);
    setResult(null);
    setLoading(false);
  };

  const handleOptionClick = async (optionNumber) => {
    if (result) return; // Prevent changing answer after submission
    
    setSelectedOption(optionNumber);
    const validation = await validateErrorAnswer(errors[currentIndex].id, optionNumber);
    setResult(validation);
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setSelectedOption(null);
      setResult(null);
    }
  };

  const handleNext = () => {
    if (currentIndex < errors.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setSelectedOption(null);
      setResult(null);
    }
  };

  if (loading) {
    return (
      <div style={container}>
        <h2>Loading...</h2>
      </div>
    );
  }

  if (errors.length === 0) {
    return (
      <div style={container}>
        <h2>No errors found</h2>
        <button onClick={onGoHome} style={homeButton}>
          Go Home
        </button>
      </div>
    );
  }

  const currentError = errors[currentIndex];
  const isAnswered = result !== null;
  const isCorrect = result?.isCorrect;

  return (
    <div style={container}>
      <div style={header}>
        <button onClick={onGoHome} style={homeButton}>
          🏠 Home
        </button>
        <h1>Error Detection - Multiple Choice</h1>
      </div>

      <div style={cardContainer}>
        <div style={card}>
          <div style={progressBar}>
            <span>{currentIndex + 1} / {errors.length}</span>
          </div>

          <div style={examTag}>
            <small>{currentError.exam_name}</small>
          </div>

          <div style={questionSection}>
            <h3 style={questionTitle}>Find the Error:</h3>
            <p style={questionText}>{currentError.full_sentence}</p>
          </div>

          <div style={optionsContainer}>
            {Object.entries(currentError.options).map(([optionNum, optionText]) => (
              <button
                key={optionNum}
                onClick={() => handleOptionClick(parseInt(optionNum))}
                disabled={isAnswered}
                style={{
                  ...optionButton,
                  backgroundColor: selectedOption === parseInt(optionNum)
                    ? isCorrect ? '#4CAF50' : '#f44336'
                    : '#f5f5f5',
                  color: selectedOption === parseInt(optionNum) ? 'white' : '#333',
                  borderColor: selectedOption === parseInt(optionNum)
                    ? isCorrect ? '#45a049' : '#da190b'
                    : '#ddd',
                  cursor: isAnswered ? 'not-allowed' : 'pointer',
                  opacity: isAnswered && selectedOption !== parseInt(optionNum) ? 0.6 : 1
                }}
              >
                <strong>{optionNum}.</strong> {optionText}
              </button>
            ))}
          </div>

          {isAnswered && result?.explanation && (
            <div
              style={{
                ...explanationBox,
                borderLeft: isCorrect ? '4px solid #4CAF50' : '4px solid #f44336',
                backgroundColor: isCorrect ? '#f1f8f4' : '#fff3f3'
              }}
            >
              <h4 style={{ color: isCorrect ? '#2e7d32' : '#c62828' }}>
                {isCorrect ? '✅ Correct!' : '❌ Incorrect'}
              </h4>
              <p style={explanationText}>
                <strong>Explanation:</strong> {result.explanation.explanation}
              </p>
              <p style={explanationText}>
                <strong>Correct Sentence:</strong> {result.explanation.correct_sentence}
              </p>
            </div>
          )}
        </div>

        <div style={navigation}>
          <button
            onClick={handlePrevious}
            disabled={currentIndex === 0}
            style={{ ...navButton, opacity: currentIndex === 0 ? 0.5 : 1 }}
          >
            Previous
          </button>
          <span style={pageNumber}>{currentIndex + 1} / {errors.length}</span>
          <button
            onClick={handleNext}
            disabled={currentIndex === errors.length - 1}
            style={{ ...navButton, opacity: currentIndex === errors.length - 1 ? 0.5 : 1 }}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

const container = {
  minHeight: '100vh',
  backgroundColor: '#f5f5f5',
  padding: '20px'
};

const header = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  marginBottom: '30px',
  gap: '20px'
};

const homeButton = {
  padding: '10px 20px',
  fontSize: '16px',
  backgroundColor: '#2196F3',
  color: 'white',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
  fontWeight: 'bold'
};

const cardContainer = {
  maxWidth: '800px',
  margin: '0 auto'
};

const card = {
  backgroundColor: 'white',
  borderRadius: '10px',
  padding: '30px',
  boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
  marginBottom: '20px'
};

const progressBar = {
  textAlign: 'right',
  fontSize: '14px',
  color: '#666',
  marginBottom: '15px',
  fontWeight: 'bold'
};

const examTag = {
  backgroundColor: '#e3f2fd',
  padding: '10px 15px',
  borderRadius: '5px',
  marginBottom: '20px',
  fontSize: '12px',
  color: '#1976d2'
};

const questionSection = {
  marginBottom: '25px'
};

const questionTitle = {
  fontSize: '16px',
  fontWeight: 'bold',
  color: '#333',
  marginBottom: '10px'
};

const questionText = {
  fontSize: '18px',
  lineHeight: '1.6',
  color: '#555',
  backgroundColor: '#fafafa',
  padding: '15px',
  borderRadius: '5px',
  borderLeft: '4px solid #2196F3'
};

const optionsContainer = {
  display: 'flex',
  flexDirection: 'column',
  gap: '10px',
  marginBottom: '20px'
};

const optionButton = {
  padding: '15px 20px',
  fontSize: '16px',
  border: '2px solid #ddd',
  borderRadius: '5px',
  backgroundColor: '#f5f5f5',
  cursor: 'pointer',
  textAlign: 'left',
  transition: 'all 0.3s ease',
  fontWeight: '500'
};

const explanationBox = {
  padding: '20px',
  borderRadius: '5px',
  marginBottom: '20px',
  backgroundColor: '#f1f8f4'
};

const explanationText = {
  margin: '10px 0',
  lineHeight: '1.6',
  color: '#555'
};

const navigation = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  gap: '20px'
};

const navButton = {
  padding: '12px 24px',
  fontSize: '16px',
  backgroundColor: '#4CAF50',
  color: 'white',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
  fontWeight: 'bold'
};

const pageNumber = {
  fontSize: '14px',
  color: '#666',
  fontWeight: 'bold'
};

const errorTypeTag = {
  display: "inline-block",
  backgroundColor: "#ff6b6b",
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

const incorrectText = {
  backgroundColor: "#ffe6e6",
  padding: "15px",
  borderRadius: "6px",
  color: "#c41e3a",
  fontSize: "15px",
  lineHeight: "1.6",
  border: "1px solid #ffcccc",
};

const correctText = {
  backgroundColor: "#e6ffe6",
  padding: "15px",
  borderRadius: "6px",
  color: "#22863a",
  fontSize: "15px",
  lineHeight: "1.6",
  border: "1px solid #ccffcc",
};

const explanation = {
  backgroundColor: "#f0f8ff",
  padding: "15px",
  borderRadius: "6px",
  color: "#333",
  fontSize: "14px",
  lineHeight: "1.6",
  border: "1px solid #cce7ff",
};

const example = {
  backgroundColor: "#fff9e6",
  padding: "15px",
  borderRadius: "6px",
  color: "#333",
  fontSize: "14px",
  lineHeight: "1.6",
  border: "1px solid #ffeccc",
  fontStyle: "italic",
};
