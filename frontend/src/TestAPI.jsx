import { useEffect, useState } from "react";
import { fetchVocab } from "./services/vocabService";

export default function TestAPI() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log('TestAPI component mounted');
    console.log('Environment VITE_API_URL:', import.meta.env.VITE_API_URL);
    
    fetchVocab(0, 5)
      .then((result) => {
        console.log('TestAPI received result:', result);
        setData(result);
        setLoading(false);
      })
      .catch((error) => {
        console.error('TestAPI error:', error);
        setError(error.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  
  return (
    <div>
      <h2>API Test Results</h2>
      <p>Status: {data?.status}</p>
      <p>Count: {data?.data?.length}</p>
      <pre style={{fontSize: '12px', maxHeight: '400px', overflow: 'auto'}}>
        {JSON.stringify(data, null, 2)}
      </pre>
    </div>
  );
}
