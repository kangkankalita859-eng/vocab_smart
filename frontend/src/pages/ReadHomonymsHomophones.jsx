import { useEffect, useState } from "react";

import SessionNav from "../components/SessionNav";
import MobileSidebar from "../components/MobileSidebar";

import { fetchHomonymsHomophones } from "../services/homonymsHomophonesService";

import useMobile from "../hooks/useMobile";

export default function ReadHomonymsHomophones({
  config,
  onGoCards,
  onUpdateConfig,
  onGoHome,
}) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const { isMobile } = useMobile();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const getPairWords = (pairWord) => {
    if (!pairWord) return [];
    if (Array.isArray(pairWord)) return pairWord.map(String).filter(Boolean);
    const v = String(pairWord);
    return v ? [v] : [];
  };

  const buildPairGroups = (list) => {
    const n = list.length;
    const parent = Array.from({ length: n }, (_, i) => i);

    const find = (x) => {
      while (parent[x] !== x) {
        parent[x] = parent[parent[x]];
        x = parent[x];
      }
      return x;
    };

    const union = (a, b) => {
      const ra = find(a);
      const rb = find(b);
      if (ra !== rb) parent[rb] = ra;
    };

    const byWord = new Map();
    list.forEach((it, idx) => {
      if (it?.word) byWord.set(String(it.word), idx);
    });

    list.forEach((it, idx) => {
      const pairs = getPairWords(it?.pairWord);
      pairs.forEach((pw) => {
        const j = byWord.get(pw);
        if (typeof j === "number") union(idx, j);
      });
    });

    const groups = new Map();
    list.forEach((it, idx) => {
      const root = find(idx);
      if (!groups.has(root)) groups.set(root, []);
      groups.get(root).push(it);
    });

    return Array.from(groups.values())
      .map((g) => g.sort((a, b) => Number(a.id) - Number(b.id)))
      .sort((a, b) => Number(a[0]?.id) - Number(b[0]?.id));
  };

  useEffect(() => {
    const safeConfig = config || { start: 0, limit: 20 };

    setLoading(true);
    fetchHomonymsHomophones(safeConfig.start, safeConfig.limit)
      .then((data) => {
        if (data.status === "success") {
          setItems(data.data);
        } else {
          console.error("API Error:", data.message);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error("Fetch error:", error);
        setLoading(false);
      });
  }, [config]);

  if (loading) {
    return <p style={{ textAlign: "center" }}>Loading homonyms and homophones…</p>;
  }

  return (
    <>
      <SessionNav
        mode="Read"
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
          <h2 style={heading}>Homonyms & Homophones (with Visuals)</h2>

          <table style={table}>
            <thead>
              <tr>
                <th style={th}>SN</th>
                <th style={th}>Word</th>
                <th style={th}>Visual</th>
                <th style={th}>Meaning</th>
                <th style={th}>Hindi Meaning</th>
                <th style={th}>Example Sentence</th>
              </tr>
            </thead>

            <tbody>
              {buildPairGroups(items).map((groupItems, groupIndex) => {
                const groupTdStyle = groupIndex === 0 ? null : groupBorderTop;

                return groupItems.map((gi, itemIndex) => (
                  <tr key={gi.id}>
                    {itemIndex === 0 && (
                      <td style={{ ...td, ...(groupTdStyle || {}) }} rowSpan={groupItems.length}>
                        {groupIndex + 1}
                      </td>
                    )}

                    <td style={{ ...td, ...(itemIndex === 0 ? (groupTdStyle || {}) : {}) , fontWeight: 700, color: "#2c3e50" }}>
                      {gi.word}
                    </td>

                    <td style={{ ...td, ...(itemIndex === 0 ? (groupTdStyle || {}) : {}), textAlign: "center" }}>
                      {gi.image ? (
                        <img
                          src={`/${gi.image.replace(/^\/+/, "")}`}
                          alt={gi.word}
                          style={{
                            width: "60px",
                            height: "60px",
                            objectFit: "cover",
                            borderRadius: "8px",
                            border: "1px solid #e0e0e0",
                          }}
                          onError={(e) => {
                            e.currentTarget.style.display = "none";
                          }}
                        />
                      ) : (
                        ""
                      )}
                    </td>

                    <td style={{ ...td, ...(itemIndex === 0 ? (groupTdStyle || {}) : {}) }}>{gi.meaning || "—"}</td>
                    <td style={{ ...td, ...(itemIndex === 0 ? (groupTdStyle || {}) : {}) }}>{gi.hindiMeaning || "—"}</td>
                    <td
                      style={{
                        ...td,
                        ...(itemIndex === 0 ? (groupTdStyle || {}) : {}),
                        fontStyle: "italic",
                        color: "#444",
                        maxWidth: "300px",
                      }}
                    >
                      {gi.example ? gi.example : "—"}
                    </td>
                  </tr>
                ));
              })}
            </tbody>
          </table>

          {items.length === 0 && (
            <p style={{ marginTop: "16px", color: "#777" }}>
              No homonyms/homophones found for the selected range.
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
  paddingTop: "80px",
  marginLeft: "0px",
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
  padding: "10px",
  background: "#f0f0f0",
  border: "1px solid #ddd",
  textAlign: "left",
};

const td = {
  padding: "10px",
  border: "1px solid #ddd",
  verticalAlign: "top",
};

const groupBorderTop = {
  borderTop: "3px solid #000",
};
