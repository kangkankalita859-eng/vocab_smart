import { useState } from "react";

const subjects = {
  "Maths": {
    icon: "🔢",
    topics: ["Algebra", "Geometry", "Trigonometry", "Calculus", "Statistics"]
  },
  "English": {
    icon: "📚",
    topics: ["Grammar", "Vocabulary", "Literature", "Essay Writing", "Comprehension"]
  },
  "Reasoning": {
    icon: "🧠",
    topics: ["Logical Reasoning", "Analytical Reasoning", "Verbal Reasoning", "Non-Verbal Reasoning"]
  },
  "General Studies": {
    icon: "🌍",
    topics: ["Current Affairs", "History", "Geography", "Science", "Computer"]
  }
};

export default function Sidebar({ selectedSubject, selectedTopic, onSubjectSelect, onTopicSelect }) {
  const [expandedSubjects, setExpandedSubjects] = useState({});

  const toggleSubject = (subject) => {
    setExpandedSubjects(prev => ({
      ...prev,
      [subject]: !prev[subject]
    }));
  };

  return (
    <div style={{
      width: "250px",
      height: "100vh",
      backgroundColor: "#f8f9fa",
      borderRight: "1px solid #e9ecef",
      padding: "20px 0",
      overflowY: "auto"
    }}>
      <h3 style={{
        fontSize: "18px",
        fontWeight: "600",
        marginBottom: "20px",
        color: "#2c3e50",
        paddingLeft: "16px"
      }}>📚 Subjects</h3>
      
      {Object.entries(subjects).map(([subject, data]) => (
        <div key={subject} style={{ marginBottom: "10px" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              padding: "12px 16px",
              backgroundColor: "#ffffff",
              cursor: "pointer",
              border: "1px solid #e9ecef",
              borderRadius: "8px"
            }}
            onClick={() => toggleSubject(subject)}
          >
            <span style={{ fontSize: "20px", marginRight: "12px" }}>{data.icon}</span>
            <span style={{ flex: 1, fontWeight: "500", color: "#2c3e50" }}>{subject}</span>
            <span style={{ fontSize: "12px", color: "#6c757d" }}>
              {expandedSubjects[subject] ? "▼" : "▶"}
            </span>
          </div>
          
          {expandedSubjects[subject] && (
            <div style={{
              backgroundColor: "#ffffff",
              border: "1px solid #e9ecef",
              borderTop: "none",
              borderRadius: "0 0 8px 8px"
            }}>
              {data.topics.map(topic => (
                <div
                  key={topic}
                  style={{
                    padding: "10px 16px",
                    cursor: "pointer",
                    borderLeft: "3px solid transparent",
                    backgroundColor: selectedSubject === subject && selectedTopic === topic ? "#e3f2fd" : "transparent"
                  }}
                  onClick={() => {
                    onSubjectSelect(subject);
                    onTopicSelect(topic);
                  }}
                >
                  {topic}
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
