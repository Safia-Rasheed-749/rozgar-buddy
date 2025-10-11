// src/components/ChatUI.jsx
import { useState, useEffect } from "react";
import { auth, db } from "../firebaseConfig";
import { doc, getDoc } from "firebase/firestore";

export default function ChatUI() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(false);

  const API_URL = "https://careerchatapi-hfure6sseq-uc.a.run.app";
 // 🔗 Replace with your actual URL if different

  // Fetch user profile
  useEffect(() => {
    const fetchProfile = async () => {
      const user = auth.currentUser;
      if (!user) return;

      const docRef = doc(db, "profiles", user.uid);
      const docSnap = await getDoc(docRef);
      setUserProfile(docSnap.exists() ? docSnap.data() : null);
    };
    fetchProfile();
  }, []);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const newMessages = [...messages, { sender: "user", text: input }];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input }),
      });

      const data = await response.json();

      if (data.reply) {
        setMessages([...newMessages, { sender: "bot", text: data.reply }]);
      } else {
        setMessages([
          ...newMessages,
          { sender: "bot", text: "⚠️ No response from server." },
        ]);
      }
    } catch (error) {
      console.error("Error:", error);
      setMessages([
        ...newMessages,
        { sender: "bot", text: "⚠️ Server error. Try again later." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h3>Chat with Rozgar Buddy</h3>
      <div
        style={{
          border: "1px solid gray",
          borderRadius: "8px",
          height: "250px",
          overflowY: "scroll",
          padding: "10px",
          marginBottom: "10px",
          backgroundColor: "#f9f9f9",
        }}
      >
        {messages.map((msg, index) => (
          <p
            key={index}
            style={{
              textAlign: msg.sender === "user" ? "right" : "left",
              color: msg.sender === "user" ? "blue" : "green",
              background: msg.sender === "user" ? "#e0f7fa" : "#f1f8e9",
              display: "inline-block",
              padding: "8px 12px",
              borderRadius: "12px",
              margin: "5px 0",
            }}
          >
            <b>{msg.sender === "user" ? "You" : "Buddy"}:</b> {msg.text}
          </p>
        ))}
        {loading && <p>🤔 Buddy is thinking...</p>}
      </div>

      <form onSubmit={handleSend}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
          required
          style={{
            width: "70%",
            padding: "8px",
            borderRadius: "8px",
            border: "1px solid #ccc",
            marginRight: "5px",
          }}
        />
        <button
          type="submit"
          style={{
            backgroundColor: "#4facfe",
            color: "white",
            border: "none",
            padding: "8px 12px",
            borderRadius: "8px",
            cursor: "pointer",
          }}
          disabled={loading}
        >
          {loading ? "Sending..." : "Send"}
        </button>
      </form>
    </div>
  );
}
