import { useState } from "react";
import { authService } from "../services/authService";
import { isSupabaseConfigured } from "../services/supabaseClient";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [mode, setMode] = useState("login");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setMessage("");
    setError("");
    setIsSubmitting(true);

    try {
      if (mode === "reset") {
        const { error: resetError } = await authService.requestPasswordReset(email.trim());
        if (resetError) throw resetError;
        setMessage("If an account exists for that email, a password reset link is on its way.");
      } else if (mode === "signup") {
        if (password !== confirmPassword) {
          throw new Error("Passwords do not match.");
        }
        const { data, error: signUpError } = await authService.signUp(
          email.trim(),
          password
        );
        if (signUpError) throw signUpError;
        setMessage(
          data.session
            ? "Your account has been created."
            : "Account created. If sign-in is not immediate, turn off email confirmation in Supabase Auth settings."
        );
      } else {
        const { error: loginError } = await authService.login(email.trim(), password);
        if (loginError) throw loginError;
      }
    } catch (submitError) {
      setError(submitError.message || "Unable to complete your request.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const setFormMode = (nextMode) => {
    setMode(nextMode);
    setMessage("");
    setError("");
    setPassword("");
    setConfirmPassword("");
  };

  return (
    <main style={page}>
      <section style={card}>
        <h1 style={{ marginTop: 0 }}>Vocab Smart</h1>
        <p>
          {mode === "signup"
            ? "Create an account with your email and a password."
            : mode === "reset"
              ? "Enter your email and we’ll send a password reset link."
              : "Sign in with your email and password."}
        </p>
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
            {mode !== "reset" && (
              <>
                <label htmlFor="login-password" style={label}>Password</label>
                <input
                  id="login-password"
                  type="password"
                  autoComplete={mode === "signup" ? "new-password" : "current-password"}
                  required
                  minLength={6}
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  style={input}
                />
              </>
            )}
            {mode === "signup" && (
              <>
                <label htmlFor="confirm-password" style={label}>Confirm password</label>
                <input
                  id="confirm-password"
                  type="password"
                  autoComplete="new-password"
                  required
                  minLength={6}
                  value={confirmPassword}
                  onChange={(event) => setConfirmPassword(event.target.value)}
                  style={input}
                />
              </>
            )}
            <button type="submit" disabled={isSubmitting} style={button}>
              {isSubmitting
                ? "Please wait…"
                : mode === "signup"
                  ? "Create account"
                  : mode === "reset"
                    ? "Send reset link"
                    : "Sign in"}
            </button>
            {message && <p role="status" style={successBox}>{message}</p>}
            {error && <p role="alert" style={errorBox}>{error}</p>}
          </form>
        )}
        {isSupabaseConfigured && (
          <div style={authActions}>
            {mode === "login" && (
              <>
                <button type="button" style={textButton} onClick={() => setFormMode("reset")}>
                  Forgot password?
                </button>
                <button type="button" style={textButton} onClick={() => setFormMode("signup")}>
                  Create an account
                </button>
              </>
            )}
            {mode !== "login" && (
              <button type="button" style={textButton} onClick={() => setFormMode("login")}>
                Back to sign in
              </button>
            )}
          </div>
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

const authActions = {
  display: "flex",
  justifyContent: "space-between",
  gap: 12,
  flexWrap: "wrap",
  marginTop: 12,
};

const textButton = {
  padding: 0,
  border: 0,
  background: "none",
  color: "#1976d2",
  fontSize: 14,
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
