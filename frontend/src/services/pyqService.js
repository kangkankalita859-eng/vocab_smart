const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

export async function fetchPYQ(subject = null, topic = null, start = 0, limit = null) {
  const url = new URL(`${API_BASE_URL}/api/pyq`);
  if (subject) url.searchParams.append('subject', subject);
  if (topic) url.searchParams.append('topic', topic);
  if (start > 0) url.searchParams.append('start', start);
  if (limit !== null) url.searchParams.append('limit', limit);
  
  const res = await fetch(url.toString());
  
  if (!res.ok) {
    throw new Error(`HTTP error! status: ${res.status}`);
  }
  
  return res.json();
}

export async function fetchPYQById(questionId) {
  const res = await fetch(`${API_BASE_URL}/api/pyq/${questionId}`);
  
  if (!res.ok) {
    throw new Error(`HTTP error! status: ${res.status}`);
  }
  
  return res.json();
}
