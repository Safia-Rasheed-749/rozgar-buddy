// src/components/ChatUI.jsx
import { useState, useEffect } from "react";
import { auth, db } from "../firebaseConfig";
import { doc, getDoc } from "firebase/firestore";

export default function ChatUI() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [userProfile, setUserProfile] = useState(null);

  // Fetch user profile on load
  useEffect(() => {
    const fetchProfile = async () => {
      const user = auth.currentUser;
      if (!user) return;

      const docRef = doc(db, "profiles", user.uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setUserProfile(docSnap.data());
      } else {
        setUserProfile({ grade: "N/A", interests: "N/A" });
      }
    };
    fetchProfile();
  }, []);

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    // Add user message
    const newMessages = [...messages, { sender: "user", text: input }];

    // Generate bot reply based on profile
    let botReply = "Sorry, I don't understand.";
    if (userProfile) {
      if (input.toLowerCase().includes("career")) {
        botReply = `Based on your grade (${userProfile.grade}) and interests (${userProfile.interests}), you could explore careers like ${
          userProfile.interests || "web development, engineering, or design"
        }.`;
      } else {
        botReply = "You said: " + input;
      }
    }

    newMessages.push({ sender: "bot", text: botReply });
    setMessages(newMessages);
    setInput("");
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
        >
          Send
        </button>
      </form>
    </div>
  );
}
