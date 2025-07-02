// src/components/before/SignIn.js
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./SignIn.css";

const SignIn = ({ setUserEmail }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // 🔍 Fetch registered users from localStorage
    const users = JSON.parse(localStorage.getItem("users")) || [];

    // ✅ Check if the user exists and password matches
    const matchedUser = users.find(
      (user) => user.email === email && user.password === password
    );

    if (!matchedUser) {
      alert("❌ Invalid email or password");
      return;
    }

    // 💾 Save current user for profile page
    localStorage.setItem("currentUser", JSON.stringify(matchedUser));

    // ✅ Also update App state if needed
    if (setUserEmail) {
      setUserEmail(matchedUser.email);
    }

    navigate("/after/home"); // Redirect to 'after' version
  };

  return (
    <div className="signin-container">
      <form className="signin-form" onSubmit={handleSubmit}>
        <h2>Sign In</h2>

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

        <button type="submit">Sign In</button>

        {/* 🔗 Forgot password link */}
        <Link to="/forgot-password" className="forgot-link">
          Forgot Password?
        </Link>
      </form>
    </div>
  );
};

export default SignIn;
