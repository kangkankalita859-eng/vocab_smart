import { useState } from "react";
import useMobile from "../hooks/useMobile";

export default function Schedules({ onGoHome }) {
  const { isMobile } = useMobile();

  const handleViewConstitution = () => {
    console.log('Constitution button clicked');
    
    // Try the most direct approaches
    try {
      // Method 1: Direct hash change
      window.location.hash = '#constitution';
      console.log('Hash set to:', window.location.hash);
      
      // Method 2: Force hash change with event
      const hashChangeEvent = new HashChangeEvent('hashchange');
      window.dispatchEvent(hashChangeEvent);
      console.log('Hash change event dispatched');
      
      // Method 3: Direct location reload with hash
      setTimeout(() => {
        const currentUrl = window.location.pathname;
        window.location.href = currentUrl + '#constitution';
        console.log('Direct href set to:', currentUrl + '#constitution');
      }, 50);
      
      // Method 4: PostMessage to parent
      if (window.parent !== window.self) {
        window.parent.postMessage({
          type: 'NAVIGATION_REQUEST',
          payload: { stage: 'constitution' }
        }, '*');
        console.log('PostMessage sent to parent');
      }
      
      // Method 5: Storage event
      localStorage.setItem('requestedStage', 'constitution');
      console.log('Stage saved to localStorage');
      
    } catch (error) {
      console.error('Navigation error:', error);
      // Ultimate fallback
      alert('Navigation to Constitution page. Please refresh the app.');
    }
  };

  // Schedule content data
  const schedulesContent = {
    title: "📋 Constitution of India - Schedules",
    mnemonic: {
      title: "🧠 Remembering Trick: TEARS OF OLD PM",
      explanation: "Each letter represents a schedule serially:",
      letters: [
        { letter: "T", schedule: "First Schedule", description: "States and Union Territories" },
        { letter: "E", schedule: "Second Schedule", description: "Emoluments of President, Governors, etc." },
        { letter: "A", schedule: "Third Schedule", description: "Forms of Oaths and Affirmations" },
        { letter: "R", schedule: "Fourth Schedule", description: "Allocation of Seats in Rajya Sabha" },
        { letter: "S", schedule: "Fifth Schedule", description: "Protection of Tribal Areas or Scheduled Areas" },
        { letter: "O", schedule: "Sixth Schedule", description: "Administration of Tribal Areas" },
        { letter: "F", schedule: "Seventh Schedule", description: "Union, State, and Concurrent Lists" },
        { letter: "O", schedule: "Eighth Schedule", description: "Official Languages" },
        { letter: "L", schedule: "Ninth Schedule", description: "Validation of Certain Acts, Land Reforms" },
        { letter: "D", schedule: "Tenth Schedule", description: "Anti-Defection Law" },
        { letter: "P", schedule: "Eleventh Schedule", description: "Panchayat Raj Powers" },
        { letter: "M", schedule: "Twelfth Schedule", description: "Municipalities Powers" }
      ]
    },
    schedules: [
      {
        number: "First Schedule",
        title: "States and Union Territories",
        content: [
          "Lists the names of the States and Union Territories of India",
          "Specifies territorial jurisdiction of each state",
          "Contains provisions related to administration of tribal areas",
          "Includes provisions for scheduled areas and scheduled tribes"
        ]
      },
      {
        number: "Second Schedule",
        title: "Emoluments of Constitutional Authorities",
        content: [
          "Specifies salaries, allowances, and privileges of President",
          "Details emoluments of Vice-President, Governors",
          "Covers Speaker, Deputy Speaker of Lok Sabha",
          "Includes Chairman, Deputy Chairman of Rajya Sabha",
          "Specifies emoluments of Supreme Court and High Court judges"
        ]
      },
      {
        number: "Third Schedule",
        title: "Forms of Oaths and Affirmations",
        content: [
          "Contains forms of oath for Union Ministers",
          "Specifies oath forms for Parliament members",
          "Includes oath forms for State Ministers",
          "Contains oath forms for State Legislators",
          "Specifies oath forms for High Court and Supreme Court judges"
        ]
      },
      {
        number: "Fourth Schedule",
        title: "Allocation of Seats in Rajya Sabha",
        content: [
          "Specifies allocation of Rajya Sabha seats to states and UTs",
          "Details the number of seats each state gets",
          "Provides formula for seat allocation",
          "Includes provisions for representatives of Union Territories"
        ]
      },
      {
        number: "Fifth Schedule",
        title: "Protection of Tribal Areas",
        content: [
          "Protects interests of Scheduled Tribes in specified areas",
          "Specifies tribal areas in various states",
          "Provides for Tribal Advisory Councils",
          "Gives Governor special powers for tribal areas"
        ]
      },
      {
        number: "Sixth Schedule",
        title: "Administration of Tribal Areas",
        content: [
          "Applies to tribal areas of Assam, Meghalaya, Tripura, Mizoram",
          "Provides for District and Regional Councils",
          "Specifies powers and functions of these councils",
          "Gives special provisions for tribal governance"
        ]
      },
      {
        number: "Seventh Schedule",
        title: "Division of Powers (Union, State, Concurrent Lists)",
        content: [
          "Union List: 100 subjects (Defense, Foreign Affairs, Banking, etc.)",
          "State List: 61 subjects (Police, Agriculture, Health, etc.)",
          "Concurrent List: 52 subjects (Education, Marriage, Criminal Law, etc.)",
          "Residuary powers belong to Union Government"
        ]
      },
      {
        number: "Eighth Schedule",
        title: "Official Languages",
        content: [
          "Lists 22 official languages of India",
          "Includes Hindi in Devanagari script as official language",
          "Specifies regional languages recognized by Constitution",
          "Provides for development of official languages"
        ]
      },
      {
        number: "Ninth Schedule",
        title: "Validation of Certain Acts",
        content: [
          "Contains acts and regulations that cannot be challenged in courts",
          "Initially had 13 acts, now contains 284 acts",
          "Provides protection to land reform laws",
          "Covers various state and central legislations"
        ]
      },
      {
        number: "Tenth Schedule",
        title: "Anti-Defection Law",
        content: [
          "Provides for disqualification of members for defection",
          "Specifies grounds for disqualification",
          "Gives powers to Speaker/Chairman for decision",
          "Includes provisions for merging/splitting of political parties"
        ]
      },
      {
        number: "Eleventh Schedule",
        title: "Panchayat Raj Powers",
        content: [
          "Contains 29 subjects for Panchayats",
          "Includes agriculture, land improvement, minor irrigation",
          "Covers animal husbandry, dairy, poultry",
          "Specifies rural development activities"
        ]
      },
      {
        number: "Twelfth Schedule",
        title: "Municipalities Powers",
        content: [
          "Contains 18 subjects for Municipalities",
          "Includes urban planning, water supply, solid waste management",
          "Covers fire services, urban forestry",
          "Specifies urban development and poverty alleviation programs"
        ]
      }
    ]
  };

  const styles = {
    container: {
      padding: isMobile ? "20px" : "40px",
      fontFamily: "Arial, sans-serif",
      backgroundColor: "#f8f9fa",
      minHeight: "100vh"
    },
    header: {
      textAlign: "center",
      marginBottom: "30px",
      backgroundColor: "#fff",
      padding: "20px",
      borderRadius: "10px",
      boxShadow: "0 2px 10px rgba(0,0,0,0.1)"
    },
    title: {
      fontSize: isMobile ? "24px" : "32px",
      fontWeight: "700",
      color: "#2c3e50",
      marginBottom: "10px"
    },
    mnemonicSection: {
      backgroundColor: "#e8f5e8",
      border: "2px solid #28a745",
      borderRadius: "10px",
      padding: "20px",
      marginBottom: "30px"
    },
    mnemonicTitle: {
      fontSize: "20px",
      fontWeight: "600",
      color: "#155724",
      marginBottom: "15px",
      textAlign: "center"
    },
    mnemonicGrid: {
      display: "grid",
      gridTemplateColumns: isMobile ? "repeat(auto-fit, minmax(200px, 1fr))" : "repeat(auto-fit, minmax(250px, 1fr))",
      gap: "15px",
      marginTop: "15px"
    },
    mnemonicCard: {
      backgroundColor: "#fff",
      border: "1px solid #28a745",
      borderRadius: "8px",
      padding: "15px",
      textAlign: "center"
    },
    letter: {
      fontSize: "24px",
      fontWeight: "700",
      color: "#28a745",
      marginBottom: "8px"
    },
    scheduleName: {
      fontSize: "16px",
      fontWeight: "600",
      color: "#155724",
      marginBottom: "5px"
    },
    description: {
      fontSize: "14px",
      color: "#6c757d"
    },
    schedulesSection: {
      marginTop: "40px"
    },
    scheduleCard: {
      backgroundColor: "#fff",
      border: "1px solid #dee2e6",
      borderRadius: "10px",
      padding: "20px",
      marginBottom: "20px",
      boxShadow: "0 2px 5px rgba(0,0,0,0.1)"
    },
    scheduleHeader: {
      display: "flex",
      alignItems: "center",
      marginBottom: "15px"
    },
    scheduleNumber: {
      fontSize: "18px",
      fontWeight: "700",
      color: "#007bff",
      marginRight: "10px"
    },
    scheduleTitle: {
      fontSize: "18px",
      fontWeight: "600",
      color: "#2c3e50"
    },
    contentList: {
      listStyle: "none",
      padding: "0"
    },
    contentItem: {
      padding: "8px 0",
      borderBottom: "1px solid #f0f0f0",
      fontSize: "15px",
      color: "#495057",
      display: "flex",
      alignItems: "flex-start"
    },
    bullet: {
      color: "#007bff",
      marginRight: "10px",
      fontWeight: "700"
    },
    backButton: {
      position: "fixed",
      top: "20px",
      left: "20px",
      background: "#007bff",
      color: "#fff",
      border: "none",
      padding: "10px 15px",
      borderRadius: "6px",
      cursor: "pointer",
      fontSize: "14px",
      zIndex: 1000
    }
  };

  return (
    <div style={styles.container}>
      <button 
        style={styles.backButton}
        onClick={onGoHome}
      >
        ← Back
      </button>

      {/* Header */}
      <div style={styles.header}>
        <h1 style={styles.title}>{schedulesContent.title}</h1>
        <button 
          onClick={handleViewConstitution}
          style={{ 
            background: "#28a745", 
            color: "#fff", 
            border: "none", 
            padding: "8px 16px", 
            borderRadius: "6px", 
            cursor: "pointer", 
            fontSize: "14px",
            marginLeft: "20px"
          }}
        >
          📋 View Constitution
        </button>
      </div>

      {/* Mnemonic Section */}
      <div style={styles.mnemonicSection}>
        <h2 style={styles.mnemonicTitle}>{schedulesContent.mnemonic.title}</h2>
        <p style={{ textAlign: "center", fontSize: "16px", color: "#155724", marginBottom: "20px" }}>
          {schedulesContent.mnemonic.explanation}
        </p>
        
        <div style={styles.mnemonicGrid}>
          {schedulesContent.mnemonic.letters.map((item, index) => (
            <div key={index} style={styles.mnemonicCard}>
              <div style={styles.letter}>{item.letter}</div>
              <div style={styles.scheduleName}>{item.schedule}</div>
              <div style={styles.description}>{item.description}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Schedules Section */}
      <div style={styles.schedulesSection}>
        <h2 style={{ fontSize: "24px", fontWeight: "600", color: "#2c3e50", marginBottom: "20px", textAlign: "center" }}>
          � Detailed Schedules
        </h2>
        
        {schedulesContent.schedules.map((schedule, index) => (
          <div key={index} style={styles.scheduleCard}>
            <div style={styles.scheduleHeader}>
              <span style={styles.scheduleNumber}>{schedule.number}</span>
              <span style={styles.scheduleTitle}>{schedule.title}</span>
            </div>
            
            <ul style={styles.contentList}>
              {schedule.content.map((item, itemIndex) => (
                <li key={itemIndex} style={styles.contentItem}>
                  <span style={styles.bullet}>•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
