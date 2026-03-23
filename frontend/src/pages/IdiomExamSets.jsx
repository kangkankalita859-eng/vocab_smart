import { useState, useEffect } from "react";
import SessionNav from "../components/SessionNav";
import MobileSidebar from "../components/MobileSidebar";
import useMobile from "../hooks/useMobile";

export default function IdiomExamSets({ config, onUpdateConfig, onGoHome, onSelectSet }) {
  const [testSets, setTestSets] = useState([]);
  const [loading, setLoading] = useState(true);
  const { isMobile } = useMobile();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const loadTestSets = async () => {
      try {
        setLoading(true);
        const response = await fetch('/data/english/idiom_exam_sets.json');
        const data = await response.json();
        setTestSets(data);
      } catch (error) {
        console.error("Error loading idiom exam sets:", error);
      } finally {
        setLoading(false);
      }
    };

    loadTestSets();
  }, []);

  const handleSetClick = (set) => {
    onSelectSet({
      start: set.start,
      limit: set.limit,
      setNumber: set.id
    });
  };

  if (loading) {
    return (
      <div style={loadingContainer}>
        <div style={loadingContent}>
          <div style={spinner}></div>
          <p>Loading idiom test sets...</p>
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
            <span style={mobileTitle}>Idiom Test Sets</span>
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
              mode="Idiom Test Sets"
              config={config}
              onApplyRange={(start, limit) => onUpdateConfig({ start, limit })}
              onGoHome={onGoHome}
              isMobile={isMobile}
              onMenuToggle={() => setMobileMenuOpen(true)}
            />
          </div>
        </div>

        {/* Test Sets Grid */}
        <div style={testSetsContainer}>
          <div style={testSetsGrid}>
            {testSets.map((set) => (
              <div
                key={set.id}
                style={testSetCard}
                onClick={() => handleSetClick(set)}
              >
                <div style={setHeader}>
                  <h3 style={setName}>{set.name}</h3>
                  <span style={setBadge}>{set.totalQuestions} Questions</span>
                </div>
                <p style={setDescription}>{set.description}</p>
                <div style={setFooter}>
                  <span style={setInfo}>Questions {set.start + 1}-{set.start + set.limit}</span>
                  <button style={startBtn}>Start Test</button>
                </div>
              </div>
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

const testSetsContainer = {
  marginTop: "90px",
  padding: "20px"
};

const testSetsGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))",
  gap: "20px"
};

const testSetCard = {
  backgroundColor: "#ffffff",
  borderRadius: "12px",
  padding: "20px",
  boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
  border: "1px solid #e9ecef",
  cursor: "pointer",
  transition: "all 0.3s ease"
};

const setHeader = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: "12px"
};

const setName = {
  margin: "0",
  fontSize: "18px",
  fontWeight: "600",
  color: "#2c3e50"
};

const setBadge = {
  backgroundColor: "#007bff",
  color: "#ffffff",
  padding: "4px 8px",
  borderRadius: "12px",
  fontSize: "12px",
  fontWeight: "500"
};

const setDescription = {
  margin: "0 0 16px 0",
  fontSize: "14px",
  color: "#6c757d",
  lineHeight: "1.4"
};

const setFooter = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center"
};

const setInfo = {
  fontSize: "12px",
  color: "#6c757d"
};

const startBtn = {
  padding: "8px 16px",
  backgroundColor: "#28a745",
  color: "#ffffff",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer",
  fontSize: "14px",
  fontWeight: "500"
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
