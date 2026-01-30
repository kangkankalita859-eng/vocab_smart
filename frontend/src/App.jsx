import { useState } from "react";
import Home from "./pages/Home";
import Session from "./pages/Session";
import ReadVocab from "./pages/ReadVocab";
import Complete from "./pages/Complete";

export default function App() {
  const [stage, setStage] = useState("home");
  const [config, setConfig] = useState({ start: 0, limit: 20 });
  

  if (stage === "home")
    return (
      <Home
        onStart={(c) => {
          setConfig(c);
          setStage("session");
        }}
      />
    );

  if (stage === "session")
  return (
    <Session
      config={config}
      onComplete={() => setStage("complete")}
      onGoRead={() => setStage("read")}
      onUpdateConfig={(c) => setConfig(c)}
      onGoHome={() => setStage("home")}   // ✅ ADD THIS
    />
  );


  if (stage === "read")
    return (
      <ReadVocab
        config={config}
        onGoCards={() => setStage("session")}
        onUpdateConfig={(c) => setConfig(c)}
      />
    );

  return <Complete />;
}


