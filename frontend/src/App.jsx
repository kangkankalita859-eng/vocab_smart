import { useState, useEffect } from "react";
import Login from "./pages/Login";
import UpdatePassword from "./pages/UpdatePassword";
import { authService } from "./services/authService";
import { isSupabaseConfigured } from "./services/supabaseClient";
import Home from "./pages/Home";
import Session from "./pages/Session";
import ReadVocab from "./pages/ReadVocab";
import ReadIdioms from "./pages/ReadIdioms";
import ReadSynonymsAntonyms from "./pages/ReadSynonymsAntonyms";
import ReadHomonymsHomophones from "./pages/ReadHomonymsHomophones";
import ReadNarration from "./pages/ReadNarration";
import ReadVoiceChange from "./pages/ReadVoiceChange";
import ReadError from "./pages/ReadError";
import ReadSentenceImprovement from "./pages/ReadSentenceImprovement";
import ReadVocabTest from "./pages/ReadVocabTest";
import VocabTestSets from "./pages/VocabTestSets";
import ReadGeometry from "./pages/ReadGeometry";
import IndiaMap from "./pages/IndiaMap";
import Geography from "./pages/Geography";
import MapDrawing from "./pages/MapDrawing";
import Constitution from "./pages/Constitution";
import Schedules from "./pages/Schedules";
import Parts from "./pages/Parts";
import Articles from "./pages/Articles";
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
import Sidebar from "./components/Sidebar";
import "./styles/flashcard.css";

// Global navigation function
window.setAppStage = null;

export default function App() {
  const [user, setUser] = useState(null);
  const [authReady, setAuthReady] = useState(false);
  const [authError, setAuthError] = useState("");
  const [isPasswordRecovery, setIsPasswordRecovery] = useState(false);
  const [isAccountMenuOpen, setIsAccountMenuOpen] = useState(false);

  useEffect(() => {
    if (!isSupabaseConfigured) {
      setAuthReady(true);
      return undefined;
    }

    let active = true;
    const { data: { subscription } } = authService.onAuthStateChange((event, session) => {
      if (active) {
        setUser(session?.user || null);
        setAuthError("");
        if (event === "PASSWORD_RECOVERY") setIsPasswordRecovery(true);
      }
    });

    authService.getSession()
      .then(({ data, error }) => {
        if (error) throw error;
        if (active) setUser(data.session?.user || null);
      })
      .catch((error) => {
        if (active) setAuthError(`Could not check your sign-in status: ${error.message}`);
      })
      .finally(() => {
        if (active) setAuthReady(true);
      });

    return () => {
      active = false;
      subscription.unsubscribe();
    };
  }, []);

  if (!isSupabaseConfigured) return <Login />;
  if (!authReady) return <p style={{ textAlign: "center", marginTop: 48 }}>Checking sign-in…</p>;
  if (isPasswordRecovery) {
    return <UpdatePassword onComplete={() => setIsPasswordRecovery(false)} />;
  }
  if (!user) {
    return (
      <>
        <Login />
        {authError && <p role="alert" style={authErrorStyle}>{authError}</p>}
      </>
    );
  }

  const handleLogout = async () => {
    const { error } = await authService.logout();
    if (error) setAuthError(`Could not sign out: ${error.message}`);
  };

  return (
    <>
      <AppNavigation user={user} />
      <div style={accountMenu}>
        <button
          type="button"
          aria-label="Open account menu"
          aria-expanded={isAccountMenuOpen}
          aria-controls="account-menu"
          onClick={() => setIsAccountMenuOpen((isOpen) => !isOpen)}
          style={profileButton}
        >
          {user.email?.trim().charAt(0).toUpperCase() || "A"}
        </button>
        {isAccountMenuOpen && (
          <div id="account-menu" style={accountDropdown}>
            <span title={user.email} style={accountEmail}>{user.email}</span>
            <button type="button" onClick={handleLogout} style={logoutButton}>Sign out</button>
            {authError && <span role="alert" style={accountError}>{authError}</span>}
          </div>
        )}
      </div>
    </>
  );
}

function AppNavigation({ user }) {
  const [stage, setStage] = useState("home");
  const [config, setConfig] = useState({ start: 0, limit: 20 });
  const [reviewUnknownDeck, setReviewUnknownDeck] = useState(false);
  const [reviewIdiomUnknownDeck, setReviewIdiomUnknownDeck] = useState(false);
  const [reviewHomonymsUnknownDeck, setReviewHomonymsUnknownDeck] = useState(false);
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
        onError={(c) => {
          setConfig(c);
          setStage("read-error");
        }}
        onSentenceImprovement={(c) => {
          setConfig(c);
          setStage("read-sentence-improvement");
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
        onMapDrawing={() => setStage("map-drawing")}
        onConstitution={() => setStage("constitution")}
        onSchedules={() => setStage("schedules")}
        onParts={() => setStage("parts")}
      />
    );

  if (stage === "session")
    return (
      <Session
        user={user}
        config={config}
        reviewUnknownDeck={reviewUnknownDeck}
        onComplete={() => setStage("complete")}
        onGoRead={() => {
          if (stage === "read-homonyms-homophones") {
            setStage("read-narration");
          } else {
            setReviewUnknownDeck(false);
            setReviewIdiomUnknownDeck(false);
            setReviewHomonymsUnknownDeck(false);
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
          setStage("vocab-test-intro");
        }}
        onUpdateConfig={(c) => setConfig(c)}
        onGoHome={() => setStage("home")}
      />
    );

  if (stage === "read-idioms")
    return (
      <ReadIdioms
        config={config}
        onGoCards={() => {
          setReviewIdiomUnknownDeck(true);
          setStage("idiom-session");
        }}
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
        onGoCards={() => {
          setReviewHomonymsUnknownDeck(true);
          setStage("homonyms-homophones-session");
        }}
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

  if (stage === "read-error")
    return (
      <ReadError
        config={config}
        onUpdateConfig={(c) => setConfig(c)}
        onGoHome={() => setStage("home")}
      />
    );

  if (stage === "read-sentence-improvement")
    return (
      <ReadSentenceImprovement
        config={config}
        onUpdateConfig={(c) => setConfig(c)}
        onGoHome={() => setStage("home")}
      />
    );

  if (stage === "read-vocab-test")
    return (
      <ReadVocabTest
        config={vocabExamConfig || config}
        onGoCards={() => {
          setReviewUnknownDeck(false);
          setStage("read");
        }}
        onGoTest={() => {
          setVocabExamConfig(null);
          setStage("vocab-test-intro");
        }}
        onUpdateConfig={(c) => setConfig(c)}
        onGoHome={() => setStage("home")}
        onGoBackToSets={() => setStage("vocab-test-intro")}
      />
    );

  if (stage === "vocab-test-intro")
    return (
      <VocabTestIntro
        config={config}
        onSelectSet={(set) => {
          setVocabExamConfig({ setNumber: set.setNumber, start: set.start, limit: set.limit });
          setStage("read-vocab-test");
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
        reviewUnknownDeck={reviewIdiomUnknownDeck}
        onGoCards={() => {
          setReviewIdiomUnknownDeck(true);
          setStage("idiom-session");
        }}
        onGoRead={() => {
          setReviewIdiomUnknownDeck(false);
          setStage("read-idioms");
        }}
        onGoTest={() => {
          setVocabExamConfig(null);
          setStage("idiom-exam-sets");
        }}
        onUpdateConfig={(c) => setConfig(c)}
        onGoHome={() => {
          setReviewIdiomUnknownDeck(false);
          setStage("home");
        }}
      />
    );

  if (stage === "idiom-exam")
    return (
      <IdiomExam
        config={config}
        onUpdateConfig={(c) => setConfig((prev) => ({ ...prev, ...c }))}
        onGoHome={() => setStage("home")}
        onGoBackToSets={() => setStage("idiom-exam-sets")}
      />
    );

  if (stage === "idiom-exam-sets")
    return (
      <IdiomExamSets
        config={config}
        onUpdateConfig={(c) => setConfig(c)}
        onGoHome={() => setStage("home")}
        onSelectSet={(set) => {
          setConfig((prev) => ({ ...prev, ...set }));
          setStage("idiom-exam");
        }}
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

  if (stage === "geography")
    return (
      <Geography
        config={config}
        onUpdateConfig={(c) => setConfig(c)}
        onGoHome={() => setStage("home")}
        onMapDrawing={() => setStage("map-drawing")}
      />
    );

  if (stage === "india-map")
    return (
      <IndiaMap
        onGoHome={() => setStage("home")}
      />
    );

  if (stage === "map-drawing")
    return (
      <MapDrawing
        onGoHome={() => setStage("home")}
      />
    );

  if (stage === "constitution")
    return (
      <Constitution
        onGoHome={() => setStage("home")}
        onViewSchedules={() => setStage("schedules")}
        onViewParts={() => setStage("parts")}
      />
    );

  if (stage === "schedules")
    return (
      <Schedules
        onGoHome={() => setStage("home")}
      />
    );

  if (stage === "parts")
    return (
      <Parts
        onGoHome={() => setStage("home")}
      />
    );

  if (stage === "synonyms-antonyms-test-intro")
    return (
      <SynonymsAntonymsTestIntro
        config={config}
        onSelectSet={(set) => {
          setVocabExamConfig({ start: set.start, limit: set.limit });
          setStage("synonyms-antonyms-test");
        }}
        onGoRead={() => setStage("read-synonyms-antonyms")}
        onGoHome={() => setStage("home")}
      />
    );

  if (stage === "synonyms-antonyms-test")
    return (
      <SynonymsAntonymsTest
        config={vocabExamConfig || { start: config.start, limit: Math.min(10, config.limit || 10) }}
        setConfig={(c) => setVocabExamConfig(c)}
        onGoRead={() => setStage("read-synonyms-antonyms")}
        onGoHome={() => setStage("home")}
      />
    );

  if (stage === "articles")
    return (
      <Articles
        onGoHome={() => setStage("home")}
        partNumber={window.currentPartNumber || "Part I"}
      />
    );

  if (stage === "read-geometry")
    return (
      <ReadGeometry
        config={config}
        onUpdateConfig={(c) => setConfig(c)}
        onGoHome={() => setStage("home")}
      />
    );

  if (stage === "homonyms-homophones-session")
    return (
      <HomonymsHomophonesSession
        config={config}
        reviewUnknownDeck={reviewHomonymsUnknownDeck}
        onGoCards={() => {
          setReviewHomonymsUnknownDeck(true);
          setStage("homonyms-homophones-session");
        }}
        onGoRead={() => {
          setReviewHomonymsUnknownDeck(false);
          setStage("read-homonyms-homophones");
        }}
        onUpdateConfig={(c) => setConfig(c)}
        onGoHome={() => {
          setReviewHomonymsUnknownDeck(false);
          setStage("home");
        }}
      />
    );

  return <Complete />;
}

const accountMenu = {
  position: "fixed",
  top: 12,
  right: 12,
  zIndex: 2000,
};

const profileButton = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: 42,
  height: 42,
  padding: 0,
  border: "2px solid #fff",
  borderRadius: "50%",
  background: "#388e3c",
  color: "#fff",
  boxShadow: "0 2px 8px rgba(0,0,0,.2)",
  fontSize: 18,
  fontWeight: 700,
  cursor: "pointer",
};

const accountDropdown = {
  position: "absolute",
  top: 50,
  right: 0,
  display: "flex",
  flexDirection: "column",
  alignItems: "stretch",
  gap: 10,
  width: "min(280px, calc(100vw - 24px))",
  padding: 14,
  border: "1px solid #d5dce5",
  borderRadius: 12,
  background: "#fff",
  color: "#334155",
  boxShadow: "0 4px 16px rgba(0,0,0,.16)",
  fontSize: 14,
};

const accountEmail = {
  overflowWrap: "anywhere",
};

const logoutButton = {
  alignSelf: "flex-start",
  padding: "8px 12px",
  border: "1px solid #cbd5e1",
  borderRadius: 8,
  background: "#fff",
  color: "#334155",
  cursor: "pointer",
};

const accountError = {
  color: "#b71c1c",
  fontSize: 12,
};

const authErrorStyle = {
  position: "fixed",
  left: "50%",
  bottom: 18,
  transform: "translateX(-50%)",
  padding: 12,
  borderRadius: 8,
  background: "#ffebee",
  color: "#b71c1c",
};
