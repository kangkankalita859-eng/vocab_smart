import { useState, useEffect } from "react";
import Home from "./pages/Home";
import Session from "./pages/Session";
import ReadVocab from "./pages/ReadVocab";
import ReadIdioms from "./pages/ReadIdioms";
import ReadSynonymsAntonyms from "./pages/ReadSynonymsAntonyms";
import ReadHomonymsHomophones from "./pages/ReadHomonymsHomophones";
import ReadNarration from "./pages/ReadNarration";
import ReadVoiceChange from "./pages/ReadVoiceChange";
import ReadVocabTest from "./pages/ReadVocabTest";
import VocabTestSets from "./pages/VocabTestSets";
import ReadGeometry from "./pages/ReadGeometry";
import IndiaMap from "./pages/IndiaMap";
import Geography from "./pages/Geography";
import Constitution from "./pages/Constitution";
import Schedules from "./pages/Schedules";
import HomonymsHomophonesSession from "./pages/HomonymsHomophonesSession";
import VocabTestIntro from "./pages/VocabTestIntro";
import VocabTest from "./pages/VocabTest";
import SynonymsAntonymsTestIntro from "./pages/SynonymsAntonymsTestIntro";
import SynonymsAntonymsTest from "./pages/SynonymsAntonymsTest";
import IdiomSession from "./pages/IdiomSession";
import IdiomExam from "./pages/IdiomExam";
import IdiomExamSets from "./pages/IdiomExamSets";
import Complete from "./pages/Complete";
import TestAPI from "./TestAPI";
import EnglishVocabHome from "./pages/EnglishVocabHome";
import GrammarHome from "./pages/GrammarHome";
import "./styles/flashcard.css";

// Global navigation function
window.setAppStage = null;

export default function App() {
  const [stage, setStage] = useState("home");
  const [config, setConfig] = useState({ start: 0, limit: 20 });
  const [reviewUnknownDeck, setReviewUnknownDeck] = useState(false);
  const [vocabExamConfig, setVocabExamConfig] = useState(null);

  console.log('App component mounted, current stage:', stage);

  // Navigation event handlers
  const handleNavigationRequest = (event) => {
    if (event.data && event.data.type === 'NAVIGATION_REQUEST') {
      console.log('Navigation request received:', event.data.payload);
      setStage(event.data.payload.stage);
    }
  };

  const handleStorageChange = () => {
    const requestedStage = localStorage.getItem('requestedStage');
    if (requestedStage) {
      console.log('Storage navigation request:', requestedStage);
      setStage(requestedStage);
      localStorage.removeItem('requestedStage');
    }
  };

  const handleHashChange = () => {
    const hash = window.location.hash.substring(1);
    if (hash) {
      console.log('Hash change detected:', hash);
      setStage(hash);
    }
  };

  // Cleanup function
  const cleanup = () => {
    window.removeEventListener('message', handleNavigationRequest);
    window.removeEventListener('storage', handleStorageChange);
    window.removeEventListener('hashchange', handleHashChange);
  };

  // Main effect for setting up navigation and cleanup
  useEffect(() => {
    // Set up global navigation function
    if (typeof window !== 'undefined' && !window.setAppStage) {
      window.setAppStage = setStage;
    }

    // Add event listeners
    window.addEventListener('message', handleNavigationRequest);
    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('hashchange', handleHashChange);

    // Check for initial hash
    if (window.location.hash) {
      const initialHash = window.location.hash.substring(1);
      if (initialHash) {
        setStage(initialHash);
      }
    }

    // Return cleanup function
    return cleanup;
  }, []);

  // Render appropriate component based on stage
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
        onHomonymsHomophones={(c) => {
          setConfig(c);
          setStage("read-homonyms-homophones");
        }}
        onEnglishVocab={(c) => {
          setConfig(c);
          setStage("english-vocab-home");
        }}
        onGrammar={(c) => {
          setConfig(c);
          setStage("grammar-home");
        }}
        onNarration={(c) => {
          setConfig(c);
          setStage("read-narration");
        }}
        onVoiceChange={(c) => {
          setConfig(c);
          setStage("read-voice-change");
        }}
        onVocabTest={(c) => {
          setConfig(c);
          setStage("vocab-test-sets");
        }}
        onGeometry={(c) => {
          setConfig(c);
          setStage("read-geometry");
        }}
        onGeography={() => setStage("geography")}
        onIndiaMap={() => setStage("india-map")}
        onConstitution={() => setStage("constitution")}
        onSchedules={() => setStage("schedules")}
      />
    );

  if (stage === "session")
    return (
      <Session
        config={config}
        reviewUnknownDeck={reviewUnknownDeck}
        onComplete={() => setStage("complete")}
        onGoRead={() => {
          if (stage === "read-homonyms-homophones") {
            setStage("read-narration");
          } else {
            setReviewUnknownDeck(false);
            setStage("read");
          }
        }}
        onGoTest={() => {
          setVocabExamConfig(null);
          setStage("vocab-test-intro");
        }}
        onUpdateConfig={(c) => setConfig(c)}
        onGoHome={() => setStage("home")}
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
        onGoTest={() => {
          setVocabExamConfig(null);
          setStage("vocab-test");
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
        onGoTest={() => {
          setVocabExamConfig(null);
          setStage("idiom-exam-sets");
        }}
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

  if (stage === "read-homonyms-homophones")
    return (
      <ReadHomonymsHomophones
        config={config}
        onGoCards={() => setStage("homonyms-homophones-session")}
        onUpdateConfig={(c) => setConfig(c)}
        onGoHome={() => setStage("home")}
      />
    );

  if (stage === "read-narration")
    return (
      <ReadNarration
        config={config}
        onUpdateConfig={(c) => setConfig(c)}
        onGoHome={() => setStage("home")}
      />
    );

  if (stage === "read-voice-change")
    return (
      <ReadVoiceChange
        config={config}
        onUpdateConfig={(c) => setConfig(c)}
        onGoHome={() => setStage("home")}
      />
    );

  if (stage === "read-vocab-test")
    return (
      <ReadVocabTest
        config={config}
        onGoCards={() => {
          setReviewUnknownDeck(false);
          setStage("read");
        }}
        onGoTest={() => {
          setVocabExamConfig(null);
          setStage("vocab-test");
        }}
        onUpdateConfig={(c) => setConfig(c)}
        onGoHome={() => setStage("home")}
      />
    );

  if (stage === "vocab-test-intro")
    return (
      <VocabTestIntro
        config={config}
        onSelectSet={(set) => {
          setVocabExamConfig({ start: set.start, limit: set.limit });
          setStage("vocab-test");
        }}
        onGoRead={() => setStage("read")}
        onGoHome={() => setStage("home")}
      />
    );

  if (stage === "vocab-test-sets")
    return (
      <VocabTestSets
        config={config}
        onUpdateConfig={(c) => setConfig(c)}
        onGoHome={() => setStage("home")}
      />
    );

  if (stage === "vocab-test")
    return (
      <VocabTest
        config={vocabExamConfig || { start: config.start, limit: Math.min(10, config.limit || 10) }}
        setConfig={(c) => setVocabExamConfig(c)}
        onGoRead={() => setStage("read")}
        onGoHome={() => setStage("home")}
      />
    );

  if (stage === "idiom-session")
    return (
      <IdiomSession
        config={config}
        onGoCards={() => setStage("idiom-session")}
        onGoTest={() => {
          setVocabExamConfig(null);
          setStage("idiom-exam-sets");
        }}
        onUpdateConfig={(c) => setConfig(c)}
        onGoHome={() => setStage("home")}
      />
    );

  if (stage === "idiom-exam")
    return (
      <IdiomExam
        config={config}
        onGoHome={() => setStage("home")}
      />
    );

  if (stage === "idiom-exam-sets")
    return (
      <IdiomExamSets
        config={config}
        onUpdateConfig={(c) => setConfig(c)}
        onGoHome={() => setStage("home")}
      />
    );

  if (stage === "english-vocab-home")
    return (
      <EnglishVocabHome
        onGoRead={() => {
          setConfig({ start: 0, limit: 20 });
          setStage("read");
        }}
        onGoCards={() => {
          setConfig({ start: 0, limit: 20 });
          setReviewUnknownDeck(true);
          setStage("session");
        }}
        onGoExam={() => {
          setVocabExamConfig(null);
          setStage("vocab-test-sets");
        }}
        onUpdateConfig={(c) => setConfig(c)}
        onGoHome={() => setStage("home")}
      />
    );

  if (stage === "grammar-home")
    return (
      <GrammarHome
        onSelectTopic={(topic) => {
          console.log("Selected grammar topic:", topic);
        }}
        onGoHome={() => setStage("home")}
      />
    );

  if (stage === "constitution")
    return (
      <Constitution
        onGoHome={() => setStage("home")}
      />
    );

  if (stage === "schedules")
    return (
      <Schedules
        onGoHome={() => setStage("home")}
      />
    );

  return <Complete />;
}
