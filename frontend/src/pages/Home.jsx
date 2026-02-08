import { useState } from "react";
import Sidebar from "../components/Sidebar";
import MobileSidebar from "../components/MobileSidebar";
import PYQDisplay from "../components/PYQDisplay";
import useMobile from "../hooks/useMobile";

// Data structure for subject-specific content
const subjectContent = {
  maths: {
    title: "Mathematics Preparation",
    modules: [
      {
        title: "📝 PYQ",
        description: "Previous Year Questions with solutions",
        status: "available",
        color: "#ff6b6b"
      },
      {
        title: "📋 Formulas", 
        description: "Important formulas and shortcuts",
        status: "available",
        color: "#4ecdc4"
      },
      {
        title: "🧪 Test",
        description: "Practice tests and quizzes",
        status: "available", 
        color: "#45b7d1"
      },
      {
        title: "📚 Study Material",
        description: "Comprehensive study notes",
        status: "coming-soon",
        color: "#96ceb4"
      }
    ]
  },
  english: {
    title: "English Preparation", 
    modules: [
      {
        title: "📖 Vocabulary",
        description: "Build your vocabulary with words and meanings",
        status: "available",
        color: "#388e3c"
      },
      {
        title: "📝 Grammar",
        description: "Grammar rules and exercises",
        status: "available",
        color: "#7b1fa2"
      },
      {
        title: "🧪 Test",
        description: "English comprehension and grammar tests",
        status: "available",
        color: "#45b7d1"
      },
      {
        title: "📚 Reading Material",
        description: "Reading passages and comprehension",
        status: "coming-soon",
        color: "#96ceb4"
      }
    ]
  },
  reasoning: {
    title: "Reasoning Preparation",
    modules: [
      {
        title: "🧩 Logical Reasoning",
        description: "Logical and analytical reasoning problems",
        status: "available",
        color: "#ff9800"
      },
      {
        title: "📈 Data Interpretation",
        description: "Data analysis and interpretation skills",
        status: "available",
        color: "#9c27b0"
      },
      {
        title: "🧪 Test",
        description: "Reasoning ability tests",
        status: "available",
        color: "#45b7d1"
      },
      {
        title: "📚 Practice Sets",
        description: "Additional practice questions",
        status: "coming-soon",
        color: "#96ceb4"
      }
    ]
  },
  gs: {
    title: "General Studies Preparation",
    modules: [
      {
        title: "📚 Current Affairs",
        description: "Latest current affairs and news",
        status: "available",
        color: "#f44336"
      },
      {
        title: "🌍 Geography",
        description: "Indian and World Geography",
        status: "available",
        color: "#2196f3"
      },
      {
        title: "📜 History",
        description: "Indian History and Culture",
        status: "available",
        color: "#795548"
      },
      {
        title: "🧪 Test",
        description: "General Studies mock tests",
        status: "coming-soon",
        color: "#96ceb4"
      }
    ]
  }
};

export default function Home({ onStart, onIdioms }) {
  const [selectedSubject, setSelectedSubject] = useState("");
  const [selectedTopic, setSelectedTopic] = useState("");
  const [showPYQ, setShowPYQ] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { isMobile } = useMobile();

  const handleSubjectSelect = (subject) => {
    setSelectedSubject(subject);
    setSelectedTopic(""); // Reset topic when changing subject
    console.log('Selected subject:', subject);
    // Scroll down when subject is selected
    window.scrollTo({
      top: 200,
      behavior: 'smooth'
    });
  };

  const handleTopicSelect = (topic) => {
    setSelectedTopic(topic);
    console.log('Selected topic:', topic);
  };

  const handleModuleClick = (module) => {
    console.log('Clicked module:', module);
    // Handle different module types
    if (module.title.includes('Vocabulary') || module.title.includes('One Word')) {
      onStart({ start: 0, limit: 250 });
    } else if (module.title.includes('Idioms & Phrases')) {
      onIdioms({ start: 0, limit: 250 });
    } else if (module.title.includes('PYQ')) {
      setShowPYQ(true);
    } else if (module.title.includes('Grammar')) {
      // For grammar, you can add specific handling later
      alert(`${module.title} functionality will be implemented soon!`);
    } else {
      // For other modules, you can add different handling
      alert(`${module.title} functionality will be implemented soon!`);
    }
  };

  const handleBackToModules = () => {
    setShowPYQ(false);
  };

  return (
    <div style={mainContainer}>
      {/* SIDEBAR - Desktop or Mobile */}
      {isMobile ? (
        <MobileSidebar
          isOpen={mobileMenuOpen}
          onClose={() => setMobileMenuOpen(false)}
          onSubjectSelect={handleSubjectSelect}
          onSubtopicSelect={handleTopicSelect}
        />
      ) : (
        <Sidebar 
          onSubjectSelect={handleSubjectSelect}
          onSubtopicSelect={handleTopicSelect}
        />
      )}

      {/* MAIN CONTENT */}
      <div style={content}>
        {/* Mobile Navigation Bar */}
        {isMobile && (
          <div style={{
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
          }}>
            <button
              style={{
                width: '44px',
                height: '44px',
                borderRadius: '6px',
                border: '1px solid #ccc',
                backgroundColor: '#fff',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '18px'
              }}
              onClick={() => setMobileMenuOpen(true)}
            >
              ☰
            </button>
            <span style={{ fontSize: '16px', fontWeight: '600' }}>
              Smart Vocabulary Trainer
            </span>
            <div style={{ width: '44px' }} />
          </div>
        )}

        {showPYQ ? (
          <PYQDisplay 
            subject={selectedSubject}
            topic={selectedTopic}
            onBack={handleBackToModules}
          />
        ) : (
          <>
            <h1 style={title}>
              {selectedSubject && selectedTopic && subjectContent[selectedSubject] 
                ? subjectContent[selectedSubject].title 
                : "Smart Vocabulary Trainer"
              }
            </h1>
            <p style={subtitle}>
              {selectedSubject && selectedTopic
                ? `Choose a resource for ${selectedTopic} to start your preparation`
                : selectedSubject 
                ? "Select a topic to see available resources"
                : "Choose a section to start your preparation"
              }
            </p>

            {/* Display selected subject and topic */}
            {(selectedSubject || selectedTopic) && (
              <div style={{
                backgroundColor: "#f0f8ff",
                border: "1px solid #2196f3",
                borderRadius: "8px",
                padding: "16px",
                marginBottom: "24px",
                textAlign: "center"
              }}>
                {selectedSubject && (
                  <p style={{ margin: "0", fontSize: "16px", color: "#1976d2" }}>
                    <strong>Selected Subject:</strong> {selectedSubject.charAt(0).toUpperCase() + selectedSubject.slice(1)}
                  </p>
                )}
                {selectedTopic && (
                  <p style={{ margin: "8px 0 0 0", fontSize: "16px", color: "#7b1fa2" }}>
                    <strong>Selected Topic:</strong> {selectedTopic}
                  </p>
                )}
              </div>
            )}

            <div style={grid}>
              {selectedSubject && selectedTopic && subjectContent[selectedSubject] ? (
                // Show subject-specific modules only when both subject and topic are selected
                subjectContent[selectedSubject].modules.map((module, index) => (
                  <div
                    key={index}
                    style={{
                      ...card,
                      borderColor: module.status === "available" ? module.color : "#e0e0e0",
                      opacity: module.status === "available" ? 1 : 0.6,
                      cursor: module.status === "available" ? "pointer" : "not-allowed"
                    }}
                    onClick={() => module.status === "available" && handleModuleClick(module)}
                  >
                    <h3>{module.title}</h3>
                    <p>{module.description}</p>
                    <span style={{
                      ...activeTag,
                      backgroundColor: module.status === "available" ? module.color : "#6c757d"
                    }}>
                      {module.status === "available" ? "Available" : "Coming Soon"}
                    </span>
                  </div>
                ))
              ) : (
                // Show default vocabulary modules when no subject/topic is selected
                <>
                  {/* ACTIVE MODULE */}
                  <div
                    style={{ ...card, borderColor: "#388e3c" }}
                    onClick={() =>
                      onStart({ start: 0, limit: 250 })
                    }
                  >
                    <h3>📖 One Word Substitution</h3>
                    <p>View complete vocabulary list with meanings</p>
                    <span style={{ ...activeTag, backgroundColor: "#388e3c" }}>Available</span>
                  </div>

                  {/* IDIOMS & PHRASES MODULE */}
                  <div
                    style={{ ...card, borderColor: "#e67e22" }}
                    onClick={() =>
                      onIdioms({ start: 0, limit: 250 })
                    }
                  >
                    <h3>🎭 Idioms & Phrases</h3>
                    <p>Learn idioms and phrases with SSC exam counts</p>
                    <span style={{ ...activeTag, backgroundColor: "#e67e22" }}>Available</span>
                  </div>

                  {/* COMING SOON MODULES */}
                  <Module title="Synonyms" />
                  <Module title="Antonyms" />
                  <Module title="Homonyms" />
                  <Module title="Spelling" />
                </>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

/* ---------- REUSABLE MODULE ---------- */

function Module({ title }) {
  return (
    <div style={{ ...card, opacity: 0.6, cursor: "not-allowed" }}>
      <h3>{title}</h3>
      <p>Coming soon</p>
      <span style={soonTag}>Coming Soon</span>
    </div>
  );
}

/* ---------- STYLES ---------- */

const mainContainer = {
  display: "flex",
  height: "100vh",
  position: "relative"
};

const content = {
  flex: 1,
  padding: "40px",
  paddingTop: "80px", // Add padding for fixed navbar
  overflowY: "auto",
  marginLeft: "0px", // No margin on mobile
};

const title = {
  fontSize: "32px",
  fontWeight: "700",
  color: "#2c3e50",
  marginBottom: "16px",
  textAlign: "center"
};

const subtitle = {
  fontSize: "18px",
  color: "#6c757d",
  textAlign: "center",
  marginBottom: "40px"
};

const grid = {
  maxWidth: "900px",
  margin: "0 auto",
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
  gap: "24px",
};

const card = {
  background: "#ffffff",
  borderRadius: "14px",
  padding: "24px",
  border: "2px solid #e0e0e0",
  boxShadow: "0 10px 20px rgba(0,0,0,0.08)",
  cursor: "pointer",
  position: "relative",
  minHeight: "140px",
};

const activeTag = {
  display: "inline-block",
  padding: "6px 12px",
  backgroundColor: "#388e3c",
  color: "white",
  borderRadius: "20px",
  fontSize: "12px",
  fontWeight: "600",
  marginTop: "12px"
};

const soonTag = {
  display: "inline-block",
  padding: "6px 12px",
  backgroundColor: "#6c757d",
  color: "white",
  borderRadius: "20px",
  fontSize: "12px",
  fontWeight: "600",
  marginTop: "12px"
};
