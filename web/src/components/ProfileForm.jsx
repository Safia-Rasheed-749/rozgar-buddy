// src/components/ProfileForm.jsx
import React, { useState } from "react";
import { db, auth } from "../firebaseConfig";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const ProfileForm = () => {
  const [grade, setGrade] = useState("");
  const [interests, setInterests] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const user = auth.currentUser;
      if (!user) throw new Error("User not logged in");

      // Save profile to Firestore
      await setDoc(doc(db, "profiles", user.uid), {
        grade,
        interests,
        createdAt: serverTimestamp(),
      });

      setMessage("Profile saved successfully!");
      console.log("Saved profile:", { grade, interests }); // debug
      // navigate("/dashboard"); // optional
    } catch (err) {
      setMessage(err.message);
      console.error(err);
    }
  };

  return (
    <div className="container">
      <h2>Profile Form</h2>
      <p>Enter your grades and interests here.</p>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Your Grade"
          value={grade}
          onChange={(e) => setGrade(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Your Interests"
          value={interests}
          onChange={(e) => setInterests(e.target.value)}
          required
        />
        <button type="submit">Save Profile</button>
      </form>

      {message && <p style={{ color: "green" }}>{message}</p>}
    </div>
  );
};

export default ProfileForm;
