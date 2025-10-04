// src/components/AuthForm.jsx
import { useState } from "react";
import { auth } from "../firebaseConfig";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import "../styles.css";

export default function AuthForm({ mode }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      if (mode === "signup") {
        await createUserWithEmailAndPassword(auth, email, password);
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }
      navigate("/dashboard"); // ✅ redirect after success
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="container">
      <h1>Rozgar Buddy</h1>
      <h2>{mode === "signup" ? "Sign Up" : "Login"}</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit">
          {mode === "signup" ? "Sign Up" : "Login"}
        </button>
      </form>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {mode === "login" ? (
        <p>
          Don’t have an account?{" "}
          <button type="button" onClick={() => navigate("/signup")}>
            Sign Up
          </button>
        </p>
      ) : (
        <p>
          Already have an account?{" "}
          <button type="button" onClick={() => navigate("/login")}>
            Login
          </button>
        </p>
      )}
    </div>
  );
}
