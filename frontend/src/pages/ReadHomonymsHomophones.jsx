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
                <th style={th}>Pair</th>
                <th style={th}>Type</th>
                <th style={th}>Pronunciation</th>
                <th style={th}>Meaning</th>
                <th style={th}>Hindi Meaning</th>
                <th style={th}>Example Sentence</th>
              </tr>
            </thead>

            <tbody>
              {items.map((item, index) => {
                const currentGroup = item.group ?? item.id;
                const prevGroup = index > 0 ? (items[index - 1].group ?? items[index - 1].id) : null;
                const isNewGroup = index === 0 || currentGroup !== prevGroup;
                const groupTdStyle = isNewGroup ? groupBorderTop : null;

                return (
                  <tr key={item.id}>
                    <td style={{ ...td, ...(groupTdStyle || {}) }}>{isNewGroup ? currentGroup : ""}</td>
                    <td style={{ ...td, ...(groupTdStyle || {}), fontWeight: "700", color: "#2c3e50" }}>{item.word}</td>
                    <td style={{ ...td, ...(groupTdStyle || {}), textAlign: "center" }}>
                      {item.image ? (
                        <img
                          src={`/${item.image.replace(/^\/+/, "")}`}
                          alt={item.word}
                          style={{
                            width: "80px",
                            height: "80px",
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
                    <td style={{ ...td, ...(groupTdStyle || {}) }}>{item.pairWord || "—"}</td>
                    <td style={{ ...td, ...(groupTdStyle || {}) }}>{item.type || "—"}</td>
                    <td style={{ ...td, ...(groupTdStyle || {}) }}>{item.pronunciation || "—"}</td>
                    <td style={{ ...td, ...(groupTdStyle || {}) }}>{item.meaning || "—"}</td>
                    <td style={{ ...td, ...(groupTdStyle || {}) }}>{item.hindiMeaning || "—"}</td>
                    <td style={{ ...td, ...(groupTdStyle || {}), fontStyle: "italic", color: "#444", maxWidth: "300px" }}>
                      {item.example ? item.example : "—"}
                    </td>
                  </tr>
                );
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
