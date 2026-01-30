import { useState } from "react";

export default function Upload({ onBack }) {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setLoading(true);
    setError("");
    setResult(null);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("http://127.0.0.1:8000/api/upload-image", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        throw new Error("Upload failed");
      }

      const data = await res.json();
      setResult(data);
    } catch (err) {
      setError("Failed to upload image");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "40px", maxWidth: "700px", margin: "0 auto" }}>
      <button onClick={onBack}>⬅ Back</button>

      <h2>Upload Vocabulary Image</h2>
      <p>Upload a clear image containing vocabulary words.</p>

      <input type="file" accept="image/*" onChange={handleUpload} />

      {loading && <p>⏳ Processing image…</p>}

      {error && <p style={{ color: "red" }}>{error}</p>}

      {result && (
        <div style={{ marginTop: "20px" }}>
          <h3>✅ {result.added} words extracted</h3>

          <ul>
            {result.words.map((w, i) => (
              <li key={i}>
                <strong>{w.word}</strong> — {w.hindiMeaning} — {w.meaning}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

