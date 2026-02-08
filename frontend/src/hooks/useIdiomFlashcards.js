import { useEffect, useState } from "react";
import { fetchIdioms } from "../services/idiomsService";
import shuffle from "../utils/shuffle";

export default function useIdiomFlashcards({ start, limit }) {
  const [activeDeck, setActiveDeck] = useState([]);
  const [unknownPool, setUnknownPool] = useState([]);
  const [knownPool, setKnownPool] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchIdioms(start, limit).then((data) => {
      setActiveDeck(shuffle(data));
      setUnknownPool([]);
      setKnownPool([]);
      setLoading(false);
    });
  }, [start, limit]);

  const markKnown = () => {
    const card = activeDeck[0];
    setKnownPool((k) => [...k, card]);
    setActiveDeck((d) => d.slice(1));
  };

  const markUnknown = () => {
    const card = activeDeck[0];
    setUnknownPool((u) => [...u, card]);
    setActiveDeck((d) => d.slice(1));
  };

  const reviseUnknown = () => {
    setActiveDeck(shuffle(unknownPool));
    setUnknownPool([]);
  };

  return {
    activeDeck,
    unknownPool,
    knownPool,
    loading,
    markKnown,
    markUnknown,
    reviseUnknown,
  };
}
