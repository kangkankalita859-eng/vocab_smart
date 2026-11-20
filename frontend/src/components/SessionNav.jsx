export default function SessionNav({
  mode,
  mobileReadNavLayout,
  config,
  onApplyRange,
  onGoRead,
  onGoCards,
  onGoTest,
  onGoHome,
  showVocabLink,
  testLabel,
  showSscFilter,
  sscOnly,
  onToggleSscOnly,
  showExamFrequencySort,
  sortByExamFrequency,
  onToggleSortByExamFrequency,
  isMobile,
  onMenuToggle,
  deckPanelVisible,
  onToggleDeckPanel,
  isDarkTheme,
  onToggleTheme,
}) {
  const showMobileMenu = Boolean(isMobile && onMenuToggle);
  const useCompactMobileNav = Boolean(isMobile && mode.includes("Cards"));
  const useReferenceMobileReadNav = Boolean(
    isMobile && mobileReadNavLayout === "reference"
  );
  const useWrappedMobileReadNav = Boolean(
    isMobile &&
      mode === "Read" &&
      mobileReadNavLayout !== "standard" &&
      mobileReadNavLayout !== "reference"
  );

  return (
    <div
      className="flash-session-nav"
      style={
        isMobile
          ? {
              ...(useWrappedMobileReadNav
                ? wrappedMobileReadNav
                : useReferenceMobileReadNav
                  ? referenceMobileReadNav
                  : useCompactMobileNav
                    ? compactMobileNav
                    : mobileNav),
              ...(isDarkTheme ? darkNav : {}),
            }
          : { ...nav, ...(isDarkTheme ? darkNav : {}) }
      }
    >
      {/* LEFT : HOME + MODE */}
      <div
        style={
          isMobile
            ? {
                ...mobileLeft,
                ...(useWrappedMobileReadNav ? wrappedMobileReadLeft : {}),
                ...(useReferenceMobileReadNav ? referenceMobileReadLeft : {}),
                minWidth: showMobileMenu
                  ? useWrappedMobileReadNav
                    ? "88px"
                    : useReferenceMobileReadNav
                      ? "76px"
                      : useCompactMobileNav
                        ? "88px"
                        : "max-content"
                  : "40px",
              }
            : left
        }
      >
        {showMobileMenu && (
          <button 
            style={
              useWrappedMobileReadNav
                ? wrappedMobileReadMenuBtn
                : useReferenceMobileReadNav
                  ? referenceMobileReadMenuBtn
                  : useCompactMobileNav
                    ? compactMobileMenuBtn
                    : { ...homeBtn, marginRight: "8px", flexShrink: 0 }
            }
            onClick={() => onMenuToggle && onMenuToggle()}
          >
            ☰
          </button>
        )}
        <button
          style={
            isMobile
              ? useWrappedMobileReadNav
                ? wrappedMobileReadHomeBtn
                : useReferenceMobileReadNav
                  ? referenceMobileReadHomeBtn
                  : useCompactMobileNav
                    ? compactMobileHomeBtn
                    : mobileHomeBtn
              : homeBtn
          }
          onClick={() => onGoHome && onGoHome()}
        >
          🏠 {isMobile ? "" : "Home"}
        </button>
        {!isMobile && <strong style={{ marginLeft: "12px" }}>{mode}</strong>}
      </div>

      {/* CENTER : RANGE SELECT */}
      <div
        style={
          isMobile
            ? useWrappedMobileReadNav
              ? wrappedMobileReadCenter
              : useReferenceMobileReadNav
                ? referenceMobileReadCenter
                : useCompactMobileNav
                  ? compactMobileCenter
                  : mobileCenter
            : center
        }
      >
        <input
          type="number"
          placeholder="Start"
          defaultValue={config?.start}
          id="startInput"
          style={
            isMobile
              ? useWrappedMobileReadNav
                ? wrappedMobileReadInput
                : useReferenceMobileReadNav
                  ? referenceMobileReadInput
                  : mobileInput
              : input
          }
        />
        <input
          type="number"
          placeholder="End"
          defaultValue={mode === "Cards" ? (config?.rangeEnd ?? config?.limit) : config?.limit}
          id="limitInput"
          style={
            isMobile
              ? useWrappedMobileReadNav
                ? wrappedMobileReadInput
                : useReferenceMobileReadNav
                  ? referenceMobileReadInput
                  : mobileInput
              : input
          }
        />
        <button
          style={
            isMobile
              ? useWrappedMobileReadNav
                ? wrappedMobileReadApplyBtn
                : useReferenceMobileReadNav
                  ? referenceMobileReadApplyBtn
                  : useCompactMobileNav
                    ? compactMobileApplyBtn
                    : mobileApplyBtn
              : applyBtn
          }
          onClick={() => {
            const start = Number(
              document.getElementById("startInput").value
            );
            const end = Number(
              document.getElementById("limitInput").value
            );
            const limit = end - start + 1; // Calculate correct limit
            onApplyRange(
              mode === "Cards"
                ? { start, limit, rangeEnd: end }
                : { start, limit }
            );
          }}
        >
          Apply
        </button>
      </div>

      {/* RIGHT : MODES */}
      <div
        style={
          isMobile
            ? useWrappedMobileReadNav
              ? wrappedMobileReadRight
              : useReferenceMobileReadNav
                ? referenceMobileReadRight
                : useCompactMobileNav
                  ? {
                      ...compactMobileRight,
                      maxWidth: `calc(100% - ${showMobileMenu ? "230px" : "182px"})`,
                    }
                  : mobileRight
            : right
        }
      >
        {showSscFilter && (
          <label
            style={
              isMobile
                ? useWrappedMobileReadNav
                  ? wrappedMobileReadFilterPill
                  : useReferenceMobileReadNav
                    ? referenceMobileReadFilterPill
                    : mobileFilterPill
                : filterPill
            }
          >
            <input
              type="checkbox"
              checked={!!sscOnly}
              onChange={(e) => onToggleSscOnly && onToggleSscOnly(e.target.checked)}
              style={{ marginRight: useWrappedMobileReadNav || useReferenceMobileReadNav ? 3 : 6 }}
            />
            {isMobile ? "SSC" : "SSC (≥1)"}
          </label>
        )}
        {(mode !== "Read" || (showVocabLink && isMobile)) && (
          <button
            style={
              isMobile
                ? useWrappedMobileReadNav
                  ? wrappedMobileReadLinkBtn
                  : useReferenceMobileReadNav
                    ? referenceMobileReadLinkBtn
                    : useCompactMobileNav
                      ? compactMobileLinkBtn
                      : mobileLinkBtn
                : (mode === "Read" ? activeBtn : linkBtn)
            }
            onClick={onGoRead}
          >
            📘 {isMobile ? "Vocab" : "Vocab List"}
          </button>
        )}
        {showExamFrequencySort && !useReferenceMobileReadNav && (
          <label
            style={
              isMobile
                ? useWrappedMobileReadNav
                  ? wrappedMobileReadFilterPill
                  : useReferenceMobileReadNav
                    ? referenceMobileReadFilterPill
                    : mobileFilterPill
                : filterPill
            }
          >
            <input
              type="checkbox"
              checked={!!sortByExamFrequency}
              onChange={(e) => onToggleSortByExamFrequency && onToggleSortByExamFrequency(e.target.checked)}
              style={{ marginRight: useWrappedMobileReadNav || useReferenceMobileReadNav ? 3 : 6 }}
            />
            {isMobile ? "By Freq" : "By Frequency"}
          </label>
        )}
        <button
          style={
            isMobile
              ? useWrappedMobileReadNav
                ? wrappedMobileReadLinkBtn
                : useReferenceMobileReadNav
                  ? referenceMobileReadLinkBtn
                  : useCompactMobileNav
                    ? compactMobileLinkBtn
                    : mobileLinkBtn
              : (mode === "Cards" ? activeBtn : linkBtn)
          }
          onClick={onGoCards}
        >
          🃏 {isMobile ? "Cards" : "Flash Cards"}
        </button>
        {mode.includes("Cards") && onToggleDeckPanel && (
          <button
            style={isMobile ? mobileDeckToggleBtn : linkBtn}
            onClick={onToggleDeckPanel}
            aria-expanded={Boolean(deckPanelVisible)}
            aria-label={deckPanelVisible ? "Hide deck bar" : "Show deck bar"}
            title={deckPanelVisible ? "Hide decks" : "Show decks"}
          >
            {isMobile ? (
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                width="20"
                height="20"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d={deckPanelVisible ? "m6 15 6-6 6 6" : "m6 9 6 6 6-6"} />
              </svg>
            ) : (
              deckPanelVisible ? "Hide Deck Bar" : "Show Deck Bar"
            )}
          </button>
        )}
        {onGoTest && (
          <button
            style={
              isMobile
                ? useReferenceMobileReadNav
                  ? referenceMobileReadLinkBtn
                  : useCompactMobileNav
                    ? compactMobileLinkBtn
                    : mobileLinkBtn
                : (mode === "Test" ? activeBtn : linkBtn)
            }
            onClick={onGoTest}
          >
            {isMobile ? "📝 Test" : (testLabel || "📝 Test")}
          </button>
        )}
        {onToggleTheme && (
          <button
            style={
              isMobile
                ? useWrappedMobileReadNav
                  ? wrappedMobileReadLinkBtn
                  : useCompactMobileNav
                  ? { ...compactMobileLinkBtn, ...themeToggleBtn, minWidth: "38px", padding: "6px 4px" }
                  : { ...mobileLinkBtn, ...themeToggleBtn }
                : { ...linkBtn, ...themeToggleBtn }
            }
            onClick={onToggleTheme}
            aria-label={`Switch to ${isDarkTheme ? "light" : "dark"} theme`}
            aria-pressed={Boolean(isDarkTheme)}
            title={`Switch to ${isDarkTheme ? "light" : "dark"} theme`}
          >
            {isDarkTheme ? "☀️" : "🌙"}
            {!isMobile && ` ${isDarkTheme ? "Light" : "Dark"}`}
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
  padding: "0 4px",
  flexWrap: "nowrap",
  overflow: "hidden",
  minWidth: "100%",
  maxWidth: "100vw",
};

const referenceMobileReadNav = {
  ...mobileNav,
  boxSizing: "border-box",
  width: "100%",
  minWidth: 0,
  padding: "0 4px",
  gap: "4px",
};

const compactMobileNav = {
  ...mobileNav,
  boxSizing: "border-box",
  width: "100%",
  minWidth: 0,
};

const mobileLeft = {
  ...left,
  flexShrink: 0,
  minWidth: "80px",
};

const referenceMobileReadLeft = {
  ...mobileLeft,
  minWidth: 0,
  gap: "4px",
};

const referenceMobileReadMenuBtn = {
  ...homeBtn,
  boxSizing: "border-box",
  width: "36px",
  minWidth: "36px",
  height: "36px",
  minHeight: "36px",
  padding: 0,
  marginRight: 0,
  flexShrink: 0,
};

const referenceMobileReadHomeBtn = {
  ...referenceMobileReadMenuBtn,
  padding: "4px",
  fontSize: "14px",
};

const mobileCenter = {
  ...center,
  flex: 1,
  gap: "4px",
  justifyContent: "center",
  minWidth: "60px",
};

const referenceMobileReadCenter = {
  ...mobileCenter,
  flex: "0 0 auto",
  gap: "3px",
  minWidth: 0,
  justifyContent: "flex-start",
};

const referenceMobileReadInput = {
  boxSizing: "border-box",
  width: "34px",
  padding: "2px",
  borderRadius: "4px",
  border: "1px solid #ccc",
  minHeight: "30px",
  fontSize: "11px",
};

const referenceMobileReadApplyBtn = {
  boxSizing: "border-box",
  borderRadius: "6px",
  border: "1px solid #1976d2",
  background: "#1976d2",
  color: "#fff",
  cursor: "pointer",
  minWidth: "42px",
  minHeight: "30px",
  padding: "4px 2px",
  fontSize: "11px",
};

const referenceMobileReadRight = {
  display: "flex",
  flex: "1 1 auto",
  alignItems: "center",
  gap: "1px",
  minWidth: 0,
  maxWidth: "none",
  flexShrink: 1,
  overflowX: "auto",
  overflowY: "hidden",
  scrollbarWidth: "none",
};

const mobileRight = {
  ...right,
  display: "flex",
  gap: "2px",
  flexShrink: 0,
  overflowX: "auto", // Enable horizontal scrolling
  overflowY: "hidden", // Hide vertical overflow
  scrollbarWidth: "thin", // Thin scrollbar for better UX
  msOverflowStyle: "none", // Hide scrollbar in IE/Edge
  minWidth: "0", // Allow shrinking
  maxWidth: "60%",
  "&::-webkit-scrollbar": {
    height: "4px",
  },
  "&::-webkit-scrollbar-thumb": {
    backgroundColor: "#ccc",
    borderRadius: "2px",
  },
};

const wrappedMobileReadNav = {
  ...mobileNav,
  boxSizing: "border-box",
  height: "94px",
  alignContent: "flex-start",
  alignItems: "center",
  flexWrap: "wrap",
  gap: "4px 0",
  padding: "4px",
};

const wrappedMobileReadLeft = {
  ...mobileLeft,
  height: "40px",
};

const wrappedMobileReadCenter = {
  ...mobileCenter,
  flex: "1 1 auto",
  minWidth: "132px",
  height: "40px",
  justifyContent: "flex-end",
  paddingRight: "4px",
};

const wrappedMobileReadRight = {
  ...right,
  boxSizing: "border-box",
  display: "flex",
  flexShrink: 0,
  width: "100%",
  maxWidth: "100%",
  minWidth: 0,
  height: "42px",
  alignItems: "center",
  justifyContent: "space-between",
  gap: "4px",
  overflowX: "hidden",
  overflowY: "hidden",
  padding: "0 2px",
};

const compactMobileCenter = {
  ...mobileCenter,
  flex: "0 0 auto",
  minWidth: 0,
};

const compactMobileRight = {
  ...mobileRight,
  gap: "1px",
  overscrollBehaviorX: "contain",
};

const mobileHomeBtn = {
  ...homeBtn,
  padding: "8px",
  fontSize: "16px",
  minWidth: "40px",
  minHeight: "40px",
  flexShrink: 0,
};

const mobileLinkBtn = {
  padding: "6px 8px",
  borderRadius: "6px",
  border: "1px solid #ccc",
  background: "#fff",
  cursor: "pointer",
  fontSize: "11px",
  minWidth: "60px",
  minHeight: "36px", // Reduced height
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  whiteSpace: "nowrap",
  flexShrink: "0", // Prevent shrinking
};

const compactMobileHomeBtn = {
  ...mobileHomeBtn,
  boxSizing: "border-box",
  width: "40px",
  maxWidth: "40px",
  height: "40px",
};

const compactMobileLinkBtn = {
  ...mobileLinkBtn,
  boxSizing: "border-box",
  padding: "6px 3px",
  fontSize: "10px",
  minWidth: "50px",
};

const compactMobileMenuBtn = {
  ...homeBtn,
  boxSizing: "border-box",
  width: "40px",
  minWidth: "40px",
  height: "40px",
  minHeight: "40px",
  padding: 0,
  marginRight: "8px",
};

const mobileDeckToggleBtn = {
  ...compactMobileLinkBtn,
  minWidth: "38px",
  minHeight: "36px",
  padding: "4px 8px",
  border: "1px solid #d5dce5",
  background: "#f8fafc",
  color: "#475569",
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

const compactMobileApplyBtn = {
  ...mobileApplyBtn,
  boxSizing: "border-box",
};

const mobileInput = {
  boxSizing: "border-box",
  width: "42px",
  padding: "3px",
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

const referenceMobileReadFilterPill = {
  display: "flex",
  alignItems: "center",
  boxSizing: "border-box",
  borderRadius: "999px",
  border: "1px solid #ccc",
  background: "#fff",
  cursor: "pointer",
  padding: "3px 4px",
  fontSize: "9px",
  userSelect: "none",
  whiteSpace: "nowrap",
  flexShrink: 0,
};

const referenceMobileReadLinkBtn = {
  boxSizing: "border-box",
  borderRadius: "6px",
  border: "1px solid #ccc",
  background: "#fff",
  cursor: "pointer",
  minWidth: 0,
  minHeight: "30px",
  padding: "3px 1px",
  fontSize: "9px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  whiteSpace: "nowrap",
  flexShrink: 0,
};

const wrappedMobileReadMenuBtn = {
  ...compactMobileMenuBtn,
  width: "36px",
  minWidth: "36px",
  height: "36px",
  minHeight: "36px",
  marginRight: "4px",
};

const wrappedMobileReadHomeBtn = {
  ...compactMobileHomeBtn,
  width: "36px",
  maxWidth: "36px",
  height: "36px",
  minWidth: "36px",
  minHeight: "36px",
  padding: "4px",
  fontSize: "14px",
};

const wrappedMobileReadInput = {
  ...mobileInput,
  width: "38px",
  minHeight: "28px",
  fontSize: "11px",
};

const wrappedMobileReadApplyBtn = {
  ...compactMobileApplyBtn,
  minWidth: "48px",
  minHeight: "28px",
  padding: "4px 6px",
  fontSize: "11px",
};

const wrappedMobileReadFilterPill = {
  ...mobileFilterPill,
  boxSizing: "border-box",
  minHeight: "30px",
  padding: "4px 5px",
  fontSize: "9px",
};

const wrappedMobileReadLinkBtn = {
  ...compactMobileLinkBtn,
  minWidth: "48px",
  minHeight: "30px",
  padding: "4px",
  fontSize: "9px",
};

const darkNav = {
  background: "#111827",
  color: "#f3f4f6",
  borderBottom: "1px solid #374151",
  boxShadow: "0 2px 4px rgba(0,0,0,0.35)",
};

const themeToggleBtn = {
  whiteSpace: "nowrap",
};
