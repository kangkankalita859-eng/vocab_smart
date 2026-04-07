import { useState } from "react";
import SessionNav from "../components/SessionNav";
import MobileSidebar from "../components/MobileSidebar";
import useMobile from "../hooks/useMobile";

export default function IndiaMap({ onGoHome }) {
  const [selectedState, setSelectedState] = useState(null);
  const [hoveredState, setHoveredState] = useState(null);
  const { isMobile } = useMobile();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // State data with MP seats and Assembly seats
  const statesData = {
    "Andhra Pradesh": { mpSeats: 25, assemblySeats: 175, capital: "Amaravati" },
    "Arunachal Pradesh": { mpSeats: 2, assemblySeats: 60, capital: "Itanagar" },
    "Assam": { mpSeats: 14, assemblySeats: 126, capital: "Dispur" },
    "Bihar": { mpSeats: 40, assemblySeats: 243, capital: "Patna" },
    "Chhattisgarh": { mpSeats: 11, assemblySeats: 90, capital: "Raipur" },
    "Goa": { mpSeats: 2, assemblySeats: 40, capital: "Panaji" },
    "Gujarat": { mpSeats: 26, assemblySeats: 182, capital: "Gandhinagar" },
    "Haryana": { mpSeats: 10, assemblySeats: 90, capital: "Chandigarh" },
    "Himachal Pradesh": { mpSeats: 4, assemblySeats: 68, capital: "Shimla" },
    "Jharkhand": { mpSeats: 14, assemblySeats: 81, capital: "Ranchi" },
    "Karnataka": { mpSeats: 28, assemblySeats: 224, capital: "Bengaluru" },
    "Kerala": { mpSeats: 20, assemblySeats: 140, capital: "Thiruvananthapuram" },
    "Madhya Pradesh": { mpSeats: 29, assemblySeats: 230, capital: "Bhopal" },
    "Maharashtra": { mpSeats: 48, assemblySeats: 288, capital: "Mumbai" },
    "Manipur": { mpSeats: 2, assemblySeats: 60, capital: "Imphal" },
    "Meghalaya": { mpSeats: 2, assemblySeats: 60, capital: "Shillong" },
    "Mizoram": { mpSeats: 1, assemblySeats: 40, capital: "Aizawl" },
    "Nagaland": { mpSeats: 1, assemblySeats: 60, capital: "Kohima" },
    "Odisha": { mpSeats: 21, assemblySeats: 147, capital: "Bhubaneswar" },
    "Punjab": { mpSeats: 13, assemblySeats: 117, capital: "Chandigarh" },
    "Rajasthan": { mpSeats: 25, assemblySeats: 200, capital: "Jaipur" },
    "Sikkim": { mpSeats: 1, assemblySeats: 32, capital: "Gangtok" },
    "Tamil Nadu": { mpSeats: 39, assemblySeats: 234, capital: "Chennai" },
    "Telangana": { mpSeats: 17, assemblySeats: 119, capital: "Hyderabad" },
    "Tripura": { mpSeats: 2, assemblySeats: 60, capital: "Agartala" },
    "Uttar Pradesh": { mpSeats: 80, assemblySeats: 403, capital: "Lucknow" },
    "Uttarakhand": { mpSeats: 5, assemblySeats: 70, capital: "Dehradun" },
    "West Bengal": { mpSeats: 42, assemblySeats: 294, capital: "Kolkata" },
    "Delhi": { mpSeats: 7, assemblySeats: 70, capital: "Delhi" },
    "Jammu & Kashmir": { mpSeats: 5, assemblySeats: 83, capital: "Srinagar/Jammu" },
    "Ladakh": { mpSeats: 1, assemblySeats: 0, capital: "Leh" },
    "Puducherry": { mpSeats: 1, assemblySeats: 30, capital: "Puducherry" },
    "Chandigarh": { mpSeats: 1, assemblySeats: 0, capital: "Chandigarh" },
    "Andaman & Nicobar": { mpSeats: 1, assemblySeats: 0, capital: "Port Blair" },
    "Lakshadweep": { mpSeats: 1, assemblySeats: 0, capital: "Kavaratti" },
    "Dadra & Nagar Haveli": { mpSeats: 1, assemblySeats: 0, capital: "Silvassa" },
    "Daman & Diu": { mpSeats: 1, assemblySeats: 0, capital: "Daman" },
    "Laccadive": { mpSeats: 0, assemblySeats: 0, capital: "" }
  };

  // State coordinates for click areas (approximate positions)
  const stateCoordinates = {
    "Jammu & Kashmir": { x: 35, y: 15, width: 80, height: 60 },
    "Ladakh": { x: 25, y: 35, width: 100, height: 80 },
    "Himachal Pradesh": { x: 45, y: 55, width: 50, height: 40 },
    "Punjab": { x: 40, y: 75, width: 60, height: 35 },
    "Chandigarh": { x: 55, y: 85, width: 30, height: 20 },
    "Uttarakhand": { x: 65, y: 60, width: 50, height: 40 },
    "Haryana": { x: 55, y: 85, width: 70, height: 30 },
    "Delhi": { x: 65, y: 90, width: 25, height: 25 },
    "Rajasthan": { x: 30, y: 85, width: 120, height: 100 },
    "Uttar Pradesh": { x: 75, y: 95, width: 120, height: 80 },
    "Gujarat": { x: 25, y: 150, width: 90, height: 80 },
    "Madhya Pradesh": { x: 75, y: 140, width: 100, height: 90 },
    "Maharashtra": { x: 55, y: 200, width: 120, height: 80 },
    "Goa": { x: 50, y: 250, width: 30, height: 25 },
    "Karnataka": { x: 65, y: 240, width: 80, height: 100 },
    "Kerala": { x: 55, y: 290, width: 40, height: 60 },
    "Tamil Nadu": { x: 75, y: 310, width: 60, height: 70 },
    "Andhra Pradesh": { x: 100, y: 250, width: 80, height: 70 },
    "Telangana": { x: 95, y: 210, width: 60, height: 50 },
    "Chhattisgarh": { x: 125, y: 155, width: 70, height: 60 },
    "Odisha": { x: 155, y: 180, width: 60, height: 70 },
    "Jharkhand": { x: 145, y: 120, width: 60, height: 50 },
    "West Bengal": { x: 175, y: 130, width: 60, height: 60 },
    "Bihar": { x: 155, y: 100, width: 70, height: 40 },
    "Sikkim": { x: 195, y: 90, width: 25, height: 40 },
    "Assam": { x: 280, y: 100, width: 70, height: 60 },
    "Arunachal Pradesh": { x: 240, y: 60, width: 80, height: 70 },
    "Nagaland": { x: 230, y: 110, width: 40, height: 30 },
    "Manipur": { x: 235, y: 130, width: 35, height: 25 },
    "Mizoram": { x: 235, y: 150, width: 30, height: 25 },
    "Tripura": { x: 245, y: 140, width: 35, height: 25 },
    "Meghalaya": { x: 225, y: 125, width: 35, height: 30 },
    "Andaman & Nicobar": { x: 280, y: 280, width: 40, height: 60 },
    "Lakshadweep": { x: 40, y: 320, width: 30, height: 20 },
    "Dadra & Nagar Haveli": { x: 45, y: 195, width: 25, height: 20 },
    "Daman & Diu": { x: 35, y: 185, width: 25, height: 20 },
    "Puducherry": { x: 85, y: 330, width: 25, height: 25 }
  };

  const handleStateClick = (stateName) => {
    setSelectedState(stateName);
  };

  const getStateColor = (stateName) => {
    if (selectedState === stateName) return "#ff6b6b";
    if (hoveredState === stateName) return "#4ecdc4";
    return "#007bff";
  };

  const getStateOpacity = (stateName) => {
    if (selectedState === stateName || hoveredState === stateName) return 0.8;
    return 0.3;
  };

  return (
    <div style={mainContainer}>
      <div style={{...content, padding: isMobile ? "10px" : "20px"}}>
        {/* Mobile Navigation Bar */}
        {isMobile && (
          <div style={mobileNav}>
            <button
              style={menuBtn}
              onClick={() => setMobileMenuOpen(true)}
            >
              ☰
            </button>
            <span style={mobileTitle}>India Political Map</span>
            <button
              style={homeBtn}
              onClick={onGoHome}
            >
              🏠
            </button>
          </div>
        )}

        {/* Header with Navigation */}
        <div style={headerFixed}>
          <div style={navContainer}>
            <SessionNav
              mode="read"
              onGoHome={onGoHome}
              isMobile={isMobile}
              onMenuToggle={() => setMobileMenuOpen(true)}
            />
          </div>
        </div>

        {/* Main Content */}
        <div style={{...mapContainer, marginTop: isMobile ? "70px" : "90px"}}>
          <h2 style={{...title, fontSize: isMobile ? "24px" : "32px"}}>Interactive India Political Map</h2>
          <p style={{...subtitle, fontSize: isMobile ? "14px" : "16px"}}>Click on any state to see MP seats and Assembly seats information</p>
          
          <div style={{...mapWrapper, flexDirection: isMobile ? "column" : "row"}}>
            {/* India Map Image */}
            <div style={{...mapImageContainer, minWidth: isMobile ? "100%" : "400px"}}>
              <img 
                src="/India-map-en.png"
                alt="India Map"
                style={mapImage}
                onError={(e) => {
                  console.error("Image failed to load, trying alternative path...");
                  // Try the original path as fallback
                  e.target.src = "/data/general%20studies/India-map-en.png";
                }}
                onLoad={() => {
                  console.log("Image loaded successfully");
                }}
              />
              
              {/* Temporarily remove overlay to debug */}
              {/* 
              <svg
                style={overlaySvg}
                viewBox="0 0 320 360"
                onMouseLeave={() => setHoveredState(null)}
              >
                {Object.entries(stateCoordinates).map(([stateName, coords]) => (
                  <rect
                    key={stateName}
                    x={coords.x}
                    y={coords.y}
                    width={coords.width}
                    height={coords.height}
                    fill={getStateColor(stateName)}
                    fillOpacity={getStateOpacity(stateName)}
                    stroke="#fff"
                    strokeWidth="1"
                    style={{ cursor: 'pointer' }}
                    onMouseEnter={() => setHoveredState(stateName)}
                    onClick={() => handleStateClick(stateName)}
                  />
                ))}
              </svg>
              */}
            </div>

            {/* State Information Panel */}
            <div style={infoPanel}>
              {selectedState ? (
                <div style={stateInfo}>
                  <h3 style={stateName}>{selectedState}</h3>
                  <div style={seatInfo}>
                    <div style={seatItem}>
                      <span style={seatLabel}>Lok Sabha Seats:</span>
                      <span style={seatValue}>{statesData[selectedState]?.mpSeats || 0}</span>
                    </div>
                    <div style={seatItem}>
                      <span style={seatLabel}>Assembly Seats:</span>
                      <span style={seatValue}>{statesData[selectedState]?.assemblySeats || 0}</span>
                    </div>
                    <div style={seatItem}>
                      <span style={seatLabel}>Capital:</span>
                      <span style={seatValue}>{statesData[selectedState]?.capital || "N/A"}</span>
                    </div>
                  </div>
                </div>
              ) : (
                <div style={placeholderInfo}>
                  <h3 style={placeholderTitle}>Select a State</h3>
                  <p style={placeholderText}>Click on any state in the map to view detailed information about its parliamentary and assembly seats.</p>
                </div>
              )}
            </div>
          </div>

          {/* Hovered State Tooltip */}
          {hoveredState && !selectedState && (
            <div style={tooltip}>
              <strong>{hoveredState}</strong>
              <br />
              <small>MP: {statesData[hoveredState]?.mpSeats || 0} | Assembly: {statesData[hoveredState]?.assemblySeats || 0}</small>
            </div>
          )}

          {/* Legend */}
          <div style={legend}>
            <h4 style={legendTitle}>Legend</h4>
            <div style={legendItems}>
              <div style={legendItem}>
                <div style={{...legendColor, backgroundColor: '#007bff', opacity: 0.3}}></div>
                <span>Normal State</span>
              </div>
              <div style={legendItem}>
                <div style={{...legendColor, backgroundColor: '#4ecdc4', opacity: 0.8}}></div>
                <span>Hovered State</span>
              </div>
              <div style={legendItem}>
                <div style={{...legendColor, backgroundColor: '#ff6b6b', opacity: 0.8}}></div>
                <span>Selected State</span>
              </div>
            </div>
          </div>
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

// Styles
const mainContainer = {
  display: "flex",
  flexDirection: "column",
  minHeight: "100vh",
  backgroundColor: "#f5f7fa"
};

const content = {
  flex: 1,
  padding: "20px",
  maxWidth: "1200px",
  margin: "0 auto",
  width: "100%",
  position: "relative"
};

const mapContainer = {
  padding: "20px"
};

const title = {
  fontSize: "32px",
  fontWeight: "700",
  color: "#2c3e50",
  textAlign: "center",
  marginBottom: "10px"
};

const subtitle = {
  fontSize: "16px",
  color: "#6c757d",
  textAlign: "center",
  marginBottom: "30px"
};

const mapWrapper = {
  display: "flex",
  flexDirection: "row",
  gap: "30px",
  alignItems: "flex-start",
  justifyContent: "center"
};

const mapImageContainer = {
  position: "relative",
  flex: 1,
  maxWidth: "600px",
  minWidth: "400px"
};

const mapImage = {
  width: "100%",
  height: "auto",
  borderRadius: "12px",
  boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
  border: "2px solid #e9ecef"
};

const overlaySvg = {
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  pointerEvents: "all"
};

const infoPanel = {
  flex: "0 0 350px",
  backgroundColor: "#ffffff",
  borderRadius: "12px",
  padding: "25px",
  boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
  border: "1px solid #e9ecef",
  minHeight: "300px"
};

const stateInfo = {
  textAlign: "center"
};

const stateName = {
  fontSize: "24px",
  fontWeight: "700",
  color: "#007bff",
  marginBottom: "25px",
  borderBottom: "2px solid #007bff",
  paddingBottom: "10px"
};

const seatInfo = {
  display: "flex",
  flexDirection: "column",
  gap: "20px"
};

const seatItem = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "15px",
  backgroundColor: "#f8f9fa",
  borderRadius: "8px",
  border: "1px solid #e9ecef"
};

const seatLabel = {
  fontSize: "16px",
  fontWeight: "600",
  color: "#495057"
};

const seatValue = {
  fontSize: "18px",
  fontWeight: "700",
  color: "#007bff",
  backgroundColor: "#e3f2fd",
  padding: "8px 16px",
  borderRadius: "20px"
};

const placeholderInfo = {
  textAlign: "center",
  padding: "40px 20px"
};

const placeholderTitle = {
  fontSize: "20px",
  fontWeight: "600",
  color: "#6c757d",
  marginBottom: "15px"
};

const placeholderText = {
  fontSize: "16px",
  color: "#6c757d",
  lineHeight: "1.5"
};

const tooltip = {
  position: "fixed",
  backgroundColor: "rgba(0,0,0,0.8)",
  color: "#fff",
  padding: "8px 12px",
  borderRadius: "6px",
  fontSize: "14px",
  pointerEvents: "none",
  zIndex: 1000,
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)"
};

const legend = {
  marginTop: "30px",
  backgroundColor: "#ffffff",
  borderRadius: "12px",
  padding: "20px",
  boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
  border: "1px solid #e9ecef"
};

const legendTitle = {
  fontSize: "18px",
  fontWeight: "600",
  color: "#2c3e50",
  marginBottom: "15px",
  textAlign: "center"
};

const legendItems = {
  display: "flex",
  justifyContent: "center",
  gap: "30px",
  flexWrap: "wrap"
};

const legendItem = {
  display: "flex",
  alignItems: "center",
  gap: "10px"
};

const legendColor = {
  width: "20px",
  height: "20px",
  borderRadius: "4px",
  border: "1px solid #dee2e6"
};

const mobileNav = {
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
};

const menuBtn = {
  background: "none",
  border: "none",
  fontSize: "20px",
  cursor: "pointer"
};

const mobileTitle = {
  fontSize: '16px',
  fontWeight: '600'
};

const homeBtn = {
  background: "#007bff",
  color: "#fff",
  border: "none",
  padding: "6px 12px",
  borderRadius: "4px",
  cursor: "pointer",
  fontSize: "14px"
};

const headerFixed = {
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
};

const navContainer = {
  flex: 1
};
