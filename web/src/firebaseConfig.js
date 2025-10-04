// src/firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDDGLxm9lzIDw1_BzjV04vTL6rndOy1C5U",
  authDomain: "rozgar-buddy.firebaseapp.com",
  projectId: "rozgar-buddy",
  storageBucket: "rozgar-buddy.firebasestorage.app",
  messagingSenderId: "979378917429",
  appId: "1:979378917429:web:ab082c39eaad1d81e2617c",
  measurementId: "G-HQPSJQPN8M"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
