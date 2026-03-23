import { useState, useEffect } from "react";
import { fetchIdiomExamQuestions, shuffleIdiomOptions } from "../services/idiomExamService";
import SessionNav from "../components/SessionNav";
import MobileSidebar from "../components/MobileSidebar";
import useMobile from "../hooks/useMobile";

export default function IdiomExam({ config, onUpdateConfig, onGoHome, onGoBackToSets }) {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const [score, setScore] = useState(0);
  const [answeredQuestions, setAnsweredQuestions] = useState([]);
  const { isMobile } = useMobile();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const currentSet = config.setNumber || 'Default';

  useEffect(() => {
    const loadQuestions = async () => {
      try {
        setLoading(true);
        const response = await fetchIdiomExamQuestions(config.start || 0, config.limit || 10);
        // Shuffle options for each question
        const shuffledQuestions = response.data.map(question => shuffleIdiomOptions(question));
        setQuestions(shuffledQuestions);
        setCurrentQuestionIndex(0);
        setSelectedOption(null);
        setShowAnswer(false);
      } catch (error) {
        console.error("Error loading idiom exam questions:", error);
      } finally {
        setLoading(false);
      }
    };

    loadQuestions();
  }, [config.start, config.limit]);

  const handleOptionClick = (optionIndex) => {
    if (showAnswer) return;
    
    setSelectedOption(optionIndex);
    setShowAnswer(true);
    
    const isCorrect = optionIndex === questions[currentQuestionIndex].correctAnswer;
    
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
          <p>Loading idiom exam...</p>
        </div>
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];
  const isThisQuestionAnswered = answeredQuestions.some(q => q.questionId === currentQuestion?.id);
  const answeredData = answeredQuestions.find(q => q.questionId === currentQuestion?.id);

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
            <span style={mobileTitle}>Idiom Exam - {currentSet}</span>
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
              mode="exam"
              config={config}
              onApplyRange={(start, limit) => onUpdateConfig({ start, limit })}
              onGoHome={onGoHome}
              isMobile={isMobile}
              onMenuToggle={() => setMobileMenuOpen(true)}
            />
          </div>

          {/* Score Display */}
          <div style={scoreContainer}>
            <span style={scoreText}>Score: {score}/{answeredQuestions.length}</span>
            <button style={resetBtn} onClick={handleReset}>Reset</button>
          </div>
        </div>

        {/* Main Content Area */}
        <div style={contentArea}>
          {/* Question Area */}
          <div style={questionArea}>
            {currentQuestion && (
              <>
                {/* Question Header */}
                <div style={questionHeader}>
                  <div style={questionNumber}>Q{currentQuestionIndex + 1}</div>
                  <div style={idiomText}>"{currentQuestion.idiom}"</div>
                </div>

                {/* Question */}
                <div style={questionText}>
                  <h3 style={questionTitle}>{currentQuestion.question}</h3>
                </div>

                {/* Options Grid */}
                <div style={optionsGrid}>
                  {currentQuestion.options.map((option, optionIndex) => (
                    <div
                      key={optionIndex}
                      style={{
                        ...optionCard,
                        backgroundColor: showAnswer
                          ? optionIndex === currentQuestion.correctAnswer
                            ? '#d4edda'
                            : selectedOption === optionIndex
                            ? '#f8d7da'
                            : '#ffffff'
                          : '#ffffff',
                        borderColor: showAnswer
                          ? optionIndex === currentQuestion.correctAnswer
                            ? '#28a745'
                            : selectedOption === optionIndex
                            ? '#dc3545'
                            : '#007bff'
                          : '#007bff',
                        cursor: showAnswer ? 'not-allowed' : 'pointer'
                      }}
                      onClick={() => handleOptionClick(optionIndex)}
                    >
                      <div style={optionContent}>
                        <span style={optionLetter}>{String.fromCharCode(65 + optionIndex)}</span>
                        <span style={optionText}>{option}</span>
                      </div>
                      {showAnswer && optionIndex === currentQuestion.correctAnswer && (
                        <div style={resultIconCorrect}>✓</div>
                      )}
                      {showAnswer && selectedOption === optionIndex && optionIndex !== currentQuestion.correctAnswer && (
                        <div style={resultIconWrong}>✗</div>
                      )}
                    </div>
                  ))}
                </div>

                {/* Explanation Section */}
                {showAnswer && (
                  <div style={explanationContainer}>
                    <div style={explanationHeader}>
                      <span style={explanationIcon}>💡</span>
                      <span style={explanationTitle}>Explanation</span>
                    </div>
                    <p style={explanationText}>
                      <strong>Meaning:</strong> {currentQuestion.meaning}
                    </p>
                    <p style={explanationText}>
                      <strong>Explanation:</strong> {currentQuestion.explanation}
                    </p>
                  </div>
                )}

                {/* Navigation Buttons */}
                <div style={navigationButtons}>
                  <button
                    style={navButton}
                    onClick={handlePreviousQuestion}
                    disabled={currentQuestionIndex === 0}
                  >
                    Previous
                  </button>
                  <button
                    style={navButton}
                    onClick={handleNextQuestion}
                    disabled={currentQuestionIndex === questions.length - 1}
                  >
                    Next
                  </button>
                </div>
              </>
            )}
          </div>

          {/* Question Palette - Right Side */}
          <div style={questionPalette}>
            <button style={backToSetsBtn} onClick={handleBackToSets}>
              ← Back to Sets
            </button>
            <div style={paletteGrid}>
              {questions.map((question, index) => {
                const isAnswered = answeredQuestions.some(q => q.questionId === question.id);
                const isCorrect = answeredQuestions.find(q => q.questionId === question.id)?.isCorrect;
                
                return (
                  <button
                    key={question.id}
                    style={{
                      ...paletteButton,
                      backgroundColor: isAnswered
                        ? isCorrect
                          ? '#28a745'
                          : '#dc3545'
                        : currentQuestionIndex === index
                        ? '#007bff'
                        : '#6c757d',
                      color: isAnswered || currentQuestionIndex === index ? '#ffffff' : '#ffffff'
                    }}
                    onClick={() => handleQuestionSelect(index)}
                  >
                    {index + 1}
                  </button>
                );
              })}
            </div>
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
  maxWidth: "1200px",
  margin: "0 auto",
  width: "100%",
  position: "relative"
};

const questionPalette = {
  position: "sticky",
  top: "90px",
  width: "250px",
  padding: "20px",
  backgroundColor: "#ffffff",
  borderRadius: "12px",
  boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
  border: "1px solid #e9ecef",
  height: "fit-content",
  alignSelf: "flex-start"
};

const backToSetsBtn = {
  width: "100%",
  padding: "10px",
  backgroundColor: "#6c757d",
  color: "#ffffff",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer",
  fontSize: "14px",
  fontWeight: "500",
  marginBottom: "15px"
};

const paletteGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(5, 1fr)",
  gap: "8px",
  marginBottom: "15px"
};

const paletteButton = {
  width: "40px",
  height: "40px",
  border: "none",
  borderRadius: "8px",
  backgroundColor: "#6c757d",
  color: "#ffffff",
  fontSize: "14px",
  fontWeight: "600",
  cursor: "pointer",
  transition: "all 0.3s ease"
};

const contentArea = {
  display: "flex",
  flexDirection: "row",
  gap: "20px",
  marginTop: "90px"
};

const questionArea = {
  flex: 1,
  padding: "30px",
  backgroundColor: "#ffffff",
  borderRadius: "12px",
  boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
  border: "1px solid #e9ecef"
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

const questionHeader = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: "20px"
};

const questionNumber = {
  fontSize: "18px",
  fontWeight: "600",
  color: "#007bff",
  backgroundColor: "#e3f2fd",
  padding: "8px 16px",
  borderRadius: "20px"
};

const idiomText = {
  fontSize: "20px",
  fontWeight: "600",
  color: "#28a745",
  fontStyle: "italic",
  backgroundColor: "#e8f5e8",
  padding: "8px 16px",
  borderRadius: "20px",
  border: "1px solid #d4edda"
};

const questionText = {
  fontSize: "18px",
  color: "#2c3e50",
  fontWeight: "600",
  margin: "0 0 20px 0",
  lineHeight: "1.4"
};

const questionTitle = {
  fontSize: "20px",
  margin: "0",
  color: "#2c3e50"
};

const optionsGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(2, 1fr)",
  gap: "15px",
  marginBottom: "20px"
};

const optionCard = {
  padding: "20px",
  border: "2px solid #007bff",
  borderRadius: "12px",
  backgroundColor: "#ffffff",
  cursor: "pointer",
  transition: "all 0.3s ease",
  display: "flex",
  alignItems: "center",
  minHeight: "70px"
};

const optionContent = {
  display: "flex",
  alignItems: "center",
  gap: "12px",
  flex: 1
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
  fontWeight: "500"
};

const resultIconCorrect = {
  color: "#28a745",
  fontSize: "20px",
  fontWeight: "bold"
};

const resultIconWrong = {
  color: "#dc3545",
  fontSize: "20px",
  fontWeight: "bold"
};

const explanationContainer = {
  backgroundColor: "#e8f5e8",
  borderRadius: "12px",
  padding: "20px",
  border: "1px solid #d4edda",
  marginBottom: "20px"
};

const explanationHeader = {
  display: "flex",
  alignItems: "center",
  gap: "8px",
  marginBottom: "12px"
};

const explanationIcon = {
  fontSize: "18px"
};

const explanationTitle = {
  margin: "0",
  fontSize: "18px",
  color: "#155724",
  fontWeight: "600"
};

const explanationText = {
  fontSize: "16px",
  lineHeight: "1.5",
  color: "#2c3e50",
  margin: "0 0 10px 0"
};

const navigationButtons = {
  display: "flex",
  justifyContent: "space-between",
  gap: "15px",
  marginTop: "20px"
};

const navButton = {
  padding: "12px 24px",
  backgroundColor: "#007bff",
  color: "#ffffff",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer",
  fontSize: "16px",
  fontWeight: "500",
  transition: "all 0.3s ease",
  opacity: 1
};

const loadingContainer = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "100vh",
  backgroundColor: "#f5f7fa"
};

const loadingContent = {
  textAlign: "center"
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

// Add spinner animation
const style = document.createElement('style');
style.textContent = `
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;
document.head.appendChild(style);
