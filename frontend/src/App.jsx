import { useState } from "react";
import Home from "./pages/Home";
import Session from "./pages/Session";
import ReadVocab from "./pages/ReadVocab";
import ReadIdioms from "./pages/ReadIdioms";
import IdiomSession from "./pages/IdiomSession";
import Complete from "./pages/Complete";
import TestAPI from "./TestAPI";

export default function App() {
  const [stage, setStage] = useState("home"); // Back to normal
  const [config, setConfig] = useState({ start: 0, limit: 20 });

  if (stage === "test") return <TestAPI />;
  

  if (stage === "home")
    return (
      <Home
        onStart={(c) => {
          setConfig(c);
          // If limit is 250, go directly to read mode
          if (c.limit === 250) {
            setStage("read");
          } else {
            setStage("session");
          }
        }}
        onIdioms={(c) => {
          setConfig(c);
          setStage("read-idioms");
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
        onGoHome={() => setStage("home")}
      />
    );

  if (stage === "read-idioms")
    return (
      <ReadIdioms
        config={config}
        onGoCards={() => setStage("idiom-session")}
        onUpdateConfig={(c) => setConfig(c)}
        onGoHome={() => setStage("home")}
      />
    );

  if (stage === "idiom-session")
    return (
      <IdiomSession
        config={config}
        onGoRead={() => setStage("read-idioms")}
        onUpdateConfig={(c) => setConfig(c)}
        onGoHome={() => setStage("home")}
      />
    );

  return <Complete />;
}


