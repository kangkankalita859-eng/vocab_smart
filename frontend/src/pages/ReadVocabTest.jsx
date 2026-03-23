import { useState, useEffect } from "react";
import { fetchVocabTestBySet } from "../services/vocabTestService";
import SessionNav from "../components/SessionNav";
import MobileSidebar from "../components/MobileSidebar";
import useMobile from "../hooks/useMobile";

export default function ReadVocabTest({ config, onUpdateConfig, onGoHome, onGoBackToSets }) {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const [score, setScore] = useState(0);
  const [answeredQuestions, setAnsweredQuestions] = useState([]);
  const { isMobile } = useMobile();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentSet, setCurrentSet] = useState(1);

  useEffect(() => {
    const loadQuestions = async () => {
      try {
        setLoading(true);
        // Get the set number from config (passed from VocabTestSets)
        const setNumber = config.setNumber || 1;
        setCurrentSet(setNumber);
        
        const response = await fetchVocabTestBySet(setNumber);
        setQuestions(response.data);
        setCurrentQuestionIndex(0);
        setSelectedOption(null);
        setShowAnswer(false);
      } catch (error) {
        console.error("Error loading vocab test questions:", error);
      } finally {
        setLoading(false);
      }
    };

    loadQuestions();
  }, [config.setNumber]);

  const handleOptionClick = (optionIndex) => {
    if (showAnswer) return;
    
    setSelectedOption(optionIndex);
    setShowAnswer(true);
    
    const isCorrect = optionIndex === questions[currentQuestionIndex].correct;
    
    if (isCorrect) {
      setScore(score + 1);
    }
    
    setAnsweredQuestions([...answeredQuestions, {
      questionId: questions[currentQuestionIndex].id,
      selectedOption: optionIndex,
      isCorrect
    }]);
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedOption(null);
      setShowAnswer(false);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      setSelectedOption(null);
      setShowAnswer(false);
    }
  };

  const handleQuestionSelect = (index) => {
    setCurrentQuestionIndex(index);
    setSelectedOption(null);
    setShowAnswer(false);
  };

  const handleReset = () => {
    setCurrentQuestionIndex(0);
    setSelectedOption(null);
    setShowAnswer(false);
    setScore(0);
    setAnsweredQuestions([]);
  };

  const handleBackToSets = () => {
    // Navigate back to sets selection using the provided callback
    onGoBackToSets();
  };

  if (loading) {
    return (
      <div style={loadingContainer}>
        <div style={loadingContent}>
          <div style={spinner}></div>
          <p>Loading vocabulary test questions...</p>
        </div>
      </div>
    );
  }

  return (
    <div style={mainContainer}>
      <div style={content}>
        {/* Mobile Navigation Bar */}
        {isMobile && (
          <div style={mobileNav}>
            <button
              style={menuBtn}
              onClick={() => setMobileMenuOpen(true)}
            >
              ☰
            </button>
            <span style={mobileTitle}>Vocabulary Test</span>
            <button
              style={homeBtn}
              onClick={onGoHome}
            >
              🏠
            </button>
          </div>
        )}

        {/* Header with Navigation */}
        <div style={headerFixed}>
          <div style={navContainer}>
            <SessionNav
              mode="read"
              config={config}
              onApplyRange={(start, limit) => onUpdateConfig({ start, limit })}
              onGoHome={onGoHome}
              isMobile={isMobile}
              onMenuToggle={() => setMobileMenuOpen(true)}
            />
          </div>

          {/* Score and Set Display */}
          <div style={scoreContainer}>
            <span style={scoreText}>Set {currentSet}: {score}/{answeredQuestions.length}</span>
            <button style={resetBtn} onClick={handleReset}>Reset</button>
          </div>
        </div>

        {/* Main Test Area */}
        <div style={{
          ...testContainer,
          flexDirection: isMobile ? "column" : "row"
        }}>
          {/* Question Palette - Side Panel */}
          <div style={{
            ...questionPalette,
            width: isMobile ? "100%" : "250px",
            padding: isMobile ? "15px" : "20px",
            height: isMobile ? "auto" : "fit-content",
            position: isMobile ? "static" : "sticky",
            top: isMobile ? "auto" : "20px",
            order: isMobile ? 2 : 1
          }}>
            <h3 style={paletteTitle}>Question Palette</h3>
            <div style={{
              ...paletteGrid,
              gap: isMobile ? "6px" : "8px",
              marginBottom: isMobile ? "15px" : "0"
            }}>
              {questions.map((question, index) => {
                const isAnswered = answeredQuestions.some(q => q.questionId === question.id);
                const answeredData = answeredQuestions.find(q => q.questionId === question.id);
                const isCorrect = answeredData ? answeredData.isCorrect : false;
                
                return (
                  <button
                    key={question.id}
                    style={{
                      ...paletteButton,
                      width: isMobile ? "35px" : "40px",
                      height: isMobile ? "35px" : "40px",
                      fontSize: isMobile ? "12px" : "14px",
                      backgroundColor: currentQuestionIndex === index ? '#007bff' :
                                     isAnswered ? (isCorrect ? '#28a745' : '#dc3545') : '#ffffff',
                      color: currentQuestionIndex === index ? '#ffffff' :
                             isAnswered ? '#ffffff' : '#2c3e50',
                      borderColor: currentQuestionIndex === index ? '#007bff' :
                                    isAnswered ? (isCorrect ? '#28a745' : '#dc3545') : '#dee2e6'
                    }}
                    onClick={() => handleQuestionSelect(index)}
                  >
                    {index + 1}
                  </button>
                );
              })}
            </div>
            
            {/* Back to Sets Button */}
            <button
              style={backToSetsButton}
              onClick={handleBackToSets}
            >
              ← Back to Sets
            </button>
          </div>

          {/* Question Area */}
          <div style={questionArea}>
            {questions.length > 0 && (
              <>
                {/* Question Header */}
                <div style={questionHeader}>
                  <div style={questionInfo}>
                    <span style={questionNumber}>Q{currentQuestionIndex + 1}</span>
                    <span style={questionType}>{questions[currentQuestionIndex].type}</span>
                  </div>
                  <div style={navigationButtons}>
                    <button
                      style={navButton}
                      onClick={handlePreviousQuestion}
                      disabled={currentQuestionIndex === 0}
                    >
                      ← Previous
                    </button>
                    <span style={questionCounter}>
                      {currentQuestionIndex + 1} / {questions.length}
                    </span>
                    <button
                      style={navButton}
                      onClick={handleNextQuestion}
                      disabled={currentQuestionIndex === questions.length - 1}
                    >
                      Next →
                    </button>
                  </div>
                </div>

                {/* Question Word */}
                <div style={wordContainer}>
                  <h3 style={wordText}>{questions[currentQuestionIndex].word}</h3>
                </div>

                {/* Question Sentence */}
                <div style={sentenceContainer}>
                  <h3 style={sentenceText}>{questions[currentQuestionIndex].question}</h3>
                </div>

                {/* Options */}
                <div style={optionsContainer}>
                  {questions[currentQuestionIndex].options.map((option, optionIndex) => (
                    <button
                      key={optionIndex}
                      style={{
                        ...optionButton,
                        backgroundColor: showAnswer
                          ? optionIndex === questions[currentQuestionIndex].correct
                            ? '#d4edda'
                            : selectedOption === optionIndex
                            ? '#f8d7da'
                            : '#ffffff'
                          : '#ffffff',
                        borderColor: showAnswer
                          ? optionIndex === questions[currentQuestionIndex].correct
                            ? '#28a745'
                            : selectedOption === optionIndex
                            ? '#dc3545'
                            : '#dee2e6'
                          : '#007bff',
                        cursor: showAnswer ? 'not-allowed' : 'pointer'
                      }}
                      onClick={() => handleOptionClick(optionIndex)}
                      disabled={showAnswer}
                    >
                      <span style={optionLetter}>{String.fromCharCode(65 + optionIndex)}</span>
                      <span style={optionText}>{option}</span>
                      {showAnswer && optionIndex === questions[currentQuestionIndex].correct && (
                        <span style={resultIconCorrect}>✓</span>
                      )}
                      {showAnswer && selectedOption === optionIndex && optionIndex !== questions[currentQuestionIndex].correct && (
                        <span style={resultIconWrong}>✗</span>
                      )}
                    </button>
                  ))}
                </div>

                {/* Explanation */}
                {showAnswer && (
                  <div style={explanationContainer}>
                    <div style={explanationHeader}>
                      <span style={explanationIcon}>💡</span>
                      <span style={explanationTitle}>Explanation</span>
                    </div>
                    <p style={explanationText}>{questions[currentQuestionIndex].explanation}</p>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// Styles
const mainContainer = {
  display: "flex",
  flexDirection: "column",
  minHeight: "100vh",
  backgroundColor: "#f5f7fa"
};

const content = {
  flex: 1,
  padding: "20px",
  maxWidth: "1400px",
  margin: "0 auto",
  width: "100%",
  position: "relative"
};

const testContainer = {
  display: "flex",
  marginTop: "90px",
  gap: "20px",
  height: "calc(100vh - 120px)"
};

const questionPalette = {
  width: "250px",
  backgroundColor: "#ffffff",
  border: "1px solid #e9ecef",
  borderRadius: "12px",
  padding: "20px",
  boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
  height: "fit-content",
  position: "sticky",
  top: "20px"
};

const paletteTitle = {
  fontSize: "18px",
  fontWeight: "600",
  color: "#2c3e50",
  margin: "0 0 20px 0",
  textAlign: "center"
};

const paletteGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(5, 1fr)",
  gap: "8px"
};

const paletteButton = {
  width: "40px",
  height: "40px",
  border: "2px solid #dee2e6",
  borderRadius: "8px",
  backgroundColor: "#ffffff",
  color: "#2c3e50",
  fontSize: "14px",
  fontWeight: "600",
  cursor: "pointer",
  transition: "all 0.3s ease"
};

const backToSetsButton = {
  width: "100%",
  padding: "10px",
  backgroundColor: "#6c757d",
  color: "#ffffff",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer",
  fontSize: "14px",
  fontWeight: "500",
  marginTop: "20px",
  transition: "all 0.3s ease"
};

const questionArea = {
  flex: 1,
  backgroundColor: "#ffffff",
  border: "1px solid #e9ecef",
  borderRadius: "12px",
  padding: "30px",
  boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
  display: "flex",
  flexDirection: "column"
};

const questionHeader = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: "25px",
  paddingBottom: "15px",
  borderBottom: "1px solid #e9ecef"
};

const questionInfo = {
  display: "flex",
  gap: "15px",
  alignItems: "center"
};

const questionNumber = {
  fontSize: "18px",
  fontWeight: "600",
  color: "#007bff",
  backgroundColor: "#e3f2fd",
  padding: "8px 16px",
  borderRadius: "20px"
};

const questionType = {
  fontSize: "14px",
  color: "#6c757d",
  backgroundColor: "#f8f9fa",
  padding: "8px 16px",
  borderRadius: "20px",
  border: "1px solid #dee2e6",
  fontWeight: "500"
};

const navigationButtons = {
  display: "flex",
  alignItems: "center",
  gap: "15px"
};

const navButton = {
  padding: "8px 16px",
  backgroundColor: "#007bff",
  color: "#ffffff",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer",
  fontSize: "14px",
  fontWeight: "500",
  transition: "all 0.3s ease"
};

const questionCounter = {
  fontSize: "16px",
  fontWeight: "600",
  color: "#6c757d"
};

const wordContainer = {
  textAlign: "center",
  padding: "15px",
  backgroundColor: "#fff3cd",
  borderRadius: "8px",
  border: "1px solid #ffeaa7",
  marginBottom: "18px"
};

const wordText = {
  fontSize: "24px",
  color: "#856404",
  fontWeight: "700",
  margin: 0,
  fontFamily: "'Arial', sans-serif",
  textTransform: "uppercase"
};

const sentenceContainer = {
  textAlign: "center",
  padding: "18px",
  backgroundColor: "#f8f9fa",
  borderRadius: "8px",
  border: "1px solid #e9ecef",
  marginBottom: "18px"
};

const sentenceText = {
  fontSize: "18px",
  color: "#2c3e50",
  fontWeight: "600",
  margin: 0,
  fontFamily: "'Georgia', serif",
  lineHeight: "1.4"
};

const optionsContainer = {
  display: "grid",
  gridTemplateColumns: "repeat(2, 1fr)",
  gap: "15px",
  margin: "25px 0"
};

const optionButton = {
  padding: "20px",
  border: "2px solid #007bff",
  borderRadius: "12px",
  backgroundColor: "#ffffff",
  cursor: "pointer",
  transition: "all 0.3s ease",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  minHeight: "70px",
  position: "relative"
};

const optionLetter = {
  fontSize: "16px",
  fontWeight: "700",
  color: "#007bff",
  backgroundColor: "#e3f2fd",
  width: "40px",
  height: "40px",
  borderRadius: "50%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center"
};

const optionText = {
  fontSize: "16px",
  color: "#2c3e50",
  flex: 1,
  fontWeight: "500",
  textAlign: "left"
};

const resultIconCorrect = {
  position: "absolute",
  top: "10px",
  right: "10px",
  color: "#28a745",
  fontSize: "20px",
  fontWeight: "bold"
};

const resultIconWrong = {
  position: "absolute",
  top: "10px",
  right: "10px",
  color: "#dc3545",
  fontSize: "20px",
  fontWeight: "bold"
};

const explanationContainer = {
  backgroundColor: "#e8f5e8",
  borderRadius: "8px",
  padding: "18px",
  marginTop: "15px",
  border: "1px solid #d4edda"
};

const explanationHeader = {
  display: "flex",
  alignItems: "center",
  gap: "8px",
  marginBottom: "12px"
};

const explanationIcon = {
  fontSize: "16px"
};

const explanationTitle = {
  margin: "0",
  fontSize: "16px",
  color: "#155724",
  fontWeight: "600"
};

const explanationText = {
  fontSize: "14px",
  lineHeight: "1.5",
  color: "#2c3e50",
  margin: 0
};

const loadingContainer = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "100vh",
  backgroundColor: "#f5f7fa"
};

const loadingContent = {
  textAlign: "center",
  alignItems: "center"
};

const spinner = {
  width: "40px",
  height: "40px",
  border: "4px solid #f3f3f",
  borderTop: "4px solid #007bff",
  borderRadius: "50%",
  animation: "spin 1s linear infinite",
  marginBottom: "20px"
};

const mobileNav = {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  height: '60px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '0 16px',
  backgroundColor: '#ffffff',
  borderBottom: '1px solid #e0e0e0',
  zIndex: 1000,
  boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
};

const menuBtn = {
  background: "none",
  border: "none",
  fontSize: "20px",
  cursor: "pointer"
};

const mobileTitle = {
  fontSize: '16px',
  fontWeight: '600'
};

const homeBtn = {
  background: "#007bff",
  color: "#fff",
  border: "none",
  padding: "6px 12px",
  borderRadius: "4px",
  cursor: "pointer",
  fontSize: "14px"
};

const headerFixed = {
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  height: "70px",
  backgroundColor: "#ffffff",
  borderBottom: "1px solid #e0e0e0",
  zIndex: 100,
  boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: "0 20px"
};

const navContainer = {
  flex: 1
};

const scoreContainer = {
  display: "flex",
  alignItems: "center",
  gap: "15px"
};

const scoreText = {
  fontSize: "16px",
  fontWeight: "600",
  color: "#007bff"
};

const resetBtn = {
  padding: "6px 12px",
  backgroundColor: "#6c757d",
  color: "#fff",
  border: "none",
  borderRadius: "4px",
  cursor: "pointer",
  fontSize: "13px"
};

// Add spinner animation
const style = document.createElement('style');
style.textContent = `
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;
document.head.appendChild(style);
