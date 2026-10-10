/* =========================
   DECK PERSISTENCE SERVICE
   ========================= */

const STORAGE_KEYS = {
  VOCAB_UNKNOWN_DECK: 'vocab_unknown_deck',
  VOCAB_SAVED_DECKS: 'vocab_saved_decks',
  VOCAB_CURRENT_CONFIG: 'vocab_current_config',
  VOCAB_IN_PROGRESS_SESSION: 'vocab_in_progress_session',
  IDIOM_UNKNOWN_DECK: 'idiom_unknown_deck',
  IDIOM_SAVED_DECKS: 'idiom_saved_decks',
  IDIOM_CURRENT_CONFIG: 'idiom_current_config',
  IDIOM_IN_PROGRESS_SESSION: 'idiom_in_progress_session',
  HOMONYMS_UNKNOWN_DECK: 'homonyms_unknown_deck',
  HOMONYMS_SAVED_DECKS: 'homonyms_saved_decks',
  HOMONYMS_CURRENT_CONFIG: 'homonyms_current_config',
  HOMONYMS_IN_PROGRESS_SESSION: 'homonyms_in_progress_session'
};

// Get storage keys for a specific card type
const getKeys = (cardType) => {
  switch(cardType) {
    case 'idiom':
      return {
        UNKNOWN_DECK: STORAGE_KEYS.IDIOM_UNKNOWN_DECK,
        SAVED_DECKS: STORAGE_KEYS.IDIOM_SAVED_DECKS,
        CURRENT_CONFIG: STORAGE_KEYS.IDIOM_CURRENT_CONFIG,
        IN_PROGRESS_SESSION: STORAGE_KEYS.IDIOM_IN_PROGRESS_SESSION
      };
    case 'homonyms':
      return {
        UNKNOWN_DECK: STORAGE_KEYS.HOMONYMS_UNKNOWN_DECK,
        SAVED_DECKS: STORAGE_KEYS.HOMONYMS_SAVED_DECKS,
        CURRENT_CONFIG: STORAGE_KEYS.HOMONYMS_CURRENT_CONFIG,
        IN_PROGRESS_SESSION: STORAGE_KEYS.HOMONYMS_IN_PROGRESS_SESSION
      };
    case 'vocab':
    default:
      return {
        UNKNOWN_DECK: STORAGE_KEYS.VOCAB_UNKNOWN_DECK,
        SAVED_DECKS: STORAGE_KEYS.VOCAB_SAVED_DECKS,
        CURRENT_CONFIG: STORAGE_KEYS.VOCAB_CURRENT_CONFIG,
        IN_PROGRESS_SESSION: STORAGE_KEYS.VOCAB_IN_PROGRESS_SESSION
      };
  }
};

/* ---------------- SAVE METHODS ---------------- */

export const saveUnknownDeck = (unknownDeck, cardType = 'vocab') => {
  try {
    const keys = getKeys(cardType);
    localStorage.setItem(keys.UNKNOWN_DECK, JSON.stringify(unknownDeck));
    return true;
  } catch (error) {
    console.error('Error saving unknown deck:', error);
    return false;
  }
};

export const saveSavedDecks = (savedDecks, cardType = 'vocab') => {
  try {
    const keys = getKeys(cardType);
    localStorage.setItem(keys.SAVED_DECKS, JSON.stringify(savedDecks));
    return true;
  } catch (error) {
    console.error('Error saving saved decks:', error);
    return false;
  }
};

export const saveCurrentConfig = (config, cardType = 'vocab') => {
  try {
    const keys = getKeys(cardType);
    localStorage.setItem(keys.CURRENT_CONFIG, JSON.stringify(config));
    return true;
  } catch (error) {
    console.error('Error saving current config:', error);
    return false;
  }
};

export const saveInProgressSession = (session, cardType = 'vocab') => {
  try {
    const keys = getKeys(cardType);
    localStorage.setItem(keys.IN_PROGRESS_SESSION, JSON.stringify(session));
    return true;
  } catch (error) {
    console.error('Error saving in-progress session:', error);
    return false;
  }
};

/* ---------------- LOAD METHODS ---------------- */

export const loadUnknownDeck = (cardType = 'vocab') => {
  try {
    const keys = getKeys(cardType);
    const saved = localStorage.getItem(keys.UNKNOWN_DECK);
    return saved ? JSON.parse(saved) : [];
  } catch (error) {
    console.error('Error loading unknown deck:', error);
    return [];
  }
};

export const loadSavedDecks = (cardType = 'vocab') => {
  try {
    const keys = getKeys(cardType);
    const saved = localStorage.getItem(keys.SAVED_DECKS);
    return saved ? JSON.parse(saved) : [];
  } catch (error) {
    console.error('Error loading saved decks:', error);
    return [];
  }
};

export const loadCurrentConfig = (cardType = 'vocab') => {
  try {
    const keys = getKeys(cardType);
    const saved = localStorage.getItem(keys.CURRENT_CONFIG);
    return saved ? JSON.parse(saved) : { start: 0, limit: 20 };
  } catch (error) {
    console.error('Error loading current config:', error);
    return { start: 0, limit: 20 };
  }
};

export const loadInProgressSession = (cardType = 'vocab') => {
  try {
    const keys = getKeys(cardType);
    const saved = localStorage.getItem(keys.IN_PROGRESS_SESSION);
    const session = saved ? JSON.parse(saved) : null;

    return session && Array.isArray(session.activeDeck) && session.activeDeck.length > 0
      ? session
      : null;
  } catch (error) {
    console.error('Error loading in-progress session:', error);
    return null;
  }
};

/* ---------------- CLEAR METHODS ---------------- */

export const clearUnknownDeck = (cardType = 'vocab') => {
  try {
    const keys = getKeys(cardType);
    localStorage.removeItem(keys.UNKNOWN_DECK);
    return true;
  } catch (error) {
    console.error('Error clearing unknown deck:', error);
    return false;
  }
};

export const clearSavedDecks = (cardType = 'vocab') => {
  try {
    const keys = getKeys(cardType);
    localStorage.removeItem(keys.SAVED_DECKS);
    return true;
  } catch (error) {
    console.error('Error clearing saved decks:', error);
    return false;
  }
};

export const clearInProgressSession = (cardType = 'vocab') => {
  try {
    const keys = getKeys(cardType);
    localStorage.removeItem(keys.IN_PROGRESS_SESSION);
    return true;
  } catch (error) {
    console.error('Error clearing in-progress session:', error);
    return false;
  }
};

export const clearAllDeckData = (cardType = 'vocab') => {
  try {
    const keys = getKeys(cardType);
    Object.values(keys).forEach(key => {
      localStorage.removeItem(key);
    });
    return true;
  } catch (error) {
    console.error('Error clearing all deck data:', error);
    return false;
  }
};

// Clear all data for all card types
export const clearAllCardTypes = () => {
  try {
    Object.values(STORAGE_KEYS).forEach(key => {
      localStorage.removeItem(key);
    });
    return true;
  } catch (error) {
    console.error('Error clearing all card types data:', error);
    return false;
  }
};

/* ---------------- UTILITY METHODS ---------------- */

export const hasPersistedData = (cardType = 'vocab') => {
  const unknownDeck = loadUnknownDeck(cardType);
  const savedDecks = loadSavedDecks(cardType);
  const inProgressSession = loadInProgressSession(cardType);
  return unknownDeck.length > 0 || savedDecks.length > 0 || Boolean(inProgressSession);
};

export const getDeckStats = (cardType = 'vocab') => {
  const unknownDeck = loadUnknownDeck(cardType);
  const savedDecks = loadSavedDecks(cardType);
  const inProgressSession = loadInProgressSession(cardType);
  const inProgressCount = inProgressSession?.activeDeck?.length || 0;
  
  return {
    unknownCount: unknownDeck.length,
    savedDeckCount: savedDecks.length,
    inProgressCount,
    totalSavedCards: savedDecks.reduce((total, deck) => total + deck.unknownCards.length, 0),
    hasData: unknownDeck.length > 0 || savedDecks.length > 0 || inProgressCount > 0
  };
};
