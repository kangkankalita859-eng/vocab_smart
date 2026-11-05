import { useEffect, useState } from "react";

import SessionNav from "../components/SessionNav";
import MobileSidebar from "../components/MobileSidebar";

import { fetchVocab } from "../services/vocabService";
import { hasPersistedData, getDeckStats } from "../services/deckPersistenceService";

import useMobile from "../hooks/useMobile";
import "../styles/read-vocab.css";



export default function ReadVocab({

  config,

  onGoCards,

  onGoTest,

  onUpdateConfig,

  onGoHome,

}) {

  const [vocab, setVocab] = useState([]);

  const [loading, setLoading] = useState(true);

  const { isMobile } = useMobile();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const [sscOnly, setSscOnly] = useState(false);

  const [sortByExamFrequency, setSortByExamFrequency] = useState(false);

  const [showPersistedInfo, setShowPersistedInfo] = useState(false);

  const [deckStats, setDeckStats] = useState({
    unknownCount: 0,
    savedDeckCount: 0,
    inProgressCount: 0,
  });



  /* -------- CHECK PERSISTED DATA -------- */

  useEffect(() => {
    if (hasPersistedData('vocab')) {
      const stats = getDeckStats('vocab');
      setDeckStats(stats);
      setShowPersistedInfo(true);
    }
  }, []);

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
        isMobile={isMobile}
        onMenuToggle={() => setMobileMenuOpen(true)}
      />

      <div className="read-vocab-page">
        {/* PERSISTED DATA INFO */}
        {showPersistedInfo && (
          <div style={persistedInfo}>
            <div style={persistedInfoContent}>
              <span style={persistedInfoIcon}>📚</span>
              <div>
                <strong>You have saved vocabulary to review!</strong>
                <div style={persistedInfoDetails}>
                  {deckStats.unknownCount > 0 && (
                    <span>• {deckStats.unknownCount} unknown cards ready for revision</span>
                  )}
                  {deckStats.savedDeckCount > 0 && (
                    <span>• {deckStats.savedDeckCount} saved decks</span>
                  )}
                  {deckStats.inProgressCount > 0 && (
                    <span>• Continue your saved session with {deckStats.inProgressCount} cards remaining</span>
                  )}
                </div>
              </div>
              <button 
                style={persistedInfoClose}
                onClick={() => setShowPersistedInfo(false)}
              >
                ✕
              </button>
            </div>
            <div style={persistedInfoActions}>
              <button 
                style={persistedInfoButton}
                onClick={() => {
                  onGoCards();
                  setShowPersistedInfo(false);
                }}
              >
                🃏 Go to Flash Cards
              </button>
            </div>
          </div>
        )}
        
        <div className="read-vocab-container">
          <h2 className="read-vocab-heading">Read & Memorize Vocabulary</h2>

          <table className="read-vocab-table">
            <thead>
              <tr>
                <th>SN</th>
                <th>Phrase / Meaning</th>
                <th>One Word</th>
                <th>Hindi</th>
                <th>Exam Count</th>
                <th>Example Sentence</th>
                <th>Synonyms</th>
              </tr>
            </thead>

            <tbody>
              {displayedVocab.map((item) => (
                <tr key={item.id}>
                  <td data-label="SN">{item.id}</td>
                  <td data-label="Phrase / Meaning">{item.meaning}</td>
                  <td data-label="One Word" className="read-vocab-word">
                    {item.word}
                  </td>
                  <td data-label="Hindi">{item.hindiMeaning}</td>
                  <td data-label="Exam Count" className="read-vocab-exam-count">
                    {Number(item.sscCount || 0)} ({Number(item.otherExamCount || 0)})
                  </td>
                  <td data-label="Example Sentence" className="read-vocab-example">
                    {item.example ? item.example : "—" }
                  </td>
                  <td data-label="Synonyms">
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

          {displayedVocab.length === 0 && (
            <p style={{ marginTop: "16px", color: "#777" }}>
              No vocabulary found for the selected range.
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



const persistedInfo = {
  background: "#e3f2fd",
  border: "1px solid #2196f3",
  borderRadius: "8px",
  padding: "16px",
  marginBottom: "20px",
  boxShadow: "0 2px 8px rgba(33, 150, 243, 0.15)",
};

const persistedInfoContent = {
  display: "flex",
  alignItems: "flex-start",
  gap: "12px",
  marginBottom: "12px",
};

const persistedInfoIcon = {
  fontSize: "20px",
  marginTop: "2px",
};

const persistedInfoDetails = {
  fontSize: "13px",
  color: "#666",
  marginTop: "4px",
  display: "flex",
  flexDirection: "column",
  gap: "2px",
};

const persistedInfoClose = {
  marginLeft: "auto",
  background: "none",
  border: "none",
  fontSize: "16px",
  cursor: "pointer",
  color: "#666",
  padding: "4px",
};

const persistedInfoActions = {
  display: "flex",
  gap: "10px",
};

const persistedInfoButton = {
  background: "#2196f3",
  color: "white",
  border: "none",
  padding: "8px 16px",
  borderRadius: "6px",
  cursor: "pointer",
  fontSize: "14px",
  fontWeight: "500",
  transition: "background 0.2s ease",
};








