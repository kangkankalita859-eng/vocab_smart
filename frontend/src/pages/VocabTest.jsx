import { useEffect, useMemo, useState } from "react";

import SessionNav from "../components/SessionNav";
import MobileSidebar from "../components/MobileSidebar";
import useMobile from "../hooks/useMobile";

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default function VocabTest({ config, setConfig, onGoHome, onGoRead }) {
  const { isMobile } = useMobile();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [questions, setQuestions] = useState([]);
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [showReview, setShowReview] = useState(false);

  const total = questions.length;

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        setError(null);

        const res = await fetch("/data/english/vocab.json");
        const all = await res.json();

        const startId = Number(config?.start || 0);
        const limit = Number(config?.limit || 10);

        const setItems = (Array.isArray(all) ? all : []).filter((x) => x.id >= startId).slice(0, limit);

        const pool = (Array.isArray(all) ? all : []).filter((x) => x && x.word);

        const qs = setItems.map((item) => {
          const correct = item.word;
          const distractors = shuffle(pool.filter((p) => p.word !== correct)).slice(0, 3).map((p) => p.word);
          const options = shuffle([correct, ...distractors]);

          return {
            id: item.id,
            prompt: item.meaning,
            hindiMeaning: item.hindiMeaning,
            correct,
            options,
            example: item.example,
          };
        });

        setQuestions(qs);
        setCurrent(0);
        setAnswers({});
        setSubmitted(false);
        setShowReview(false);
        setLoading(false);
      } catch (e) {
        setError(e?.message || "Failed to load vocab test");
        setLoading(false);
      }
    };

    load();
  }, [config]);

  const score = useMemo(() => {
    if (!submitted) return 0;
    return questions.reduce((acc, q) => (answers[q.id] === q.correct ? acc + 1 : acc), 0);
  }, [submitted, questions, answers]);

  const handleSelect = (qId, option) => {
    if (submitted) return;
    setAnswers((p) => ({ ...p, [qId]: option }));
  };

  const handleSubmit = () => setSubmitted(true);

  const getQuestionStatus = (index) => {
    const question = questions[index];
    if (!question) return "not-visited";
    if (index === current) return "present";
    const hasAnswer = !!answers[question.id];
    return hasAnswer ? "answered" : "not-answered";
  };

  const getQuestionStatusColor = (status) => {
    switch (status) {
      case "answered":
        return "#4caf50";
      case "not-answered":
        return "#f44336";
      case "present":
        return "#1565c0";
      case "not-visited":
      default:
        return "#ffffff";
    }
  };

  if (loading) {
    return (
      <div style={{ textAlign: "center", padding: "40px" }}>
        <h2>Loading questions...</h2>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ textAlign: "center", padding: "40px" }}>
        <h2>Error loading test</h2>
        <p>{error}</p>
      </div>
    );
  }

  if (questions.length === 0) {
    return (
      <div style={{ textAlign: "center", padding: "40px" }}>
        <h2>No questions for this set</h2>
        <p>Increase the End value and try again.</p>
      </div>
    );
  }

  if (submitted && !showReview) {
    const correctAnswers = score;
    const wrongAnswers = questions.filter((q2) => answers[q2.id] && answers[q2.id] !== q2.correct);
    const notAttempted = questions.filter((q2) => !answers[q2.id]);

    return (
      <div style={resultsContainer}>
        <SessionNav
          mode="Results"
          config={config}
          onApplyRange={() => {}}
          onGoRead={onGoRead}
          onGoCards={() => {}}
          onGoHome={onGoHome}
          isMobile={isMobile}
          onMenuToggle={() => setMobileMenuOpen(true)}
        />

        <div style={resultsContent}>
          <h2 style={resultsTitle}>Test Results</h2>

          <div style={scoreSummary}>
            <div style={scoreCard}>
              <h3 style={scoreTitle}>Your Score</h3>
              <div style={scoreNumber}>
                {correctAnswers}/{questions.length}
              </div>
              <div style={scorePercentage}>
                {Math.round((correctAnswers / questions.length) * 100)}%
              </div>
            </div>

            <div style={statsGrid}>
              <div style={statItem}>
                <div style={statNumber}>{correctAnswers}</div>
                <div style={statLabel}>Correct</div>
              </div>
              <div style={statItem}>
                <div style={statNumber}>{wrongAnswers.length}</div>
                <div style={statLabel}>Wrong</div>
              </div>
              <div style={statItem}>
                <div style={statNumber}>{notAttempted.length}</div>
                <div style={statLabel}>Not Attempted</div>
              </div>
              <div style={statItem}>
                <div style={statNumber}>{questions.length}</div>
                <div style={statLabel}>Total Questions</div>
              </div>
            </div>
          </div>

          <div style={reviewButtonContainer}>
            <button style={reviewButton} onClick={() => setShowReview(true)}>
              📋 Review Answers
            </button>
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
      </div>
    );
  }

  if (submitted && showReview) {
    return (
      <>
        <SessionNav
          mode="Review"
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
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <h2 style={{ margin: 0 }}>Review Answers</h2>
              <button style={secondaryBtn} onClick={() => setShowReview(false)}>
                ← Back to Results
              </button>
            </div>

            <div style={{ marginTop: 16, display: "flex", flexDirection: "column", gap: 12 }}>
              {questions.map((q2, idx) => {
                const your = answers[q2.id];
                const correct = q2.correct;
                const ok = your && your === correct;

                return (
                  <div key={q2.id} style={reviewRow}>
                    <div style={{ display: "flex", justifyContent: "space-between", gap: 10 }}>
                      <div style={{ fontWeight: 700 }}>Q{idx + 1}.</div>
                      <div style={{ marginLeft: "auto", fontWeight: 700, color: ok ? "#2e7d32" : "#d32f2f" }}>
                        {ok ? "Correct" : your ? "Wrong" : "Not Attempted"}
                      </div>
                    </div>
                    <div style={{ marginTop: 8, color: "#111", fontWeight: 700 }}>{q2.prompt}</div>
                    {q2.hindiMeaning ? (
                      <div style={{ marginTop: 6, color: "#444" }}>
                        <strong>Hindi:</strong> {q2.hindiMeaning}
                      </div>
                    ) : (
                      ""
                    )}
                    <div style={{ marginTop: 10 }}>
                      <div>
                        <strong>Your Answer:</strong> {your || "—"}
                      </div>
                      <div style={{ marginTop: 4 }}>
                        <strong>Correct Answer:</strong> {correct}
                      </div>
                    </div>
                    {q2.example ? (
                      <div style={{ marginTop: 8, color: "#444" }}>
                        <strong>Example:</strong> {q2.example}
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                );
              })}
            </div>
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

  const q = questions[current];
  const selected = answers[q.id];

  return (
    <>
      <SessionNav
        mode="Test"
        config={config}
        onApplyRange={(c) => setConfig && setConfig(c)}
        onGoRead={onGoRead}
        onGoCards={() => {}}
        onGoHome={onGoHome}
        isMobile={isMobile}
        onMenuToggle={() => setMobileMenuOpen(true)}
      />

      <div style={page}>
        <div style={testLayout}>
          <div style={testMainCard}>
            <div style={topRow}>
              <div style={{ fontWeight: 700 }}>Practice Set</div>
              <div style={{ color: "#555" }}>
                Q. {current + 1} / {total}
              </div>
            </div>

            <div style={promptBox}>
              <div style={{ fontSize: 12, color: "#666", marginBottom: 8 }}>
                Direction: Select the correct one-word for the given meaning.
              </div>
              <div style={{ fontSize: 16, fontWeight: 700, lineHeight: 1.5 }}>{q.prompt}</div>
              {q.hindiMeaning ? (
                <div style={{ marginTop: 10, color: "#444" }}>
                  <strong>Hindi:</strong> {q.hindiMeaning}
                </div>
              ) : (
                ""
              )}
            </div>

            <div style={optionsGrid}>
              {q.options.map((opt) => {
                const isSelected = selected === opt;

                return (
                  <button
                    key={opt}
                    style={{
                      ...optionBtn,
                      ...(isSelected ? optionSelected : {}),
                    }}
                    onClick={() => handleSelect(q.id, opt)}
                  >
                    {opt}
                  </button>
                );
              })}
            </div>

            <div style={navRow}>
              <button
                style={{ ...secondaryBtn, opacity: current === 0 ? 0.5 : 1 }}
                disabled={current === 0}
                onClick={() => setCurrent((p) => Math.max(0, p - 1))}
              >
                ← Prev
              </button>

              <button style={primaryBtn} onClick={handleSubmit}>
                Submit
              </button>

              <button
                style={{ ...secondaryBtn, opacity: current === total - 1 ? 0.5 : 1 }}
                disabled={current === total - 1}
                onClick={() => setCurrent((p) => Math.min(total - 1, p + 1))}
              >
                Next →
              </button>
            </div>
          </div>

          <div style={paletteCard}>
            <div style={{ fontWeight: 700, marginBottom: 10 }}>Question Palette</div>
            <div style={paletteGrid}>
              {questions.map((q2, idx) => {
                const status = getQuestionStatus(idx);
                const bg = getQuestionStatusColor(status);
                const border = status === "present" ? "#1565c0" : "#ccc";
                const color = status === "not-visited" ? "#111" : "#fff";

                return (
                  <button
                    key={q2.id}
                    style={{
                      ...paletteBtn,
                      background: bg,
                      borderColor: border,
                      color,
                    }}
                    onClick={() => setCurrent(idx)}
                  >
                    {idx + 1}
                  </button>
                );
              })}
            </div>

            <div style={{ marginTop: 14, display: "grid", gridTemplateColumns: "1fr", gap: 8 }}>
              <div style={legendRow}>
                <span style={{ ...legendDot, background: "#4caf50" }} /> Answered
              </div>
              <div style={legendRow}>
                <span style={{ ...legendDot, background: "#f44336" }} /> Not Answered
              </div>
              <div style={legendRow}>
                <span style={{ ...legendDot, background: "#1565c0" }} /> Current
              </div>
              <div style={legendRow}>
                <span style={{ ...legendDot, background: "#ffffff", border: "1px solid #ccc" }} /> Not Visited
              </div>
            </div>
          </div>
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

const testLayout = {
  width: "95%",
  maxWidth: "1100px",
  display: "flex",
  gap: 16,
  alignItems: "flex-start",
};

const testMainCard = {
  flex: 1,
  background: "#fff",
  padding: "24px",
  borderRadius: "12px",
  boxShadow: "0 8px 20px rgba(0,0,0,0.1)",
};

const paletteCard = {
  width: 280,
  background: "#fff",
  padding: 16,
  borderRadius: 12,
  boxShadow: "0 8px 20px rgba(0,0,0,0.1)",
  border: "1px solid #eee",
};

const topRow = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  marginBottom: 14,
};

const promptBox = {
  border: "1px solid #e0e0e0",
  borderRadius: 12,
  padding: 16,
  background: "#fafafa",
};

const optionsGrid = {
  marginTop: 16,
  display: "grid",
  gridTemplateColumns: "repeat(2, 1fr)",
  gap: 12,
};

const optionBtn = {
  border: "1px solid #ccc",
  borderRadius: 10,
  padding: "12px 10px",
  background: "#fff",
  cursor: "pointer",
  fontWeight: 600,
};

const optionSelected = {
  borderColor: "#1976d2",
  background: "#e3f2fd",
};

const optionCorrect = {
  borderColor: "#2e7d32",
  background: "#e8f5e9",
};

const optionWrong = {
  borderColor: "#d32f2f",
  background: "#ffebee",
};

const navRow = {
  marginTop: 18,
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  gap: 10,
};

const primaryBtn = {
  padding: "10px 14px",
  background: "#1976d2",
  color: "white",
  border: "none",
  borderRadius: "10px",
  cursor: "pointer",
};

const secondaryBtn = {
  padding: "10px 14px",
  background: "#fff",
  color: "#111",
  border: "1px solid #ccc",
  borderRadius: "10px",
  cursor: "pointer",
};

const answerBox = {
  marginTop: 16,
  padding: 14,
  borderRadius: 12,
  border: "1px solid #e0e0e0",
  background: "#fff",
};

const paletteGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(5, 1fr)",
  gap: 10,
};

const paletteBtn = {
  width: "100%",
  height: 38,
  borderRadius: 8,
  border: "1px solid #ccc",
  cursor: "pointer",
  fontWeight: 700,
};

const legendRow = {
  display: "flex",
  alignItems: "center",
  gap: 8,
  fontSize: 12,
  color: "#333",
};

const legendDot = {
  width: 14,
  height: 14,
  borderRadius: 4,
};

const resultsContainer = {
  minHeight: "calc(100vh - 60px)",
  background: "#f5f5f5",
  paddingTop: "80px",
};

const resultsContent = {
  width: "95%",
  maxWidth: "900px",
  margin: "0 auto",
  background: "#fff",
  padding: "40px",
  borderRadius: "12px",
  boxShadow: "0 10px 28px rgba(0,0,0,0.12)",
  textAlign: "center",
};

const resultsTitle = {
  marginTop: 0,
  marginBottom: 24,
};

const scoreSummary = {
  display: "grid",
  gridTemplateColumns: "1fr 1.3fr",
  gap: 18,
  alignItems: "stretch",
};

const scoreCard = {
  border: "1px solid #eee",
  borderRadius: 12,
  padding: 20,
  background: "#fff",
};

const scoreTitle = {
  margin: 0,
  color: "#555",
  fontWeight: 600,
};

const scoreNumber = {
  marginTop: 10,
  fontSize: 44,
  fontWeight: 800,
  color: "#1976d2",
};

const scorePercentage = {
  marginTop: 6,
  fontSize: 18,
  fontWeight: 800,
  color: "#2e7d32",
};

const statsGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(2, 1fr)",
  gap: 12,
};

const statItem = {
  border: "1px solid #eee",
  borderRadius: 10,
  padding: 16,
  background: "#fafafa",
};

const statNumber = {
  fontSize: 24,
  fontWeight: 800,
  color: "#111",
};

const statLabel = {
  marginTop: 4,
  fontSize: 12,
  color: "#666",
};

const reviewButtonContainer = {
  marginTop: 26,
};

const reviewButton = {
  background: "#1976d2",
  color: "#fff",
  border: "none",
  padding: "12px 22px",
  borderRadius: 10,
  fontSize: 14,
  fontWeight: 700,
  cursor: "pointer",
  boxShadow: "0 8px 18px rgba(25,118,210,0.25)",
};

const reviewRow = {
  border: "1px solid #eee",
  borderRadius: 12,
  padding: 16,
  background: "#fff",
};
