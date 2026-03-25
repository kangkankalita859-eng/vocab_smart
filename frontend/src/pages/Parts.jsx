import { useState } from "react";
import useMobile from "../hooks/useMobile";

export default function Parts({ onGoHome }) {
  const { isMobile } = useMobile();

  const handleViewArticles = (partNumber) => {
    console.log('View articles for part:', partNumber);
    // Navigate to articles page with the specific part number
    if (window.setAppStage) {
      window.setAppStage('articles');
      // Store the part number for the Articles component to use
      window.currentPartNumber = partNumber;
    } else {
      // Fallback: try to trigger navigation like other components
      try {
        window.location.href = '#articles';
        window.currentPartNumber = partNumber;
        console.log('Direct navigation to articles for part:', partNumber);
      } catch (error) {
        console.error('Navigation error:', error);
        alert('Please refresh the page to navigate to Articles.');
      }
    }
  };

  const handleViewConstitution = () => {
    console.log('Constitution button clicked');
    
    // Use same navigation pattern as other components in the app
    if (window.setAppStage) {
      window.setAppStage('constitution');
    } else {
      // Fallback: try to trigger navigation like other components
      try {
        window.location.href = '#constitution';
        console.log('Direct navigation to constitution');
      } catch (error) {
        console.error('Navigation error:', error);
        alert('Please refresh the page to navigate to Constitution.');
      }
    }
  };

  // Parts content data
  const partsContent = {
    title: "📚 Constitution of India - Parts",
    mnemonic: {
      title: "🧠 Remembering Trick: U Can Fly Directly From US to UP to Meet Child of Shyam and Ram; Fruits Taste Sweet to Eat, So Only Eat Maggie As Tasty Snack",
      description: "Each letter represents a part serially:",
      letters: [
        { letter: "U", part: "Part I", description: "The Union and its Territory" },
        { letter: "C", part: "Part II", description: "Citizenship" },
        { letter: "F", part: "Part III", description: "Fundamental Rights" },
        { letter: "D", part: "Part IV", description: "Directive Principles of State Policy" },
        { letter: "F", part: "Part IV-A", description: "Fundamental Duties" },
        { letter: "U", part: "Part V", description: "The Union" },
        { letter: "S", part: "Part VI", description: "The States" },
        { letter: "T", part: "Part VII", description: "States in the First Schedule" },
        { letter: "O", part: "Part VIII", description: "The Union Territories" },
        { letter: "U", part: "Part IX", description: "The Panchayats" },
        { letter: "P", part: "Part IX-A", description: "The Municipalities" },
        { letter: "M", part: "Part X", description: "The Scheduled and Tribal Areas" },
        { letter: "E", part: "Part XI", description: "Relations between Union and States" },
        { letter: "E", part: "Part XII", description: "Finance, Property, Contracts and Suits" },
        { letter: "T", part: "Part XIII", description: "Trade, Commerce and Intercourse within the Territory of India" },
        { letter: "C", part: "Part XIV", description: "Services under the Union and the States" },
        { letter: "H", part: "Part XIV-A", description: "Tribunals" },
        { letter: "I", part: "Part XV", description: "Elections" },
        { letter: "L", part: "Part XVI", description: "Special Provisions Relating to Certain Classes" },
        { letter: "D", part: "Part XVII", description: "Official Language" },
        { letter: "L", part: "Part XVIII", description: "Emergency Provisions" },
        { letter: "Y", part: "Part XIX", description: "Miscellaneous" },
        { letter: "A", part: "Part XX", description: "Amendment of the Constitution" },
        { letter: "M", part: "Part XXI", description: "Temporary, Transitional and Special Provisions" },
        { letter: "E", part: "Part XXII", description: "Short Title, Commencement, Authoritative Text in Hindi and Repeals" }
      ]
    },
    parts: [
      {
        number: "Part I",
        title: "The Union and its Territory",
        articles: "Articles 1-4",
        description: "Defines India as a Union of States, specifies territories, provisions regarding formation of new states and alteration of areas, boundaries, and names of existing states."
      },
      {
        number: "Part II",
        title: "Citizenship",
        articles: "Articles 5-11",
        description: "Defines citizenship at the commencement of the Constitution, rights of citizenship of certain persons who have migrated to India from territories included in Pakistan, and rights of citizenship of certain migrants to Pakistan and persons of Indian origin residing outside India."
      },
      {
        number: "Part III",
        title: "Fundamental Rights",
        articles: "Articles 12-35",
        description: "Guarantees fundamental rights to all citizens including equality before law, prohibition of discrimination, equality of opportunity, freedom of speech, protection of life and personal liberty, right to education, and cultural and educational rights."
      },
      {
        number: "Part IV",
        title: "Directive Principles of State Policy",
        articles: "Articles 36-51",
        description: "Contains fundamental principles for governance of the state, including securing a social order for the promotion of welfare of the people, minimizing inequalities in income, and securing the right to work, education, and public assistance."
      },
      {
        number: "Part IV-A",
        title: "Fundamental Duties",
        articles: "Article 51-A",
        description: "Specifies fundamental duties of citizens including respecting the Constitution, national flag, and national anthem, cherishing noble ideals, defending the country, promoting harmony, protecting environment, and developing scientific temper."
      },
      {
        number: "Part V",
        title: "The Union",
        articles: "Articles 52-151",
        description: "Deals with the Union Executive including the President and Vice-President, Prime Minister and Council of Ministers, Parliament with its composition and functions, and legislative powers of the Union."
      },
      {
        number: "Part VI",
        title: "The States",
        articles: "Articles 152-237",
        description: "Covers the State Executive including Governors, Chief Ministers and Council of Ministers, State Legislature with composition and functions, and legislative powers of the States."
      },
      {
        number: "Part VII",
        title: "States in the First Schedule",
        articles: "Articles 238-242",
        description: "Contains provisions regarding states in the First Schedule (now omitted as these states have been reorganized).",
        deleted: true
      },
      {
        number: "Part VIII",
        title: "The Union Territories",
        articles: "Articles 239-242",
        description: "Specifies administration of Union Territories, provisions regarding Union Territories with Legislatures, and special provisions for certain Union Territories."
      },
      {
        number: "Part IX",
        title: "The Panchayats",
        articles: "Articles 243-243-O",
        description: "Provides for the constitution of Panchayats, powers and functions of Panchayats, powers to impose taxes, and finance of Panchayats."
      },
      {
        number: "Part IX-A",
        title: "The Municipalities",
        articles: "Articles 243-P to 243-ZG",
        description: "Constitution of Municipalities, powers and functions of Municipalities, powers to impose taxes, and finance of Municipalities."
      },
      {
        number: "Part X",
        title: "The Scheduled and Tribal Areas",
        articles: "Articles 244-244-A",
        description: "Administration of Scheduled Areas and Tribal Areas, protection of interests of Scheduled Tribes, and provisions for tribal areas."
      },
      {
        number: "Part XI",
        title: "Relations between Union and States",
        articles: "Articles 245-263",
        description: "Distribution of legislative powers between Union and States, administrative relations, and financial relations between Union and States."
      },
      {
        number: "Part XII",
        title: "Finance, Property, Contracts and Suits",
        articles: "Articles 264-300-A",
        description: "Property of the Union and States, borrowing by Union and States, property contracts, rights, liabilities and suits, and legal proceedings."
      },
      {
        number: "Part XIII",
        title: "Trade, Commerce and Intercourse within the Territory of India",
        articles: "Articles 301-307",
        description: "Freedom of trade, commerce and intercourse, restrictions on trade, commerce and intercourse, and provisions regarding taxes."
      },
      {
        number: "Part XIV",
        title: "Services under the Union and the States",
        articles: "Articles 308-323",
        description: "Recruitment and conditions of service of persons serving the Union or the States, tenure of office, and removal from service."
      },
      {
        number: "Part XIV-A",
        title: "Tribunals",
        articles: "Articles 323-A to 323-B",
        description: "Administrative tribunals for disputes concerning recruitment and conditions of service of persons appointed to public services, and tribunals for other matters."
      },
      {
        number: "Part XV",
        title: "Elections",
        articles: "Articles 324-329-A",
        description: "Superintendence, direction and control of elections, election commissions, and provisions regarding elections to Parliament and State Legislatures."
      },
      {
        number: "Part XVI",
        title: "Special Provisions Relating to Certain Classes",
        articles: "Articles 330-342",
        description: "Reservation of seats for Scheduled Castes, Scheduled Tribes, and Anglo-Indian community in Legislatures, representation of the Anglo-Indian community, and special provisions for certain classes."
      },
      {
        number: "Part XVII",
        title: "Official Language",
        articles: "Articles 343-351",
        description: "Language of the Union, regional languages, special provisions for linguistic minorities, and official language for communication between states and union."
      },
      {
        number: "Part XVIII",
        title: "Emergency Provisions",
        articles: "Articles 352-360",
        description: "Provisions for national emergency, state emergency, and financial emergency, effects of emergency provisions, and suspension of fundamental rights during emergency."
      },
      {
        number: "Part XIX",
        title: "Miscellaneous",
        articles: "Articles 361-367",
        description: "Protection of President and Governors, special provisions for certain states, and miscellaneous provisions."
      },
      {
        number: "Part XX",
        title: "Amendment of the Constitution",
        articles: "Article 368",
        description: "Power of Parliament to amend the Constitution and procedure for amendment."
      },
      {
        number: "Part XXI",
        title: "Temporary, Transitional and Special Provisions",
        articles: "Articles 369-392",
        description: "Temporary provisions regarding states, special provisions for certain states, and transitional provisions."
      },
      {
        number: "Part XXII",
        title: "Short Title, Commencement, Authoritative Text in Hindi and Repeals",
        articles: "Articles 393-395",
        description: "Short title of the Constitution, commencement of the Constitution, authoritative text in Hindi, and repeals."
      }
    ]
  };

  // Styles
  const styles = {
    container: {
      padding: isMobile ? "10px" : "20px",
      maxWidth: "1200px",
      margin: "0 auto",
      width: "100%"
    },
    header: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      marginBottom: "30px",
      padding: isMobile ? "10px" : "20px",
      backgroundColor: "#ffffff",
      borderRadius: "12px",
      boxShadow: "0 4px 12px rgba(0,0,0,0.1)"
    },
    title: {
      fontSize: isMobile ? "24px" : "32px",
      fontWeight: "700",
      color: "#2c3e50",
      margin: 0
    },
    backButton: {
      background: "#007bff",
      color: "#fff",
      border: "none",
      padding: "8px 16px",
      borderRadius: "6px",
      cursor: "pointer",
      fontSize: "14px",
      marginRight: "20px"
    },
    mnemonicSection: {
      backgroundColor: "#ffffff",
      borderRadius: "12px",
      padding: "30px",
      marginBottom: "30px",
      boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
      border: "1px solid #e9ecef"
    },
    mnemonicTitle: {
      fontSize: isMobile ? "20px" : "24px",
      fontWeight: "600",
      color: "#2c3e50",
      textAlign: "center",
      marginBottom: "20px"
    },
    mnemonicGrid: {
      display: "grid",
      gridTemplateColumns: isMobile ? "repeat(auto-fit, minmax(150px, 1fr))" : "repeat(auto-fit, minmax(200px, 1fr))",
      gap: "15px",
      marginBottom: "20px"
    },
    mnemonicLetter: {
      backgroundColor: "#e3f2fd",
      border: "2px solid #2196f3",
      borderRadius: "8px",
      padding: "15px",
      textAlign: "center",
      transition: "transform 0.2s ease"
    },
    letter: {
      fontSize: "24px",
      fontWeight: "700",
      color: "#2196f3",
      marginBottom: "5px"
    },
    partNumber: {
      fontSize: "14px",
      fontWeight: "600",
      color: "#424242",
      marginBottom: "3px"
    },
    partDescription: {
      fontSize: "12px",
      color: "#666666",
      fontStyle: "italic"
    },
    partsGrid: {
      display: "grid",
      gridTemplateColumns: isMobile ? "1fr" : "repeat(auto-fit, minmax(400px, 1fr))",
      gap: "20px",
      marginBottom: "30px"
    },
    partCard: {
      backgroundColor: "#ffffff",
      borderRadius: "12px",
      padding: "20px",
      boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
      border: "1px solid #e9ecef",
      transition: "transform 0.2s ease"
    },
    partHeader: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: "15px",
      paddingBottom: "10px",
      borderBottom: "2px solid #e9ecef"
    },
    partNumberTitle: {
      fontSize: "16px",
      fontWeight: "700",
      color: "#007bff",
      margin: 0
    },
    partTitle: {
      fontSize: "18px",
      fontWeight: "600",
      color: "#2c3e50",
      margin: 0,
      flex: 1,
      marginLeft: "10px"
    },
    articles: {
      fontSize: "14px",
      color: "#6c757d",
      fontStyle: "italic",
      marginBottom: "10px"
    },
    description: {
      fontSize: "14px",
      color: "#495057",
      lineHeight: "1.6",
      textAlign: "justify"
    }
  };

  return (
    <div style={styles.container}>
      {/* Back Button */}
      <button 
        style={styles.backButton}
        onClick={onGoHome}
      >
        ← Back
      </button>

      {/* Header */}
      <div style={styles.header}>
        <h1 style={styles.title}>{partsContent.title}</h1>
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
          📜 View Constitution
        </button>
      </div>

      {/* Mnemonic Section */}
      <div style={styles.mnemonicSection}>
        <h2 style={styles.mnemonicTitle}>{partsContent.mnemonic.title}</h2>
        <p style={{ textAlign: "center", fontSize: "16px", color: "#155724", marginBottom: "20px" }}>
          {partsContent.mnemonic.explanation}
        </p>
        
        <div style={styles.mnemonicGrid}>
          {partsContent.mnemonic.letters.map((item, index) => (
            <div key={index} style={styles.mnemonicLetter}>
              <div style={styles.letter}>{item.letter}</div>
              <div style={styles.partNumber}>{item.part}</div>
              <div style={styles.partDescription}>{item.description}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Parts Section */}
      <div style={styles.partsGrid}>
        {partsContent.parts.map((part, index) => (
          <div key={index} style={styles.partCard}>
            <div style={styles.partHeader}>
              <div style={styles.partNumberTitle}>{part.number}</div>
              <div style={styles.partTitle}>{part.title}</div>
            </div>
            <div style={styles.articles}>{part.articles}</div>
            <div style={styles.description}>{part.description}</div>
            {!part.deleted && (
              <button 
                onClick={() => handleViewArticles(part.number)}
                style={{ 
                  background: "#007bff", 
                  color: "#fff", 
                  border: "none", 
                  padding: "8px 16px", 
                  borderRadius: "6px", 
                  cursor: "pointer", 
                  fontSize: "14px",
                  marginTop: "10px",
                  width: "100%"
                }}
              >
                📄 View Articles
              </button>
            )}
            {part.deleted && (
              <div style={{
                backgroundColor: "#ffebee",
                color: "#856404",
                padding: "8px 12px",
                borderRadius: "6px",
                fontSize: "12px",
                fontWeight: "600",
                textAlign: "center",
                marginTop: "10px",
                border: "1px solid #f8d7da"
              }}>
                🗑️ DELETED
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
