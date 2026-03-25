import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./styles/app.css";

// Make setStage globally available for navigation
window.setAppStage = null;

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
