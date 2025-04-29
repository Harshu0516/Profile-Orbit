import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MdFaceRetouchingNatural } from 'react-icons/md';
import { getCodeChefContestList } from '../api/codechefApi'; // Adjust path if needed
import { Bar } from 'react-chartjs-2';
import './Profile.css';

// Chart.js setup
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend
} from 'chart.js';
ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

function Profile() {
    const [username, setUsername] = useState('');
    const [profileData, setProfileData] = useState(null);
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const res = await fetch(`http://localhost:5000/api/codechef/${username}`);
        const data = await res.json();
        setProfileData(data);
      } catch (error) {
        console.error('Error fetching CodeChef data:', error);
      }
    };
  
    return (
      <div className="profile-container">
        <h1>Profile Orbit</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Enter CodeChef Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <button type="submit">Fetch Profile</button>
        </form>
  
        {profileData && (
          <div className="profile-stats">
            <h2>{profileData.name}</h2>
            <p>Rating: {profileData.rating}</p>
            <p>Global Rank: {profileData.globalRank}</p>
            <p>Country Rank: {profileData.countryRank}</p>
            {/* You can add charts here later */}
          </div>
        )}
      </div>
    );
  }
  
  export default Profile;