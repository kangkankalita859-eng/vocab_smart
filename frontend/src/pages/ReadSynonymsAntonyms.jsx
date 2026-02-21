import { useEffect, useState } from "react";

import SessionNav from "../components/SessionNav";
import MobileSidebar from "../components/MobileSidebar";

import { synonymsAntonymsService } from "../services/synonymsAntonymsService";

import useMobile from "../hooks/useMobile";

export default function ReadSynonymsAntonyms({
  config,
  onGoCards,
  onUpdateConfig,
  onGoHome,
}) {
  const [synonymsAntonyms, setSynonymsAntonyms] = useState([]);
  const [loading, setLoading] = useState(true);
  const { isMobile } = useMobile();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  console.log('ReadSynonymsAntonyms component mounted');

  /* -------- FETCH SYNONYMS & ANTONYMS -------- */
  useEffect(() => {
    const safeConfig = config || { start: 0, limit: 20 };
    
    setLoading(true);
    synonymsAntonymsService.getSynonymsAntonyms(safeConfig.start, safeConfig.limit)
      .then((data) => {
        if (data.status === 'success') {
          setSynonymsAntonyms(data.data);
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
    return <p style={{ textAlign: "center" }}>Loading synonyms and antonyms…</p>;
  }

  /* -------- UI -------- */
  return (
    <>
      {/* NAV BAR */}
      <SessionNav
        mode="Read"
        config={config}
        onApplyRange={onUpdateConfig}
        onGoRead={() => {}}
        onGoCards={() => {}}
        onGoTest={onGoCards}
        onGoHome={onGoHome}
        isMobile={isMobile}
        onMenuToggle={() => setMobileMenuOpen(true)}
      />

      <div style={page}>
        <div style={container}>
          <h2 style={heading}>Synonyms & Antonyms with Hindi Meanings</h2>

          <table style={table}>
            <thead>
              <tr>
                <th style={th}>SN</th>
                <th style={th}>One Word</th>
                <th style={th}>Hindi Meaning</th>
                <th style={th}>Meaning</th>
                <th style={th}>Synonyms</th>
                <th style={th}>Antonyms</th>
              </tr>
            </thead>

            <tbody>
              {synonymsAntonyms.map((item) => (
                <tr key={item.id}>
                  <td style={td}>{item.id}</td>
                  <td style={{ ...td, fontWeight: "600" }}>
                    {item.word}
                  </td>
                  <td style={td}>{item.hindiMeaning}</td>
                  <td style={td}>{item.meaning}</td>
                  <td style={td}>
                    {item.synonyms.map((syn, index) => (
                      <div key={index} style={{ marginBottom: "4px" }}>
                        <strong>{syn.word}</strong> ({syn.hindiMeaning})
                      </div>
                    ))}
                  </td>
                  <td style={td}>
                    {item.antonyms.map((ant, index) => (
                      <div key={index} style={{ marginBottom: "4px" }}>
                        <strong>{ant.word}</strong> ({ant.hindiMeaning})
                      </div>
                    ))}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {synonymsAntonyms.length === 0 && (
            <p style={{ marginTop: "16px", color: "#777" }}>
              No synonyms and antonyms found for the selected range.
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
  maxWidth: "1400px", // Increased width for more columns
  background: "#fff",
  padding: "24px",
  borderRadius: "10px",
  boxShadow: "0 8px 20px rgba(0,0,0,0.1)",
};

const heading = {
  marginBottom: "16px",
};

const table = {
  width: "100%",
  borderCollapse: "collapse",
  fontSize: "14px",
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
