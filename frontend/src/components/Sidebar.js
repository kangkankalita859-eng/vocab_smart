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
    <div style={sidebar}>
      <h3 style={sidebarTitle}>Subjects</h3>
      
      {Object.entries(subjects).map(([subject, data]) => (
        <div key={subject} style={subjectSection}>
          <div
            style={subjectHeader}
            onClick={() => toggleSubject(subject)}
          >
            <span style={subjectIcon}>{data.icon}</span>
            <span style={subjectName}>{subject}</span>
            <span style={expandIcon}>
              {expandedSubjects[subject] ? "▼" : "▶"}
            </span>
          </div>
          
          {expandedSubjects[subject] && (
            <div style={topicsList}>
              {data.topics.map(topic => (
                <div
                  key={topic}
                  style={topicItem}
                  onClick={() => {
                    onSubjectSelect(subject);
                    onTopicSelect(topic);
                  }}
                  className={selectedSubject === subject && selectedTopic === topic ? "active" : ""}
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

const sidebar = {
  width: "250px",
  height: "100vh",
  backgroundColor: "#f8f9fa",
  borderRight: "1px solid #e9ecef",
  padding: "20px 0",
  overflowY: "auto"
};

const sidebarTitle = {
  fontSize: "18px",
  fontWeight: "600",
  marginBottom: "20px",
  color: "#2c3e50"
};

const subjectSection = {
  marginBottom: "10px",
  borderRadius: "8px",
  overflow: "hidden"
};

const subjectHeader = {
  display: "flex",
  alignItems: "center",
  padding: "12px 16px",
  backgroundColor: "#ffffff",
  cursor: "pointer",
  border: "1px solid #e9ecef",
  borderRadius: "8px",
  transition: "all 0.3s ease"
};

const subjectHeaderHover = {
  ...subjectHeader,
  backgroundColor: "#e9ecef"
};

const subjectIcon = {
  fontSize: "20px",
  marginRight: "12px"
};

const subjectName = {
  flex: 1,
  fontWeight: "500",
  color: "#2c3e50"
};

const expandIcon = {
  fontSize: "12px",
  color: "#6c757d",
  transition: "transform 0.3s ease"
};

const topicsList = {
  backgroundColor: "#ffffff",
  border: "1px solid #e9ecef",
  borderTop: "none",
  borderRadius: "0 0 8px 8px"
};

const topicItem = {
  padding: "10px 16px",
  cursor: "pointer",
  borderLeft: "3px solid transparent",
  transition: "all 0.2s ease"
};

const topicItemHover = {
  ...topicItem,
  backgroundColor: "#f8f9fa",
  borderLeftColor: "#007bff"
};

const active = {
  backgroundColor: "#e3f2fd",
  borderLeftColor: "#007bff",
  fontWeight: "500"
};
