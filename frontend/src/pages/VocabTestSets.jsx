import { useEffect, useState, useMemo } from "react";
import SessionNav from "../components/SessionNav";
import MobileSidebar from "../components/MobileSidebar";
import useMobile from "../hooks/useMobile";

export default function VocabTestSets({ config, onUpdateConfig, onGoHome, onSelectSet }) {
  const { isMobile } = useMobile();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [testSets, setTestSets] = useState([]);
  const [loading, setLoading] = useState(true);

  // Load test data dynamically from JSON files
  useEffect(() => {
    const loadTestData = async () => {
      try {
        const response = await fetch('/data/english/vocab_test.json');
        const questions = await response.json();

        // Group questions by set
        const setMap = new Map();
        questions.forEach(q => {
          if (!setMap.has(q.set)) {
            setMap.set(q.set, []);
          }
          setMap.get(q.set).push(q);
        });

        // Create sets array from grouped data
        const sets = Array.from(setMap.entries()).map(([setNum, setQuestions]) => ({
          id: setNum,
          title: `Set ${setNum}: One Word Substitution`,
          description: `${setQuestions.length} questions on one word substitutions`,
          questions: setQuestions.length,
          difficulty: setNum <= 2 ? "Easy" : setNum <= 4 ? "Medium" : "Hard"
        })).sort((a, b) => a.id - b.id);

        setTestSets(sets);
        setLoading(false);
      } catch (error) {
        console.error('Failed to load test data:', error);
        setLoading(false);
      }
    };

    loadTestData();
  }, []);

  const handleSetClick = (set) => {
    onSelectSet({
      id: set.id,
      title: set.title,
      start: (set.id - 1) * 10, // Calculate start index based on set number
      limit: set.questions,
      setNumber: set.id
    });
  };

  const handleApplyRange = (start, limit) => {
    onUpdateConfig({ start, limit });
  };

  return (
    <div style={mainContainer}>
      {/* MAIN CONTENT */}
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
            <span style={mobileTitle}>Vocabulary Test Sets</span>
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
              onApplyRange={handleApplyRange}
              onGoHome={onGoHome}
              isMobile={isMobile}
              onMenuToggle={() => setMobileMenuOpen(true)}
            />
          </div>
        </div>

        {/* Sets Grid */}
        <div style={setsContainer}>
          <h2 style={pageTitle}>Choose a Test Set</h2>
          <p style={pageSubtitle}>Select a vocabulary test set to practice opposite meanings</p>
          
          {loading ? (
            <p style={{ textAlign: "center", marginTop: "40px", fontSize: "16px", color: "#666" }}>
              Loading test sets...
            </p>
          ) : testSets.length === 0 ? (
            <p style={{ textAlign: "center", marginTop: "40px", fontSize: "16px", color: "#999" }}>
              No test sets available.
            </p>
          ) : (
            <div style={setsGrid}>
              {testSets.map((set) => (
                <button
                  key={set.id}
                  style={setCard}
                  onClick={() => handleSetClick(set)}
                >
                  <div style={setHeader}>
                    <h3 style={setTitle}>{set.title}</h3>
                    <span style={
                      set.difficulty === "Easy" ? difficultyEasy :
                      set.difficulty === "Medium" ? difficultyMedium :
                      difficultyHard
                    }>
                      {set.difficulty}
                    </span>
                  </div>
                  <p style={setDescription}>{set.description}</p>
                  <div style={setFooter}>
                    <span style={questionCount}>{set.questions} Questions</span>
                    <span style={startButton}>Start →</span>
                  </div>
                </button>
              ))}
            </div>
          )}
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

const setsContainer = {
  marginTop: "90px",
  padding: "20px 0"
};

const pageTitle = {
  fontSize: "32px",
  fontWeight: "700",
  color: "#2c3e50",
  margin: "0 0 10px 0",
  textAlign: "center"
};

const pageSubtitle = {
  fontSize: "16px",
  color: "#6c757d",
  margin: "0 0 40px 0",
  textAlign: "center"
};

const setsGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))",
  gap: "20px",
  maxWidth: "1000px",
  margin: "0 auto"
};

const setCard = {
  backgroundColor: "#ffffff",
  border: "1px solid #e9ecef",
  borderRadius: "12px",
  padding: "24px",
  textAlign: "left",
  cursor: "pointer",
  transition: "all 0.3s ease",
  boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
  display: "flex",
  flexDirection: "column",
  height: "100%"
};

const setHeader = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "flex-start",
  marginBottom: "12px"
};

const setTitle = {
  fontSize: "18px",
  fontWeight: "600",
  color: "#2c3e50",
  margin: "0",
  flex: 1
};

const difficultyEasy = {
  backgroundColor: "#d4edda",
  color: "#155724",
  padding: "4px 8px",
  borderRadius: "12px",
  fontSize: "12px",
  fontWeight: "500"
};

const difficultyMedium = {
  backgroundColor: "#fff3cd",
  color: "#856404",
  padding: "4px 8px",
  borderRadius: "12px",
  fontSize: "12px",
  fontWeight: "500"
};

const difficultyHard = {
  backgroundColor: "#f8d7da",
  color: "#721c24",
  padding: "4px 8px",
  borderRadius: "12px",
  fontSize: "12px",
  fontWeight: "500"
};

const setDescription = {
  fontSize: "14px",
  color: "#6c757d",
  margin: "0 0 20px 0",
  lineHeight: "1.5"
};

const setFooter = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginTop: "auto"
};

const questionCount = {
  fontSize: "14px",
  color: "#007bff",
  fontWeight: "500"
};

const startButton = {
  fontSize: "14px",
  color: "#007bff",
  fontWeight: "600",
  display: "flex",
  alignItems: "center",
  gap: "4px"
};
