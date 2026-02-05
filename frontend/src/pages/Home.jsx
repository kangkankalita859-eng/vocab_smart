export default function Home({ onStart }) {
  return (
    <div style={container}>
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

const container = {
  minHeight: "100vh",
  padding: "60px 40px",
  background: "#f9fafb",
};

const title = {
  textAlign: "center",
  fontSize: "32px",
  marginBottom: "8px",
};

const subtitle = {
  textAlign: "center",
  color: "#555",
  marginBottom: "40px",
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
  position: "absolute",
  top: "16px",
  right: "16px",
  background: "#1976d2",
  color: "#fff",
  padding: "4px 10px",
  borderRadius: "12px",
  fontSize: "12px",
};

const soonTag = {
  position: "absolute",
  top: "16px",
  right: "16px",
  background: "#999",
  color: "#fff",
  padding: "4px 10px",
  borderRadius: "12px",
  fontSize: "12px",
};

