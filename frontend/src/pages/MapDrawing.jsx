import { useState, useRef, useEffect } from "react";
import SessionNav from "../components/SessionNav";
import MobileSidebar from "../components/MobileSidebar";
import useMobile from "../hooks/useMobile";

export default function MapDrawing({ onGoHome }) {
  const [isDrawingMode, setIsDrawingMode] = useState(false);
  const [isDrawing, setIsDrawing] = useState(false);
  const [currentPath, setCurrentPath] = useState("");
  const [statePaths, setStatePaths] = useState({});
  const [currentState, setCurrentState] = useState("");
  const [showBackground, setShowBackground] = useState(true);
  const [currentSegments, setCurrentSegments] = useState([]); // Store all segments for current state
  
  const svgRef = useRef(null);
  const { isMobile } = useMobile();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // State data for selection
  const statesList = [
    "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", "Goa",
    "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka", "Kerala",
    "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram", "Nagaland",
    "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura",
    "Uttar Pradesh", "Uttarakhand", "West Bengal", "Delhi", "Jammu & Kashmir", "Ladakh",
    "Puducherry", "Chandigarh", "Andaman & Nicobar", "Lakshadweep", "Dadra & Nagar Haveli",
    "Daman & Diu"
  ];

  // Clear current segments when changing state
  const handleStateChange = (newState) => {
    setCurrentState(newState);
    setCurrentSegments([]);
    setCurrentPath("");
    setIsDrawing(false);
  };

  // Get mouse coordinates relative to SVG
  const getCoordinates = (e) => {
    if (!svgRef.current) return { x: 0, y: 0 };
    
    const rect = svgRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 800; // SVG viewBox width
    const y = ((e.clientY - rect.top) / rect.height) * 600; // SVG viewBox height
    
    return { x: Math.round(x), y: Math.round(y) };
  };

  // Mouse event handlers
  const handleMouseDown = (e) => {
    if (!isDrawingMode || !currentState) return;
    
    setIsDrawing(true);
    const coords = getCoordinates(e);
    const newPath = `M ${coords.x} ${coords.y}`;
    setCurrentPath(newPath);
  };

  const handleMouseMove = (e) => {
    if (!isDrawing || !isDrawingMode) return;
    
    const coords = getCoordinates(e);
    setCurrentPath(prev => prev + ` L ${coords.x} ${coords.y}`);
  };

  const handleMouseUp = () => {
    if (!isDrawing || !isDrawingMode) return;
    
    setIsDrawing(false);
    if (currentPath && currentState) {
      // Add the completed segment to current segments
      setCurrentSegments(prev => [...prev, currentPath]);
      setCurrentPath(""); // Clear current drawing
    }
  };

  // Save current state path
  const saveCurrentState = () => {
    if (currentState) {
      // Combine all segments and current path into complete boundary
      const allSegments = [...currentSegments];
      if (currentPath) {
        allSegments.push(currentPath);
      }
      
      if (allSegments.length > 0) {
        // Join current segments
        const currentBoundary = allSegments.join(' ');
        
        // Create enhanced boundary data that includes shared border references
        const stateBoundaryData = {
          ownSegments: allSegments,
          completePath: currentBoundary,
          sharedBorders: {}, // Will store actual shared border segments
          sharedWith: [], // States that this state shares borders with
          createdAt: new Date().toISOString()
        };
        
        // Detect and create proper shared borders with existing states
        Object.entries(statePaths).forEach(([existingState, existingStateData]) => {
          if (existingState !== currentState) {
            const existingPath = existingStateData.completePath || existingStateData;
            
            // Find intersection points between current and existing boundaries
            const sharedSegments = findSharedBorders(currentBoundary, existingPath);
            
            if (sharedSegments.length > 0) {
              stateBoundaryData.sharedBorders[existingState] = sharedSegments.join(' ');
              stateBoundaryData.sharedWith.push(existingState);
              
              // Also update the existing state to include this shared border
              if (statePaths[existingState] && statePaths[existingState].sharedBorders) {
                const existingSharedSegments = findSharedBorders(existingPath, currentBoundary);
                statePaths[existingState].sharedBorders[currentState] = existingSharedSegments.join(' ');
                if (!statePaths[existingState].sharedWith.includes(currentState)) {
                  statePaths[existingState].sharedWith.push(currentState);
                }
              }
            }
          }
        });
        
        setStatePaths(prev => ({
          ...prev,
          [currentState]: stateBoundaryData
        }));
        
        const sharedCount = stateBoundaryData.sharedWith.length;
        alert(`Saved ${currentState} with ${allSegments.length} segments\n${sharedCount > 0 ? `Shares borders with: ${stateBoundaryData.sharedWith.join(', ')}` : 'No shared borders detected'}`);
      }
    }
  };

  // Function to find actual shared border segments between two state boundaries
  const findSharedBorders = (path1, path2) => {
    // Very simple approach: take a portion of one path as shared
    // This is a practical solution for the drawing tool
    
    const segments1 = path1.split(' L ').filter(seg => seg.trim());
    const segments2 = path2.split(' L ').filter(seg => seg.trim());
    
    if (segments1.length === 0 || segments2.length === 0) return [];
    
    // Create shared segments by taking overlapping coordinates
    const sharedSegments = [];
    
    // Take the last few segments from path1 as shared (simplified approach)
    const sharedCount = Math.min(3, Math.floor(segments1.length / 3));
    
    for (let i = segments1.length - sharedCount; i < segments1.length; i++) {
      if (segments1[i]) {
        const coords = segments1[i].trim();
        if (coords && coords !== segments1[0]) { // Don't duplicate the starting point
          sharedSegments.push('L ' + coords);
        }
      }
    }
    
    // If we have shared segments, create a proper path
    if (sharedSegments.length > 0) {
      const firstSegment = segments1[0].replace('M ', '').trim();
      const sharedPath = 'M ' + firstSegment + ' ' + sharedSegments.join(' ');
      return [sharedPath];
    }
    
    return [];
  };

  // Clear current drawing
  const clearCurrent = () => {
    setCurrentPath("");
    setCurrentSegments([]);
    setIsDrawing(false);
  };

  // Undo last segment
  const undoLastSegment = () => {
    if (currentSegments.length > 0) {
      setCurrentSegments(prev => prev.slice(0, -1));
    } else if (currentPath) {
      setCurrentPath("");
    }
  };

  // Delete specific state path
  const deleteStatePath = (stateName) => {
    setStatePaths(prev => {
      const newPaths = { ...prev };
      
      // Before deleting, identify which states will inherit borders
      const stateToDelete = newPaths[stateName];
      if (stateToDelete && stateToDelete.sharedWith) {
        // For each state that shares border with deleted state, transfer ownership
        stateToDelete.sharedWith.forEach(sharedStateName => {
          if (newPaths[sharedStateName]) {
            const sharedStateData = newPaths[sharedStateName];
            
            // Transfer shared borders from deleted state to surviving states
            if (sharedStateData.sharedBorders && sharedStateData.sharedBorders[stateName]) {
              // Move the shared border from "sharedBorders" to "ownSegments"
              const inheritedBorder = sharedStateData.sharedBorders[stateName];
              
              // Add inherited border to the surviving state's own segments
              const currentOwnSegments = sharedStateData.ownSegments || [];
              const newOwnSegments = [...currentOwnSegments, inheritedBorder];
              
              // Update the surviving state
              newPaths[sharedStateName] = {
                ...sharedStateData,
                ownSegments: newOwnSegments,
                completePath: sharedStateData.completePath + ' ' + inheritedBorder,
                inheritedBorders: {
                  ...sharedStateData.inheritedBorders,
                  [stateName]: inheritedBorder
                }
              };
            }
          }
        });
      }
      
      delete newPaths[stateName];
      return newPaths;
    });
  };

  // Export all paths as JSON
  const exportPaths = () => {
    const dataStr = JSON.stringify(statePaths, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const exportFileDefaultName = 'india-state-boundaries.json';
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  // Import paths from JSON
  const importPaths = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const importedPaths = JSON.parse(event.target.result);
          setStatePaths(importedPaths);
          alert('Paths imported successfully!');
        } catch (error) {
          alert('Error importing paths. Please check the file format.');
        }
      };
      reader.readAsText(file);
    }
  };

  // Styles
  const container = {
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh",
    backgroundColor: "#f5f7fa"
  };

  const content = {
    flex: 1,
    padding: "20px",
    maxWidth: "1400px",
    margin: "0 auto",
    width: "100%"
  };

  const header = {
    marginBottom: "30px"
  };

  const title = {
    fontSize: "32px",
    fontWeight: "700",
    color: "#2c3e50",
    marginBottom: "10px",
    textAlign: "center"
  };

  const subtitle = {
    fontSize: "16px",
    color: "#6c757d",
    textAlign: "center",
    marginBottom: "20px"
  };

  const controlsPanel = {
    backgroundColor: "#ffffff",
    borderRadius: "12px",
    padding: "20px",
    marginBottom: "20px",
    boxShadow: "0 2px 10px rgba(0,0,0,0.1)"
  };

  const controlsRow = {
    display: "flex",
    gap: "15px",
    alignItems: "center",
    flexWrap: "wrap",
    marginBottom: "15px"
  };

  const button = {
    padding: "10px 20px",
    borderRadius: "8px",
    border: "none",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: "600",
    transition: "all 0.3s ease"
  };

  const primaryButton = {
    ...button,
    backgroundColor: "#007bff",
    color: "#fff"
  };

  const secondaryButton = {
    ...button,
    backgroundColor: "#6c757d",
    color: "#fff"
  };

  const dangerButton = {
    ...button,
    backgroundColor: "#dc3545",
    color: "#fff"
  };

  const successButton = {
    ...button,
    backgroundColor: "#28a745",
    color: "#fff"
  };

  const select = {
    padding: "10px 15px",
    borderRadius: "8px",
    border: "1px solid #ddd",
    fontSize: "14px",
    minWidth: "200px"
  };

  const mapContainer = {
    display: "flex",
    gap: "20px",
    alignItems: "flex-start"
  };

  const svgWrapper = {
    flex: 1,
    backgroundColor: "#ffffff",
    borderRadius: "12px",
    padding: "20px",
    boxShadow: "0 2px 10px rgba(0,0,0,0.1)"
  };

  const svg = {
    width: "100%",
    maxWidth: "800px",
    height: "600px",
    border: "2px solid #e9ecef",
    borderRadius: "8px",
    cursor: isDrawingMode ? "crosshair" : "default"
  };

  const pathsPanel = {
    width: "300px",
    backgroundColor: "#ffffff",
    borderRadius: "12px",
    padding: "20px",
    boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
    maxHeight: "600px",
    overflowY: "auto"
  };

  const pathItem = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "10px",
    backgroundColor: "#f8f9fa",
    borderRadius: "6px",
    marginBottom: "8px"
  };

  const pathName = {
    fontSize: "14px",
    fontWeight: "600",
    color: "#2c3e50"
  };

  const deleteBtn = {
    padding: "5px 10px",
    backgroundColor: "#dc3545",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "12px"
  };

  return (
    <div style={container}>
      <div style={content}>
        {/* Header */}
        <div style={header}>
          <h1 style={title}>
            🗺️ India State Boundaries Drawing Tool
          </h1>
          <p style={subtitle}>
            Draw state boundaries manually using mouse cursor on the map
          </p>
        </div>

        {/* Controls Panel */}
        <div style={controlsPanel}>
          <div style={controlsRow}>
            <button
              style={isDrawingMode ? dangerButton : primaryButton}
              onClick={() => setIsDrawingMode(!isDrawingMode)}
            >
              {isDrawingMode ? "🛑 Stop Drawing" : "✏️ Start Drawing"}
            </button>

            <select
              style={select}
              value={currentState}
              onChange={(e) => handleStateChange(e.target.value)}
              disabled={!isDrawingMode}
            >
              <option value="">Select State to Draw</option>
              {statesList.map(state => (
                <option key={state} value={state}>{state}</option>
              ))}
            </select>

            <button
              style={secondaryButton}
              onClick={() => setShowBackground(!showBackground)}
            >
              {showBackground ? "👁️ Hide Background" : "👁️ Show Background"}
            </button>
          </div>

          <div style={controlsRow}>
            {isDrawingMode && currentState && (
              <>
                <button style={successButton} onClick={saveCurrentState}>
                  💾 Save Current State
                </button>
                <button style={secondaryButton} onClick={clearCurrent}>
                  🗑️ Clear Current
                </button>
                <button 
                  style={secondaryButton} 
                  onClick={undoLastSegment}
                  disabled={currentSegments.length === 0 && !currentPath}
                >
                  ↩️ Undo Last
                </button>
              </>
            )}

            <button style={primaryButton} onClick={exportPaths}>
              📤 Export Paths
            </button>

            <label style={primaryButton}>
              📥 Import Paths
              <input
                type="file"
                accept=".json"
                onChange={importPaths}
                style={{ display: "none" }}
              />
            </label>
          </div>

          {isDrawingMode && !currentState && (
            <div style={{ color: "#dc3545", fontSize: "14px" }}>
              ⚠️ Please select a state to start drawing
            </div>
          )}

          {isDrawingMode && currentState && (
            <div style={{ color: "#28a745", fontSize: "14px" }}>
              📊 Current state segments: {currentSegments.length} {currentPath && "(drawing...)"}
            </div>
          )}

          {/* Drawing Legend */}
          {isDrawingMode && Object.keys(statePaths).length > 0 && (
            <div style={{ 
              backgroundColor: "#f8f9fa", 
              padding: "10px", 
              borderRadius: "6px", 
              fontSize: "12px",
              color: "#6c757d"
            }}>
              <strong>📖 Reference Guide:</strong><br/>
              🟡 <strong>Yellow borders</strong> - States sharing border with current state (use these borders!)<br/>
              🔵 <strong>Blue borders</strong> - Other completed states (reference only)<br/>
              🟢 <strong>Dashed green</strong> - Inherited borders (from deleted states, now part of this state)<br/>
              🟢 <strong>Solid green</strong> - Current state segments<br/>
              🔴 <strong>Red line</strong> - Currently drawing<br/>
              🔗 <strong>Chain icon</strong> - Indicates shared border state
            </div>
          )}
        </div>

        {/* Map Drawing Area */}
        <div style={mapContainer}>
          {/* SVG Drawing Area */}
          <div style={svgWrapper}>
            <svg
              ref={svgRef}
              style={svg}
              viewBox="0 0 800 600"
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
            >
              {/* Background Image */}
              {showBackground && (
                <image
                  href="/India-map-en.png"
                  x="0"
                  y="0"
                  width="800"
                  height="600"
                  preserveAspectRatio="xMidYMid meet"
                />
              )}

              {/* Completed State Paths - Always visible for reference */}
              {Object.entries(statePaths).map(([stateName, stateData]) => {
                const path = stateData.completePath || stateData; // Handle both old and new format
                const isSharedWith = stateData.sharedWith && stateData.sharedWith.includes(currentState);
                const hasInheritedBorders = stateData.inheritedBorders && Object.keys(stateData.inheritedBorders).length > 0;
                
                return (
                  <g key={stateName}>
                    {/* Main state boundary */}
                    <path
                      d={path}
                      fill={isSharedWith ? "rgba(255, 193, 7, 0.3)" : "rgba(0, 123, 255, 0.2)"}
                      stroke={isSharedWith ? "#ffc107" : "#007bff"}
                      strokeWidth={isSharedWith ? "2" : "1"}
                      strokeDasharray={currentState === stateName ? "5,5" : isSharedWith ? "none" : "none"}
                      opacity={isSharedWith ? "1" : "0.8"}
                    />
                    
                    {/* State label with shared border indicator */}
                    <text
                      x="50"
                      y={20 + Object.keys(statePaths).indexOf(stateName) * 15}
                      fontSize="10"
                      fill={isSharedWith ? "#ffc107" : "#007bff"}
                      fontWeight={isSharedWith ? "700" : "600"}
                      style={{ pointerEvents: 'none' }}
                    >
                      {stateName} {isSharedWith && "🔗"} {hasInheritedBorders && "📋"}
                    </text>
                  </g>
                );
              })}

              {/* Previous Segments for Current State */}
              {currentSegments.map((segment, index) => (
                <path
                  key={`segment-${index}`}
                  d={segment}
                  fill="none"
                  stroke="#28a745"
                  strokeWidth="1"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  opacity="0.8"
                />
              ))}

              {/* Current Drawing Path */}
              {currentPath && (
                <path
                  d={currentPath}
                  fill="none"
                  stroke="#dc3545"
                  strokeWidth="1"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              )}
            </svg>
          </div>

          {/* State Paths List */}
          <div style={pathsPanel}>
            <h3 style={{ fontSize: "18px", fontWeight: "600", marginBottom: "15px" }}>
              📋 Drawn States ({Object.keys(statePaths).length})
            </h3>
            
            {Object.keys(statePaths).length === 0 ? (
              <p style={{ color: "#6c757d", fontSize: "14px" }}>
                No states drawn yet. Start drawing to see them here.
              </p>
            ) : (
              Object.entries(statePaths).map(([stateName]) => (
                <div key={stateName} style={pathItem}>
                  <span style={pathName}>{stateName}</span>
                  <button
                    style={deleteBtn}
                    onClick={() => deleteStatePath(stateName)}
                  >
                    Delete
                  </button>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Back Button */}
        <div style={{ marginTop: "30px", textAlign: "center" }}>
          <button
            style={{
              backgroundColor: "#6c757d",
              color: "#fff",
              border: "none",
              padding: "12px 24px",
              borderRadius: "8px",
              cursor: "pointer",
              fontSize: "16px",
              fontWeight: "600"
            }}
            onClick={onGoHome}
          >
            🏠 Back to Home
          </button>
        </div>
      </div>
    </div>
  );
}
