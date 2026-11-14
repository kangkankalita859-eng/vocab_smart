import { useState } from "react";
import { authService } from "../services/authService";
import { isSupabaseConfigured } from "../services/supabaseClient";

export default function Login() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [isSending, setIsSending] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setMessage("");
    setError("");
    setIsSending(true);

    try {
      const { error: loginError } = await authService.login(email.trim());
      if (loginError) throw loginError;
      setMessage("Check your email for a secure sign-in link. Open it on this device to continue.");
    } catch (loginError) {
      setError(loginError.message || "Unable to send a sign-in link.");
    } finally {
      setIsSending(false);
    }
  };

  return (
    <main style={page}>
      <section style={card}>
        <h1 style={{ marginTop: 0 }}>Vocab Smart</h1>
        <p>Sign in with the same email on each device to sync your vocabulary flashcards.</p>
        {!isSupabaseConfigured ? (
          <div role="alert" style={errorBox}>
            Cloud sign-in is not configured. Add <code>VITE_SUPABASE_URL</code> and{" "}
            <code>VITE_SUPABASE_ANON_KEY</code> to the frontend environment, then restart the app.
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <label htmlFor="login-email" style={label}>Email address</label>
            <input
              id="login-email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              style={input}
            />
            <button type="submit" disabled={isSending} style={button}>
              {isSending ? "Sending…" : "Email me a sign-in link"}
            </button>
            {message && <p role="status" style={successBox}>{message}</p>}
            {error && <p role="alert" style={errorBox}>{error}</p>}
          </form>
        )}
      </section>
    </main>
  );
}

const page = {
  minHeight: "100vh",
  display: "grid",
  placeItems: "center",
  padding: 20,
  boxSizing: "border-box",
  background: "#f3f6fa",
  color: "#172033",
};

const card = {
  width: "min(100%, 420px)",
  padding: 28,
  boxSizing: "border-box",
  borderRadius: 14,
  background: "#fff",
  boxShadow: "0 8px 30px rgba(23, 32, 51, 0.1)",
};

const label = { display: "block", marginBottom: 8, fontWeight: 600 };

const input = {
  width: "100%",
  boxSizing: "border-box",
  padding: "12px 14px",
  border: "1px solid #cbd5e1",
  borderRadius: 8,
  fontSize: 16,
};

const button = {
  width: "100%",
  marginTop: 14,
  padding: "12px 16px",
  border: 0,
  borderRadius: 8,
  background: "#1976d2",
  color: "#fff",
  fontSize: 15,
  fontWeight: 600,
  cursor: "pointer",
};

const successBox = {
  padding: 12,
  borderRadius: 8,
  background: "#e8f5e9",
  color: "#1b5e20",
};

const errorBox = {
  padding: 12,
  borderRadius: 8,
  background: "#ffebee",
  color: "#b71c1c",
};
