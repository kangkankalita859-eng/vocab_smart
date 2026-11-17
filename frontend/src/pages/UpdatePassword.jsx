import { useState } from "react";
import { authService } from "../services/authService";

export default function UpdatePassword({ onComplete }) {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setIsSubmitting(true);
    try {
      const { error: updateError } = await authService.updatePassword(password);
      if (updateError) throw updateError;
      onComplete();
    } catch (updateError) {
      setError(updateError.message || "Unable to update your password.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main style={page}>
      <section style={card}>
        <h1 style={{ marginTop: 0 }}>Set a new password</h1>
        <form onSubmit={handleSubmit}>
          <label htmlFor="new-password" style={label}>New password</label>
          <input
            id="new-password"
            type="password"
            autoComplete="new-password"
            required
            minLength={6}
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            style={input}
          />
          <label htmlFor="confirm-new-password" style={label}>Confirm new password</label>
          <input
            id="confirm-new-password"
            type="password"
            autoComplete="new-password"
            required
            minLength={6}
            value={confirmPassword}
            onChange={(event) => setConfirmPassword(event.target.value)}
            style={input}
          />
          <button type="submit" disabled={isSubmitting} style={button}>
            {isSubmitting ? "Updating…" : "Update password"}
          </button>
          {error && <p role="alert" style={errorBox}>{error}</p>}
        </form>
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

const label = { display: "block", margin: "14px 0 8px", fontWeight: 600 };

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

const errorBox = {
  padding: 12,
  borderRadius: 8,
  background: "#ffebee",
  color: "#b71c1c",
};
