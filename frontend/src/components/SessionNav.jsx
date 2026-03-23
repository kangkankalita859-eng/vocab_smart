export default function SessionNav({
  mode,
  config,
  onApplyRange,
  onGoRead,
  onGoCards,
  onGoTest,
  onGoHome,
  testLabel,
  showSscFilter,
  sscOnly,
  onToggleSscOnly,
  isMobile,
  onMenuToggle,
}) {
  return (
    <div style={isMobile ? mobileNav : nav}>
      {/* LEFT : HOME + MODE */}
      <div style={isMobile ? mobileLeft : left}>
        {isMobile && (
          <button 
            style={{...homeBtn, marginRight: "8px"}} 
            onClick={() => onMenuToggle && onMenuToggle()}
          >
            ☰
          </button>
        )}
        <button style={isMobile ? mobileHomeBtn : homeBtn} onClick={() => onGoHome && onGoHome()}>
          🏠 {isMobile ? "" : "Home"}
        </button>
        {!isMobile && <strong style={{ marginLeft: "12px" }}>{mode}</strong>}
      </div>

      {/* CENTER : RANGE SELECT */}
      <div style={isMobile ? mobileCenter : center}>
        <input
          type="number"
          placeholder="Start"
          defaultValue={config?.start}
          id="startInput"
          style={isMobile ? mobileInput : input}
        />
        <input
          type="number"
          placeholder="End"
          defaultValue={config?.limit}
          id="limitInput"
          style={isMobile ? mobileInput : input}
        />
        <button
          style={isMobile ? mobileApplyBtn : applyBtn}
          onClick={() => {
            const start = Number(
              document.getElementById("startInput").value
            );
            const end = Number(
              document.getElementById("limitInput").value
            );
            const limit = end - start + 1; // Calculate correct limit
            onApplyRange({ start, limit });
          }}
        >
          Apply
        </button>
      </div>

      {/* RIGHT : MODES */}
      <div style={isMobile ? mobileRight : right}>
        {showSscFilter && (
          <label style={isMobile ? mobileFilterPill : filterPill}>
            <input
              type="checkbox"
              checked={!!sscOnly}
              onChange={(e) => onToggleSscOnly && onToggleSscOnly(e.target.checked)}
              style={{ marginRight: 6 }}
            />
            {isMobile ? "SSC" : "SSC (≥1)"}
          </label>
        )}
        {mode !== "Read" && (
          <button
            style={isMobile ? mobileLinkBtn : (mode === "Read" ? activeBtn : linkBtn)}
            onClick={onGoRead}
          >
            📘 {isMobile ? "Vocab" : "Vocab List"}
          </button>
        )}
        <button
          style={isMobile ? mobileLinkBtn : (mode === "Cards" ? activeBtn : linkBtn)}
          onClick={onGoCards}
        >
          🃏 {isMobile ? "Cards" : "Flash Cards"}
        </button>
        {onGoTest && (
          <button
            style={isMobile ? mobileLinkBtn : (mode === "Test" ? activeBtn : linkBtn)}
            onClick={onGoTest}
          >
            {isMobile ? "📝 Test" : (testLabel || "📝 Test")}
          </button>
        )}
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
  flex: 1,
  justifyContent: "center",
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
  fontSize: "12px",
};

const activeBtn = {
  ...linkBtn,
  background: "#1976d2",
  color: "#fff",
  borderColor: "#1976d2",
};

const filterPill = {
  display: "flex",
  alignItems: "center",
  padding: "6px 10px",
  borderRadius: "999px",
  border: "1px solid #ccc",
  background: "#fff",
  cursor: "pointer",
  fontSize: "12px",
  userSelect: "none",
};

const homeBtn = {
  padding: "6px 10px",
  borderRadius: "6px",
  border: "1px solid #ccc",
  background: "#fff",
  cursor: "pointer",
  fontSize: "14px",
  minWidth: "44px", // Touch-friendly size
  minHeight: "44px",
};

// Mobile-specific styles
const mobileNav = {
  ...nav,
  height: "50px",
  padding: "0 8px",
  flexWrap: "nowrap",
  overflow: "hidden",
  minWidth: "100%", // Ensure full width
  maxWidth: "100vw", // Prevent overflow
};

const mobileLeft = {
  ...left,
  flexShrink: 0,
  minWidth: "80px",
};

const mobileCenter = {
  ...center,
  flex: 1,
  justifyContent: "center",
  minWidth: "60px",
};

const mobileRight = {
  ...right,
  display: "flex",
  gap: "2px", // Reduced gap to prevent overlapping
  flexShrink: 0,
  overflowX: "auto", // Enable horizontal scrolling
  overflowY: "hidden", // Hide vertical overflow
  scrollbarWidth: "thin", // Thin scrollbar for better UX
  msOverflowStyle: "none", // Hide scrollbar in IE/Edge
  minWidth: "0", // Allow shrinking
  maxWidth: "60%", // Limit max width to prevent overlap
  "&::-webkit-scrollbar": {
    height: "4px", // Thin horizontal scrollbar
  },
  "&::-webkit-scrollbar-thumb": {
    backgroundColor: "#ccc",
    borderRadius: "2px",
  },
};

const mobileHomeBtn = {
  ...homeBtn,
  padding: "8px",
  fontSize: "16px",
  minWidth: "40px",
  minHeight: "40px",
};

const mobileLinkBtn = {
  padding: "6px 8px", // Reduced padding
  borderRadius: "6px",
  border: "1px solid #ccc",
  background: "#fff",
  cursor: "pointer",
  fontSize: "11px", // Reduced font size
  minWidth: "60px", // Reduced minimum width
  minHeight: "36px", // Reduced height
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  whiteSpace: "nowrap",
  flexShrink: "0", // Prevent shrinking
};

const mobileApplyBtn = {
  padding: "6px 8px",
  borderRadius: "6px",
  border: "1px solid #1976d2",
  background: "#1976d2",
  color: "#fff",
  cursor: "pointer",
  fontSize: "12px",
  minWidth: "50px",
  minHeight: "30px",
};

const mobileInput = {
  width: "50px",
  padding: "4px",
  borderRadius: "4px",
  border: "1px solid #ccc",
  fontSize: "12px",
  minHeight: "30px",
};

const mobileFilterPill = {
  display: "flex",
  alignItems: "center",
  padding: "6px 8px",
  borderRadius: "999px",
  border: "1px solid #ccc",
  background: "#fff",
  cursor: "pointer",
  fontSize: "10px",
  userSelect: "none",
  whiteSpace: "nowrap",
};




