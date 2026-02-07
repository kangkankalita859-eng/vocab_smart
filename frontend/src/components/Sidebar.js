import React from 'react';

function Sidebar() {
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
    
    React.createElement('div', {
      key: 'maths',
      style: { marginBottom: "10px" }
    }, React.createElement('div', {
      style: {
        padding: "12px",
        backgroundColor: "#fff",
        border: "1px solid #e9ecef",
        borderRadius: "8px",
        cursor: "pointer"
      }
    }, '🔢 Maths')),
    
    React.createElement('div', {
      key: 'english',
      style: { marginBottom: "10px" }
    }, React.createElement('div', {
      style: {
        padding: "12px",
        backgroundColor: "#fff",
        border: "1px solid #e9ecef",
        borderRadius: "8px",
        cursor: "pointer"
      }
    }, '📚 English')),
    
    React.createElement('div', {
      key: 'reasoning',
      style: { marginBottom: "10px" }
    }, React.createElement('div', {
      style: {
        padding: "12px",
        backgroundColor: "#fff",
        border: "1px solid #e9ecef",
        borderRadius: "8px",
        cursor: "pointer"
      }
    }, '🧠 Reasoning')),
    
    React.createElement('div', {
      key: 'gs',
      style: { marginBottom: "10px" }
    }, React.createElement('div', {
      style: {
        padding: "12px",
        backgroundColor: "#fff",
        border: "1px solid #e9ecef",
        borderRadius: "8px",
        cursor: "pointer"
      }
    }, '🌍 General Studies'))
  ]);
}

export default Sidebar;
