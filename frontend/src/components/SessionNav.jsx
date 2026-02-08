export default function SessionNav({
  mode,
  config,
  onApplyRange,
  onGoRead,
  onGoCards,
  onGoHome,
}) {
  return (
    <div style={nav}>
      {/* LEFT : HOME + MODE */}
      <div style={left}>
        <button style={homeBtn} onClick={() => onGoHome && onGoHome()}>
          🏠 Home
        </button>
        <strong style={{ marginLeft: "12px" }}>{mode}</strong>
      </div>

      {/* CENTER : RANGE SELECT */}
      <div style={center}>
        <input
          type="number"
          placeholder="Start"
          defaultValue={config?.start}
          id="startInput"
          style={input}
        />
        <input
          type="number"
          placeholder="Count"
          defaultValue={config?.limit}
          id="limitInput"
          style={input}
        />
        <button
          style={applyBtn}
          onClick={() => {
            const start = Number(
              document.getElementById("startInput").value
            );
            const limit = Number(
              document.getElementById("limitInput").value
            );
            onApplyRange({ start, limit });
          }}
        >
          Apply
        </button>
      </div>

      {/* RIGHT : MODES */}
      <div style={right}>
        {mode !== "Read" && (
          <button
            style={mode === "Read" ? activeBtn : linkBtn}
            onClick={onGoRead}
          >
            📘 Vocab List
          </button>
        )}
        <button
          style={mode === "Cards" ? activeBtn : linkBtn}
          onClick={onGoCards}
        >
          🃏 Flash Cards
        </button>
      </div>
    </div>
  );
}

/* ---------------- STYLES ---------------- */

const nav = {
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  height: "60px",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: "0 24px",
  borderBottom: "1px solid #e0e0e0",
  background: "#ffffff",
  zIndex: 1000,
  boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
};

const left = {
  display: "flex",
  alignItems: "center",
  fontSize: "16px",
};

const center = {
  display: "flex",
  gap: "8px",
  alignItems: "center",
};

const right = {
  display: "flex",
  gap: "10px",
};

const input = {
  width: "70px",
  padding: "6px",
  borderRadius: "6px",
  border: "1px solid #ccc",
};

const applyBtn = {
  padding: "6px 12px",
  borderRadius: "6px",
  border: "none",
  background: "#1976d2",
  color: "#fff",
  cursor: "pointer",
};

const linkBtn = {
  padding: "6px 10px",
  borderRadius: "6px",
  border: "1px solid #ccc",
  background: "#fff",
  cursor: "pointer",
};

const activeBtn = {
  ...linkBtn,
  background: "#1976d2",
  color: "#fff",
  borderColor: "#1976d2",
};

const homeBtn = {
  padding: "6px 10px",
  borderRadius: "6px",
  border: "1px solid #ccc",
  background: "#fff",
  cursor: "pointer",
};




