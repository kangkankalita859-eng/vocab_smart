/* =========================
   DECK PERSISTENCE SERVICE
   ========================= */

const STORAGE_KEYS = {
  VOCAB_UNKNOWN_DECK: 'vocab_unknown_deck',
  VOCAB_SAVED_DECKS: 'vocab_saved_decks',
  VOCAB_CURRENT_CONFIG: 'vocab_current_config',
  IDIOM_UNKNOWN_DECK: 'idiom_unknown_deck',
  IDIOM_SAVED_DECKS: 'idiom_saved_decks',
  IDIOM_CURRENT_CONFIG: 'idiom_current_config'
};

/* ---------------- SAVE METHODS ---------------- */

export const saveUnknownDeck = (unknownDeck, type = 'vocab') => {
  try {
    const key = type === 'idiom' ? STORAGE_KEYS.IDIOM_UNKNOWN_DECK : STORAGE_KEYS.VOCAB_UNKNOWN_DECK;
    localStorage.setItem(key, JSON.stringify(unknownDeck));
    return true;
  } catch (error) {
    console.error('Error saving unknown deck:', error);
    return false;
  }
};

export const saveSavedDecks = (savedDecks, type = 'vocab') => {
  try {
    const key = type === 'idiom' ? STORAGE_KEYS.IDIOM_SAVED_DECKS : STORAGE_KEYS.VOCAB_SAVED_DECKS;
    localStorage.setItem(key, JSON.stringify(savedDecks));
    return true;
  } catch (error) {
    console.error('Error saving saved decks:', error);
    return false;
  }
};

export const saveCurrentConfig = (config, type = 'vocab') => {
  try {
    const key = type === 'idiom' ? STORAGE_KEYS.IDIOM_CURRENT_CONFIG : STORAGE_KEYS.VOCAB_CURRENT_CONFIG;
    localStorage.setItem(key, JSON.stringify(config));
    return true;
  } catch (error) {
    console.error('Error saving current config:', error);
    return false;
  }
};

/* ---------------- LOAD METHODS ---------------- */

export const loadUnknownDeck = (type = 'vocab') => {
  try {
    const key = type === 'idiom' ? STORAGE_KEYS.IDIOM_UNKNOWN_DECK : STORAGE_KEYS.VOCAB_UNKNOWN_DECK;
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) : [];
  } catch (error) {
    console.error('Error loading unknown deck:', error);
    return [];
  }
};

export const loadSavedDecks = (type = 'vocab') => {
  try {
    const key = type === 'idiom' ? STORAGE_KEYS.IDIOM_SAVED_DECKS : STORAGE_KEYS.VOCAB_SAVED_DECKS;
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) : [];
  } catch (error) {
    console.error('Error loading saved decks:', error);
    return [];
  }
};

export const loadCurrentConfig = (type = 'vocab') => {
  try {
    const key = type === 'idiom' ? STORAGE_KEYS.IDIOM_CURRENT_CONFIG : STORAGE_KEYS.VOCAB_CURRENT_CONFIG;
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) : { start: 0, limit: 20 };
  } catch (error) {
    console.error('Error loading current config:', error);
    return { start: 0, limit: 20 };
  }
};

/* ---------------- CLEAR METHODS ---------------- */

export const clearUnknownDeck = (type = 'vocab') => {
  try {
    const key = type === 'idiom' ? STORAGE_KEYS.IDIOM_UNKNOWN_DECK : STORAGE_KEYS.VOCAB_UNKNOWN_DECK;
    localStorage.removeItem(key);
    return true;
  } catch (error) {
    console.error('Error clearing unknown deck:', error);
    return false;
  }
};

export const clearSavedDecks = (type = 'vocab') => {
  try {
    const key = type === 'idiom' ? STORAGE_KEYS.IDIOM_SAVED_DECKS : STORAGE_KEYS.VOCAB_SAVED_DECKS;
    localStorage.removeItem(key);
    return true;
  } catch (error) {
    console.error('Error clearing saved decks:', error);
    return false;
  }
};

export const clearAllDeckData = (type = 'vocab') => {
  try {
    const keys = type === 'idiom' 
      ? [STORAGE_KEYS.IDIOM_UNKNOWN_DECK, STORAGE_KEYS.IDIOM_SAVED_DECKS, STORAGE_KEYS.IDIOM_CURRENT_CONFIG]
      : [STORAGE_KEYS.VOCAB_UNKNOWN_DECK, STORAGE_KEYS.VOCAB_SAVED_DECKS, STORAGE_KEYS.VOCAB_CURRENT_CONFIG];
    keys.forEach(key => {
      localStorage.removeItem(key);
    });
    return true;
  } catch (error) {
    console.error('Error clearing all deck data:', error);
    return false;
  }
};

/* ---------------- UTILITY METHODS ---------------- */

export const hasPersistedData = (type = 'vocab') => {
  const unknownDeck = loadUnknownDeck(type);
  const savedDecks = loadSavedDecks(type);
  return unknownDeck.length > 0 || savedDecks.length > 0;
};

export const getDeckStats = (type = 'vocab') => {
  const unknownDeck = loadUnknownDeck(type);
  const savedDecks = loadSavedDecks(type);
  
  return {
    unknownCount: unknownDeck.length,
    savedDeckCount: savedDecks.length,
    totalSavedCards: savedDecks.reduce((total, deck) => total + deck.unknownCards.length, 0),
    hasData: unknownDeck.length > 0 || savedDecks.length > 0
  };
};
