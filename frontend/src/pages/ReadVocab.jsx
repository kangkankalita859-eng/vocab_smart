import { useEffect, useState } from "react";

import SessionNav from "../components/SessionNav";
import MobileSidebar from "../components/MobileSidebar";

import { fetchVocab } from "../services/vocabService";

import useMobile from "../hooks/useMobile";

import "../styles/vocab-page.css";


export default function ReadVocab({

  config,

  onGoCards,

  onGoTest,

  onUpdateConfig,

  onGoHome,

}) {

  const [vocab, setVocab] = useState([]);

  const [loading, setLoading] = useState(true);

  const { isMobile, isTablet } = useMobile();
  const isCompactNav = isMobile || isTablet;

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const [sscOnly, setSscOnly] = useState(false);

  const [sortByExamFrequency, setSortByExamFrequency] = useState(false);

  /* -------- FETCH VOCAB BASED ON RANGE -------- */



  useEffect(() => {

    // Ensure we have a valid config

    const safeConfig = config || { start: 0, limit: 20 };

    

    setLoading(true);

    fetchVocab(safeConfig.start, safeConfig.limit)

      .then((data) => {

        if (data.status === 'success') {

          setVocab(data.data);

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

    return <p style={{ textAlign: "center" }}>Loading vocabulary…</p>;

  }



  /* -------- UI -------- */

  const filteredVocab = sscOnly
    ? vocab.filter((item) => Number(item.sscCount || 0) >= 1)
    : vocab;

  // Sort by exam frequency if toggle is on
  const displayedVocab = sortByExamFrequency
    ? [...filteredVocab].sort((a, b) => {
        const aCount = Number(a.sscCount || 0);
        const bCount = Number(b.sscCount || 0);
        return bCount - aCount; // Descending order - highest count first
      })
    : filteredVocab;



  return (
    <>
      {/* NAV BAR */}
      <SessionNav
        mode="Read"
        config={config}
        onApplyRange={onUpdateConfig}
        onGoRead={() => {}}
        onGoCards={onGoCards}
        onGoTest={onGoTest}
        testLabel="📝 Exam"
        onGoHome={onGoHome}
        showSscFilter
        sscOnly={sscOnly}
        onToggleSscOnly={setSscOnly}
        showExamFrequencySort
        sortByExamFrequency={sortByExamFrequency}
        onToggleSortByExamFrequency={setSortByExamFrequency}
        isMobile={isCompactNav}
        onMenuToggle={() => setMobileMenuOpen(true)}
      />

      <div
        style={{
          ...page,
          background: isMobile ? "#fff" : page.background,
          paddingTop: isCompactNav ? "60px" : page.paddingTop,
        }}
      >
        <div className="vocab-page-container" style={container}>
          <h2 style={heading}>Read & Memorize Vocabulary</h2>

          <div className="vocab-table-wrapper" style={tableWrapper}>
            <table className="vocab-table" style={table}>
              <thead>
                <tr>
                  <th style={th}>SN</th>
                  <th style={th}>Phrase / Meaning</th>
                  <th style={th}>One Word</th>
                  <th style={th}>Hindi</th>
                  <th style={th}>Exam Count</th>
                  <th style={th}>Example Sentence</th>
                  <th style={th}>Synonyms</th>
                </tr>
              </thead>

              <tbody>
                {displayedVocab.map((item) => (
                  <tr key={item.id}>
                    <td style={td}>{item.id}</td>
                    <td style={td}>{item.meaning}</td>
                    <td style={{ ...td, fontWeight: "600" }}>
                      {item.word}
                    </td>
                    <td style={td}>{item.hindiMeaning}</td>
                    <td style={{ ...td, textAlign: "center", fontWeight: "600", color: "#e74c3c" }}>
                      {Number(item.sscCount || 0)} ({Number(item.otherExamCount || 0)})
                    </td>
                    <td
                      style={{
                        ...td,
                        fontStyle: "italic",
                        color: "#444",
                        maxWidth: "300px",
                      }}
                    >
                      {item.example ? item.example : "—" }
                    </td>
                    <td style={{ ...td, maxWidth: "150px" }}>
                      {item.synonyms.map((synonym, index) => (
                        <div key={index} style={{ fontSize: "0.85rem" }}>
                          {synonym}
                        </div>
                      ))}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {displayedVocab.length === 0 && (
            <p style={{ marginTop: "16px", color: "#777" }}>
              No vocabulary found for the selected range.
            </p>
          )}
        </div>
      </div>

      {/* Mobile sidebar only - no desktop sidebar */}
      {isCompactNav && (
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
  paddingTop: "80px",
  marginLeft: "0px",
};

const container = {
  width: "95%",
  maxWidth: "1200px",
  padding: "24px",
  boxSizing: "border-box",
};

const heading = {
  marginBottom: "16px",
};

const table = {
  width: "100%",
  borderCollapse: "collapse",
  fontSize: "14px",
};

const tableWrapper = {
  maxWidth: "100%",
  overflowX: "auto",
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

