import { useState, useEffect, useCallback } from "react";
import { fetchVocab } from "../services/vocabService";
import { authService } from "../services/authService";
import shuffle from "../utils/shuffle";

export default function useFlashcards(config) {
  const [cards, setCards] = useState([]);
  const [known, setKnown] = useState([]);
  const [unknown, setUnknown] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [progressLoaded, setProgressLoaded] = useState(false);

  // Load user and progress
  useEffect(() => {
    const currentUser = authService.getCurrentUser();
    if (currentUser) {
      setUser(currentUser);
      loadUserProgress(currentUser.id);
    } else {
      setLoading(false);
    }
  }, []);

  // Load flashcard data
  useEffect(() => {
    if (!user && !progressLoaded) return;
    
    const start = config?.start || 0;
    const limit = config?.limit || 20;
    
    fetchVocab(start, limit).then((data) => {
      if (data.status === 'success') {
        setCards(shuffle(data.data));
        setLoading(false);
      }
    });
  }, [config?.start, config?.limit, user, progressLoaded]);

  // Load user progress
  const loadUserProgress = async (userId) => {
    try {
      const result = await authService.getUserProgress(userId);
      if (result.success) {
        setKnown(result.progress.vocab_known || []);
        setUnknown(result.progress.vocab_unknown || []);
        setProgressLoaded(true);
      }
    } catch (error) {
      console.error('Failed to load progress:', error);
      setProgressLoaded(true);
    }
  };

  // Save user progress
  const saveProgress = useCallback(async () => {
    if (!user) return;
    
    try {
      await authService.updateUserProgress(user.id, {
        vocab_known: known,
        vocab_unknown: unknown,
        idioms_known: [],
        idioms_unknown: []
      });
    } catch (error) {
      console.error('Failed to save progress:', error);
    }
  }, [user, known, unknown]);

  // Auto-save progress when it changes
  useEffect(() => {
    if (user && progressLoaded) {
      const timeoutId = setTimeout(saveProgress, 1000); // Save after 1 second
      return () => clearTimeout(timeoutId);
    }
  }, [known, unknown, saveProgress, user, progressLoaded]);

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
    user,
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
