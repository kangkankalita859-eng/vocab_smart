import { useState } from "react";
import SessionNav from "../components/SessionNav";
import MobileSidebar from "../components/MobileSidebar";
import useMobile from "../hooks/useMobile";

export default function SynonymsAntonymsTestIntro({
  config,
  onStartTest,
  onGoHome,
}) {
  const { isMobile } = useMobile();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  console.log('SynonymsAntonymsTestIntro component mounted');

  const handleStartTest = () => {
    console.log('Starting test...');
    if (onStartTest) {
      onStartTest();
    } else {
      console.error('onStartTest is not defined');
    }
  };

  // Simple test to isolate the issue
  return (
    <div style={{ padding: "40px", textAlign: "center" }}>
      <h1>Test Introduction Page</h1>
      <p>15 Questions • 15 Minutes • 30 Marks</p>
      <button 
        style={{
          background: "#4caf50",
          color: "white",
          border: "none",
          padding: "16px 32px",
          fontSize: "18px",
          borderRadius: "8px",
          cursor: "pointer",
          marginTop: "20px"
        }}
        onClick={handleStartTest}
      >
        Start Test
      </button>
      <button 
        style={{
          background: "#2196f3",
          color: "white",
          border: "none",
          padding: "12px 24px",
          fontSize: "16px",
          borderRadius: "6px",
          cursor: "pointer",
          marginTop: "20px",
          marginLeft: "10px"
        }}
        onClick={onGoHome}
      >
        Go Home
      </button>
    </div>
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
  maxWidth: "800px",
  background: "#fff",
  padding: "32px",
  borderRadius: "12px",
  boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
};

const testHeader = {
  textAlign: "center",
  marginBottom: "32px",
  paddingBottom: "24px",
  borderBottom: "2px solid #e0e0e0",
};

const testTitle = {
  fontSize: "28px",
  fontWeight: "700",
  color: "#1976d2",
  marginBottom: "16px",
  margin: 0,
};

const testInfo = {
  display: "flex",
  justifyContent: "center",
  gap: "32px",
  flexWrap: "wrap",
};

const infoItem = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "4px",
};

const infoLabel = {
  fontSize: "14px",
  color: "#666",
  fontWeight: "500",
};

const infoValue = {
  fontSize: "18px",
  fontWeight: "700",
  color: "#2c3e50",
};

const buttonContainer = {
  textAlign: "center",
  marginBottom: "40px",
};

const startButton = {
  background: "#4caf50",
  color: "white",
  border: "none",
  padding: "16px 48px",
  fontSize: "18px",
  fontWeight: "600",
  borderRadius: "8px",
  cursor: "pointer",
  boxShadow: "0 4px 12px rgba(76, 175, 80, 0.3)",
  transition: "all 0.2s ease",
};

const instructionsContainer = {
  background: "#f8f9fa",
  padding: "24px",
  borderRadius: "8px",
  border: "1px solid #e9ecef",
};

const instructionsTitle = {
  fontSize: "20px",
  fontWeight: "600",
  color: "#2c3e50",
  marginBottom: "16px",
  marginTop: 0,
};

const instructionsList = {
  marginBottom: "24px",
};

const instructionItem = {
  display: "flex",
  alignItems: "flex-start",
  marginBottom: "12px",
  fontSize: "15px",
  color: "#495057",
  lineHeight: "1.5",
};

const bullet = {
  color: "#6c757d",
  fontWeight: "700",
  marginRight: "8px",
  fontSize: "16px",
};

const paletteContainer = {
  background: "#ffffff",
  padding: "20px",
  borderRadius: "8px",
  border: "1px solid #dee2e6",
};

const paletteTitle = {
  fontSize: "18px",
  fontWeight: "600",
  color: "#2c3e50",
  marginBottom: "16px",
  marginTop: 0,
};

const paletteGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(3, 1fr)",
  gap: "16px",
};

const paletteItem = {
  display: "flex",
  alignItems: "center",
  gap: "8px",
  fontSize: "14px",
  color: "#495057",
};

const paletteColor = {
  width: "16px",
  height: "16px",
  borderRadius: "4px",
  border: "1px solid #dee2e6",
};
