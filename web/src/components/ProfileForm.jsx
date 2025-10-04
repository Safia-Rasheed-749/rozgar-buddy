// src/components/ProfileForm.jsx

import React from "react";

const ProfileForm = () => {
  return (
    <div className="container">
      <h2>Profile Form</h2>
      <p>Enter your grades and interests here.</p>

      <form>
        <input type="text" placeholder="Your Grade" required />
        <input type="text" placeholder="Your Interests" required />
        <button type="submit">Save Profile</button>
      </form>
    </div>
  );
};

export default ProfileForm;
