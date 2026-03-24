import { useState } from "react";
import SessionNav from "../components/SessionNav";
import MobileSidebar from "../components/MobileSidebar";
import useMobile from "../hooks/useMobile";

export default function Geography({ config, onUpdateConfig, onGoHome }) {
  console.log("Geography component loaded successfully!");
  console.log("Updated with Chief Minister information - v2.1 - Fresh deployment");
  const [selectedState, setSelectedState] = useState(null);
  const [hoveredState, setHoveredState] = useState(null);
  const { isMobile } = useMobile();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  console.log("isMobile:", isMobile);

  // State data with MP seats, Assembly seats, Capital, and Chief Minister
  const statesData = {
    "Andhra Pradesh": { mpSeats: 25, assemblySeats: 175, capital: "Amaravati", chiefMinister: "N. Chandrababu Naidu" },
    "Arunachal Pradesh": { mpSeats: 2, assemblySeats: 60, capital: "Itanagar", chiefMinister: "Pema Khandu" },
    "Assam": { mpSeats: 14, assemblySeats: 126, capital: "Dispur", chiefMinister: "Himanta Biswa Sarma" },
    "Bihar": { mpSeats: 40, assemblySeats: 243, capital: "Patna", chiefMinister: "Nitish Kumar" },
    "Chhattisgarh": { mpSeats: 11, assemblySeats: 90, capital: "Raipur", chiefMinister: "Vishnu Deo Sai" },
    "Goa": { mpSeats: 2, assemblySeats: 40, capital: "Panaji", chiefMinister: "Pramod Sawant" },
    "Gujarat": { mpSeats: 26, assemblySeats: 182, capital: "Gandhinagar", chiefMinister: "Bhupendra Patel" },
    "Haryana": { mpSeats: 10, assemblySeats: 90, capital: "Chandigarh", chiefMinister: "Nayab Singh Saini" },
    "Himachal Pradesh": { mpSeats: 4, assemblySeats: 68, capital: "Shimla", chiefMinister: "Sukhvinder Singh Sukhu" },
    "Jammu & Kashmir": { mpSeats: 5, assemblySeats: 83, capital: "Srinagar/Jammu", chiefMinister: "Omar Abdullah" },
    "Jharkhand": { mpSeats: 14, assemblySeats: 81, capital: "Ranchi", chiefMinister: "Hemant Soren" },
    "Karnataka": { mpSeats: 28, assemblySeats: 224, capital: "Bengaluru", chiefMinister: "Siddaramaiah" },
    "Kerala": { mpSeats: 20, assemblySeats: 140, capital: "Thiruvananthapuram", chiefMinister: "Pinarayi Vijayan" },
    "Madhya Pradesh": { mpSeats: 29, assemblySeats: 230, capital: "Bhopal", chiefMinister: "Mohan Yadav" },
    "Maharashtra": { mpSeats: 48, assemblySeats: 288, capital: "Mumbai", chiefMinister: "Devendra Fadnavis" },
    "Manipur": { mpSeats: 2, assemblySeats: 60, capital: "Imphal", chiefMinister: "N. Biren Singh" },
    "Meghalaya": { mpSeats: 2, assemblySeats: 60, capital: "Shillong", chiefMinister: "Conrad K. Sangma" },
    "Mizoram": { mpSeats: 1, assemblySeats: 40, capital: "Aizawl", chiefMinister: "Lalduhoma" },
    "Nagaland": { mpSeats: 1, assemblySeats: 60, capital: "Kohima", chiefMinister: "Neiphiu Rio" },
    "Odisha": { mpSeats: 21, assemblySeats: 147, capital: "Bhubaneswar", chiefMinister: "Mohan Majhi" },
    "Punjab": { mpSeats: 13, assemblySeats: 117, capital: "Chandigarh", chiefMinister: "Bhagwant Mann" },
    "Rajasthan": { mpSeats: 25, assemblySeats: 200, capital: "Jaipur", chiefMinister: "Bhajan Lal Sharma" },
    "Sikkim": { mpSeats: 1, assemblySeats: 32, capital: "Gangtok", chiefMinister: "Prem Singh Tamang" },
    "Tamil Nadu": { mpSeats: 39, assemblySeats: 234, capital: "Chennai", chiefMinister: "M.K. Stalin" },
    "Telangana": { mpSeats: 17, assemblySeats: 119, capital: "Hyderabad", chiefMinister: "A. Revanth Reddy" },
    "Tripura": { mpSeats: 2, assemblySeats: 60, capital: "Agartala", chiefMinister: "Manik Saha" },
    "Uttar Pradesh": { mpSeats: 80, assemblySeats: 403, capital: "Lucknow", chiefMinister: "Yogi Adityanath" },
    "Uttarakhand": { mpSeats: 5, assemblySeats: 70, capital: "Dehradun", chiefMinister: "Pushkar Singh Dhami" },
    "West Bengal": { mpSeats: 42, assemblySeats: 294, capital: "Kolkata", chiefMinister: "Mamata Banerjee" },
    "Ladakh": { mpSeats: 1, assemblySeats: 0, capital: "Leh", chiefMinister: "No CM (Union Territory)" },
    "Puducherry": { mpSeats: 1, assemblySeats: 30, capital: "Puducherry", chiefMinister: "N. Rangasamy" },
    "Chandigarh": { mpSeats: 1, assemblySeats: 0, capital: "Chandigarh", chiefMinister: "No CM (Union Territory)" },
    "Andaman & Nicobar": { mpSeats: 1, assemblySeats: 0, capital: "Port Blair", chiefMinister: "No CM (Union Territory)" },
    "Lakshadweep": { mpSeats: 1, assemblySeats: 0, capital: "Kavaratti", chiefMinister: "No CM (Union Territory)" },
    "Dadra & Nagar Haveli": { mpSeats: 1, assemblySeats: 0, capital: "Silvassa", chiefMinister: "No CM (Union Territory)" },
    "Daman & Diu": { mpSeats: 1, assemblySeats: 0, capital: "Daman", chiefMinister: "No CM (Union Territory)" }
  };

  // State coordinates for tiny circles (positioned exactly above state capitals) - Alphabetical Order
  const stateCoordinates = {
    "Andaman & Nicobar": { x: 280, y: 275, radius: 6 }, // Above Port Blair
    "Andhra Pradesh": { x: 130, y: 260, radius: 8 }, // Above Amaravati
    "Arunachal Pradesh": { x: 278, y: 107, radius: 6 }, // Above Itanagar
    "Assam": { x: 270, y: 128, radius: 5 }, // Above Dispur
    "Bihar": { x: 155, y: 100, radius: 8 }, // Above Patna
    "Chandigarh": { x: 160, y: 95, radius: 6 }, // Chandigarh itself
    "Chhattisgarh": { x: 160, y: 165, radius: 6 }, // Above Raipur
    "Dadra & Nagar Haveli": { x: 50, y: 190, radius: 4 }, // Above Silvassa
    "Daman & Diu": { x: 40, y: 180, radius: 4 }, // Above Daman
    "Delhi": { x: 80, y: 85, radius: 5 }, // Delhi itself
    "Goa": { x: 63, y: 265, radius: 4 }, // Above Panaji
    "Gujarat": { x: 45, y: 160, radius: 8 }, // Above Gandhinagar
    "Haryana": { x: 75, y: 85, radius: 6 }, // Above Chandigarh
    "Himachal Pradesh": { x: 70, y: 55, radius: 6 }, // Above Shimla
    "Jammu & Kashmir": { x: 75, y: 35, radius: 8 }, // Above Srinagar/Jammu
    "Jharkhand": { x: 200, y: 165, radius: 6 }, // Above Ranchi
    "Karnataka": { x: 85, y: 260, radius: 8 }, // Above Bengaluru
    "Kerala": { x: 95, y: 320, radius: 5 }, // Above Thiruvananthapuram
    "Ladakh": { x: 50, y: 55, radius: 8 }, // Above Leh
    "Lakshadweep": { x: 45, y: 315, radius: 4 }, // Above Kavaratti
    "Madhya Pradesh": { x: 120, y: 175, radius: 7 }, // Above Bhopal
    "Maharashtra": { x: 95, y: 215, radius: 8 }, // Above Mumbai
    "Manipur": { x: 235, y: 125, radius: 5 }, // Above Imphal
    "Meghalaya": { x: 255, y: 139, radius:4 }, // Above Shillong
    "Mizoram": { x: 235, y: 145, radius: 5 }, // Above Aizawl
    "Nagaland": { x: 289, y: 130, radius: 5 }, // Above Kohima
    "Odisha": { x: 200, y: 200, radius: 6 }, // Above Bhubaneswar
    "Puducherry": { x: 85, y: 320, radius: 4 }, // Above Puducherry
    "Punjab": { x: 70, y: 75, radius: 6 }, // Above Chandigarh
    "Rajasthan": { x: 70, y: 130, radius: 8 }, // Above Jaipur
    "Sikkim": { x: 195, y: 95, radius: 4 }, // Above Gangtok
    "Tamil Nadu": { x: 119, y: 309, radius: 6 }, // Above Chennai
    "Telangana": { x: 125, y: 240, radius: 6 }, // Above Hyderabad
    "Tripura": { x: 263, y: 162, radius: 3 }, // Above Agartala
    "Uttarakhand": { x: 85, y: 55, radius: 6 }, // Above Dehradun
    "Uttar Pradesh": { x: 145, y: 125, radius: 10 }, // Above Lucknow
    "West Bengal": { x: 220, y: 165, radius: 6 } // Above Kolkata
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
    if (selectedState === stateName) return 0.8;
    if (hoveredState === stateName) return 0.8;
    return 0.3;
  };

  const resetSelection = () => {
    setSelectedState(null);
    setHoveredState(null);
  };

  return (
    <div style={{ padding: "20px", textAlign: "center", backgroundColor: "#f5f7fa" }}>
      {/* Header */}
      <div style={{ marginBottom: "30px" }}>
        <h1 style={{ fontSize: "32px", fontWeight: "700", color: "#2c3e50", marginBottom: "10px" }}>
          🗺️ Interactive India Political Map
        </h1>
        <p style={{ fontSize: "16px", color: "#6c757d" }}>
          Click on any state to see MP seats and Assembly seats information
        </p>
      </div>

      {/* Main Map Container */}
      <div style={{ display: "flex", flexDirection: isMobile ? "column" : "row", gap: "30px", alignItems: "flex-start", justifyContent: "center" }}>
        
        {/* Map Image with Circles */}
        <div style={{ position: "relative", flex: 1, maxWidth: "600px", width: "100%" }}>
          <img 
            src="/India-map-en.png"
            alt="India Map"
            style={{ 
              width: "100%", 
              height: "auto",
              borderRadius: "12px",
              boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
              border: "2px solid #e9ecef"
            }}
            onError={(e) => {
              console.error("Image failed to load:", e);
              e.target.src = "/data/general%20studies/India-map-en.png";
            }}
            onLoad={() => {
              console.log("India map image loaded successfully!");
            }}
          />
          
          {/* Interactive State Circles */}
          <svg
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              pointerEvents: "all"
            }}
            viewBox="0 0 320 360"
            onMouseLeave={() => setHoveredState(null)}
          >
            {Object.entries(stateCoordinates).map(([stateName, coords]) => (
              <circle
                key={stateName}
                cx={coords.x}
                cy={coords.y}
                r={coords.radius}
                fill={getStateColor(stateName)}
                fillOpacity={getStateOpacity(stateName)}
                stroke="#fff"
                strokeWidth="2"
                style={{ cursor: 'pointer', transition: 'all 0.3s ease' }}
                onMouseEnter={() => setHoveredState(stateName)}
                onClick={() => handleStateClick(stateName)}
              />
            ))}
          </svg>
        </div>

        {/* State Information Panel */}
        <div style={{ 
          flex: isMobile ? "1" : "0 0 300px", 
          backgroundColor: "#ffffff", 
          borderRadius: "12px", 
          padding: "20px", 
          boxShadow: "0 4px 20px rgba(0,0,0,0.1)", 
          border: "1px solid #e9ecef",
          minWidth: "250px"
        }}>
          {selectedState ? (
            <div style={{ textAlign: "center" }}>
              <h3 style={{ 
                fontSize: "24px", 
                fontWeight: "700", 
                color: "#007bff", 
                marginBottom: "25px", 
                borderBottom: "2px solid #007bff", 
                paddingBottom: "10px" 
              }}>
                {selectedState}
              </h3>
              <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                <div style={{ 
                  display: "flex", 
                  justifyContent: "space-between", 
                  alignItems: "center", 
                  padding: "15px", 
                  backgroundColor: "#f8f9fa", 
                  borderRadius: "8px", 
                  border: "1px solid #e9ecef" 
                }}>
                  <span style={{ fontSize: "16px", fontWeight: "600", color: "#495057" }}>MP Seats:</span>
                  <span style={{ 
                    fontSize: "16px", 
                    fontWeight: "700", 
                    color: "#007bff", 
                    backgroundColor: "#e3f2fd", 
                    padding: "8px 16px", 
                    borderRadius: "20px" 
                  }}>
                    {statesData[selectedState]?.mpSeats || 0}
                  </span>
                </div>
                <div style={{ 
                  display: "flex", 
                  justifyContent: "space-between", 
                  alignItems: "center", 
                  padding: "15px", 
                  backgroundColor: "#f8f9fa", 
                  borderRadius: "8px", 
                  border: "1px solid #e9ecef" 
                }}>
                  <span style={{ fontSize: "16px", fontWeight: "600", color: "#495057" }}>Assembly Seats:</span>
                  <span style={{ 
                    fontSize: "16px", 
                    fontWeight: "700", 
                    color: "#007bff", 
                    backgroundColor: "#e3f2fd", 
                    padding: "8px 16px", 
                    borderRadius: "20px" 
                  }}>
                    {statesData[selectedState]?.assemblySeats || 0}
                  </span>
                </div>
                <div style={{ 
                  display: "flex", 
                  justifyContent: "space-between", 
                  alignItems: "center", 
                  padding: "15px", 
                  backgroundColor: "#f8f9fa", 
                  borderRadius: "8px", 
                  border: "1px solid #e9ecef" 
                }}>
                  <span style={{ fontSize: "16px", fontWeight: "600", color: "#495057" }}>Capital:</span>
                  <span style={{ 
                    fontSize: "16px", 
                    fontWeight: "700", 
                    color: "#007bff", 
                    backgroundColor: "#e3f2fd", 
                    padding: "8px 16px", 
                    borderRadius: "20px" 
                  }}>
                    {statesData[selectedState]?.capital || "N/A"}
                  </span>
                </div>
                <div style={{ 
                  display: "flex", 
                  justifyContent: "space-between", 
                  alignItems: "center", 
                  padding: "15px", 
                  backgroundColor: "#f8f9fa", 
                  borderRadius: "8px", 
                  border: "1px solid #e9ecef" 
                }}>
                  <span style={{ fontSize: "16px", fontWeight: "600", color: "#495057" }}>Chief Minister:</span>
                  <span style={{ 
                    fontSize: "16px", 
                    fontWeight: "700", 
                    color: "#007bff", 
                    backgroundColor: "#e3f2fd", 
                    padding: "8px 16px", 
                    borderRadius: "20px" 
                  }}>
                    {statesData[selectedState]?.chiefMinister || "N/A"}
                  </span>
                </div>
              </div>
              <button 
                onClick={resetSelection}
                style={{ 
                  background: "#dc3545", 
                  color: "#fff", 
                  border: "none", 
                  padding: "10px 20px", 
                  borderRadius: "6px", 
                  cursor: "pointer", 
                  fontSize: "14px", 
                  marginTop: "20px", 
                  width: "100%" 
                }}
              >
                Reset Selection
              </button>
            </div>
          ) : (
            <div style={{ textAlign: "center", padding: "40px 20px" }}>
              <h3 style={{ fontSize: "20px", fontWeight: "600", color: "#6c757d", marginBottom: "15px" }}>
                Select a State
              </h3>
              <p style={{ fontSize: "16px", color: "#6c757d", lineHeight: "1.5" }}>
                Click on any state circle to see detailed information
              </p>
            </div>
          )}

          {/* Legend */}
          <div style={{ 
            marginTop: "30px", 
            backgroundColor: "#ffffff", 
            borderRadius: "12px", 
            padding: "20px", 
            boxShadow: "0 2px 10px rgba(0,0,0,0.1)", 
            border: "1px solid #e9ecef" 
          }}>
            <h4 style={{ fontSize: "18px", fontWeight: "600", color: "#2c3e50", marginBottom: "15px", textAlign: "center" }}>
              Legend
            </h4>
            <div style={{ display: "flex", justifyContent: "center", gap: "30px", flexWrap: isMobile ? "wrap" : "nowrap" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <div style={{ 
                  width: "20px", 
                  height: "20px", 
                  borderRadius: "50%", 
                  border: "1px solid #dee2e6", 
                  backgroundColor: "#007bff", 
                  opacity: 0.3 
                }}></div>
                <span>Normal State</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <div style={{ 
                  width: "20px", 
                  height: "20px", 
                  borderRadius: "50%", 
                  border: "1px solid #dee2e6", 
                  backgroundColor: "#4ecdc4", 
                  opacity: 0.8 
                }}></div>
                <span>Hovered State</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <div style={{ 
                  width: "20px", 
                  height: "20px", 
                  borderRadius: "50%", 
                  border: "1px solid #dee2e6", 
                  backgroundColor: "#ff6b6b", 
                  opacity: 0.8 
                }}></div>
                <span>Selected State</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div style={{ marginTop: "30px", textAlign: "center" }}>
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
  );
}
