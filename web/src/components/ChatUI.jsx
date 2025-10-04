// src/components/ChatUI.jsx
import { useState } from "react";

export default function ChatUI() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    // Add user message
    const newMessages = [...messages, { sender: "user", text: input }];

    // Dummy bot reply (later we connect with backend)
    newMessages.push({ sender: "bot", text: "You said: " + input });

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
