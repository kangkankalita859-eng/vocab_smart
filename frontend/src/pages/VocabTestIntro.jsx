import { useMemo, useState, useEffect } from "react";

import SessionNav from "../components/SessionNav";
import MobileSidebar from "../components/MobileSidebar";
import useMobile from "../hooks/useMobile";

export default function VocabTestIntro({ config, onSelectSet, onGoHome, onGoRead }) {
  const { isMobile } = useMobile();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [sets, setSets] = useState([]);
  const [loading, setLoading] = useState(true);

  // Load test sets from vocab_test.json
  useEffect(() => {
    const loadTestSets = async () => {
      try {
        const response = await fetch('/data/english/vocab_test.json');
        const questions = await response.json();

        // Group questions by set
        const setMap = new Map();
        questions.forEach(q => {
          if (!setMap.has(q.set)) {
            setMap.set(q.set, []);
          }
          setMap.get(q.set).push(q);
        });

        // Create sets array from grouped data
        const testSets = Array.from(setMap.entries()).map(([setNum, setQuestions]) => ({
          index: setNum - 1,
          setNumber: setNum,
          start: 0, // Start from 0 for the test
          limit: setQuestions.length,
          title: `Practice Set - ${setNum}`,
          subtitle: `Direction (Q. 1-${setQuestions.length}): Select the option that can be used as a one-word substitute for the given word/meaning.`,
        })).sort((a, b) => a.setNumber - b.setNumber);

        setSets(testSets);
        setLoading(false);
      } catch (error) {
        console.error('Failed to load test sets:', error);
        setLoading(false);
      }
    };

    loadTestSets();
  }, []);

  return (
    <>
      <SessionNav
        mode="Exam"
        config={config}
        onApplyRange={() => {}}
        onGoRead={onGoRead}
        onGoCards={() => {}}
        onGoHome={onGoHome}
        isMobile={isMobile}
        onMenuToggle={() => setMobileMenuOpen(true)}
      />

      <div style={page}>
        <div style={container}>
          <h2 style={{ marginTop: 0 }}>Vocabulary Exam</h2>
          <p style={{ marginTop: 6, color: "#555" }}>
            Choose a practice set.
          </p>

          {loading ? (
            <p style={{ marginTop: 20, color: "#888", textAlign: "center" }}>
              Loading test sets...
            </p>
          ) : sets.length === 0 ? (
            <p style={{ marginTop: 16, color: "#777" }}>
              No test sets available.
            </p>
          ) : (
            <div style={grid}>
              {sets.map((s) => (
                <button
                  key={s.index}
                  style={setCard}
                  onClick={() => onSelectSet && onSelectSet({
                    setNumber: s.setNumber,
                    start: s.start,
                    limit: s.limit,
                    title: s.title
                  })}
                >
                  <div style={{ fontWeight: 700, fontSize: 16 }}>{s.title}</div>
                  <div style={{ marginTop: 8, fontSize: 12, color: "#666", lineHeight: 1.35 }}>
                    {s.subtitle}
                  </div>
                  <div style={{ marginTop: 10, fontSize: 12, color: "#111" }}>
                    Questions: {s.limit}
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

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

const page = {
  minHeight: "calc(100vh - 60px)",
  background: "#f5f5f5",
  display: "flex",
  justifyContent: "center",
  alignItems: "flex-start",
  paddingTop: "90px",
  marginLeft: "0px",
};

const container = {
  width: "95%",
  maxWidth: "1100px",
  background: "#fff",
  padding: "24px",
  borderRadius: "12px",
  boxShadow: "0 8px 20px rgba(0,0,0,0.1)",
};

const grid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
  gap: "14px",
  marginTop: "18px",
};

const setCard = {
  textAlign: "left",
  padding: "16px",
  borderRadius: "12px",
  border: "1px solid #e0e0e0",
  background: "#fafafa",
  cursor: "pointer",
};
