import { useState, useEffect } from "react";
import SessionNav from "../components/SessionNav";
import MobileSidebar from "../components/MobileSidebar";
import useMobile from "../hooks/useMobile";

export default function GeometryUpload({ config, onUpdateConfig, onGoHome }) {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const [score, setScore] = useState(0);
  const [answeredQuestions, setAnsweredQuestions] = useState([]);
  const [uploadedImages, setUploadedImages] = useState([]);
  const { isMobile } = useMobile();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const loadQuestions = async () => {
      try {
        setLoading(true);
        const response = await fetchGeometryQuestions(config.start || 0, config.limit || 100);
        setQuestions(response.data);
        setCurrentQuestionIndex(0);
        setSelectedOption(null);
        setShowAnswer(false);
      } catch (error) {
        console.error("Error loading geometry questions:", error);
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

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const imageData = e.target.result;
        const imageId = `custom_${Date.now()}`;
        
        // Save to uploadedImages state
        setUploadedImages([...uploadedImages, {
          id: imageId,
          data: imageData,
          name: file.name,
          url: URL.createObjectURL(imageData)
        }]);
        
        // Update the current question to use this image
        if (currentQuestionIndex < questions.length) {
          const updatedQuestions = [...questions];
          updatedQuestions[currentQuestionIndex] = {
            ...updatedQuestions[currentQuestionIndex],
            question_image: imageId
          };
          setQuestions(updatedQuestions);
        }
      };
    };
    reader.readAsDataURL(file);
  };

  const handleDeleteImage = (imageId) => {
    setUploadedImages(uploadedImages.filter(img => img.id !== imageId));
    
    // Remove image reference from current question if deleted
    if (currentQuestionIndex < questions.length) {
      const currentQuestion = questions[currentQuestionIndex];
      if (currentQuestion.question_image === imageId) {
        const updatedQuestions = [...questions];
        updatedQuestions[currentQuestionIndex] = {
          ...updatedQuestions[currentQuestionIndex],
          question_image: null
        };
        setQuestions(updatedQuestions);
      }
    }
  };

  if (loading) {
    return (
      <div style={loadingContainer}>
        <div style={loadingContent}>
          <div style={spinner}></div>
          <p>Loading geometry questions...</p>
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
            <span style={mobileTitle}>Geometry Practice</span>
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

          {/* Image Upload Controls */}
          <div style={scoreContainer}>
            <span style={scoreText}>Score: {score}/{answeredQuestions.length}</span>
            <button style={resetBtn} onClick={handleReset}>Reset</button>
            <label style={uploadBtn}>
              📷 Upload Image
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                style={{ display: 'none' }}
              />
            </label>
          </div>
        </div>

        {/* Main Content Area */}
        <div style={contentArea}>
          <div style={questionsContainer}>
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
                  
                  {/* Question Text */}
                  <div style={questionText}>
                    <h3 style={questionTitle}>{question.question}</h3>
                  </div>

                  {/* Question Image Display */}
                  {(question.question_image || uploadedImages.find(img => img.id === question.question_image)) && (
                    <div style={imageContainer}>
                      {question.question_image && (
                        <img 
                          src={`/data/maths/geometry/${question.question_image}`}
                          alt="Question diagram"
                          style={questionImage}
                        />
                      )}
                      {uploadedImages.find(img => img.id === question.question_image) && (
                        <div style={uploadedImageContainer}>
                          <img 
                            src={img.url}
                            alt="Uploaded diagram"
                            style={uploadedImage}
                          />
                          <button
                            style={deleteImageBtn}
                            onClick={() => handleDeleteImage(img.id)}
                          >
                            ❌
                          </button>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Options Grid */}
                  <div style={optionsGrid}>
                    {question.options.map((option, optionIndex) => (
                      <div
                        key={optionIndex}
                        style={{
                          ...optionCard,
                          backgroundColor: isThisQuestionAnswered && answeredData
                            ? optionIndex === question.correctAnswer
                              ? '#d4edda'
                              : answeredData.selectedOption === optionIndex
                              ? '#f8d7da'
                              : '#ffffff'
                            : '#ffffff',
                          borderColor: isThisQuestionAnswered && answeredData
                            ? optionIndex === question.correctAnswer
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
                        {isThisQuestionAnswered && answeredData && optionIndex === question.correctAnswer && (
                          <div style={resultIconCorrect}>✓</div>
                        )}
                        {isThisQuestionAnswered && answeredData && answeredData.selectedOption === optionIndex && optionIndex !== question.correctAnswer && (
                          <div style={resultIconWrong}>✗</div>
                        )}
                      </div>
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
                    
                    {/* Solution Image */}
                    {question.solution_image && (
                      <div style={imageContainer}>
                        <img 
                          src={`/data/maths/geometry/${question.solution_image}`}
                          alt="Solution diagram"
                          style={solutionImage}
                        />
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
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

const contentArea = {
  flex: 1,
  marginTop: "90px"
};

const questionsContainer = {
  backgroundColor: "#ffffff",
  border: "1px solid #e9ecef",
  borderRadius: "12px",
  padding: "20px",
  boxShadow: "0 2px 8px rgba(0,0,0,0.08)"
};

const questionItem = {
  backgroundColor: "#ffffff",
  border: "1px solid #e9ecef",
  borderRadius: "12px",
  padding: "20px",
  marginBottom: "20px",
  boxShadow: "0 2px 8px rgba(0,0,0,0.08)"
};

const questionHeader = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: "15px"
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
  border: "1px solid #dee2e6"
};

const questionText = {
  fontSize: "18px",
  color: "#2c3e50",
  fontWeight: "600",
  margin: "0 0 15px 0",
  lineHeight: "1.4"
};

const questionTitle = {
  fontSize: "20px",
  margin: "0",
  color: "#2c3e50"
};

const imageContainer = {
  textAlign: "center",
  margin: "20px 0",
  padding: "15px",
  backgroundColor: "#f8f9fa",
  borderRadius: "8px",
  border: "1px solid #e9ecef"
};

const questionImage = {
  maxWidth: "100%",
  maxHeight: "300px",
  borderRadius: "8px",
  boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
};

const uploadedImageContainer = {
  position: "relative",
  display: "inline-block",
  marginLeft: "10px"
};

const uploadedImage = {
  maxWidth: "200px",
  maxHeight: "200px",
  borderRadius: "8px",
  boxShadow: "0 2px 8px rgba(0,0,0,0.2)"
};

const deleteImageBtn = {
  position: "absolute",
  top: "5px",
  right: "5px",
  background: "#dc3545",
  color: "#ffffff",
  border: "none",
  borderRadius: "4px",
  width: "24px",
  height: "24px",
  cursor: "pointer",
  fontSize: "12px"
};

const optionsGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(2, 1fr)",
  gap: "15px",
  marginBottom: "15px"
};

const optionCard = {
  padding: "15px",
  border: "2px solid #007bff",
  borderRadius: "8px",
  backgroundColor: "#ffffff",
  cursor: "pointer",
  transition: "all 0.3s ease",
  display: "flex",
  alignItems: "center",
  minHeight: "60px"
};

const optionContent = {
  display: "flex",
  alignItems: "center",
  gap: "10px",
  flex: 1
};

const optionLetter = {
  fontSize: "16px",
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
  fontSize: "16px",
  color: "#2c3e50",
  flex: 1,
  fontWeight: "500"
};

const resultIconCorrect = {
  color: "#28a745",
  fontSize: "18px",
  fontWeight: "bold"
};

const resultIconWrong = {
  color: "#dc3545",
  fontSize: "18px",
  fontWeight: "bold"
};

const explanationContainer = {
  backgroundColor: "#e8f5e8",
  borderRadius: "8px",
  padding: "18px",
  border: "1px solid #d4edda",
  marginBottom: "15px"
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

const solutionImage = {
  maxWidth: "100%",
  maxHeight: "300px",
  borderRadius: "8px",
  boxShadow: "0 2px 8px rgba(0,100,0,0.1)"
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

const uploadBtn = {
  display: "flex",
  alignItems: "center",
  gap: "8px",
  padding: "8px 16px",
  backgroundColor: "#007bff",
  color: "#ffffff",
  border: "2px solid #007bff",
  borderRadius: "8px",
  cursor: "pointer",
  fontSize: "14px",
  fontWeight: "500"
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
