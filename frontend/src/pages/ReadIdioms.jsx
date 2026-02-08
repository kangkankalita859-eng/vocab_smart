import { useEffect, useState } from "react";

import SessionNav from "../components/SessionNav";
import MobileSidebar from "../components/MobileSidebar";
import Sidebar from "../components/Sidebar";

import { fetchIdioms } from "../services/idiomsService";

import useMobile from "../hooks/useMobile";

export default function ReadIdioms({
  config,
  onGoCards,
  onUpdateConfig,
  onGoHome,
}) {
  const [idioms, setIdioms] = useState([]);
  const [loading, setLoading] = useState(true);
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

  return (
    <>
      {/* SIDEBAR - Desktop or Mobile */}
      {isMobile ? (
        <MobileSidebar
          isOpen={mobileMenuOpen}
          onClose={() => setMobileMenuOpen(false)}
          onSubjectSelect={() => {}}
          onSubtopicSelect={() => {}}
        />
      ) : (
        <Sidebar 
          onSubjectSelect={() => {}}
          onSubtopicSelect={() => {}}
        />
      )}

      {/* NAV BAR */}
      <SessionNav
        mode="Read Idioms"
        config={config}
        onApplyRange={onUpdateConfig}
        onGoRead={() => {}}
        onGoCards={onGoCards}
        onGoHome={onGoHome}
        isMobile={isMobile}
        onMenuToggle={() => setMobileMenuOpen(true)}
      />

      <div style={page}>
        <div style={container}>
          <h2 style={heading}>Read & Memorize Idioms & Phrases</h2>

          <table style={table}>
            <thead>
              <tr>
                <th style={th}>SN</th>
                <th style={th}>Idiom / Phrase</th>
                <th style={th}>English Meaning</th>
                <th style={th}>Hindi Meaning</th>
                <th style={th}>SSC Count</th>
                <th style={th}>Example Sentence</th>
              </tr>
            </thead>

            <tbody>
              {idioms.map((item) => (
                <tr key={item.id}>
                  <td style={td}>{item.id}</td>
                  <td style={{ ...td, fontWeight: "600", color: "#2c3e50" }}>
                    {item.phrase}
                  </td>
                  <td style={td}>{item.meaning}</td>
                  <td style={td}>{item.hindiMeaning}</td>
                  <td style={{ ...td, textAlign: "center", fontWeight: "600", color: "#e74c3c" }}>
                    {item.sscCount}
                  </td>
                  <td
                    style={{
                      ...td,
                      fontStyle: "italic",
                      color: "#444",
                      maxWidth: "300px",
                    }}
                  >
                    {item.example ? item.example : "—"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {idioms.length === 0 && (
            <p style={{ marginTop: "16px", color: "#777" }}>
              No idioms and phrases found for the selected range.
            </p>
          )}
        </div>
      </div>
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
};

const container = {
  width: "95%",
  maxWidth: "1400px",
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
  padding: "10px",
  background: "#eee",
  textAlign: "left",
  fontWeight: "600",
};

const td = {
  border: "1px solid #ccc",
  padding: "8px",
  verticalAlign: "top",
};
