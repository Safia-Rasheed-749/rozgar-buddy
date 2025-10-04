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
    <div>
      <h3>Chat with Rozgar Buddy</h3>
      <div style={{ border: "1px solid gray", height: "200px", overflowY: "scroll", padding: "5px" }}>
        {messages.map((msg, index) => (
          <p key={index}><b>{msg.sender}:</b> {msg.text}</p>
        ))}
      </div>
      <form onSubmit={handleSend}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
          required
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
}
