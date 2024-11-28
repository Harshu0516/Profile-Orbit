import React, { useState } from "react";
import axios from "axios";
import ProfileAnalysis from "./ProfileAnalysis";
import "./App.css";

const App = () => {
  const [platform, setPlatform] = useState("gfg");
  const [userId, setUserId] = useState("");
  const [profileData, setProfileData] = useState(null);
  const [error, setError] = useState("");

  const fetchProfile = async () => {
    try {
      setError("");
      setProfileData(null);

      const response = await axios.get(
        `http://localhost:5000/api/profiles/${platform}/${userId}`
      );
      setProfileData(response.data);
    } catch (err) {
      setError("Failed to fetch data. Please check the platform and user ID.");
    }
  };

  return (
    <div className="App">
      <h1>Profile Orbit</h1>
      <div>
        <select
          value={platform}
          onChange={(e) => setPlatform(e.target.value)}
        >
          <option value="gfg">GeeksforGeeks</option>
          <option value="leetcode">LeetCode</option>
        </select>
        <input
          type="text"
          placeholder="Enter user ID"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
        />
        <button onClick={fetchProfile}>Fetch Profile</button>
      </div>
      {error && <p className="error">{error}</p>}
      {profileData && <ProfileAnalysis data={profileData} />}
    </div>
  );
};

export default App;
