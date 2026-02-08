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

function MobileSidebar({ isOpen, onClose, onSubjectSelect, onSubtopicSelect }) {
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
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      zIndex: 2000,
      display: 'flex'
    }}>
      <div
        style={{
          flex: 1,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
        }}
        onClick={onClose}
      />
      
      <div style={{
        width: '280px',
        height: '100vh',
        backgroundColor: '#f8f9fa',
        borderRight: '1px solid #e9ecef',
        padding: '20px',
        overflowY: 'auto',
        transform: 'translateX(0)',
        transition: 'transform 0.3s ease'
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '20px'
        }}>
          <h3 style={{
            fontSize: '18px',
            fontWeight: '600',
            color: '#2c3e50',
            margin: 0
          }}>
            📚 Subjects
          </h3>
          
          <button
            style={{
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              border: '1px solid #ddd',
              backgroundColor: '#fff',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '16px'
            }}
            onClick={onClose}
          >
            ✕
          </button>
        </div>
        
        {Object.keys(subjectsData).map(subjectKey => {
          const subject = subjectsData[subjectKey];
          const isExpanded = expandedSubject === subjectKey;
          
          return (
            <div key={subjectKey} style={{ marginBottom: '10px' }}>
              <div
                style={{
                  padding: '14px',
                  backgroundColor: isExpanded ? '#e3f2fd' : '#fff',
                  border: isExpanded ? '1px solid #2196f3' : '1px solid #e9ecef',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  fontSize: '16px'
                }}
                onClick={() => handleSubjectClick(subjectKey)}
              >
                {subject.name}
              </div>
              
              {isExpanded && subject.subtopics.map((subtopic, index) => (
                <div
                  key={`${subjectKey}-subtopic-${index}`}
                  style={{
                    marginLeft: '10px',
                    marginTop: '5px',
                    padding: '12px',
                    backgroundColor: selectedSubtopic === subtopic ? '#f3e5f5' : '#fff',
                    border: selectedSubtopic === subtopic ? '1px solid #9c27b0' : '1px solid #e0e0e0',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    fontSize: '14px',
                    transition: 'all 0.2s ease'
                  }}
                  onClick={() => handleSubtopicClick(subtopic)}
                >
                  • {subtopic}
                </div>
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default MobileSidebar;
