import React, { useState } from 'react';

// Data structure for subjects and their subtopics
const subjectsData = {
  maths: {
    name: '🔢 Maths',
    subtopics: ['Number System', 'Simplification', 'Percentage', 'Profit & Loss', 'Time & Work', 'Geometry']
  },
  english: {
    name: '📚 English',
    subtopics: ['Grammar', 'Vocabulary', 'Comprehension', 'Essay Writing', 'Letter Writing']
  },
  reasoning: {
    name: '🧠 Reasoning',
    subtopics: ['Logical Reasoning', 'Analytical Reasoning', 'Verbal Reasoning', 'Non-Verbal Reasoning']
  },
  gs: {
    name: '🌍 General Studies',
    subtopics: ['History', 'Geography', 'Polity', 'Science', 'Current Affairs']
  }
};

function Sidebar({ onSubjectSelect, onSubtopicSelect }) {
  const [expandedSubject, setExpandedSubject] = useState(null);
  const [selectedSubtopic, setSelectedSubtopic] = useState(null);

  const handleSubjectClick = (subjectKey) => {
    setExpandedSubject(expandedSubject === subjectKey ? null : subjectKey);
    if (onSubjectSelect) {
      onSubjectSelect(subjectKey);
    }
  };

  const handleSubtopicClick = (subtopic) => {
    setSelectedSubtopic(subtopic);
    if (onSubtopicSelect) {
      onSubtopicSelect(subtopic);
    }
    console.log('Selected subtopic:', subtopic);
  };
  return React.createElement('div', {
    style: {
      width: "250px",
      height: "100vh",
      backgroundColor: "#f8f9fa",
      borderRight: "1px solid #e9ecef",
      padding: "20px"
    }
  }, [
    React.createElement('h3', {
      key: 'title',
      style: {
        fontSize: "18px",
        fontWeight: "600",
        marginBottom: "20px",
        color: "#2c3e50"
      }
    }, '📚 Subjects'),
    
    // Render subjects dynamically
    ...Object.keys(subjectsData).map(subjectKey => {
      const subject = subjectsData[subjectKey];
      const isExpanded = expandedSubject === subjectKey;
      
      return [
        // Subject button
        React.createElement('div', {
          key: subjectKey,
          style: { marginBottom: "10px" }
        }, React.createElement('div', {
          style: {
            padding: "12px",
            backgroundColor: isExpanded ? "#e3f2fd" : "#fff",
            border: isExpanded ? "1px solid #2196f3" : "1px solid #e9ecef",
            borderRadius: "8px",
            cursor: "pointer",
            transition: "all 0.2s ease"
          },
          onClick: () => handleSubjectClick(subjectKey)
        }, subject.name)),
        
        // Subtopics (shown when subject is expanded)
        ...(isExpanded ? subject.subtopics.map((subtopic, index) => 
          React.createElement('div', {
            key: `${subjectKey}-subtopic-${index}`,
            style: {
              marginLeft: "20px",
              marginTop: "5px",
              padding: "8px 12px",
              backgroundColor: selectedSubtopic === subtopic ? "#f3e5f5" : "#fff",
              border: selectedSubtopic === subtopic ? "1px solid #9c27b0" : "1px solid #e0e0e0",
              borderRadius: "6px",
              cursor: "pointer",
              fontSize: "14px",
              transition: "all 0.2s ease"
            },
            onClick: () => handleSubtopicClick(subtopic)
          }, `• ${subtopic}`)
        ) : [])
      ];
    }).flat()
  ]);
}

export default Sidebar;
