import { useState } from "react";
import SessionNav from "../components/SessionNav";
import MobileSidebar from "../components/MobileSidebar";
import useMobile from "../hooks/useMobile";

export default function VocabTestSets({ config, onUpdateConfig, onGoHome, onSelectSet }) {
  const { isMobile } = useMobile();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Generate sets dynamically based on available data
  const testSets = [
    {
      id: 1,
      title: "Set 1: Basic One Word Substitution",
      description: "10 questions on basic one word substitutions (Diversity to Chastise)",
      questions: 10,
      difficulty: "Easy"
    },
    {
      id: 2,
      title: "Set 2: Common One Word Substitution",
      description: "10 questions on common one word substitutions (Narcissist to Relic)",
      questions: 10,
      difficulty: "Easy"
    },
    {
      id: 3,
      title: "Set 3: Advanced One Word Substitution",
      description: "10 questions on advanced one word substitutions (Contemporary to Invincible)",
      questions: 10,
      difficulty: "Medium"
    },
    {
      id: 4,
      title: "Set 4: Academic One Word Substitution",
      description: "10 questions on academic one word substitutions (Acoustics to Horizon)",
      questions: 10,
      difficulty: "Medium"
    },
    {
      id: 5,
      title: "Set 5: Medical One Word Substitution",
      description: "10 questions on medical one word substitutions (Insomnia to Numismatics)",
      questions: 10,
      difficulty: "Medium"
    },
    {
      id: 6,
      title: "Set 6: People One Word Substitution",
      description: "10 questions on people-related one word substitutions (Usurer to Pessimist)",
      questions: 10,
      difficulty: "Hard"
    },
    {
      id: 7,
      title: "Set 7: Professional One Word Substitution",
      description: "10 questions on professional one word substitutions (Posthumous to Parasite)",
      questions: 10,
      difficulty: "Hard"
    },
    {
      id: 8,
      title: "Set 8: Personal One Word Substitution",
      description: "10 questions on personal one word substitutions (Narcissist to Vacillate)",
      questions: 10,
      difficulty: "Hard"
    },
    {
      id: 9,
      title: "Set 9: Literary One Word Substitution",
      description: "10 questions on literary one word substitutions (Introspection to Suicide)",
      questions: 10,
      difficulty: "Hard"
    },
    {
      id: 10,
      title: "Set 10: General One Word Substitution",
      description: "10 questions on general one word substitutions (Archaic to Claustrophobia)",
      questions: 10,
      difficulty: "Hard"
    },
    {
      id: 11,
      title: "Set 11: Specialized One Word Substitution",
      description: "10 questions on specialized one word substitutions (Sedative to Unemployed)",
      questions: 10,
      difficulty: "Hard"
    },
    {
      id: 12,
      title: "Set 12: Advanced Concepts",
      description: "10 questions on advanced concepts (Auditor to Euphoria)",
      questions: 10,
      difficulty: "Hard"
    }
  ];

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
