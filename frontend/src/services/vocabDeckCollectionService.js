const STORAGE_KEYS = {
  vocab: "vocab_deck_collection_v2",
  idiom: "idiom_deck_collection_v2",
};

const cardKey = (id) => String(id);

const createId = () =>
  typeof crypto !== "undefined" && crypto.randomUUID
    ? crypto.randomUUID()
    : `${Date.now()}-${Math.random().toString(36).slice(2)}`;

const copy = (value) => JSON.parse(JSON.stringify(value));

const createSession = (deck) => ({
  sourceDeckId: deck.id,
  order: deck.cards.map((card) => card.id),
  knownDeckId: null,
  unknownDeckId: null,
  knownCount: 0,
  unknownCount: 0,
  lastAction: null,
  updatedAt: Date.now(),
});

const getDeck = (collection, deckId) =>
  collection.decks.find((deck) => deck.id === deckId);

const getSession = (collection, deckId) => {
  let session = collection.sessions.find((item) => item.sourceDeckId === deckId);
  const deck = getDeck(collection, deckId);

  if (!session && deck) {
    session = createSession(deck);
    collection.sessions.push(session);
  } else if (session && deck) {
    const cardIds = new Set(deck.cards.map((card) => cardKey(card.id)));
    const orderedIds = new Set();
    session.order = (Array.isArray(session.order) ? session.order : []).filter((id) => {
      const key = cardKey(id);
      if (!cardIds.has(key) || orderedIds.has(key)) return false;
      orderedIds.add(key);
      return true;
    });
    deck.cards.forEach((card) => {
      const key = cardKey(card.id);
      if (!orderedIds.has(key)) {
        session.order.push(card.id);
        orderedIds.add(key);
      }
    });
  }

  return session;
};

const appendHistory = (collection, event) => {
  collection.history.push({ ...event, timestamp: Date.now() });
};

const insertAt = (items, item, index) => {
  const result = [...items];
  result.splice(Math.max(0, Math.min(index, result.length)), 0, item);
  return result;
};

const uniqueDeckNumber = (
  collection,
  type,
  preferredNumber,
  excludeDeckId = null,
  reservedNumbers = new Set(),
  ignoredDeckIds = new Set()
) => {
  const prefix = type === "known" ? "Known" : "Unknown";
  const usedNumbers = new Set(
    collection.decks
      .filter(
        (deck) =>
          deck.id !== excludeDeckId &&
          !ignoredDeckIds.has(deck.id) &&
          deck.kind === type &&
          deck.cards.length > 0
      )
      .map((deck) => Number(deck.name.match(new RegExp(`^${prefix} (\\d+)$`, "i"))?.[1]))
      .filter(Number.isInteger)
  );
  reservedNumbers.forEach((number) => usedNumbers.add(number));
  let number = Math.max(1, preferredNumber);
  while (usedNumbers.has(number)) number += 1;
  return number;
};

const createNamedDeck = (collection, type, name, cards = [], sourceDeckIds = []) => {
  const deck = {
    id: createId(),
    name,
    kind: type,
    cards,
    sourceDeckIds,
    parentDeckIds: [...sourceDeckIds],
    createdAt: Date.now(),
  };
  collection.decks.push(deck);
  return deck;
};

const normalizeCollection = (collection) => {
  if (
    !collection ||
    collection.version !== 2 ||
    !Array.isArray(collection.decks) ||
    !Array.isArray(collection.sessions) ||
    !Array.isArray(collection.history) ||
    !collection.sequences ||
    !Number.isInteger(collection.sequences.known) ||
    !Number.isInteger(collection.sequences.unknown) ||
    !Number.isInteger(collection.sequences.merged)
  ) {
    throw new Error("Saved vocabulary deck data is invalid; it was not changed.");
  }

  const mainDeck = collection.decks.find((deck) => deck.id === "main-deck");
  if (!mainDeck || !Array.isArray(mainDeck.cards)) {
    throw new Error("Saved vocabulary data has no Main Deck; it was not changed.");
  }

  const ownedCardIds = new Set();
  collection.decks.forEach((deck) => {
    if (!Array.isArray(deck.cards)) {
      throw new Error(`Saved deck "${deck.name}" has invalid card data.`);
    }
    deck.cards.forEach((card) => {
      const id = card?.id == null ? null : cardKey(card.id);
      if (id === null || ownedCardIds.has(id)) {
        throw new Error("Saved decks contain a missing or duplicate card ID; data was not changed.");
      }
      ownedCardIds.add(id);
    });
  });

  const classificationDecks = collection.decks
    .filter(
      (deck) =>
        (deck.kind === "known" || deck.kind === "unknown") &&
        deck.cards.length > 0
    )
    .sort(
      (left, right) =>
        (left.createdAt || 0) - (right.createdAt || 0) ||
        left.id.localeCompare(right.id)
    );
  const classificationDeckIds = new Set(classificationDecks.map((deck) => deck.id));
  const assignedNumbers = { known: new Set(), unknown: new Set() };
  classificationDecks.forEach((deck) => {
    const number = uniqueDeckNumber(
      collection,
      deck.kind,
      assignedNumbers[deck.kind].size + 1,
      deck.id,
      assignedNumbers[deck.kind],
      classificationDeckIds
    );
    assignedNumbers[deck.kind].add(number);
    deck.name = `${deck.kind === "known" ? "Known" : "Unknown"} ${number}`;
  });

  return collection;
};

const loadDeckCollection = (storageKey) => {
  const stored = localStorage.getItem(storageKey);
  if (!stored) return null;

  const collection = normalizeCollection(JSON.parse(stored));
  const normalized = JSON.stringify(collection);
  if (normalized !== stored) {
    localStorage.setItem(storageKey, normalized);
  }
  return collection;
};

const saveDeckCollection = (collection, storageKey) => {
  normalizeCollection(collection);
  localStorage.setItem(storageKey, JSON.stringify(collection));
};

export const loadVocabDeckCollection = () =>
  loadDeckCollection(STORAGE_KEYS.vocab);

export const saveVocabDeckCollection = (collection) =>
  saveDeckCollection(collection, STORAGE_KEYS.vocab);

export const loadIdiomDeckCollection = () =>
  loadDeckCollection(STORAGE_KEYS.idiom);

export const saveIdiomDeckCollection = (collection) =>
  saveDeckCollection(collection, STORAGE_KEYS.idiom);

export const createVocabDeckCollection = (allCards, legacyData = {}) => {
  const decks = [];
  const assignedIds = new Set();
  const datasetIds = new Set();
  allCards.forEach((card) => {
    const id = card?.id == null ? null : cardKey(card.id);
    if (id === null || datasetIds.has(id)) {
      throw new Error("Vocabulary dataset contains a missing or duplicate card ID.");
    }
    datasetIds.add(id);
  });

  const addImportedDeck = (name, kind, cards, sourceDeckIds = []) => {
    const uniqueCards = (cards || []).filter((card) => {
      if (card?.id == null || assignedIds.has(cardKey(card.id))) return false;
      assignedIds.add(cardKey(card.id));
      return true;
    });
    if (uniqueCards.length === 0) return null;

    const deck = {
      id: createId(),
      name,
      kind,
      cards: uniqueCards,
      sourceDeckIds,
      parentDeckIds: [...sourceDeckIds],
      createdAt: Date.now(),
    };
    decks.push(deck);
    return deck;
  };

  const progress = legacyData.inProgressSession;
  const legacyKnown = addImportedDeck("Known 1", "known", progress?.knownDeck || []);
  const legacyUnknown = addImportedDeck("Unknown 1", "unknown", [
    ...(progress?.unknownDeck || []),
    ...(legacyData.unknownDeck || []),
  ]);
  const savedDecks = (legacyData.savedDecks || []).map((deck, index) =>
    addImportedDeck(
      deck.name || `Deck ${index + 1}`,
      "legacy",
      deck.cards || deck.unknownCards || [],
      deck.sourceDeckIds || []
    )
  ).filter(Boolean);

  const currentDeck = addImportedDeck(
    "Current Deck",
    "current",
    progress?.activeDeck || []
  );
  const importedIds = new Set(
    decks.flatMap((deck) => deck.cards.map((card) => cardKey(card.id)))
  );
  const mainCards = allCards.filter((card) => !importedIds.has(cardKey(card.id)));
  const mainDeck = {
    id: "main-deck",
    name: "Main Deck",
    kind: "main",
    cards: mainCards,
    sourceDeckIds: [],
    parentDeckIds: [],
    createdAt: Date.now(),
  };

  const knownCount = legacyKnown ? 1 : 0;
  const unknownCount = legacyUnknown ? 1 : 0;
  const collection = {
    version: 2,
    decks: [mainDeck, ...decks],
    sessions: [],
    history: [],
    sequences: {
      known: knownCount + 1,
      unknown: unknownCount + 1,
      merged: 1,
    },
    activeDeckId: currentDeck?.id || legacyUnknown?.id || savedDecks[0]?.id || null,
  };

  if (currentDeck) {
    const session = createSession(currentDeck);
    session.knownCount = progress?.knownDeck?.length || 0;
    session.unknownCount = progress?.unknownDeck?.length || 0;
    session.knownDeckId = progress?.knownDeck?.length ? legacyKnown?.id || null : null;
    session.unknownDeckId = progress?.unknownDeck?.length ? legacyUnknown?.id || null : null;
    session.lastAction = null;
    collection.sessions.push(session);
  }

  const importedCardIds = decks.flatMap((deck) => deck.cards.map((card) => card.id));
  if (importedCardIds.length > 0) {
    appendHistory(collection, {
      type: "legacy-import",
      deckIds: decks.map((deck) => deck.id),
      cardIds: importedCardIds,
    });
  }

  return collection;
};

export const createIdiomDeckCollection = (allCards, legacyData = {}) => {
  const usedIds = new Set();
  const cardsByLegacyKey = new Map();
  let nextId = Math.max(
    0,
    ...allCards.map((card) => Number(card?.id) || 0)
  ) + 1;
  const legacyKey = (card) => `${card?.id}:${card?.phrase}`;

  const normalizedCards = allCards.map((card) => {
    const originalId = card?.id;
    let id = originalId;
    if (id == null || usedIds.has(cardKey(id))) {
      while (usedIds.has(cardKey(nextId))) nextId += 1;
      id = nextId;
      nextId += 1;
    }
    usedIds.add(cardKey(id));

    const normalized = {
      ...card,
      id,
      rangeId: card?.rangeId ?? originalId,
    };
    const key = legacyKey(card);
    if (!cardsByLegacyKey.has(key)) cardsByLegacyKey.set(key, normalized);
    return normalized;
  });

  const normalizeLegacyCards = (cards) =>
    (cards || []).map((card) => cardsByLegacyKey.get(legacyKey(card)) || card);
  const progress = legacyData.inProgressSession;

  return createVocabDeckCollection(normalizedCards, {
    unknownDeck: normalizeLegacyCards(legacyData.unknownDeck),
    savedDecks: (legacyData.savedDecks || []).map((deck) => ({
      ...deck,
      cards: normalizeLegacyCards(deck.cards || deck.unknownCards),
      unknownCards: normalizeLegacyCards(deck.unknownCards || deck.cards),
    })),
    inProgressSession: progress
      ? {
          ...progress,
          activeDeck: normalizeLegacyCards(progress.activeDeck),
          knownDeck: normalizeLegacyCards(progress.knownDeck),
          unknownDeck: normalizeLegacyCards(progress.unknownDeck),
        }
      : progress,
  });
};

export const extractVocabRange = (
  collection,
  { start = 0, limit = null, rangeEnd = null } = {}
) => {
  const next = copy(collection);
  const numericStart = Number(start) || 0;
  const numericLimit = Number(limit);
  const candidates = next.decks.flatMap((deck) =>
      deck.cards
        .filter(
          (card) =>
            (numericStart <= 0 || Number(card.rangeId ?? card.id) >= numericStart) &&
            (rangeEnd == null || Number(card.rangeId ?? card.id) <= Number(rangeEnd))
        )
        .map((card) => ({ card, sourceDeck: deck }))
    )
    .sort(
      (left, right) =>
        Number(left.card.rangeId ?? left.card.id) -
          Number(right.card.rangeId ?? right.card.id) ||
        Number(left.card.id) - Number(right.card.id)
    );
  const selected = numericLimit > 0
    ? candidates.slice(0, numericLimit)
    : candidates;
  if (selected.length === 0) {
    return { collection: next, extractedCount: 0, matchedCount: 0 };
  }

  const selectedIds = new Set(selected.map(({ card }) => cardKey(card.id)));
  const mainDeck = getDeck(next, "main-deck");
  let currentDeck = next.decks.find(
    (deck) => deck.kind === "current"
  );
  if (!currentDeck) {
    currentDeck = createNamedDeck(next, "current", "Current Deck");
  }

  const returnedCards = currentDeck.cards.filter(
    (card) => !selectedIds.has(cardKey(card.id))
  );
  const mainIds = new Set(mainDeck.cards.map((card) => cardKey(card.id)));
  returnedCards.forEach((card) => {
    if (!mainIds.has(cardKey(card.id))) {
      mainDeck.cards.push(card);
      mainIds.add(cardKey(card.id));
    }
  });

  const session = getSession(next, currentDeck.id);
  const previousOrder = session.order;
  const orderedIds = new Set();
  const orderedSelectedIds = previousOrder.filter((id) => {
    const key = cardKey(id);
    if (!selectedIds.has(key) || orderedIds.has(key)) return false;
    orderedIds.add(key);
    return true;
  });
  const cardsById = new Map(
    selected.map(({ card }) => [cardKey(card.id), card])
  );
  const movedCardIds = new Set();
  const movedFromDeckIds = new Set();
  selected.forEach(({ card, sourceDeck }) => {
    if (sourceDeck.id !== currentDeck.id) {
      sourceDeck.cards = sourceDeck.cards.filter(
        (sourceCard) => cardKey(sourceCard.id) !== cardKey(card.id)
      );
      const sourceSession = next.sessions.find(
        (item) => item.sourceDeckId === sourceDeck.id
      );
      if (sourceSession) {
        sourceSession.order = sourceSession.order.filter(
          (id) => cardKey(id) !== cardKey(card.id)
        );
      }
      next.sessions.forEach((previousSession) => {
        if (
          previousSession.lastAction?.destinationDeckId === sourceDeck.id &&
          cardKey(previousSession.lastAction.cardId) === cardKey(card.id)
        ) {
          previousSession.lastAction = null;
        }
      });

      currentDeck.cards.push(card);
      movedCardIds.add(cardKey(card.id));
      movedFromDeckIds.add(sourceDeck.id);
    }
  });

  currentDeck.cards = selected.map(({ card }) => cardsById.get(cardKey(card.id)));
  session.order = [
    ...orderedSelectedIds,
    ...selected
      .map(({ card }) => card.id)
      .filter((id) => !orderedIds.has(cardKey(id))),
  ];
  session.knownDeckId = null;
  session.unknownDeckId = null;
  session.knownCount = 0;
  session.unknownCount = 0;
  session.lastAction = null;
  next.sessions.forEach((previousSession) => {
    if (previousSession.sourceDeckId === currentDeck.id) return;
    if (
      previousSession.lastAction &&
      movedCardIds.has(cardKey(previousSession.lastAction.cardId))
    ) {
      previousSession.lastAction = null;
    }
  });

  if (returnedCards.length > 0) {
    const mainSession = next.sessions.find(
      (item) => item.sourceDeckId === mainDeck.id
    );
    if (mainSession) {
      mainSession.order = mainSession.order.filter(
        (id) => !returnedCards.some((card) => cardKey(card.id) === cardKey(id))
      );
    }
  }
  session.updatedAt = Date.now();
  next.activeDeckId = currentDeck.id;
  appendHistory(next, {
    type: "range-gather",
    sourceDeckIds: [...new Set([...movedFromDeckIds, currentDeck.id])],
    destinationDeckId: currentDeck.id,
    cardIds: selected.map(({ card }) => card.id),
    returnedToMainCardIds: returnedCards.map((card) => card.id),
  });

  return {
    collection: next,
    extractedCount: selected.length,
    matchedCount: selected.length,
  };
};

export const activateVocabDeck = (collection, deckId) => {
  const next = copy(collection);
  const deck = getDeck(next, deckId);
  if (!deck || deck.kind === "main" || deck.cards.length === 0) return next;

  getSession(next, deckId);
  next.activeDeckId = deckId;
  return next;
};

export const reorderVocabDeckSession = (collection, deckId, orderedCards) => {
  const next = copy(collection);
  const session = getSession(next, deckId);
  if (!session) return next;
  session.order = orderedCards.map((card) => card.id);
  session.updatedAt = Date.now();
  return next;
};

export const classifyVocabCard = (collection, deckId, cardId, classification) => {
  if (classification !== "known" && classification !== "unknown") {
    throw new Error(`Unsupported card classification: ${classification}`);
  }

  const next = copy(collection);
  const sourceDeck = getDeck(next, deckId);
  const session = sourceDeck && getSession(next, deckId);
  if (!sourceDeck || !session) return next;

  const sourceIndex = sourceDeck.cards.findIndex(
    (card) => cardKey(card.id) === cardKey(cardId)
  );
  if (sourceIndex < 0) return next;

  const card = sourceDeck.cards[sourceIndex];
  const orderIndex = session.order.findIndex(
    (id) => cardKey(id) === cardKey(cardId)
  );
  const targetKey = `${classification}DeckId`;
  let destinationDeck = session[targetKey]
    ? getDeck(next, session[targetKey])
    : null;

  if (!destinationDeck) {
    const number = uniqueDeckNumber(
      next,
      classification,
      1
    );
    destinationDeck = createNamedDeck(
      next,
      classification,
      `${classification === "known" ? "Known" : "Unknown"} ${number}`,
      [],
      [sourceDeck.id]
    );
    session[targetKey] = destinationDeck.id;
  }

  sourceDeck.cards.splice(sourceIndex, 1);
  destinationDeck.cards.push(card);
  next.sessions.forEach((previousSession) => {
    const previousAction = previousSession.lastAction;
    if (
      previousSession.sourceDeckId !== sourceDeck.id &&
      previousAction?.destinationDeckId === sourceDeck.id &&
      cardKey(previousAction.cardId) === cardKey(card.id)
    ) {
      previousAction.destinationDeckId = destinationDeck.id;
    }
  });
  session.order = session.order.filter((id) => cardKey(id) !== cardKey(cardId));
  session[classification === "known" ? "knownCount" : "unknownCount"] += 1;
  session.lastAction = {
    cardId: card.id,
    classification,
    sourceIndex,
    orderIndex,
    destinationDeckId: destinationDeck.id,
  };
  session.updatedAt = Date.now();

  appendHistory(next, {
    type: "classify",
    sourceDeckId: sourceDeck.id,
    destinationDeckId: destinationDeck.id,
    classification,
    cardIds: [card.id],
  });
  return next;
};

export const undoVocabDeckAction = (collection, deckId) => {
  const next = copy(collection);
  const sourceDeck = getDeck(next, deckId);
  const session = sourceDeck && getSession(next, deckId);
  const action = session?.lastAction;
  const destinationDeck = action && getDeck(next, action.destinationDeckId);
  if (!sourceDeck || !session || !action || !destinationDeck) return next;

  const destinationIndex = destinationDeck.cards.findIndex(
    (card) => cardKey(card.id) === cardKey(action.cardId)
  );
  if (destinationIndex < 0) return next;

  const [card] = destinationDeck.cards.splice(destinationIndex, 1);
  sourceDeck.cards = insertAt(sourceDeck.cards, card, action.sourceIndex);
  session.order = insertAt(session.order, card.id, action.orderIndex);
  session[action.classification === "known" ? "knownCount" : "unknownCount"] -= 1;
  session.lastAction = null;
  session.updatedAt = Date.now();
  next.activeDeckId = sourceDeck.id;

  appendHistory(next, {
    type: "undo-classification",
    sourceDeckId: destinationDeck.id,
    destinationDeckId: sourceDeck.id,
    cardIds: [card.id],
  });
  return next;
};

export const removeVocabDeck = (collection, deckId) => {
  const next = copy(collection);
  const deck = getDeck(next, deckId);
  const mainDeck = getDeck(next, "main-deck");
  if (!deck || !mainDeck || deck.kind === "main") return next;

  const existingIds = new Set(mainDeck.cards.map((card) => cardKey(card.id)));
  const returnedCards = deck.cards.filter((card) => !existingIds.has(cardKey(card.id)));
  const returnedIds = new Set(returnedCards.map((card) => cardKey(card.id)));
  next.sessions.forEach((session) => {
    if (
      session.lastAction?.destinationDeckId === deck.id &&
      returnedIds.has(cardKey(session.lastAction.cardId))
    ) {
      session.lastAction.destinationDeckId = mainDeck.id;
    }
  });
  mainDeck.cards.push(...returnedCards);
  deck.cards = [];

  if (next.activeDeckId === deckId) {
    const currentDeck = next.decks.find(
      (item) => item.kind === "current" && item.cards.length > 0
    );
    next.activeDeckId = currentDeck?.id || null;
  }

  appendHistory(next, {
    type: "remove-return-to-main",
    sourceDeckId: deck.id,
    destinationDeckId: mainDeck.id,
    cardIds: returnedCards.map((card) => card.id),
  });
  return next;
};

export const mergeVocabDecks = (collection, deckIds) => {
  const next = copy(collection);
  const selectedIds = [...new Set(deckIds)];
  const sourceDecks = selectedIds
    .map((id) => getDeck(next, id))
    .filter((deck) => deck && deck.cards.length > 0);
  if (sourceDecks.length < 2) return { collection: next, mergedDeckId: null };

  const uniqueCards = new Map();
  sourceDecks.forEach((deck) => {
    deck.cards.forEach((card) => {
      if (!uniqueCards.has(cardKey(card.id))) {
        uniqueCards.set(cardKey(card.id), card);
      }
    });
  });
  sourceDecks.forEach((deck) => {
    deck.cards = [];
  });

  const hasUnknownSource = sourceDecks.some(
    (deck) => deck.kind === "unknown" || /^unknown(?:\s+\d+)?$/i.test(deck.name)
  );
  const classification = hasUnknownSource ? "unknown" : "known";
  const sourceNumbers = sourceDecks
    .map((deck) => deck.name.match(/\d+/)?.[0])
    .filter(Boolean)
    .map(Number);
  const number = uniqueDeckNumber(
    next,
    classification,
    sourceNumbers.length ? Math.min(...sourceNumbers) : 1
  );
  const mergedDeck = createNamedDeck(
    next,
    classification,
    `${classification === "unknown" ? "Unknown" : "Known"} ${number}`,
    [...uniqueCards.values()],
    sourceDecks.map((deck) => deck.id)
  );
  const mergedIds = new Set([...uniqueCards.keys()]);
  const sourceIds = new Set(sourceDecks.map((deck) => deck.id));
  next.sessions.forEach((session) => {
    if (
      session.lastAction &&
      sourceIds.has(session.lastAction.destinationDeckId) &&
      mergedIds.has(cardKey(session.lastAction.cardId))
    ) {
      session.lastAction.destinationDeckId = mergedDeck.id;
    }
  });
  next.activeDeckId = mergedDeck.id;
  getSession(next, mergedDeck.id);

  appendHistory(next, {
    type: "merge",
    sourceDeckIds: sourceDecks.map((deck) => deck.id),
    destinationDeckId: mergedDeck.id,
    cardIds: [...uniqueCards.values()].map((card) => card.id),
  });
  return { collection: next, mergedDeckId: mergedDeck.id };
};

export const getVocabDeckSessionCards = (collection, deckId) => {
  const deck = getDeck(collection, deckId);
  const session = collection.sessions.find((item) => item.sourceDeckId === deckId);
  if (!deck || !session) return [];

  const cardsById = new Map(deck.cards.map((card) => [cardKey(card.id), card]));
  return session.order
    .map((id) => cardsById.get(cardKey(id)))
    .filter(Boolean);
};
