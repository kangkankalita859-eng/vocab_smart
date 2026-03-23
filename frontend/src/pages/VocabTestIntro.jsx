import { useMemo, useState } from "react";

import SessionNav from "../components/SessionNav";
import MobileSidebar from "../components/MobileSidebar";
import useMobile from "../hooks/useMobile";

export default function VocabTestIntro({ config, onSelectSet, onGoHome, onGoRead }) {
  const { isMobile } = useMobile();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const sets = useMemo(() => {
    const start = Number(config?.start || 0);
    const limit = Number(config?.limit || 0);
    const total = Math.max(0, limit);
    const count = Math.ceil(total / 10);

    return Array.from({ length: count }).map((_, i) => {
      const setStartOffset = i * 10;
      const setLimit = Math.min(10, total - setStartOffset);
      return {
        index: i,
        start: start + setStartOffset,
        limit: setLimit,
        title: `Practice Set - ${i + 1}`,
        subtitle: `Direction (Q. 1-${setLimit}): Select the option that can be used as a one-word substitute for the given word/meaning.`,
      };
    });
  }, [config]);

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
            Choose a practice set. Each set contains 10 questions.
          </p>

          <div style={grid}>
            {sets.map((s) => (
              <button
                key={s.index}
                style={setCard}
                onClick={() => onSelectSet && onSelectSet(s)}
              >
                <div style={{ fontWeight: 700, fontSize: 16 }}>{s.title}</div>
                <div style={{ marginTop: 8, fontSize: 12, color: "#666", lineHeight: 1.35 }}>
                  {s.subtitle}
                </div>
                <div style={{ marginTop: 10, fontSize: 12, color: "#111" }}>
                  Range: {s.start} - {s.start + s.limit - 1}
                </div>
              </button>
            ))}
          </div>

          {sets.length === 0 && (
            <p style={{ marginTop: 16, color: "#777" }}>
              No questions available for the selected range. Increase the End value.
            </p>
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
