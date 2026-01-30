export async function fetchVocab(start, limit) {
  const res = await fetch(
    `http://localhost:8000/api/vocab?start=${start}&limit=${limit}`
  );
  return res.json();
}
