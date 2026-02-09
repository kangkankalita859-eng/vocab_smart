/* =========================
   DECK PERSISTENCE SERVICE
   ========================= */

const STORAGE_KEYS = {
  UNKNOWN_DECK: 'vocab_unknown_deck',
  SAVED_DECKS: 'vocab_saved_decks',
  CURRENT_CONFIG: 'vocab_current_config'
};

/* ---------------- SAVE METHODS ---------------- */

export const saveUnknownDeck = (unknownDeck) => {
  try {
    localStorage.setItem(STORAGE_KEYS.UNKNOWN_DECK, JSON.stringify(unknownDeck));
    return true;
  } catch (error) {
    console.error('Error saving unknown deck:', error);
    return false;
  }
};

export const saveSavedDecks = (savedDecks) => {
  try {
    localStorage.setItem(STORAGE_KEYS.SAVED_DECKS, JSON.stringify(savedDecks));
    return true;
  } catch (error) {
    console.error('Error saving saved decks:', error);
    return false;
  }
};

export const saveCurrentConfig = (config) => {
  try {
    localStorage.setItem(STORAGE_KEYS.CURRENT_CONFIG, JSON.stringify(config));
    return true;
  } catch (error) {
    console.error('Error saving current config:', error);
    return false;
  }
};

/* ---------------- LOAD METHODS ---------------- */

export const loadUnknownDeck = () => {
  try {
    const saved = localStorage.getItem(STORAGE_KEYS.UNKNOWN_DECK);
    return saved ? JSON.parse(saved) : [];
  } catch (error) {
    console.error('Error loading unknown deck:', error);
    return [];
  }
};

export const loadSavedDecks = () => {
  try {
    const saved = localStorage.getItem(STORAGE_KEYS.SAVED_DECKS);
    return saved ? JSON.parse(saved) : [];
  } catch (error) {
    console.error('Error loading saved decks:', error);
    return [];
  }
};

export const loadCurrentConfig = () => {
  try {
    const saved = localStorage.getItem(STORAGE_KEYS.CURRENT_CONFIG);
    return saved ? JSON.parse(saved) : { start: 0, limit: 20 };
  } catch (error) {
    console.error('Error loading current config:', error);
    return { start: 0, limit: 20 };
  }
};

/* ---------------- CLEAR METHODS ---------------- */

export const clearUnknownDeck = () => {
  try {
    localStorage.removeItem(STORAGE_KEYS.UNKNOWN_DECK);
    return true;
  } catch (error) {
    console.error('Error clearing unknown deck:', error);
    return false;
  }
};

export const clearSavedDecks = () => {
  try {
    localStorage.removeItem(STORAGE_KEYS.SAVED_DECKS);
    return true;
  } catch (error) {
    console.error('Error clearing saved decks:', error);
    return false;
  }
};

export const clearAllDeckData = () => {
  try {
    Object.values(STORAGE_KEYS).forEach(key => {
      localStorage.removeItem(key);
    });
    return true;
  } catch (error) {
    console.error('Error clearing all deck data:', error);
    return false;
  }
};

/* ---------------- UTILITY METHODS ---------------- */

export const hasPersistedData = () => {
  const unknownDeck = loadUnknownDeck();
  const savedDecks = loadSavedDecks();
  return unknownDeck.length > 0 || savedDecks.length > 0;
};

export const getDeckStats = () => {
  const unknownDeck = loadUnknownDeck();
  const savedDecks = loadSavedDecks();
  
  return {
    unknownCount: unknownDeck.length,
    savedDeckCount: savedDecks.length,
    totalSavedCards: savedDecks.reduce((total, deck) => total + deck.unknownCards.length, 0),
    hasData: unknownDeck.length > 0 || savedDecks.length > 0
  };
};
