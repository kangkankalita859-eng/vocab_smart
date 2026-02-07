import { useState } from "react";
import Sidebar from "../components/Sidebar";

export default function Home({ onStart }) {
  const [selectedSubject, setSelectedSubject] = useState("");
  const [selectedTopic, setSelectedTopic] = useState("");

  const handleSubjectSelect = (subject) => {
    setSelectedSubject(subject);
    setSelectedTopic(""); // Reset topic when changing subject
  };

  const handleTopicSelect = (topic) => {
    setSelectedTopic(topic);
  };

  return (
    <div style={mainContainer}>
      {/* SIDEBAR */}
      <Sidebar
        selectedSubject={selectedSubject}
        selectedTopic={selectedTopic}
        onSubjectSelect={handleSubjectSelect}
        onTopicSelect={handleTopicSelect}
      />

      {/* MAIN CONTENT */}
      <div style={content}>
        <h1 style={title}>Smart Vocabulary Trainer</h1>
        <p style={subtitle}>
          Choose a section to start your preparation
        </p>

        <div style={grid}>
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

          {/* COMING SOON MODULES */}
          <Module title="Synonyms" />
          <Module title="Antonyms" />
          <Module title="Idioms & Phrases" />
          <Module title="Homonyms" />
          <Module title="Spelling" />
        </div>
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
  height: "100vh"
};

const content = {
  flex: 1,
  padding: "40px",
  overflowY: "auto"
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
  gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
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
