export default function SimpleSidebar() {
  return (
    <div style={{
      width: "250px",
      height: "100vh",
      backgroundColor: "#f8f9fa",
      borderRight: "1px solid #e9ecef",
      padding: "20px"
    }}>
      <h3 style={{
        fontSize: "18px",
        fontWeight: "600",
        marginBottom: "20px",
        color: "#2c3e50"
      }}>📚 Subjects</h3>
      
      <div style={{ marginBottom: "10px" }}>
        <div style={{
          padding: "12px",
          backgroundColor: "#fff",
          border: "1px solid #e9ecef",
          borderRadius: "8px",
          cursor: "pointer"
        }}>
          🔢 Maths
        </div>
      </div>
      
      <div style={{ marginBottom: "10px" }}>
        <div style={{
          padding: "12px",
          backgroundColor: "#fff",
          border: "1px solid #e9ecef",
          borderRadius: "8px",
          cursor: "pointer"
        }}>
          📚 English
        </div>
      </div>
      
      <div style={{ marginBottom: "10px" }}>
        <div style={{
          padding: "12px",
          backgroundColor: "#fff",
          border: "1px solid #e9ecef",
          borderRadius: "8px",
          cursor: "pointer"
        }}>
          🧠 Reasoning
        </div>
      </div>
      
      <div style={{ marginBottom: "10px" }}>
        <div style={{
          padding: "12px",
          backgroundColor: "#fff",
          border: "1px solid #e9ecef",
          borderRadius: "8px",
          cursor: "pointer"
        }}>
          🌍 General Studies
        </div>
      </div>
    </div>
  );
}
