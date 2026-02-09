import { useEffect, useState } from "react";
import FlashCard from "../components/FlashCard";
import SessionNav from "../components/SessionNav";
import { fetchVocab } from "../services/vocabService";

export default function Session({
  config,
  onComplete,
  onGoRead,
  onGoHome,
  onUpdateConfig,
}) {
  const [activeDeck, setActiveDeck] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!config) return;

    setLoading(true);
    fetchVocab(config.start, config.limit)
      .then((data) => {
        console.log('Fetched data:', data);
        if (data.status === 'success') {
          setActiveDeck(data.data);
        } else {
          console.error('API Error:', data.message);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error('Fetch error:', error);
        setLoading(false);
      });
  }, [config]);

  if (loading) return <div style={{ textAlign: "center", padding: "50px" }}>Loading…</div>;

  if (activeDeck.length === 0) {
    return <div style={{ textAlign: "center", padding: "50px" }}>No cards available</div>;
  }

  return (
    <div style={{ padding: "20px" }}>
      <h2>Flashcard Session (Debug Mode)</h2>
      <p>Cards loaded: {activeDeck.length}</p>
      
      <div style={{ 
        width: "320px", 
        height: "210px", 
        margin: "20px auto",
        border: "2px solid red",
        background: "yellow"
      }}>
        <FlashCard
          card={activeDeck[0]}
          onKnown={() => console.log('Known clicked')}
          onUnknown={() => console.log('Unknown clicked')}
          showActions={true}
        />
      </div>
    </div>
  );
}







