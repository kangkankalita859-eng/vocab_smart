import { useState } from "react";
import Home from "./pages/Home";
import Session from "./pages/Session";
import ReadVocab from "./pages/ReadVocab";
import ReadIdioms from "./pages/ReadIdioms";
import ReadSynonymsAntonyms from "./pages/ReadSynonymsAntonyms";
import SynonymsAntonymsTestIntro from "./pages/SynonymsAntonymsTestIntro";
import SynonymsAntonymsTest from "./pages/SynonymsAntonymsTest";
import IdiomSession from "./pages/IdiomSession";
import Complete from "./pages/Complete";
import TestAPI from "./TestAPI";
import "./styles/flashcard.css";

export default function App() {
  const [stage, setStage] = useState("home"); // Back to normal
  const [config, setConfig] = useState({ start: 0, limit: 20 });
  const [reviewUnknownDeck, setReviewUnknownDeck] = useState(false);

  console.log('App component mounted, current stage:', stage);

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
        onSynonymsAntonyms={(c) => {
          setConfig(c);
          setStage("read-synonyms-antonyms");
        }}
      />
    );

  if (stage === "session")
  return (
    <Session
      config={config}
      reviewUnknownDeck={reviewUnknownDeck}
      onComplete={() => setStage("complete")}
      onGoRead={() => {
        setReviewUnknownDeck(false);
        setStage("read");
      }}
      onUpdateConfig={(c) => setConfig(c)}
      onGoHome={() => {
        setReviewUnknownDeck(false);
        setStage("home");
      }}
    />
  );


  if (stage === "read")
    return (
      <ReadVocab
        config={config}
        onGoCards={() => {
          setReviewUnknownDeck(true);
          setStage("session");
        }}
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

  if (stage === "read-synonyms-antonyms")
    return (
      <ReadSynonymsAntonyms
        config={config}
        onGoCards={() => {
          console.log('App: onGoCards called, setting stage to synonyms-antonyms-test-intro');
          setStage("synonyms-antonyms-test-intro");
        }}
        onUpdateConfig={(c) => setConfig(c)}
        onGoHome={() => setStage("home")}
      />
    );

  if (stage === "synonyms-antonyms-test-intro")
    return (
      <SynonymsAntonymsTestIntro
        config={config}
        onStartTest={() => setStage("synonyms-antonyms-test")}
        onGoHome={() => setStage("home")}
      />
    );

  if (stage === "synonyms-antonyms-test")
    return (
      <SynonymsAntonymsTest
        config={config}
        onGoHome={() => setStage("home")}
      />
    );

  return <Complete />;
}


