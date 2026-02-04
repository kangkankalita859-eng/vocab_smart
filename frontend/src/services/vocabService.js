const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';
console.log('API_BASE_URL loaded:', API_BASE_URL);

export async function fetchVocab(start = 0, limit = null) {
  const url = new URL(`${API_BASE_URL}/api/vocab`);
  if (start > 0) url.searchParams.append('start', start);
  if (limit !== null) url.searchParams.append('limit', limit);
  
  console.log('fetchVocab calling URL:', url.toString());
  
  const res = await fetch(url.toString());
  
  console.log('fetchVocab response status:', res.status);
  
  if (!res.ok) {
    throw new Error(`HTTP error! status: ${res.status}`);
  }
  
  const data = await res.json();
  console.log('fetchVocab received data:', data);
  return data;
}

export async function fetchVocabById(wordId) {
  const res = await fetch(`${API_BASE_URL}/api/vocab/${wordId}`);
  
  if (!res.ok) {
    throw new Error(`HTTP error! status: ${res.status}`);
  }
  
  return res.json();
}
