import { useEffect, useState } from "react";

import SessionNav from "../components/SessionNav";
import MobileSidebar from "../components/MobileSidebar";
import Sidebar from "../components/Sidebar";

import { fetchVocab } from "../services/vocabService";

import useMobile from "../hooks/useMobile";



export default function ReadVocab({

  config,

  onGoCards,

  onUpdateConfig,

  onGoHome,

}) {

  const [vocab, setVocab] = useState([]);

  const [loading, setLoading] = useState(true);

  const { isMobile } = useMobile();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);



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
          <h2 style={heading}>Read & Memorize Vocabulary</h2>

          <table style={table}>
            <thead>
              <tr>
                <th style={th}>SN</th>
                <th style={th}>Phrase / Meaning</th>
                <th style={th}>One Word</th>
                <th style={th}>Hindi</th>
                <th style={th}>Example Sentence</th>
              </tr>
            </thead>

            <tbody>
              {vocab.map((item) => (
                <tr key={item.id}>
                  <td style={td}>{item.id}</td>
                  <td style={td}>{item.meaning}</td>
                  <td style={{ ...td, fontWeight: "600" }}>
                    {item.word}
                  </td>
                  <td style={td}>{item.hindiMeaning}</td>
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
                </tr>
              ))}
            </tbody>
          </table>

          {vocab.length === 0 && (
            <p style={{ marginTop: "16px", color: "#777" }}>
              No vocabulary found for the selected range.
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
  marginLeft: "0px", // Remove sidebar margin on desktop
};



const container = {

  width: "95%",

  maxWidth: "1200px",

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









