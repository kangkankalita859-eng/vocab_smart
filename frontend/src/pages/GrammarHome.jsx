import { useState } from "react";
import useMobile from "../hooks/useMobile";
import MobileSidebar from "../components/MobileSidebar";

export default function GrammarHome({ onSelectTopic, onGoHome }) {
  const { isMobile } = useMobile();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const topics = [
    {
      id: "direct-indirect-speech",
      title: "Direct / Indirect Speech",
      description: "Learn and practice direct and indirect speech",
    },
    {
      id: "common-error",
      title: "Common Error",
      description: "Identify and correct common grammatical errors",
    },
    {
      id: "active-passive-voice",
      title: "Active / Passive Voice",
      description: "Understand and practice active and passive voice",
    },
    {
      id: "improvement-of-sentences",
      title: "Improvement of Sentences",
      description: "Learn techniques to improve sentence quality and clarity",
    },
    {
      id: "articles",
      title: "Articles (A, An, The)",
      description: "Learn correct usage of articles",
    },
    {
      id: "prepositions",
      title: "Prepositions",
      description: "Master prepositions with examples",
    },
    {
      id: "conjunctions",
      title: "Conjunctions",
      description: "Learn about coordinating and subordinating conjunctions",
    },
    {
      id: "conditionals",
      title: "Conditionals",
      description: "Practice conditional sentences",
    },
  ];

  return (
    <>
      <nav style={nav}>
        <button onClick={onGoHome} style={homeBtn}>
          🏠 Home
        </button>
        <h1 style={title}>Grammar</h1>
        <button onClick={() => setMobileMenuOpen(true)} style={menuBtn}>
          ☰
        </button>
      </nav>

      <div style={page}>
        <div style={container}>
          <div style={grid}>
            {topics.map((topic) => (
              <button key={topic.id} onClick={() => onSelectTopic(topic)} style={cardStyle}>
                <h3 style={cardTitle}>{topic.title}</h3>
                <p style={cardDesc}>{topic.description}</p>
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
  gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
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
  fontSize: "20px",
  color: "#007bff",
};

const cardDesc = {
  margin: 0,
  fontSize: "14px",
  color: "#666",
};
