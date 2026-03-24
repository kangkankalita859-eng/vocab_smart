import { useState } from "react";
import SessionNav from "../components/SessionNav";
import MobileSidebar from "../components/MobileSidebar";
import useMobile from "../hooks/useMobile";

export default function Constitution({ onGoHome, onViewSchedules }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { isMobile } = useMobile();

  // Constitution content data
  const constitutionContent = {
    preamble: {
      title: "🏛️ Preamble",
      content: "We, the people of India, having solemnly resolved to constitute India into a Sovereign, Socialist, Secular, Democratic Republic and to secure to all its citizens: Justice, Liberty, Equality, and Fraternity...",
      fullText: "WE, THE PEOPLE OF INDIA, having solemnly resolved to constitute India into a SOVEREIGN, SOCIALIST, SECULAR, DEMOCRATIC REPUBLIC and to secure to all its citizens: JUSTICE, social, economic and political; LIBERTY of thought, expression, belief, faith and worship; EQUALITY of status and of opportunity; and to promote among them all; FRATERNITY assuring the dignity of the individual and the unity and integrity of the Nation;"
    },
    basicInfo: {
      title: "📅 Adopted",
      items: [
        { label: "Date", value: "November 26, 1949" },
        { label: "Effective", value: "January 26, 1950" },
        { label: "Constituent Assembly", value: "389 members" },
        { label: "Drafting Committee", value: "Dr. B.R. Ambedkar (Chairman)" }
      ]
    },
    keyFacts: {
      title: "📊 Key Facts",
      items: [
        { label: "Total Articles", value: "448 (as of 2023)" },
        { label: "Total Parts", value: "25" },
        { label: "Total Schedules", value: "12" },
        { label: "Total Amendments", value: "104" },
        { label: "Languages", value: "22 scheduled languages" },
        { label: "Official Language", value: "Hindi (Devanagari script)" }
      ]
    },
    fundamentalRights: {
      title: "🎯 Fundamental Rights",
      items: [
        { title: "Right to Equality", description: "Equality before law and equal protection" },
        { title: "Right to Freedom", description: "Freedom of speech and expression" },
        { title: "Right against Exploitation", description: "Prohibition of child labor and trafficking" },
        { title: "Right to Freedom of Religion", description: "Freedom to practice any religion" },
        { title: "Cultural & Educational Rights", description: "Right to conserve culture and education" },
        { title: "Right to Constitutional Remedies", description: "Right to approach courts for enforcement" }
      ]
    },
    directivePrinciples: {
      title: "⚖️ Directive Principles",
      items: [
        { title: "Welfare State", description: "State shall strive to promote welfare of people" },
        { title: "Social Justice", description: "Reduce inequalities and provide social security" },
        { title: "Economic Justice", description: "Reduce economic disparities and provide decent living" },
        { title: "Liberty of Thought", description: "Freedom of belief and expression" },
        { title: "Separation of Powers", description: "Montesquieu model of three branches of government" }
      ]
    },
    federalStructure: {
      title: "🏛️ Federal Structure",
      items: [
        { title: "Union Government", description: "Central government with specific powers" },
        { title: "State Governments", description: "State governments with residual powers" },
        { title: "Local Self-Governments", description: "Panchayati Raj and Municipalities" },
        { title: "Independent Institutions", description: "Election Commission, UPSC, etc." }
      ]
    },
    amendments: {
      title: "📜 Amendments",
      items: [
        { title: "Procedure", description: "Parliament approval with 2/3 majority" },
        { title: "Notable Amendments", description: "Fundamental Rights, Basic Structure, Emergency provisions" },
        { title: "Latest Amendment", description: "104th Amendment Act, 2020" }
      ]
    },
    importantArticles: {
      title: "📋 Important Articles",
      items: [
        { article: "Article 1", title: "Name and Territory", description: "India as Union of States" },
        { article: "Article 14", title: "Equality", description: "Equality before law" },
        { article: "Article 19", title: "Protection", description: "Protection from discrimination" },
        { article: "Article 21", title: "Life & Liberty", description: "Right to life and personal liberty" },
        { article: "Article 21A", title: "Fundamental Duties", description: "Duties of citizens" },
        { article: "Article 370", title: "Special Status", description: "Jammu & Kashmir (now abrogated)" },
        { article: "Article 44", title: "Uniform Civil Code", description: "Directive for common civil code" }
      ]
    }
  };

  return (
    <div style={{ padding: "20px", textAlign: "center", backgroundColor: "#f5f7fa" }}>
      {/* Mobile Navigation Bar */}
      {isMobile && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          height: '60px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 16px',
          backgroundColor: '#ffffff',
          borderBottom: '1px solid #e0e0e0',
          zIndex: 1000,
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
        }}>
          <button
            style={{
              width: '44px',
              height: '44px',
              borderRadius: '6px',
              border: '1px solid #ccc',
              backgroundColor: '#fff',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '18px'
            }}
            onClick={() => setMobileMenuOpen(true)}
          >
            ☰
          </button>
          <span style={{ fontSize: '16px', fontWeight: '600' }}>
            Constitution of India
          </span>
          <button
            style={{
              background: "#007bff",
              color: "#fff",
              border: "none",
              padding: "6px 12px",
              borderRadius: "4px",
              cursor: "pointer",
              fontSize: "14px"
            }}
            onClick={onGoHome}
          >
            🏠
          </button>
        </div>
      )}

      {/* Header with Navigation */}
      <div style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        height: "70px",
        backgroundColor: "#ffffff",
        borderBottom: "1px solid #e0e0e0",
        zIndex: 100,
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 20px"
      }}>
        <div style={{ flex: 1 }}>
          <SessionNav
            mode="read"
            onGoHome={onGoHome}
            isMobile={isMobile}
            onMenuToggle={() => setMobileMenuOpen(true)}
          />
        </div>
      </div>

      {/* Main Content */}
      <div style={{
        padding: isMobile ? "10px" : "20px",
        marginTop: isMobile ? "70px" : "90px",
        maxWidth: "1200px",
        margin: "0 auto",
        width: "100%"
      }}>
        <h1 style={{ 
          fontSize: isMobile ? "28px" : "36px", 
          fontWeight: "700", 
          color: "#2c3e50", 
          marginBottom: "20px", 
          textAlign: "center" 
        }}>
          📜 Constitution of India
        </h1>
        
        <p style={{ 
          fontSize: isMobile ? "16px" : "18px", 
          color: "#6c757d", 
          marginBottom: "30px", 
          textAlign: "center",
          lineHeight: "1.6"
        }}>
          Supreme law of India, adopted by the Constituent Assembly on November 26, 1949, and effective from January 26, 1950.
        </p>

        {/* Constitution Sections Grid */}
        <div style={{
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr" : "repeat(auto-fit, minmax(400px, 1fr))",
          gap: "20px",
          marginBottom: "30px"
        }}>
          {/* Preamble */}
          <div style={{
            backgroundColor: "#ffffff",
            borderRadius: "12px",
            padding: "20px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
            border: "1px solid #e9ecef"
          }}>
            <h3 style={{ 
              fontSize: "20px", 
              fontWeight: "600", 
              color: "#2c3e50", 
              marginBottom: "15px",
              display: "flex",
              alignItems: "center",
              gap: "8px"
            }}>
              {constitutionContent.preamble.title}
            </h3>
            <p style={{ 
              fontSize: "16px", 
              color: "#495057", 
              marginBottom: "15px",
              fontStyle: "italic",
              lineHeight: "1.6"
            }}>
              {constitutionContent.preamble.content}
            </p>
            <div style={{
              backgroundColor: "#f8f9fa",
              padding: "15px",
              borderRadius: "8px",
              border: "1px solid #e9ecef",
              marginTop: "15px"
            }}>
              <p style={{ 
                fontSize: "14px", 
                color: "#6c757d", 
                fontStyle: "italic",
                margin: 0
              }}>
                <strong>Full Text:</strong> {constitutionContent.preamble.fullText}
              </p>
            </div>
          </div>

          {/* Basic Info */}
          <div style={{
            backgroundColor: "#ffffff",
            borderRadius: "12px",
            padding: "20px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
            border: "1px solid #e9ecef"
          }}>
            <h3 style={{ 
              fontSize: "20px", 
              fontWeight: "600", 
              color: "#2c3e50", 
              marginBottom: "15px",
              display: "flex",
              alignItems: "center",
              gap: "8px"
            }}>
              {constitutionContent.basicInfo.title}
            </h3>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "12px" }}>
              {constitutionContent.basicInfo.items.map((item, index) => (
                <div key={index} style={{
                  padding: "12px",
                  backgroundColor: "#e3f2fd",
                  borderRadius: "8px",
                  border: "1px solid #c3e6cb"
                }}>
                  <div style={{ fontWeight: "600", color: "#495057", marginBottom: "4px" }}>
                    {item.label}:
                  </div>
                  <div style={{ color: "#007bff", fontWeight: "700" }}>
                    {item.value}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Key Facts */}
          <div style={{
            backgroundColor: "#ffffff",
            borderRadius: "12px",
            padding: "20px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
            border: "1px solid #e9ecef"
          }}>
            <h3 style={{ 
              fontSize: "20px", 
              fontWeight: "600", 
              color: "#2c3e50", 
              marginBottom: "15px",
              display: "flex",
              alignItems: "center",
              gap: "8px"
            }}>
              {constitutionContent.keyFacts.title}
            </h3>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "12px" }}>
              {constitutionContent.keyFacts.items.map((item, index) => (
                <div key={index} style={{
                  padding: "12px",
                  backgroundColor: "#fff3cd",
                  borderRadius: "8px",
                  border: "1px solid #ffeaa7"
                }}>
                  <div style={{ fontWeight: "600", color: "#856404", marginBottom: "4px" }}>
                    {item.label}:
                  </div>
                  <div style={{ color: "#856404", fontWeight: "700" }}>
                    {item.value}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Fundamental Rights */}
          <div style={{
            backgroundColor: "#ffffff",
            borderRadius: "12px",
            padding: "20px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
            border: "1px solid #e9ecef"
          }}>
            <h3 style={{ 
              fontSize: "20px", 
              fontWeight: "600", 
              color: "#2c3e50", 
              marginBottom: "15px",
              display: "flex",
              alignItems: "center",
              gap: "8px"
            }}>
              {constitutionContent.fundamentalRights.title}
            </h3>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "12px" }}>
              {constitutionContent.fundamentalRights.items.map((item, index) => (
                <div key={index} style={{
                  padding: "15px",
                  backgroundColor: "#d4edda",
                  borderRadius: "8px",
                  border: "1px solid #c3e6cb"
                }}>
                  <div style={{ fontWeight: "600", color: "#155724", marginBottom: "8px" }}>
                    {item.title}
                  </div>
                  <div style={{ color: "#155724", fontSize: "14px" }}>
                    {item.description}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Directive Principles */}
          <div style={{
            backgroundColor: "#ffffff",
            borderRadius: "12px",
            padding: "20px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
            border: "1px solid #e9ecef"
          }}>
            <h3 style={{ 
              fontSize: "20px", 
              fontWeight: "600", 
              color: "#2c3e50", 
              marginBottom: "15px",
              display: "flex",
              alignItems: "center",
              gap: "8px"
            }}>
              {constitutionContent.directivePrinciples.title}
            </h3>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "12px" }}>
              {constitutionContent.directivePrinciples.items.map((item, index) => (
                <div key={index} style={{
                  padding: "15px",
                  backgroundColor: "#fff3cd",
                  borderRadius: "8px",
                  border: "1px solid #ffeaa7"
                }}>
                  <div style={{ fontWeight: "600", color: "#856404", marginBottom: "8px" }}>
                    {item.title}
                  </div>
                  <div style={{ color: "#856404", fontSize: "14px" }}>
                    {item.description}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Federal Structure */}
          <div style={{
            backgroundColor: "#ffffff",
            borderRadius: "12px",
            padding: "20px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
            border: "1px solid #e9ecef"
          }}>
            <h3 style={{ 
              fontSize: "20px", 
              fontWeight: "600", 
              color: "#2c3e50", 
              marginBottom: "15px",
              display: "flex",
              alignItems: "center",
              gap: "8px"
            }}>
              {constitutionContent.federalStructure.title}
            </h3>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "12px" }}>
              {constitutionContent.federalStructure.items.map((item, index) => (
                <div key={index} style={{
                  padding: "15px",
                  backgroundColor: "#e7f3ff",
                  borderRadius: "8px",
                  border: "1px solid #b3d9ff"
                }}>
                  <div style={{ fontWeight: "600", color: "#004085", marginBottom: "8px" }}>
                    {item.title}
                  </div>
                  <div style={{ color: "#004085", fontSize: "14px" }}>
                    {item.description}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Important Articles */}
          <div style={{
            backgroundColor: "#ffffff",
            borderRadius: "12px",
            padding: "20px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
            border: "1px solid #e9ecef"
          }}>
            <h3 style={{ 
              fontSize: "20px", 
              fontWeight: "600", 
              color: "#2c3e50", 
              marginBottom: "15px",
              display: "flex",
              alignItems: "center",
              gap: "8px"
            }}>
              {constitutionContent.importantArticles.title}
            </h3>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "12px" }}>
              {constitutionContent.importantArticles.items.map((item, index) => (
                <div key={index} style={{
                  padding: "15px",
                  backgroundColor: "#ffeaa7",
                  borderRadius: "8px",
                  border: "1px solid #fdcb6e"
                }}>
                  <div style={{ fontWeight: "600", color: "#856404", marginBottom: "8px" }}>
                    {item.article}: {item.title}
                  </div>
                  <div style={{ color: "#856404", fontSize: "14px" }}>
                    {item.description}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div style={{ marginTop: "40px", textAlign: "center" }}>
          <button 
            onClick={onViewSchedules}
            style={{ 
              background: "#28a745", 
              color: "#fff", 
              border: "none", 
              padding: "12px 24px", 
              borderRadius: "6px", 
              cursor: "pointer", 
              fontSize: "16px",
              marginRight: "10px"
            }}
          >
            📋 View Schedules
          </button>
          <button 
            onClick={onGoHome}
            style={{ 
              background: "#007bff", 
              color: "#fff", 
              border: "none", 
              padding: "12px 24px", 
              borderRadius: "6px", 
              cursor: "pointer", 
              fontSize: "16px" 
            }}
          >
            ← Back to Home
          </button>
        </div>
      </div>

      {/* Mobile Sidebar */}
      {isMobile && (
        <MobileSidebar
          isOpen={mobileMenuOpen}
          onClose={() => setMobileMenuOpen(false)}
          onGoHome={onGoHome}
        />
      )}
    </div>
  );
}
