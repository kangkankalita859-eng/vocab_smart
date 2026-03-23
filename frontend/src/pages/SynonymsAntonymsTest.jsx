import { useState, useEffect, useRef } from "react";
import SessionNav from "../components/SessionNav";
import MobileSidebar from "../components/MobileSidebar";
import { synonymsAntonymsService } from "../services/synonymsAntonymsService";
import useMobile from "../hooks/useMobile";

export default function SynonymsAntonymsTest({
  config,
  onGoHome,
}) {
  const { isMobile } = useMobile();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [markedQuestions, setMarkedQuestions] = useState(new Set());
  const [timeLeft, setTimeLeft] = useState(15 * 60); // 15 minutes in seconds
  const [testStarted, setTestStarted] = useState(false);
  const [testSubmitted, setTestSubmitted] = useState(false);
  const [showReview, setShowReview] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const timerRef = useRef(null);

  console.log('SynonymsAntonymsTest component mounted');

  // Load questions
  useEffect(() => {
    const loadQuestions = async () => {
      try {
        console.log('Loading questions...');
        const data = await synonymsAntonymsService.getSynonymsAntonyms(0, 15);
        console.log('Data received:', data);
        if (data.status === 'success') {
          // Convert to MCQ format
          const mcqQuestions = data.data.map(item => ({
            id: item.id,
            question: `What is the synonym of "${item.word}"?`,
            options: [
              ...item.synonyms.map(syn => syn.word),
              ...item.antonyms.map(ant => ant.word)
            ].sort(() => Math.random() - 0.5),
            correctAnswer: item.synonyms[0].word,
            word: item.word,
            hindiMeaning: item.hindiMeaning
          }));
          console.log('MCQ questions created:', mcqQuestions);
          setQuestions(mcqQuestions);
          setLoading(false);
        } else {
          console.error('Data status not success:', data);
          setError('Failed to load questions');
          setLoading(false);
        }
      } catch (error) {
        console.error('Error loading questions:', error);
        setError('Error loading questions');
        setLoading(false);
      }
    };
    loadQuestions();
  }, []);

  // Timer effect
  useEffect(() => {
    if (testStarted && !testSubmitted && timeLeft > 0) {
      timerRef.current = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
    } else if (timeLeft === 0 && !testSubmitted) {
      handleSubmitTest();
    }

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [timeLeft, testStarted, testSubmitted]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleAnswerSelect = (questionId, selectedOption) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: selectedOption
    }));
  };

  const handleMarkQuestion = (questionId) => {
    setMarkedQuestions(prev => {
      const newSet = new Set(prev);
      if (newSet.has(questionId)) {
        newSet.delete(questionId);
      } else {
        newSet.add(questionId);
      }
      return newSet;
    });
  };

  const handleQuestionSelect = (index) => {
    setCurrentQuestion(index);
  };

  const handleStartTest = () => {
    setTestStarted(true);
  };

  const handleSubmitTest = () => {
    setTestSubmitted(true);
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
  };

  const getQuestionStatus = (index) => {
    const question = questions[index];
    if (!question) return 'not-visited';
    
    const hasAnswer = answers[question.id];
    const isMarked = markedQuestions.has(question.id);
    
    if (hasAnswer && isMarked) return 'marked-answered';
    if (hasAnswer) return 'answered';
    if (isMarked) return 'marked';
    if (question.id === questions[currentQuestion]?.id) return 'present';
    return 'not-answered';
  };

  const getQuestionStatusColor = (status) => {
    switch (status) {
      case 'answered': return '#4caf50';
      case 'not-answered': return '#f44336';
      case 'marked': return '#9c27b0';
      case 'marked-answered': return '#2196f3';
      case 'not-visited': return '#ffffff';
      case 'present': return '#1565c0';
      default: return '#ffffff';
    }
  };

  if (loading) {
    return (
      <div style={{ textAlign: "center", padding: "40px" }}>
        <h2>Loading questions...</h2>
        <p>Please wait while we prepare your test.</p>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ textAlign: "center", padding: "40px" }}>
        <h2>Error loading test</h2>
        <p>{error}</p>
        <button 
          style={{
            background: "#f44336",
            color: "white",
            border: "none",
            padding: "12px 24px",
            fontSize: "16px",
            borderRadius: "6px",
            cursor: "pointer",
            marginTop: "20px"
          }}
          onClick={() => window.location.reload()}
        >
          Retry
        </button>
      </div>
    );
  }

  if (!testStarted) {
    return (
      <div style={{ textAlign: "center", padding: "40px" }}>
        <h2>Ready to start the test?</h2>
        <p>15 Questions • 15 Minutes • 30 Marks</p>
        <button 
          style={{
            background: "#4caf50",
            color: "white",
            border: "none",
            padding: "16px 32px",
            fontSize: "18px",
            borderRadius: "8px",
            cursor: "pointer",
            marginTop: "20px"
          }}
          onClick={handleStartTest}
        >
          Start Test
        </button>
      </div>
    );
  }

  if (testSubmitted) {
    const correctAnswers = questions.filter(q => answers[q.id] === q.correctAnswer).length;
    const totalMarks = correctAnswers * 2; // 2 marks per question
    const wrongAnswers = questions.filter(q => answers[q.id] && answers[q.id] !== q.correctAnswer);
    const notAttempted = questions.filter(q => !answers[q.id]);
    
    return (
      <div style={resultsContainer}>
        <SessionNav
          mode="Results"
          config={config}
          onApplyRange={() => {}}
          onGoRead={() => {}}
          onGoCards={() => {}}
          onGoHome={onGoHome}
          isMobile={isMobile}
          onMenuToggle={() => setMobileMenuOpen(true)}
        />
        
        <div style={resultsContent}>
          <h2 style={resultsTitle}>Test Results</h2>
          
          {/* Score Summary */}
          <div style={scoreSummary}>
            <div style={scoreCard}>
              <h3 style={scoreTitle}>Your Score</h3>
              <div style={scoreNumber}>{correctAnswers * 2}/30</div>
              <div style={scorePercentage}>
                {Math.round((correctAnswers / questions.length) * 100)}%
              </div>
            </div>
            
            <div style={statsGrid}>
              <div style={statItem}>
                <div style={statNumber}>{correctAnswers}</div>
                <div style={statLabel}>Correct</div>
              </div>
              <div style={statItem}>
                <div style={statNumber}>{wrongAnswers.length}</div>
                <div style={statLabel}>Wrong</div>
              </div>
              <div style={statItem}>
                <div style={statNumber}>{notAttempted.length}</div>
                <div style={statLabel}>Not Attempted</div>
              </div>
              <div style={statItem}>
                <div style={statNumber}>{questions.length}</div>
                <div style={statLabel}>Total Questions</div>
              </div>
            </div>
          </div>

          {/* Review Button */}
          <div style={reviewButtonContainer}>
            <button 
              style={reviewButton}
              onClick={() => setShowReview(true)}
            >
              📋 Review Answers
            </button>
          </div>

          {/* Detailed Review Section */}
          <div style={{ background: "#f8f9fa", padding: "20px", borderRadius: "8px" }}>
            {showReview && (
              <div>
                <h3 style={{ fontSize: "20px", color: "#2c3e50", marginBottom: "16px" }}>Detailed Review</h3>
                <div style={{ fontSize: "14px", color: "#6c757d", marginBottom: "24px" }}>
                  Review your answers and see the correct options with explanations
                </div>
                
                {questions.map((q, index) => {
                  const userAnswer = answers[q.id];
                  const isCorrect = userAnswer === q.correctAnswer;
                  const isWrong = userAnswer && userAnswer !== q.correctAnswer;
                  const isNotAttempted = !userAnswer;
                  
                  return (
                    <div key={index} style={{ 
                      background: "#fff", 
                      padding: "20px", 
                      marginBottom: "16px", 
                      borderRadius: "8px",
                      border: "1px solid #dee2e6" 
                    }}>
                      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "12px" }}>
                        <span style={{ fontSize: "16px", fontWeight: "600" }}>Question {index + 1}</span>
                        <span style={{ 
                          fontSize: "12px", 
                          fontWeight: "600", 
                          padding: "4px 8px", 
                          borderRadius: "4px",
                          backgroundColor: isCorrect ? "#d4edda" : isWrong ? "#f8d7da" : "#fff3cd",
                          color: isCorrect ? "#155724" : isWrong ? "#721c24" : "#856404"
                        }}>
                          {isCorrect ? '✓ Correct' : isWrong ? '✗ Wrong' : 'Not Attempted'}
                        </span>
                      </div>
                      
                      <div style={{ fontSize: "16px", marginBottom: "12px" }}>{q.question}</div>
                      
                      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "16px" }}>
                        <div>
                          <div style={{ fontSize: "14px", fontWeight: "600", color: "#6c757d", marginBottom: "4px" }}>Your Answer:</div>
                          <div style={{ 
                            fontSize: "16px", 
                            padding: "8px", 
                            borderRadius: "4px",
                            backgroundColor: isCorrect ? "#d4edda" : isWrong ? "#f8d7da" : "#fff3cd",
                            border: "1px solid #dee2e6"
                          }}>
                            {userAnswer || 'Not Attempted'}
                          </div>
                        </div>
                        
                        <div>
                          <div style={{ fontSize: "14px", fontWeight: "600", color: "#6c757d", marginBottom: "4px" }}>Correct Answer:</div>
                          <div style={{ 
                            fontSize: "16px", 
                            padding: "8px", 
                            borderRadius: "4px",
                            backgroundColor: "#d4edda",
                            border: "1px solid #c3e6cb",
                            color: "#155724"
                          }}>
                            {q.correctAnswer}
                          </div>
                        </div>
                      </div>

                      <div style={{ background: "#e9ecef", padding: "12px", borderRadius: "6px", marginBottom: "12px" }}>
                        <div style={{ fontSize: "14px", fontWeight: "600", color: "#6c757d", marginBottom: "8px" }}>
                          <strong>Word:</strong> {q.word}
                        </div>
                        <div style={{ fontSize: "14px", color: "#495057" }}>
                          <strong>Hindi Meaning:</strong> {q.hindiMeaning}
                        </div>
                      </div>

                      <div style={{ marginBottom: "12px" }}>
                        <div style={{ fontSize: "14px", fontWeight: "600", color: "#6c757d", marginBottom: "8px" }}>All Options:</div>
                        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "8px" }}>
                          {q.options.map((option, optIndex) => (
                            <div 
                              key={optIndex}
                              style={{
                                padding: "8px 12px",
                                borderRadius: "4px",
                                border: "1px solid #dee2e6",
                                fontSize: "14px",
                                backgroundColor: option === q.correctAnswer ? "#d4edda" : 
                                               option === userAnswer && !isCorrect ? "#f8d7da" : 
                                               "#fff",
                                color: option === q.correctAnswer ? "#155724" : 
                                       option === userAnswer && !isCorrect ? "#721c24" : 
                                       "#495057",
                                fontWeight: option === q.correctAnswer ? "600" : "400"
                              }}
                            >
                              {option}
                              {option === q.correctAnswer && (
                                <span style={{ color: "#28a745", fontWeight: "700", marginLeft: "4px" }}> ✓</span>
                              )}
                              {option === userAnswer && !isCorrect && (
                                <span style={{ color: "#dc3545", fontWeight: "700", marginLeft: "4px" }}> ✗</span>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  const currentQ = questions[currentQuestion];

  return (
    <>
      {/* NAV BAR */}
      <SessionNav
        mode="Test"
        config={config}
        onApplyRange={() => {}}
        onGoRead={() => {}}
        onGoCards={() => {}}
        onGoHome={onGoHome}
        isMobile={isMobile}
        onMenuToggle={() => setMobileMenuOpen(true)}
      />

      <div style={page}>
        {/* Question Palette */}
        <div style={questionPalette}>
          <h3 style={paletteTitle}>Question Palette</h3>
          <div style={paletteGrid}>
            {questions.map((q, index) => {
              const status = getQuestionStatus(index);
              return (
                <button
                  key={index}
                  style={{
                    ...paletteButton,
                    backgroundColor: getQuestionStatusColor(status),
                    border: status === 'present' ? '2px solid #1565c0' : '1px solid #ccc'
                  }}
                  onClick={() => handleQuestionSelect(index)}
                >
                  {index + 1}
                </button>
              );
            })}
          </div>
        </div>

        {/* Main Content */}
        <div style={mainContent}>
          {/* Timer */}
          <div style={timer}>
            ⏱️ {formatTime(timeLeft)}
          </div>

          {/* Question */}
          <div style={questionContainer}>
            <div style={questionHeader}>
              <span style={questionNumber}>Question {currentQuestion + 1}</span>
              <button
                style={markButton}
                onClick={() => handleMarkQuestion(currentQ.id)}
              >
                {markedQuestions.has(currentQ.id) ? '📌 Unmark' : '📍 Mark'}
              </button>
            </div>
            
            <div style={questionText}>
              {currentQ.question}
            </div>

            {/* Options */}
            <div style={optionsContainer}>
              {currentQ.options.map((option, index) => (
                <label
                  key={index}
                  style={{
                    ...optionLabel,
                    backgroundColor: answers[currentQ.id] === option ? '#e3f2fd' : '#f8f9fa',
                    borderColor: answers[currentQ.id] === option ? '#2196f3' : '#dee2e6'
                  }}
                >
                  <input
                    type="radio"
                    name={`question-${currentQ.id}`}
                    value={option}
                    checked={answers[currentQ.id] === option}
                    onChange={() => handleAnswerSelect(currentQ.id, option)}
                    style={{ marginRight: '8px' }}
                  />
                  {option}
                </label>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div style={navigation}>
            <button
              style={navButton}
              onClick={() => setCurrentQuestion(Math.max(0, currentQuestion - 1))}
              disabled={currentQuestion === 0}
            >
              ← Previous
            </button>
            
            <button
              style={{ ...navButton, background: "#4caf50" }}
              onClick={handleSubmitTest}
            >
              Submit Test
            </button>
            
            <button
              style={navButton}
              onClick={() => setCurrentQuestion(Math.min(questions.length - 1, currentQuestion + 1))}
              disabled={currentQuestion === questions.length - 1}
            >
              Next →
            </button>
          </div>
        </div>
      </div>

      {/* Mobile sidebar */}
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

/* ---------------- STYLES ---------------- */

const page = {
  display: "flex",
  minHeight: "calc(100vh - 60px)",
  paddingTop: "80px",
};

const questionPalette = {
  width: "200px",
  background: "#fff",
  padding: "20px",
  borderRight: "1px solid #e0e0e0",
  overflowY: "auto",
};

const paletteTitle = {
  fontSize: "16px",
  fontWeight: "600",
  marginBottom: "16px",
  color: "#2c3e50",
};

const paletteGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(4, 1fr)",
  gap: "8px",
};

const paletteButton = {
  width: "36px",
  height: "36px",
  border: "1px solid #ccc",
  borderRadius: "4px",
  cursor: "pointer",
  fontSize: "12px",
  fontWeight: "500",
};

const mainContent = {
  flex: 1,
  padding: "20px",
  background: "#f8f9fa",
};

const timer = {
  position: "fixed",
  top: "80px",
  right: "20px",
  background: "#fff",
  padding: "8px 16px",
  borderRadius: "6px",
  border: "1px solid #ddd",
  fontSize: "16px",
  fontWeight: "600",
  boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
  zIndex: 100,
};

const questionContainer = {
  background: "#fff",
  padding: "24px",
  borderRadius: "8px",
  boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
  marginBottom: "20px",
};

const questionHeader = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: "16px",
  paddingBottom: "12px",
  borderBottom: "1px solid #eee",
};

const questionNumber = {
  fontSize: "18px",
  fontWeight: "600",
  color: "#2c3e50",
};

const markButton = {
  background: "#ff9800",
  color: "white",
  border: "none",
  padding: "6px 12px",
  borderRadius: "4px",
  cursor: "pointer",
  fontSize: "12px",
};

const questionText = {
  fontSize: "18px",
  lineHeight: "1.6",
  marginBottom: "24px",
  color: "#2c3e50",
};

const optionsContainer = {
  display: "flex",
  flexDirection: "column",
  gap: "12px",
};

const optionLabel = {
  display: "flex",
  alignItems: "center",
  padding: "12px",
  border: "1px solid #dee2e6",
  borderRadius: "6px",
  cursor: "pointer",
  fontSize: "16px",
  transition: "all 0.2s ease",
};

const navigation = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginTop: "24px",
  gap: "12px",
};

const navButton = {
  padding: "10px 20px",
  border: "1px solid #ccc",
  borderRadius: "6px",
  cursor: "pointer",
  fontSize: "14px",
  fontWeight: "500",
};

/* ---------------- RESULTS STYLES ---------------- */

const resultsContainer = {
  minHeight: "calc(100vh - 60px)",
  background: "#f8f9fa",
  paddingTop: "80px",
};

const resultsContent = {
  maxWidth: "900px",
  margin: "0 auto",
  padding: "20px",
};

const resultsTitle = {
  fontSize: "32px",
  fontWeight: "700",
  color: "#2c3e50",
  textAlign: "center",
  marginBottom: "32px",
};

const scoreSummary = {
  background: "#fff",
  padding: "32px",
  borderRadius: "12px",
  boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
  marginBottom: "32px",
  textAlign: "center",
};

const scoreCard = {
  marginBottom: "24px",
};

const scoreTitle = {
  fontSize: "18px",
  color: "#6c757d",
  marginBottom: "8px",
};

const scoreNumber = {
  fontSize: "48px",
  fontWeight: "700",
  color: "#1976d2",
  marginBottom: "8px",
};

const scorePercentage = {
  fontSize: "24px",
  fontWeight: "600",
  color: "#28a745",
};

const statsGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(4, 1fr)",
  gap: "16px",
  textAlign: "center",
};

const statItem = {
  background: "#f8f9fa",
  padding: "16px",
  borderRadius: "8px",
  border: "1px solid #dee2e6",
};

const statNumber = {
  fontSize: "24px",
  fontWeight: "700",
  color: "#2c3e50",
  marginBottom: "4px",
};

const statLabel = {
  fontSize: "14px",
  color: "#6c757d",
};

const reviewButtonContainer = {
  textAlign: "center",
  marginBottom: "32px",
};

const reviewButton = {
  background: "#007bff",
  color: "white",
  border: "none",
  padding: "16px 32px",
  fontSize: "18px",
  fontWeight: "600",
  borderRadius: "8px",
  cursor: "pointer",
  boxShadow: "0 4px 12px rgba(0, 123, 255, 0.3)",
  transition: "all 0.2s ease",
};

/* ---------------- REVIEW STYLES ---------------- */

const reviewContainer = {
  background: "#fff",
  padding: "32px",
  borderRadius: "12px",
  boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
};

const reviewTitle = {
  fontSize: "24px",
  fontWeight: "600",
  color: "#2c3e50",
  marginBottom: "16px",
  marginTop: 0,
};

const reviewSubtitle = {
  fontSize: "16px",
  color: "#6c757d",
  marginBottom: "24px",
  paddingBottom: "16px",
  borderBottom: "1px solid #e9ecef",
};

const questionReviewCard = {
  background: "#f8f9fa",
  padding: "24px",
  borderRadius: "8px",
  marginBottom: "20px",
  border: "1px solid #dee2e6",
};

const reviewQuestionHeader = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: "16px",
  paddingBottom: "12px",
  borderBottom: "1px solid #dee2e6",
};

const questionStatus = {
  fontSize: "14px",
  fontWeight: "600",
  padding: "4px 8px",
  borderRadius: "4px",
};

const correctStatus = {
  backgroundColor: "#d4edda",
  color: "#155724",
};

const wrongStatus = {
  backgroundColor: "#f8d7da",
  color: "#721c24",
};

const notAttemptedStatus = {
  backgroundColor: "#fff3cd",
  color: "#856404",
};

const answerSection = {
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: "24px",
  marginBottom: "20px",
};

const answerBlock = {
  background: "#fff",
  padding: "16px",
  borderRadius: "6px",
  border: "1px solid #dee2e6",
};

const answerLabel = {
  fontSize: "14px",
  fontWeight: "600",
  color: "#6c757d",
  marginBottom: "8px",
};

const answerText = {
  fontSize: "16px",
  padding: "8px",
  borderRadius: "4px",
  border: "1px solid #dee2e6",
};

const correctAnswerStyle = {
  backgroundColor: "#d4edda",
  borderColor: "#c3e6cb",
  color: "#155724",
};

const wrongAnswerStyle = {
  backgroundColor: "#f8d7da",
  borderColor: "#f5c6cb",
  color: "#721c24",
};

const notAttemptedStyle = {
  backgroundColor: "#fff3cd",
  borderColor: "#ffeaa7",
  color: "#856404",
};

const wordInfo = {
  background: "#e9ecef",
  padding: "16px",
  borderRadius: "6px",
  marginBottom: "20px",
};

const wordDetail = {
  fontSize: "14px",
  marginBottom: "4px",
  color: "#495057",
};

const optionsReview = {
  marginBottom: "16px",
};

const optionsReviewLabel = {
  fontSize: "14px",
  fontWeight: "600",
  color: "#6c757d",
  marginBottom: "8px",
};

const optionsGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(3, 1fr)",
  gap: "8px",
};

const optionReviewItem = {
  padding: "8px 12px",
  borderRadius: "4px",
  border: "1px solid #dee2e6",
  fontSize: "14px",
  position: "relative",
};

const correctOptionStyle = {
  backgroundColor: "#d4edda",
  borderColor: "#c3e6cb",
  color: "#155724",
  fontWeight: "600",
};

const wrongOptionStyle = {
  backgroundColor: "#f8d7da",
  borderColor: "#f5c6cb",
  color: "#721c24",
};

const normalOptionStyle = {
  backgroundColor: "#fff",
  borderColor: "#dee2e6",
  color: "#495057",
};

const correctIndicator = {
  color: "#28a745",
  fontWeight: "700",
  marginLeft: "4px",
};

const wrongIndicator = {
  color: "#dc3545",
  fontWeight: "700",
  marginLeft: "4px",
};
