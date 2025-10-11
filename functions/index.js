// functions/index.js
import express from "express";
import fetch from "node-fetch";
import functions from "firebase-functions";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(express.json());

// Get Gemini key from Firebase config (NOT local .env)
const GEMINI_API_KEY = functions.config().gemini?.key || process.env.GEMINI_API_KEY;

app.post("/chat", async (req, res) => {
  try {
    const { message } = req.body;
    if (!message) return res.status(400).json({ error: "Message is required" });

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: message }] }],
        }),
      }
    );

    const data = await response.json();
    const reply = data?.candidates?.[0]?.content?.parts?.[0]?.text || "No response from Gemini";

    res.json({ reply });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// ✅ Firebase Function export (v2 compatible)
export const careerChatAPI = functions.https.onRequest(app);
