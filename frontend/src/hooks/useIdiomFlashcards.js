import { useState, useEffect, useCallback } from "react";
import { fetchIdioms } from "../services/idiomsService";
import { loadUnknownDeck, saveUnknownDeck } from "../services/deckPersistenceService";
import shuffle from "../utils/shuffle";

export default function useIdiomFlashcards(config) {
  const [cards, setCards] = useState([]);
  const [known, setKnown] = useState([]);
  const [unknown, setUnknown] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [progressLoaded, setProgressLoaded] = useState(false);

  // Load persisted unknown deck on mount
  useEffect(() => {
    const persistedUnknown = loadUnknownDeck('idiom');
    if (persistedUnknown.length > 0) {
      setUnknown(persistedUnknown);
    }
    setProgressLoaded(true);
  }, []);

  // Load flashcard data
  useEffect(() => {
    if (!progressLoaded) return;
    
    const start = config?.start || 0;
    const limit = config?.limit || 20;
    
    fetchIdioms(start, limit).then((data) => {
      if (data.status === 'success') {
        setCards(shuffle(data.data));
        setLoading(false);
      }
    });
  }, [config?.start, config?.limit, progressLoaded]);

  // Save unknown deck to localStorage
  const saveUnknownDeckToStorage = useCallback(() => {
    saveUnknownDeck(unknown, 'idiom');
  }, [unknown]);

  // Auto-save unknown deck when it changes
  useEffect(() => {
    if (progressLoaded && unknown.length > 0) {
      const timeoutId = setTimeout(saveUnknownDeckToStorage, 1000);
      return () => clearTimeout(timeoutId);
    }
  }, [unknown, saveUnknownDeckToStorage, progressLoaded]);

  const markKnown = useCallback(() => {
    const card = cards[currentIndex];
    if (card) {
      setKnown(prev => [...prev, card]);
      setCurrentIndex(prev => prev + 1);
    }
  }, [cards, currentIndex]);

  const markUnknown = useCallback(() => {
    const card = cards[currentIndex];
    if (card) {
      setUnknown(prev => [...prev, card]);
      setCurrentIndex(prev => prev + 1);
    }
  }, [cards, currentIndex]);

  const reviseUnknown = () => {
    setCards(shuffle(unknown));
    setUnknown([]);
    setCurrentIndex(0);
    // Clear persisted unknown deck since we're now using it
    saveUnknownDeck([], 'idiom');
  };

  const reset = () => {
    setKnown([]);
    setUnknown([]);
    setCurrentIndex(0);
    setCards(shuffle(cards));
  };

  return {
    cards,
    known,
    unknown,
    currentIndex,
    loading,
    markKnown,
    markUnknown,
    reviseUnknown,
    reset,
    isComplete: currentIndex >= cards.length && unknown.length === 0,
    currentCard: cards[currentIndex],
    remainingCards: cards.length - currentIndex,
    progressLoaded
  };
}
