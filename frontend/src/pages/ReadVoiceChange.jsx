import { useState, useEffect } from "react";
import { fetchVoiceChange } from "../services/voiceChangeService";
import SessionNav from "../components/SessionNav";
import MobileSidebar from "../components/MobileSidebar";
import useMobile from "../hooks/useMobile";

export default function ReadVoiceChange({ config, onUpdateConfig, onGoHome }) {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const [score, setScore] = useState(0);
  const [answeredQuestions, setAnsweredQuestions] = useState([]);
  const { isMobile } = useMobile();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const loadQuestions = async () => {
      try {
        setLoading(true);
        const response = await fetchVoiceChange(0, 100); // Load all questions
        setQuestions(response.data);
        setCurrentQuestionIndex(null); // Start with no question selected
        setSelectedOption(null);
        setShowAnswer(false);
      } catch (error) {
        console.error("Error loading voice change questions:", error);
      } finally {
        setLoading(false);
      }
    };

    loadQuestions();
  }, []);

  const handleApplyRange = (start, limit) => {
    onUpdateConfig({ start, limit });
  };

  const handleOptionClick = (questionIndex, optionIndex) => {
    // Allow clicking on any question, but only if this specific question hasn't been answered
    const isThisQuestionAnswered = answeredQuestions.some(q => q.questionId === questions[questionIndex].id);
    if (isThisQuestionAnswered) return;
    
    console.log("Clicked question:", questionIndex, "option:", optionIndex);
    console.log("Question data:", questions[questionIndex]);
    console.log("Correct answer:", questions[questionIndex].correct);
    
    setCurrentQuestionIndex(questionIndex);
    setSelectedOption(optionIndex);
    setShowAnswer(true);
    
    const isCorrect = optionIndex === questions[questionIndex].correct;
    console.log("Is correct:", isCorrect);
    
    if (isCorrect) {
      setScore(score + 1);
    }
    
    setAnsweredQuestions([...answeredQuestions, {
      questionId: questions[questionIndex].id,
      selectedOption: optionIndex,
      isCorrect
    }]);
  };

  const handleReset = () => {
    setCurrentQuestionIndex(null);
    setSelectedOption(null);
    setShowAnswer(false);
    setScore(0);
    setAnsweredQuestions([]);
  };

  if (loading) {
    return (
      <div style={loadingContainer}>
        <div style={loadingContent}>
          <div style={spinner}></div>
          <p>Loading voice change questions...</p>
        </div>
      </div>
    );
  }

  return (
    <div style={mainContainer}>
      {/* MAIN CONTENT - Full Width */}
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
            <span style={mobileTitle}>Voice Change Practice</span>
            <button
              style={homeBtn}
              onClick={onGoHome}
            >
              🏠
            </button>
          </div>
        )}

        {/* Header with Navigation - Fixed Position */}
        <div style={headerFixed}>
          {/* SessionNav - Positioned Absolutely */}
          <div style={navContainer}>
            <SessionNav
              mode="read"
              config={config}
              onApplyRange={handleApplyRange}
              onGoHome={onGoHome}
              isMobile={isMobile}
              onMenuToggle={() => setMobileMenuOpen(true)}
            />
          </div>

          {/* Score Display - Moved to Header */}
          <div style={scoreContainer}>
            <span style={scoreText}>Score: {score}/{answeredQuestions.length}</span>
            <button style={resetBtn} onClick={handleReset}>Reset</button>
          </div>
        </div>

        {/* Questions List - Full Page Scroll */}
        <div style={questionsListContainer}>
          {questions.map((question, index) => {
            const isThisQuestionAnswered = answeredQuestions.some(q => q.questionId === question.id);
            const answeredData = answeredQuestions.find(q => q.questionId === question.id);
            
            return (
            <div key={question.id} style={questionItem}>
              {/* Question Header */}
              <div style={questionHeader}>
                <div style={questionNumber}>Q{index + 1}</div>
                <div style={questionType}>{question.type}</div>
              </div>
              
              {/* Question Sentence */}
              <div style={sentenceContainer}>
                <h3 style={sentenceText}>{question.sentence}</h3>
              </div>
              
              {/* Options Grid */}
              <div style={{
                display: "grid",
                gap: "12px",
                marginBottom: "15px",
                // Responsive grid: 1x4 on mobile, 2x2 on desktop
                gridTemplateColumns: isMobile ? "1fr" : "repeat(2, 1fr)",
                gridTemplateRows: isMobile ? "repeat(4, auto)" : "repeat(2, auto)"
              }}>
                {question.options.map((option, optionIndex) => (
                  <div
                    key={optionIndex}
                    style={{
                      ...optionCard,
                      backgroundColor: isThisQuestionAnswered && answeredData
                        ? optionIndex === question.correct
                          ? '#d4edda'
                          : answeredData.selectedOption === optionIndex
                          ? '#f8d7da'
                          : '#ffffff'
                        : '#ffffff',
                      borderColor: isThisQuestionAnswered && answeredData
                        ? optionIndex === question.correct
                          ? '#28a745'
                          : answeredData.selectedOption === optionIndex
                          ? '#dc3545'
                          : '#e9ecef'
                        : '#007bff',
                      cursor: !isThisQuestionAnswered ? 'pointer' : 'not-allowed'
                    }}
                    onClick={() => handleOptionClick(index, optionIndex)}
                  >
                    <div style={optionContent}>
                      <span style={optionLetter}>{String.fromCharCode(65 + optionIndex)}</span>
                      <span style={optionText}>{option}</span>
                    </div>
                    {isThisQuestionAnswered && answeredData && optionIndex === question.correct && (
                      <div style={resultIconCorrect}>✓</div>
                    )}
                    {isThisQuestionAnswered && answeredData && answeredData.selectedOption === optionIndex && optionIndex !== question.correct && (
                      <div style={resultIconWrong}>✗</div>
                    )}
                  </div>
                ))}
              </div>

              {/* Explanation Section */}
              {isThisQuestionAnswered && answeredData && (
                <div style={explanationContainer}>
                  <div style={explanationHeader}>
                    <span style={explanationIcon}>💡</span>
                    <span style={explanationTitle}>Explanation</span>
                  </div>
                  <p style={explanationText}>{question.explanation}</p>
                </div>
              )}
            </div>
          )})}
        </div>
      </div>
    </div>
  );
}

// Styles (same as ReadNarration)
const mainContainer = {
  display: "flex",
  flexDirection: "column",
  minHeight: "100vh",
  backgroundColor: "#f5f7fa"
};

const content = {
  flex: 1,
  padding: "20px",
  maxWidth: "900px",
  margin: "0 auto",
  width: "100%",
  position: "relative"
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

// Fixed Header Styles
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

const questionsListContainer = {
  backgroundColor: "transparent",
  borderRadius: "12px",
  padding: "20px",
  boxShadow: "none",
  marginTop: "90px", // Space for fixed header
  marginBottom: "20px"
};

const questionItem = {
  marginBottom: "25px",
  border: "1px solid #e9ecef",
  borderRadius: "10px",
  padding: "20px",
  backgroundColor: "#ffffff",
  transition: "all 0.3s ease",
  boxShadow: "0 1px 4px rgba(0,0,0,0.08)"
};

const questionHeader = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: "18px"
};

const questionNumber = {
  fontSize: "16px",
  fontWeight: "600",
  color: "#007bff",
  backgroundColor: "#e3f2fd",
  padding: "6px 12px",
  borderRadius: "20px"
};

const questionType = {
  fontSize: "12px",
  color: "#6c757d",
  backgroundColor: "#f8f9fa",
  padding: "6px 12px",
  borderRadius: "20px",
  border: "1px solid #dee2e6",
  fontWeight: "500"
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

const optionCard = {
  padding: "14px",
  border: "2px solid #007bff",
  borderRadius: "8px",
  backgroundColor: "#ffffff",
  cursor: "pointer",
  transition: "all 0.3s ease",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  minHeight: "60px",
  position: "relative",
  overflow: "hidden"
};

const optionContent = {
  display: "flex",
  alignItems: "center",
  gap: "12px",
  flex: 1
};

const optionLetter = {
  fontSize: "14px",
  fontWeight: "700",
  color: "#007bff",
  backgroundColor: "#e3f2fd",
  width: "32px",
  height: "32px",
  borderRadius: "50%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center"
};

const optionText = {
  fontSize: "14px",
  color: "#2c3e50",
  flex: 1,
  fontWeight: "500"
};

const resultIconCorrect = {
  position: "absolute",
  top: "8px",
  right: "8px",
  color: "#28a745",
  fontSize: "18px",
  fontWeight: "bold"
};

const resultIconWrong = {
  position: "absolute",
  top: "8px",
  right: "8px",
  color: "#dc3545",
  fontSize: "18px",
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

// Add spinner animation
const style = document.createElement('style');
style.textContent = `
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;
document.head.appendChild(style);
