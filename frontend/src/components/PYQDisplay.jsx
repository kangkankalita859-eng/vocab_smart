import React, { useState, useEffect } from 'react';
import { fetchPYQ } from '../services/pyqService';

function PYQDisplay({ subject, topic, onBack }) {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadQuestions = async () => {
      try {
        setLoading(true);
        const response = await fetchPYQ(subject, topic);
        if (response.status === 'success') {
          setQuestions(response.data);
        } else {
          setError(response.message);
        }
      } catch (err) {
        setError('Failed to load questions. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    loadQuestions();
  }, [subject, topic]);

  const styles = {
    container: {
      padding: "20px",
      maxWidth: "800px",
      margin: "0 auto"
    },
    header: {
      textAlign: "center",
      marginBottom: "30px"
    },
    title: {
      fontSize: "24px",
      fontWeight: "bold",
      color: "#2c3e50",
      marginBottom: "10px"
    },
    subtitle: {
      fontSize: "16px",
      color: "#7f8c8d"
    },
    backButton: {
      backgroundColor: "#3498db",
      color: "white",
      border: "none",
      padding: "10px 20px",
      borderRadius: "5px",
      cursor: "pointer",
      marginBottom: "20px",
      fontSize: "14px"
    },
    loading: {
      textAlign: "center",
      padding: "40px",
      fontSize: "18px",
      color: "#7f8c8d"
    },
    error: {
      textAlign: "center",
      padding: "40px",
      fontSize: "18px",
      color: "#e74c3c"
    },
    questionCard: {
      backgroundColor: "#ffffff",
      border: "1px solid #e0e0e0",
      borderRadius: "8px",
      padding: "20px",
      marginBottom: "20px",
      boxShadow: "0 2px 4px rgba(0,0,0,0.1)"
    },
    questionHeader: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: "15px",
      borderBottom: "2px solid #f0f0f0",
      paddingBottom: "10px"
    },
    questionType: {
      backgroundColor: "#e74c3c",
      color: "white",
      padding: "4px 8px",
      borderRadius: "4px",
      fontSize: "12px",
      fontWeight: "bold"
    },
    examInfo: {
      fontSize: "12px",
      color: "#7f8c8d",
      textAlign: "right"
    },
    questionText: {
      fontSize: "16px",
      fontWeight: "500",
      marginBottom: "15px",
      lineHeight: "1.5"
    },
    options: {
      display: "flex",
      flexDirection: "column",
      gap: "10px"
    },
    option: {
      display: "flex",
      alignItems: "center",
      padding: "10px",
      backgroundColor: "#f8f9fa",
      border: "1px solid #e9ecef",
      borderRadius: "6px",
      cursor: "pointer",
      transition: "all 0.2s ease"
    },
    optionHover: {
      backgroundColor: "#e3f2fd",
      borderColor: "#2196f3"
    },
    optionLabel: {
      fontWeight: "bold",
      marginRight: "10px",
      color: "#2c3e50"
    },
    noQuestions: {
      textAlign: "center",
      padding: "40px",
      fontSize: "18px",
      color: "#7f8c8d"
    }
  };

  if (loading) {
    return (
      <div style={styles.container}>
        <button style={styles.backButton} onClick={onBack}>
          ← Back to Modules
        </button>
        <div style={styles.loading}>
          Loading previous year questions...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div style={styles.container}>
        <button style={styles.backButton} onClick={onBack}>
          ← Back to Modules
        </button>
        <div style={styles.error}>
          {error}
        </div>
      </div>
    );
  }

  if (questions.length === 0) {
    return (
      <div style={styles.container}>
        <button style={styles.backButton} onClick={onBack}>
          ← Back to Modules
        </button>
        <div style={styles.noQuestions}>
          No previous year questions available for {subject} - {topic}
        </div>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <button style={styles.backButton} onClick={onBack}>
        ← Back to Modules
      </button>
      
      <div style={styles.header}>
        <h1 style={styles.title}>
          Previous Year Questions
        </h1>
        <p style={styles.subtitle}>
          {subject} - {topic}
        </p>
      </div>

      {questions.map((q) => (
        <div key={q.id} style={styles.questionCard}>
          <div style={styles.questionHeader}>
            <span style={styles.questionType}>{q.type}</span>
            <div style={styles.examInfo}>
              <div>{q.exam}</div>
              <div>{q.date}</div>
            </div>
          </div>
          
          <div style={styles.questionText}>
            {q.id}. {q.question}
          </div>
          
          <div style={styles.options}>
            {q.options.map((option, index) => (
              <div 
                key={index} 
                style={styles.option}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = "#e3f2fd";
                  e.target.style.borderColor = "#2196f3";
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = "#f8f9fa";
                  e.target.style.borderColor = "#e9ecef";
                }}
              >
                <span style={styles.optionLabel}>
                  {String.fromCharCode(65 + index)}.
                </span>
                {option}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default PYQDisplay;
