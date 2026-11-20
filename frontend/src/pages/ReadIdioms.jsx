import { useEffect, useState } from "react";

import SessionNav from "../components/SessionNav";
import MobileSidebar from "../components/MobileSidebar";

import { fetchIdioms } from "../services/idiomsService";

import useMobile from "../hooks/useMobile";

export default function ReadIdioms({
  config,
  onGoCards,
  onGoTest,
  onUpdateConfig,
  onGoHome,
}) {
  const [idioms, setIdioms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sscOnly, setSscOnly] = useState(false);
  const { isMobile } = useMobile();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  /* -------- FETCH IDIOMS BASED ON RANGE -------- */

  useEffect(() => {
    // Ensure we have a valid config
    const safeConfig = config || { start: 0, limit: 20 };
    
    setLoading(true);
    fetchIdioms(safeConfig.start, safeConfig.limit)
      .then((data) => {
        if (data.status === 'success') {
          setIdioms(data.data);
        } else {
          console.error('API Error:', data.message);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error('Fetch error:', error);
        setLoading(false);
      });
  }, [config]);

  /* -------- LOADING -------- */

  if (loading) {
    return <p style={{ textAlign: "center" }}>Loading idioms and phrases…</p>;
  }

  /* -------- UI -------- */

  const filteredIdioms = sscOnly
    ? idioms.filter((item) => Number(item.sscCount || 0) >= 1)
    : idioms;

  return (
    <>
      {/* NAV BAR */}
      <SessionNav
        mode="Read Idioms"
        mobileReadNavLayout="reference"
        config={config}
        onApplyRange={onUpdateConfig}
        onGoRead={() => {}}
        onGoCards={onGoCards}
        onGoTest={onGoTest}
        onGoHome={onGoHome}
        showSscFilter
        sscOnly={sscOnly}
        onToggleSscOnly={setSscOnly}
        isMobile={isMobile}
        onMenuToggle={() => setMobileMenuOpen(true)}
      />

      <div
        style={{
          ...page,
          ...(!isMobile ? {} : mobilePage),
          background: isMobile ? "#fff" : page.background,
        }}
      >
        <div style={isMobile ? mobileContainer : container}>
          <h2 style={isMobile ? mobileHeading : heading}>Read & Memorize Idioms & Phrases</h2>

          <table style={isMobile ? mobileTable : table}>
            <thead>
              <tr>
                <th style={isMobile ? { ...mobileTh, width: "6%" } : th}>SN</th>
                <th style={isMobile ? { ...mobileTh, width: "19%" } : th}>Idiom / Phrase</th>
                <th style={isMobile ? { ...mobileTh, width: "22%" } : th}>English Meaning</th>
                <th style={isMobile ? { ...mobileTh, width: "15%" } : th}>Hindi Meaning</th>
                <th style={isMobile ? { ...mobileTh, width: "10%" } : th}>SSC Count</th>
                <th style={isMobile ? { ...mobileTh, width: "28%" } : th}>Example Sentence</th>
              </tr>
            </thead>

            <tbody>
              {filteredIdioms.map((item) => (
                <tr key={item.id}>
                  <td style={isMobile ? mobileTd : td}>{item.id}</td>
                  <td style={{ ...(isMobile ? mobileTd : td), fontWeight: "600", color: "#2c3e50" }}>
                    {item.phrase}
                  </td>
                  <td style={isMobile ? mobileTd : td}>{item.meaning}</td>
                  <td style={isMobile ? mobileTd : td}>{item.hindiMeaning}</td>
                  <td style={{ ...(isMobile ? mobileTd : td), textAlign: "center", fontWeight: "600", color: "#e74c3c" }}>
                    {item.sscCount}
                  </td>
                  <td
                    style={{
                      ...(isMobile ? mobileTd : td),
                      fontStyle: "italic",
                      color: "#444",
                      ...(!isMobile ? { maxWidth: "300px" } : {}),
                    }}
                  >
                    {item.example ? item.example : "—"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filteredIdioms.length === 0 && (
            <p style={{ marginTop: "16px", color: "#777" }}>
              No idioms and phrases found for the selected range.
            </p>
          )}
        </div>
      </div>

      {/* Mobile sidebar only - no desktop sidebar */}
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

/* ---------------- STYLES ---------------- */

const page = {
  minHeight: "calc(100vh - 60px)",
  background: "#f5f5f5",
  display: "flex",
  justifyContent: "center",
  alignItems: "flex-start",
  paddingTop: "80px", // Add padding for fixed navbar
  marginLeft: "0px", // Remove sidebar margin on desktop
};

const container = {
  width: "95%",
  maxWidth: "1200px",
  padding: "24px",
  boxSizing: "border-box",
};

const mobilePage = {
  minHeight: "calc(100vh - 50px)",
  flexDirection: "column",
  alignItems: "center",
  paddingTop: "40px",
};

const mobileContainer = {
  width: "100%",
  padding: "12px 4px",
  boxSizing: "border-box",
};

const heading = {
  marginBottom: "16px",
};

const mobileHeading = {
  margin: "0 6px 10px",
  fontSize: "18px",
  lineHeight: "1.15",
};

const table = {
  width: "100%",
  borderCollapse: "collapse",
  fontSize: "14px",
};

const mobileTable = {
  width: "100%",
  tableLayout: "fixed",
  borderCollapse: "collapse",
  fontSize: "7.5px",
  lineHeight: "1.25",
};

const th = {
  border: "1px solid #ccc",
  padding: "8px",
  background: "#eee",
  textAlign: "left",
};

const td = {
  border: "1px solid #ccc",
  padding: "8px",
  verticalAlign: "top",
};

const mobileTh = {
  border: "1px solid #ccc",
  padding: "3px 1px",
  background: "#eee",
  textAlign: "left",
  overflowWrap: "break-word",
  wordBreak: "break-word",
  verticalAlign: "middle",
};

const mobileTd = {
  border: "1px solid #ccc",
  padding: "4px 2px",
  verticalAlign: "top",
  overflowWrap: "break-word",
  wordBreak: "break-word",
};
