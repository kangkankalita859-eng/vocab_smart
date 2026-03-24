import { useState } from "react";
import SessionNav from "../components/SessionNav";
import MobileSidebar from "../components/MobileSidebar";
import useMobile from "../hooks/useMobile";

export default function Geography({ config, onUpdateConfig, onGoHome }) {
  console.log("Geography component loaded successfully!");
  console.log("FINAL VERSION with Chief Ministers - " + new Date().toISOString());
  const [selectedState, setSelectedState] = useState(null);
  const [hoveredState, setHoveredState] = useState(null);
  const { isMobile } = useMobile();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("basic");
  
  console.log("isMobile:", isMobile);

  // State data with MP seats, Assembly seats, Capital, Chief Minister, Population, Area, Economy, and National Parks
  const statesData = {
    "Andhra Pradesh": { 
      mpSeats: 25, 
      assemblySeats: 175, 
      capital: "Amaravati", 
      chiefMinister: "N. Chandrababu Naidu",
      population: "5.3 Crore",
      area: "1,60,205 km²",
      economy: { gdp: "₹13.5 Lakh Crore", debt: "₹3.2 Lakh Crore" },
      nationalParks: ["Sri Venkateswara", "Papikonda", "Mallavaram", "Nagarjunsagar-Srisailam"]
    },
    "Arunachal Pradesh": { 
      mpSeats: 2, 
      assemblySeats: 60, 
      capital: "Itanagar", 
      chiefMinister: "Pema Khandu",
      population: "16.7 Lakh",
      area: "83,743 km²",
      economy: { gdp: "₹30,000 Crore", debt: "₹8,000 Crore" },
      nationalParks: ["Namdapha", "Mouling", "Eagle's Nest", "Dibang Valley", "Pakhui"]
    },
    "Assam": { 
      mpSeats: 14, 
      assemblySeats: 126, 
      capital: "Dispur", 
      chiefMinister: "Himanta Biswa Sarma",
      population: "3.5 Crore",
      area: "78,438 km²",
      economy: { gdp: "₹4.5 Lakh Crore", debt: "₹1.2 Lakh Crore" },
      nationalParks: ["Kaziranga", "Manas", "Nameri", "Orang", "Dibru-Saikhowa", "Raimona"]
    },
    "Bihar": { 
      mpSeats: 40, 
      assemblySeats: 243, 
      capital: "Patna", 
      chiefMinister: "Nitish Kumar",
      population: "12.8 Crore",
      area: "94,163 km²",
      economy: { gdp: "₹7.5 Lakh Crore", debt: "₹2.8 Lakh Crore" },
      nationalParks: ["Valmiki", "Bhimbandh", "Kaimur", "Rajgir", "Gautam Buddha"]
    },
    "Chhattisgarh": { 
      mpSeats: 11, 
      assemblySeats: 90, 
      capital: "Raipur", 
      chiefMinister: "Vishnu Deo Sai",
      population: "3.0 Crore",
      area: "1,35,192 km²",
      economy: { gdp: "₹4.2 Lakh Crore", debt: "₹1.5 Lakh Crore" },
      nationalParks: ["Guru Ghasidas", "Kanger Valley", "Indravati", "Sanjay", "Barnawapara", "Udanti"]
    },
    "Goa": { 
      mpSeats: 2, 
      assemblySeats: 40, 
      capital: "Panaji", 
      chiefMinister: "Pramod Sawant",
      population: "15.2 Lakh",
      area: "3,702 km²",
      economy: { gdp: "₹75,000 Crore", debt: "₹22,000 Crore" },
      nationalParks: ["Mollem", "Bhagwan Mahavir", "Netravali", "Cotigao"]
    },
    "Gujarat": { 
      mpSeats: 26, 
      assemblySeats: 182, 
      capital: "Gandhinagar", 
      chiefMinister: "Bhupendra Patel",
      population: "6.4 Crore",
      area: "1,96,244 km²",
      economy: { gdp: "₹22 Lakh Crore", debt: "₹4.5 Lakh Crore" },
      nationalParks: ["Gir", "Blackbuck", "Marine", "Vansda", "Nal Sarovar", "Jessore"]
    },
    "Haryana": { 
      mpSeats: 10, 
      assemblySeats: 90, 
      capital: "Chandigarh", 
      chiefMinister: "Nayab Singh Saini",
      population: "2.9 Crore",
      area: "44,212 km²",
      economy: { gdp: "₹9.5 Lakh Crore", debt: "₹2.1 Lakh Crore" },
      nationalParks: ["Sultanpur", "Kalesar", "Khaparwas", "Bhindawas"]
    },
    "Himachal Pradesh": { 
      mpSeats: 4, 
      assemblySeats: 68, 
      capital: "Shimla", 
      chiefMinister: "Sukhvinder Singh Sukhu",
      population: "74.6 Lakh",
      area: "55,673 km²",
      economy: { gdp: "₹2.0 Lakh Crore", debt: "₹65,000 Crore" },
      nationalParks: ["Great Himalayan", "Pin Valley", "Kibber", "Inderkilla", "Simbalbara"]
    },
    "Jammu & Kashmir": { 
      mpSeats: 5, 
      assemblySeats: 83, 
      capital: "Srinagar/Jammu", 
      chiefMinister: "Omar Abdullah",
      population: "1.4 Crore",
      area: "55,762 km²",
      economy: { gdp: "₹1.8 Lakh Crore", debt: "₹55,000 Crore" },
      nationalParks: ["Dachigam", "Hemis", "Kishtwar", "Salim Ali", "City Forest"]
    },
    "Jharkhand": { 
      mpSeats: 14, 
      assemblySeats: 81, 
      capital: "Ranchi", 
      chiefMinister: "Hemant Soren",
      population: "3.8 Crore",
      area: "79,714 km²",
      economy: { gdp: "₹4.0 Lakh Crore", debt: "₹1.3 Lakh Crore" },
      nationalParks: ["Betla", "Hazaribagh", "Palamau", "Dalma", "Lawalong"]
    },
    "Karnataka": { 
      mpSeats: 28, 
      assemblySeats: 224, 
      capital: "Bengaluru", 
      chiefMinister: "Siddaramaiah",
      population: "6.8 Crore",
      area: "1,91,791 km²",
      economy: { gdp: "₹21 Lakh Crore", debt: "₹5.2 Lakh Crore" },
      nationalParks: ["Bandipur", "Nagarhole", "Bannerghatta", "Anshi", "Kudremukh", "Bhadra", "Mookambika"]
    },
    "Kerala": { 
      mpSeats: 20, 
      assemblySeats: 140, 
      capital: "Thiruvananthapuram", 
      chiefMinister: "Pinarayi Vijayan",
      population: "3.6 Crore",
      area: "38,863 km²",
      economy: { gdp: "₹9.8 Lakh Crore", debt: "₹3.5 Lakh Crore" },
      nationalParks: ["Periyar", "Eravikulam", "Silent Valley", "Mathikettan Shola", "Anamudi Shola", "Pambadum Shola"]
    },
    "Madhya Pradesh": { 
      mpSeats: 29, 
      assemblySeats: 230, 
      capital: "Bhopal", 
      chiefMinister: "Mohan Yadav",
      population: "8.6 Crore",
      area: "3,08,245 km²",
      economy: { gdp: "₹11 Lakh Crore", debt: "₹3.8 Lakh Crore" },
      nationalParks: ["Kanha", "Bandhavgarh", "Panna", "Satpura", "Sanjay", "Madhav", "Van Vihar"]
    },
    "Maharashtra": { 
      mpSeats: 48, 
      assemblySeats: 288, 
      capital: "Mumbai", 
      chiefMinister: "Devendra Fadnavis",
      population: "12.4 Crore",
      area: "3,07,713 km²",
      economy: { gdp: "₹35 Lakh Crore", debt: "₹7.5 Lakh Crore" },
      nationalParks: ["Tadoba", "Sanjay Gandhi", "Pench", "Melghat", "Nawegaon", "Chandoli", "Gugamal"]
    },
    "Manipur": { 
      mpSeats: 2, 
      assemblySeats: 60, 
      capital: "Imphal", 
      chiefMinister: "N. Biren Singh",
      population: "31.4 Lakh",
      area: "22,327 km²",
      economy: { gdp: "₹35,000 Crore", debt: "₹12,000 Crore" },
      nationalParks: ["Keibul Lamjao", "Sirohi", "Yangoupokpi", "Zeilad"]
    },
    "Meghalaya": { 
      mpSeats: 2, 
      assemblySeats: 60, 
      capital: "Shillong", 
      chiefMinister: "Conrad K. Sangma",
      population: "32.1 Lakh",
      area: "22,720 km²",
      economy: { gdp: "₹40,000 Crore", debt: "₹11,000 Crore" },
      nationalParks: ["Balpakram", "Nokrek", "Baghmara", "Nokrek"]
    },
    "Mizoram": { 
      mpSeats: 1, 
      assemblySeats: 40, 
      capital: "Aizawl", 
      chiefMinister: "Lalduhoma",
      population: "12.5 Lakh",
      area: "21,081 km²",
      economy: { gdp: "₹25,000 Crore", debt: "₹7,000 Crore" },
      nationalParks: ["Murlen", "Dampa", "Thorangtlang", "Palak", "Lengteng"]
    },
    "Nagaland": { 
      mpSeats: 1, 
      assemblySeats: 60, 
      capital: "Kohima", 
      chiefMinister: "Neiphiu Rio",
      population: "22.5 Lakh",
      area: "16,579 km²",
      economy: { gdp: "₹30,000 Crore", debt: "₹9,000 Crore" },
      nationalParks: ["Intanki", "Fakim", "Puliebadze", "Ntangki"]
    },
    "Odisha": { 
      mpSeats: 21, 
      assemblySeats: 147, 
      capital: "Bhubaneswar", 
      chiefMinister: "Mohan Majhi",
      population: "4.7 Crore",
      area: "1,55,707 km²",
      economy: { gdp: "₹7.2 Lakh Crore", debt: "₹2.0 Lakh Crore" },
      nationalParks: ["Similipal", "Bhitarkanika", "Chandaka", "Hadagarh", "Kuldiha"]
    },
    "Punjab": { 
      mpSeats: 13, 
      assemblySeats: 117, 
      capital: "Chandigarh", 
      chiefMinister: "Bhagwant Mann",
      population: "3.1 Crore",
      area: "50,362 km²",
      economy: { gdp: "₹6.5 Lakh Crore", debt: "₹2.4 Lakh Crore" },
      nationalParks: ["Harike", "Jhajjar Bachauli", "Abohar", "Bir Moti Bagh"]
    },
    "Rajasthan": { 
      mpSeats: 25, 
      assemblySeats: 200, 
      capital: "Jaipur", 
      chiefMinister: "Bhajan Lal Sharma",
      population: "8.1 Crore",
      area: "3,42,239 km²",
      economy: { gdp: "₹13 Lakh Crore", debt: "₹4.2 Lakh Crore" },
      nationalParks: ["Ranthambore", "Sariska", "Keoladeo", "Desert", "Mukundara", "Sajjangarh"]
    },
    "Sikkim": { 
      mpSeats: 1, 
      assemblySeats: 32, 
      capital: "Gangtok", 
      chiefMinister: "Prem Singh Tamang",
      population: "6.8 Lakh",
      area: "7,096 km²",
      economy: { gdp: "₹18,000 Crore", debt: "₹6,000 Crore" },
      nationalParks: ["Khangchendzonga", "Fambong Lho", "Maenam", "Kyongnosla"]
    },
    "Tamil Nadu": { 
      mpSeats: 39, 
      assemblySeats: 234, 
      capital: "Chennai", 
      chiefMinister: "M.K. Stalin",
      population: "7.8 Crore",
      area: "1,30,058 km²",
      economy: { gdp: "₹24 Lakh Crore", debt: "₹6.8 Lakh Crore" },
      nationalParks: ["Mudumalai", "Mukurthi", "Guindy", "Anamalai", "Kalakkad", "Gulf of Mannar"]
    },
    "Telangana": { 
      mpSeats: 17, 
      assemblySeats: 119, 
      capital: "Hyderabad", 
      chiefMinister: "A. Revanth Reddy",
      population: "3.9 Crore",
      area: "1,12,077 km²",
      economy: { gdp: "₹14 Lakh Crore", debt: "₹3.2 Lakh Crore" },
      nationalParks: ["Kasu Brahmananda Reddy", "Mahavir Harina Vanasthali", "Mrugavani", "Kawal", "Eturnagaram"]
    },
    "Tripura": { 
      mpSeats: 2, 
      assemblySeats: 60, 
      capital: "Agartala", 
      chiefMinister: "Manik Saha",
      population: "40.1 Lakh",
      area: "10,491 km²",
      economy: { gdp: "₹45,000 Crore", debt: "₹13,000 Crore" },
      nationalParks: ["Clouded Leopard", "Sepahijala", "Trishna", "Rowa"]
    },
    "Uttar Pradesh": { 
      mpSeats: 80, 
      assemblySeats: 403, 
      capital: "Lucknow", 
      chiefMinister: "Yogi Adityanath",
      population: "24.1 Crore",
      area: "2,40,928 km²",
      economy: { gdp: "₹22 Lakh Crore", debt: "₹7.8 Lakh Crore" },
      nationalParks: ["Dudhwa", "Jim Corbett", "Pilibhit", "Katarniaghat", "Hastinapur"]
    },
    "Uttarakhand": { 
      mpSeats: 5, 
      assemblySeats: 70, 
      capital: "Dehradun", 
      chiefMinister: "Pushkar Singh Dhami",
      population: "1.1 Crore",
      area: "53,483 km²",
      economy: { gdp: "₹2.8 Lakh Crore", debt: "₹85,000 Crore" },
      nationalParks: ["Jim Corbett", "Rajaji", "Gangotri", "Nanda Devi", "Valley of Flowers"]
    },
    "West Bengal": { 
      mpSeats: 42, 
      assemblySeats: 294, 
      capital: "Kolkata", 
      chiefMinister: "Mamata Banerjee",
      population: "10.1 Crore",
      area: "88,752 km²",
      economy: { gdp: "₹15 Lakh Crore", debt: "₹4.8 Lakh Crore" },
      nationalParks: ["Sundarbans", "Buxa", "Gorumara", "Jaldapara", "Neora Valley", "Singalila"]
    },
    "Ladakh": { 
      mpSeats: 1, 
      assemblySeats: 0, 
      capital: "Leh", 
      chiefMinister: "No CM (Union Territory)",
      population: "2.9 Lakh",
      area: "59,146 km²",
      economy: { gdp: "₹8,000 Crore", debt: "₹2,000 Crore" },
      nationalParks: ["Hemis", "Karakoram", "Changthang", "Siachen"]
    },
    "Puducherry": { 
      mpSeats: 1, 
      assemblySeats: 30, 
      capital: "Puducherry", 
      chiefMinister: "N. Rangasamy",
      population: "15.7 Lakh",
      area: "471 km²",
      economy: { gdp: "₹25,000 Crore", debt: "₹8,000 Crore" },
      nationalParks: ["Ousteri", "Bahour", "Karaikal"]
    },
    "Chandigarh": { 
      mpSeats: 1, 
      assemblySeats: 0, 
      capital: "Chandigarh", 
      chiefMinister: "No CM (Union Territory)",
      population: "11.6 Lakh",
      area: "114 km²",
      economy: { gdp: "₹45,000 Crore", debt: "₹12,000 Crore" },
      nationalParks: ["Sukhna Lake", "Rose Garden"]
    },
    "Andaman & Nicobar": { 
      mpSeats: 1, 
      assemblySeats: 0, 
      capital: "Port Blair", 
      chiefMinister: "No CM (Union Territory)",
      population: "4.2 Lakh",
      area: "8,249 km²",
      economy: { gdp: "₹12,000 Crore", debt: "₹3,000 Crore" },
      nationalParks: ["Mahatma Gandhi Marine", "Mount Harriet", "Saddle Peak", "North Button"]
    },
    "Lakshadweep": { 
      mpSeats: 1, 
      assemblySeats: 0, 
      capital: "Kavaratti", 
      chiefMinister: "No CM (Union Territory)",
      population: "68,000",
      area: "32 km²",
      economy: { gdp: "₹3,000 Crore", debt: "₹800 Crore" },
      nationalParks: ["Pitti", "Kavaratti", "Bangaram"]
    },
    "Dadra & Nagar Haveli": { 
      mpSeats: 1, 
      assemblySeats: 0, 
      capital: "Silvassa", 
      chiefMinister: "No CM (Union Territory)",
      population: "3.5 Lakh",
      area: "491 km²",
      economy: { gdp: "₹8,000 Crore", debt: "₹2,500 Crore" },
      nationalParks: ["Vanganga Lake", "Dudhni"]
    },
    "Daman & Diu": { 
      mpSeats: 1, 
      assemblySeats: 0, 
      capital: "Daman", 
      chiefMinister: "No CM (Union Territory)",
      population: "2.5 Lakh",
      area: "102 km²",
      economy: { gdp: "₹5,000 Crore", debt: "₹1,500 Crore" },
      nationalParks: ["Jampore Beach", "Devka Beach"]
    }
  };

  // State coordinates for tiny circles (positioned exactly above state capitals) - Alphabetical Order
  const stateCoordinates = {
    "Andaman & Nicobar": { x: 285, y: 299, radius: 4 }, // Above Port Blair
    "Andhra Pradesh": { x: 130, y: 260, radius: 5 }, // Above Amaravati
    "Arunachal Pradesh": { x: 278, y: 107, radius: 4 }, // Above Itanagar
    "Assam": { x: 270, y: 128, radius: 5 }, // Above Dispur
    "Bihar": { x: 213, y: 140, radius: 4 }, // Above Patna
    "Chandigarh": { x: 104, y: 83, radius: 2 }, // Chandigarh itself
    "Chhattisgarh": { x: 175, y: 178, radius: 4 }, // Above Raipur
    "Dadra & Nagar Haveli": { x: 60, y: 208, radius: 3 }, // Above Silvassa
    "Daman & Diu": { x: 38, y: 200, radius: 4 }, // Above Daman
    "Delhi": { x: 107, y: 108, radius: 2 }, // Delhi itself
    "Goa": { x: 67, y: 267, radius: 3 }, // Above Panaji
    "Gujarat": { x: 45, y: 165, radius: 6 }, // Above Gandhinagar
    "Haryana": { x: 99, y: 105, radius: 4 }, // Above Chandigarh
    "Himachal Pradesh": { x: 104, y: 59, radius: 4 }, // Above Shimla
    "Jammu & Kashmir": { x: 85, y: 25, radius: 6 }, // Above Srinagar/Jammu
    "Jharkhand": { x: 197, y: 175, radius: 4 }, // Above Ranchi
    "Karnataka": { x: 85, y: 260, radius: 6 }, // Above Bengaluru
    "Kerala": { x: 99, y: 335, radius: 4 }, // Above Thiruvananthapuram
    "Ladakh": { x: 115, y: 42, radius: 3 }, // Above Leh
    "Lakshadweep": { x: 45, y: 315, radius: 4 }, // Above Kavaratti
    "Madhya Pradesh": { x: 120, y: 183, radius: 5 }, // Above Bhopal
    "Maharashtra": { x: 75, y: 235, radius: 6 }, // Above Mumbai
    "Manipur": { x: 285, y: 148, radius: 3 }, // Above Imphal
    "Meghalaya": { x: 255, y: 139, radius:4 }, // Above Shillong
    "Mizoram": { x: 275, y: 165, radius: 4 }, // Above Aizawl
    "Nagaland": { x: 289, y: 130, radius: 5 }, // Above Kohima
    "Odisha": { x: 200, y: 195, radius: 4 }, // Above Bhubaneswar
    "Puducherry": { x: 138, y: 310, radius: 3 }, // Above Puducherry
    "Punjab": { x: 90, y: 75, radius: 5 }, // Above Chandigarh
    "Rajasthan": { x: 70, y: 120, radius: 6 }, // Above Jaipur
    "Sikkim": { x: 226, y: 119, radius: 3 }, // Above Gangtok
    "Tamil Nadu": { x: 119, y: 309, radius: 4 }, // Above Chennai
    "Telangana": { x: 125, y: 240, radius: 4 }, // Above Hyderabad
    "Tripura": { x: 263, y: 162, radius: 3 }, // Above Agartala
    "Uttarakhand": { x: 125, y: 83, radius: 4 }, // Above Dehradun
    "Uttar Pradesh": { x: 145, y: 135, radius: 6 }, // Above Lucknow
    "West Bengal": { x: 220, y: 175, radius: 4 } // Above Kolkata
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
          Click on any state to see MP seats, Assembly seats, Capital, and Chief Minister information
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
                marginBottom: "15px", 
                borderBottom: "2px solid #007bff", 
                paddingBottom: "10px" 
              }}>
                {selectedState}
              </h3>
              
              {/* Tab Navigation */}
              <div style={{ 
                display: "flex", 
                marginBottom: "20px", 
                borderBottom: "1px solid #e9ecef",
                gap: "5px"
              }}>
                <button
                  onClick={() => setActiveTab("basic")}
                  style={{
                    padding: "10px 15px",
                    border: "none",
                    backgroundColor: activeTab === "basic" ? "#007bff" : "#f8f9fa",
                    color: activeTab === "basic" ? "#fff" : "#495057",
                    borderRadius: "8px 8px 0 0",
                    cursor: "pointer",
                    fontSize: "14px",
                    fontWeight: "600"
                  }}
                >
                  Basic Info
                </button>
                <button
                  onClick={() => setActiveTab("economy")}
                  style={{
                    padding: "10px 15px",
                    border: "none",
                    backgroundColor: activeTab === "economy" ? "#007bff" : "#f8f9fa",
                    color: activeTab === "economy" ? "#fff" : "#495057",
                    borderRadius: "8px 8px 0 0",
                    cursor: "pointer",
                    fontSize: "14px",
                    fontWeight: "600"
                  }}
                >
                  Economy
                </button>
                <button
                  onClick={() => setActiveTab("parks")}
                  style={{
                    padding: "10px 15px",
                    border: "none",
                    backgroundColor: activeTab === "parks" ? "#007bff" : "#f8f9fa",
                    color: activeTab === "parks" ? "#fff" : "#495057",
                    borderRadius: "8px 8px 0 0",
                    cursor: "pointer",
                    fontSize: "14px",
                    fontWeight: "600"
                  }}
                >
                  National Parks
                </button>
              </div>

              {/* Tab Content */}
              <div style={{ 
                minHeight: "300px",
                maxHeight: "400px",
                overflowY: "auto",
                padding: "10px",
                backgroundColor: "#f8f9fa",
                borderRadius: "0 8px 8px 8px"
              }}>
                {activeTab === "basic" && (
                  <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
                    <div style={{ 
                      display: "flex", 
                      justifyContent: "space-between", 
                      alignItems: "center", 
                      padding: "12px", 
                      backgroundColor: "#ffffff", 
                      borderRadius: "8px", 
                      border: "1px solid #e9ecef" 
                    }}>
                      <span style={{ fontSize: "14px", fontWeight: "600", color: "#495057" }}>MP Seats:</span>
                      <span style={{ 
                        fontSize: "14px", 
                        fontWeight: "700", 
                        color: "#007bff", 
                        backgroundColor: "#e3f2fd", 
                        padding: "6px 12px", 
                        borderRadius: "15px" 
                      }}>
                        {statesData[selectedState]?.mpSeats || 0}
                      </span>
                    </div>
                    <div style={{ 
                      display: "flex", 
                      justifyContent: "space-between", 
                      alignItems: "center", 
                      padding: "12px", 
                      backgroundColor: "#ffffff", 
                      borderRadius: "8px", 
                      border: "1px solid #e9ecef" 
                    }}>
                      <span style={{ fontSize: "14px", fontWeight: "600", color: "#495057" }}>Assembly Seats:</span>
                      <span style={{ 
                        fontSize: "14px", 
                        fontWeight: "700", 
                        color: "#007bff", 
                        backgroundColor: "#e3f2fd", 
                        padding: "6px 12px", 
                        borderRadius: "15px" 
                      }}>
                        {statesData[selectedState]?.assemblySeats || 0}
                      </span>
                    </div>
                    <div style={{ 
                      display: "flex", 
                      justifyContent: "space-between", 
                      alignItems: "center", 
                      padding: "12px", 
                      backgroundColor: "#ffffff", 
                      borderRadius: "8px", 
                      border: "1px solid #e9ecef" 
                    }}>
                      <span style={{ fontSize: "14px", fontWeight: "600", color: "#495057" }}>Capital:</span>
                      <span style={{ 
                        fontSize: "14px", 
                        fontWeight: "700", 
                        color: "#007bff", 
                        backgroundColor: "#e3f2fd", 
                        padding: "6px 12px", 
                        borderRadius: "15px" 
                      }}>
                        {statesData[selectedState]?.capital || "N/A"}
                      </span>
                    </div>
                    <div style={{ 
                      display: "flex", 
                      justifyContent: "space-between", 
                      alignItems: "center", 
                      padding: "12px", 
                      backgroundColor: "#ffffff", 
                      borderRadius: "8px", 
                      border: "1px solid #e9ecef" 
                    }}>
                      <span style={{ fontSize: "14px", fontWeight: "600", color: "#495057" }}>Chief Minister:</span>
                      <span style={{ 
                        fontSize: "14px", 
                        fontWeight: "700", 
                        color: "#007bff", 
                        backgroundColor: "#e3f2fd", 
                        padding: "6px 12px", 
                        borderRadius: "15px" 
                      }}>
                        {statesData[selectedState]?.chiefMinister || "N/A"}
                      </span>
                    </div>
                    <div style={{ 
                      display: "flex", 
                      justifyContent: "space-between", 
                      alignItems: "center", 
                      padding: "12px", 
                      backgroundColor: "#ffffff", 
                      borderRadius: "8px", 
                      border: "1px solid #e9ecef" 
                    }}>
                      <span style={{ fontSize: "14px", fontWeight: "600", color: "#495057" }}>Population:</span>
                      <span style={{ 
                        fontSize: "14px", 
                        fontWeight: "700", 
                        color: "#007bff", 
                        backgroundColor: "#e3f2fd", 
                        padding: "6px 12px", 
                        borderRadius: "15px" 
                      }}>
                        {statesData[selectedState]?.population || "N/A"}
                      </span>
                    </div>
                    <div style={{ 
                      display: "flex", 
                      justifyContent: "space-between", 
                      alignItems: "center", 
                      padding: "12px", 
                      backgroundColor: "#ffffff", 
                      borderRadius: "8px", 
                      border: "1px solid #e9ecef" 
                    }}>
                      <span style={{ fontSize: "14px", fontWeight: "600", color: "#495057" }}>Area:</span>
                      <span style={{ 
                        fontSize: "14px", 
                        fontWeight: "700", 
                        color: "#007bff", 
                        backgroundColor: "#e3f2fd", 
                        padding: "6px 12px", 
                        borderRadius: "15px" 
                      }}>
                        {statesData[selectedState]?.area || "N/A"}
                      </span>
                    </div>
                  </div>
                )}

                {activeTab === "economy" && (
                  <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
                    <div style={{ 
                      padding: "15px", 
                      backgroundColor: "#ffffff", 
                      borderRadius: "8px", 
                      border: "1px solid #e9ecef" 
                    }}>
                      <h4 style={{ 
                        fontSize: "16px", 
                        fontWeight: "600", 
                        color: "#495057", 
                        marginBottom: "10px" 
                      }}>
                        💰 Economic Overview
                      </h4>
                      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                        <div style={{ 
                          display: "flex", 
                          justifyContent: "space-between", 
                          alignItems: "center", 
                          padding: "10px", 
                          backgroundColor: "#f8f9fa", 
                          borderRadius: "6px" 
                        }}>
                          <span style={{ fontSize: "14px", fontWeight: "600", color: "#495057" }}>GDP:</span>
                          <span style={{ 
                            fontSize: "14px", 
                            fontWeight: "700", 
                            color: "#28a745", 
                            backgroundColor: "#d4edda", 
                            padding: "6px 12px", 
                            borderRadius: "12px" 
                          }}>
                            {statesData[selectedState]?.economy?.gdp || "N/A"}
                          </span>
                        </div>
                        <div style={{ 
                          display: "flex", 
                          justifyContent: "space-between", 
                          alignItems: "center", 
                          padding: "10px", 
                          backgroundColor: "#f8f9fa", 
                          borderRadius: "6px" 
                        }}>
                          <span style={{ fontSize: "14px", fontWeight: "600", color: "#495057" }}>Debt:</span>
                          <span style={{ 
                            fontSize: "14px", 
                            fontWeight: "700", 
                            color: "#dc3545", 
                            backgroundColor: "#f8d7da", 
                            padding: "6px 12px", 
                            borderRadius: "12px" 
                          }}>
                            {statesData[selectedState]?.economy?.debt || "N/A"}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === "parks" && (
                  <div style={{ padding: "15px", backgroundColor: "#ffffff", borderRadius: "8px", border: "1px solid #e9ecef" }}>
                    <h4 style={{ 
                      fontSize: "16px", 
                      fontWeight: "600", 
                      color: "#495057", 
                      marginBottom: "15px" 
                    }}>
                      🌳 National Parks & Wildlife Sanctuaries
                    </h4>
                    <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                      {statesData[selectedState]?.nationalParks?.map((park, index) => (
                        <div key={index} style={{ 
                          padding: "10px", 
                          backgroundColor: "#e8f5e8", 
                          borderRadius: "6px", 
                          border: "1px solid #c3e6cb",
                          fontSize: "14px",
                          color: "#155724",
                          display: "flex",
                          alignItems: "center",
                          gap: "8px"
                        }}>
                          <span>🏞️</span>
                          <span style={{ fontWeight: "500" }}>{park}</span>
                        </div>
                      )) || <p style={{ color: "#6c757d", fontStyle: "italic" }}>No national parks data available</p>}
                    </div>
                  </div>
                )}
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
                Click on any state circle to see detailed information including Chief Minister, Population, Area, Economy, and National Parks
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
