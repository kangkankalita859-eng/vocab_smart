import { useState } from "react";
import useMobile from "../hooks/useMobile";
import MobileSidebar from "../components/MobileSidebar";

export default function EnglishVocabHome({ onGoRead, onGoCards, onGoExam, onGoHome, onGoIdiomExam }) {
  const { isMobile } = useMobile();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const cards = [
    {
      title: "Narration",
      description: "Learn Direct and Indirect Speech with examples",
      onClick: () => console.log("Narration clicked"),
    },
    {
      title: "Voice Change",
      description: "Practice Active and Passive Voice transformation",
      onClick: () => console.log("Voice Change clicked"),
    },
    {
      title: "Common Error",
      description: "Identify and correct common grammatical errors",
      onClick: () => console.log("Common Error clicked"),
    },
    {
      title: "Improvement of Sentences",
      description: "Learn techniques to improve sentence quality and clarity",
      onClick: () => console.log("Improvement of Sentences clicked"),
    },
    {
      title: "Articles",
      description: "Learn correct usage of A, An, The",
      onClick: () => console.log("Articles clicked"),
    },
    {
      title: "Prepositions",
      description: "Master prepositions with examples",
      onClick: () => console.log("Prepositions clicked"),
    },
    {
      title: "Idiom Exam",
      description: "Test your knowledge of English idioms",
      onClick: onGoIdiomExam,
    },
  ];

  return (
    <>
      <nav style={nav}>
        <button onClick={onGoHome} style={homeBtn}>
          🏠 Home
        </button>
        <h1 style={title}>English Grammar</h1>
        <button onClick={() => setMobileMenuOpen(true)} style={menuBtn}>
          ☰
        </button>
      </nav>

      <div style={page}>
        <div style={container}>
          <div style={grid}>
            {cards.map((card) => (
              <button key={card.title} onClick={card.onClick} style={cardStyle}>
                <h3 style={cardTitle}>{card.title}</h3>
                <p style={cardDesc}>{card.description}</p>
              </button>
            ))}
          </div>
        </div>
      </div>

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

const nav = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "12px 20px",
  background: "#fff",
  borderBottom: "1px solid #ddd",
  position: "sticky",
  top: 0,
  zIndex: 100,
};

const homeBtn = {
  background: "#007bff",
  color: "#fff",
  border: "none",
  padding: "8px 16px",
  borderRadius: "6px",
  cursor: "pointer",
  fontSize: "14px",
};

const title = {
  margin: 0,
  fontSize: "20px",
  color: "#333",
};

const menuBtn = {
  background: "none",
  border: "none",
  fontSize: "20px",
  cursor: "pointer",
};

const page = {
  minHeight: "calc(100vh - 60px)",
  background: "#f5f5f5",
  display: "flex",
  justifyContent: "center",
  alignItems: "flex-start",
  paddingTop: "80px",
  marginLeft: "0px",
};

const container = {
  width: "90%",
  maxWidth: "900px",
  textAlign: "center",
};

const grid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
  gap: "20px",
  marginTop: "20px",
};

const cardStyle = {
  background: "#fff",
  border: "1px solid #ddd",
  borderRadius: "10px",
  padding: "24px",
  cursor: "pointer",
  transition: "transform 0.2s, box-shadow 0.2s",
  boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
};

const cardTitle = {
  margin: "0 0 8px 0",
  fontSize: "22px",
  color: "#007bff",
};

const cardDesc = {
  margin: 0,
  fontSize: "14px",
  color: "#666",
};
