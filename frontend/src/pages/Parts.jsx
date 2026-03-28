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

  // Back button container with sticky positioning
  const backButtonContainer = {
    position: "sticky",
    top: "0",
    zIndex: "1000",
    backgroundColor: "#ffffff",
    padding: "20px",
    borderBottom: "1px solid #e9ecef",
    marginBottom: "20px"
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

  // Function to highlight the word in the description
  const highlightWord = (description, word) => {
    if (!word) return description;
    
    // Create a regex to find the word (case insensitive)
    const regex = new RegExp(`(${word})`, 'gi');
    const parts = description.split(regex);
    
    return parts.map((part, index) => {
      if (part.toLowerCase() === word.toLowerCase()) {
        return (
          <span key={index} style={{ 
            backgroundColor: "#ffeb3b", 
            color: "#000", 
            fontWeight: "700",
            padding: "2px 4px",
            borderRadius: "3px"
          }}>
            {part}
          </span>
        );
      }
      return part;
    });
  };

  // Function to highlight first letters of words starting with capital letters
  const highlightFirstLetters = (description) => {
    // Split by words and highlight first letter of capital words with dark color
    const words = description.split(' ');
    return words.map((word, index) => {
      if (word && word[0] && word[0] === word[0].toUpperCase() && word[0] !== word[0].toLowerCase()) {
        const firstLetter = word[0];
        const restOfWord = word.slice(1);
        
        return (
          <span key={index}>
            <span style={{ 
              color: "#2c3e50", // Dark color
              fontWeight: "normal" // No bold
            }}>
              {firstLetter}
            </span>
            {restOfWord}
            {index < words.length - 1 && ' '}
          </span>
        );
      }
      return word + (index < words.length - 1 ? ' ' : '');
    });
  };

  // Function to highlight the mnemonic sentence with yellow color only
  const highlightMnemonicSentence = (sentence) => {
    // Split by words and highlight first letter of ALL words with yellow color
    const words = sentence.split(' ');
    return words.map((word, index) => {
      if (word && word[0]) {
        const firstLetter = word[0].toUpperCase();
        const restOfWord = word.slice(1);
        
        // Don't highlight small words that should stay lowercase
        const shouldHighlight = !['to', 'of', 'and'].includes(word.toLowerCase());
        
        return (
          <span key={index}>
            {shouldHighlight ? (
              <span style={{ 
                color: "#fb8200ff", // Yellow color
                fontWeight: "bold" // No bold
              }}>
                {firstLetter}
              </span>
            ) : (
              firstLetter
            )}
            {restOfWord}
            {index < words.length - 1 && ' '}
          </span>
        );
      }
      return word + (index < words.length - 1 ? ' ' : '');
    });
  };

  // Parts content data
  const partsContent = {
    title: "📚 Constitution of India - Parts",
    mnemonic: {
      title: "🧠 Remembering Trick: U Can Fly Directly From US to UP to Meet Child of Shyam and Ram; Fruits Taste Sweet to Eat, So Only Eat Maggie As Tasty Snack",
      description: "Each letter represents a part serially:",
      letters: [
        { 
          letter: "U", 
          part: "Part I", 
          description: "Union and its Territory",
          highlightedWord: "Union"
        },
        { 
          letter: "Can", 
          part: "Part II", 
          description: "Citizenship",
          highlightedWord: "Citizenship"
        },
        { 
          letter: "Fly", 
          part: "Part III", 
          description: "Fundamental Rights",
          highlightedWord: "Fundamental"
        },
        { 
          letter: "Diectly", 
          part: "Part IV", 
          description: "Directive Principles of State Policy",
          highlightedWord: "Directive"
        },
        { 
          letter: "From", 
          part: "Part IV-A", 
          description: "Fundamental Duties(added by 42nd CAA, 1976)",
          highlightedWord: "Fundamental"
        },
        { 
          letter: "U", 
          part: "Part V", 
          description: "Union Government",
          highlightedWord: "Union"
        },
        { 
          letter: "S", 
          part: "Part VI", 
          description: "State Government",
          highlightedWord: "States"
        },
        { 
          letter: "", 
          part: "Part VII", 
          description: "",
          highlightedWord: "Territories",
          deleted: true
        },
        { 
          letter: "U", 
          part: "Part VIII", 
          description: "Union Territories",
          highlightedWord: "of"
        },
        { 
          letter: "P", 
          part: "Part IX", 
          description: "Panchayats",
          highlightedWord: "Union"
        },
        { 
          letter: "Meet", 
          part: "Part IX-A", 
          description: "Municipalities",
          highlightedWord: "Panchayats"
        },
        { 
          letter: "Child", 
          part: "Part IX-B", 
          description: "Co -Operative Socities(added by 97th CAA, 2011",
          highlightedWord: "Municipalities"
        },
        { 
          letter: "Shyam &", 
          part: "Part X", 
          description: "Sheduled and Tribal Areas",
          highlightedWord: "Estates"
        },
        { 
          letter: "Ram", 
          part: "Part XI", 
          description: "Relations between Union and States",
          highlightedWord: "Estates"
        },
        { 
          letter: "Fruits", 
          part: "Part XII", 
          description: "Finance, Property, Contracts and Suits",
          highlightedWord: "Estate"
        },
        { 
          letter: "Taste", 
          part: "Part XIII", 
          description: "Trade, Commerce and Intercourse within the Territory of India",
          highlightedWord: "Trade"
        },
        { 
          letter: "Sweet", 
          part: "Part XIV", 
          description: "Services under the Union and the States",
          highlightedWord: "Commerce"
        },
        { 
          letter: "To", 
          part: "Part XIV-A", 
          description: "Tribunals(added by 42nd CAA, 1976)",
          highlightedWord: "High"
        },
        { 
          letter: "Eat", 
          part: "Part XV", 
          description: "Elections",
          highlightedWord: "India"
        },
        { 
          letter: "So", 
          part: "Part XVI", 
          description: "Special Provisions Relating to Certain Classes",
          highlightedWord: "Legislature"
        },
        { 
          letter: "Only", 
          part: "Part XVII", 
          description: "Official Language",
          highlightedWord: "Democratic"
        },
        { 
          letter: "Eat", 
          part: "Part XVIII", 
          description: "Emergency Provisions",
          highlightedWord: "Law"
        },
        { 
          letter: "Maggie", 
          part: "Part XIX", 
          description: "Miscellaneous",
          highlightedWord: "Year"
        },
        { 
          letter: "As", 
          part: "Part XX", 
          description: "Amendment of the Constitution",
          highlightedWord: "Amendment"
        },
        { 
          letter: "Tasty", 
          part: "Part XXI", 
          description: "Temporary, Transitional and Special Provisions",
          highlightedWord: "Miscellaneous"
        },
        { 
          letter: "Snack", 
          part: "Part XXII", 
          description: "Short Title, Commencement, Authoritative Text in Hindi and Repeals",
          highlightedWord: "Enactment"
        }
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
      <div style={backButtonContainer}>
        <button 
          onClick={handleViewConstitution}
          style={{ 
            background: "#28a745", 
            color: "#fff", 
            border: "none", 
            padding: "12px 24px", 
            borderRadius: "8px", 
            cursor: "pointer", 
            fontSize: "16px",
            fontWeight: "600",
            display: "flex",
            alignItems: "center",
            gap: "8px",
            boxShadow: "0 2px 4px rgba(0,0,0,0.1)"
          }}
        >
          📜 View Constitution
        </button>
      </div>

      {/* Header */}
      <div style={styles.header}>
        <h1 style={styles.title}>{partsContent.title}</h1>
      </div>

      {/* Mnemonic Section */}
      <div style={styles.mnemonicSection}>
        <div style={{
          backgroundColor: "#f8f9fa",
          border: "2px solid #dee2e6",
          borderRadius: "8px",
          padding: "20px",
          marginBottom: "30px",
          textAlign: "center"
        }}>
          <h3 style={{
            fontSize: "20px",
            fontWeight: "600",
            color: "#2c3e50",
            marginBottom: "10px"
          }}>
            🧠 Remembering Trick
          </h3>
          <p style={{
            fontSize: "18px",
            fontWeight: "normal",
            color: "#2c3e50",
            marginBottom: "15px",
            lineHeight: "1.4"
          }}>
            {highlightMnemonicSentence(partsContent.mnemonic.title.replace("🧠 Remembering Trick: ", ""))}
          </p>
        </div>
        
        <p style={{ textAlign: "center", fontSize: "16px", color: "#155724", marginBottom: "20px" }}>
          {partsContent.mnemonic.explanation}
        </p>
        
        <div style={styles.mnemonicGrid}>
          {partsContent.mnemonic.letters.map((item, index) => (
            <div key={index} style={styles.mnemonicLetter}>
              <div style={styles.letter}>{item.letter}</div>
              <div style={styles.partNumber}>{item.part}</div>
              <div style={styles.partDescription}>{highlightFirstLetters(item.description)}</div>
              {item.deleted && (
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
