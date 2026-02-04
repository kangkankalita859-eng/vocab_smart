const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

export async function fetchVocab(start = 0, limit = null) {
  const url = new URL(`${API_BASE_URL}/api/vocab`);
  if (start > 0) url.searchParams.append('start', start);
  if (limit !== null) url.searchParams.append('limit', limit);
  
  const res = await fetch(url.toString());
  
  if (!res.ok) {
    throw new Error(`HTTP error! status: ${res.status}`);
  }
  
  return res.json();
}

export async function fetchVocabById(wordId) {
  const res = await fetch(`${API_BASE_URL}/api/vocab/${wordId}`);
  
  if (!res.ok) {
    throw new Error(`HTTP error! status: ${res.status}`);
  }
  
  return res.json();
}
