import React, { useState } from 'react';
import { MdFaceRetouchingNatural } from 'react-icons/md';
import { Pie } from 'react-chartjs-2';
import './Profile.css';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

function Profile() {
  const [username, setUsername] = useState('');
  const [profileData, setProfileData] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setProfileData(null);
    try {
      const res = await fetch(`http://localhost:5000/api/codechef/${username}`);
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || 'Failed to fetch data');
      }
      const data = await res.json();
      setProfileData(data);
    } catch (error) {
      console.error('Error fetching CodeChef data:', error);
      setError(error.message);
    }
  };

  const pieData = profileData && profileData.problemsSolved ? {
    labels: ['Full Solved', 'Partial Solved', 'Contests Participated'],
    datasets: [
      {
        label: 'Profile Stats',
        data: [
          profileData.problemsSolved.fullSolved || 0,
          profileData.problemsSolved.partialSolved || 0,
          profileData.contestsParticipated || 0,
        ],
        backgroundColor: ['#4caf50', '#ff9800', '#2196f3'],
        borderWidth: 1,
      },
    ],
  } : null;

  return (
    <div className="profile-container">
      <div className="profile-header">
        <MdFaceRetouchingNatural size={48} />
        <h1>Profile Orbit</h1>
      </div>

      <form onSubmit={handleSubmit} className="profile-form">
        <input
          type="text"
          placeholder="Enter CodeChef Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <button type="submit">Fetch Profile</button>
      </form>

      {error && <p className="error">{error}</p>}

      {profileData && (
        <div className="profile-stats">
          <h2>{profileData.name}</h2>
          <p><strong>Rating:</strong> {profileData.rating}</p>
          <p><strong>Global Rank:</strong> {profileData.globalRank}</p>
          <p><strong>Country Rank:</strong> {profileData.countryRank}</p>
          <p><strong>Division:</strong> {profileData.division}</p>
          <p><strong>Stars:</strong> {profileData.stars}</p>
          <p><strong>Problems Solved:</strong> {profileData.problemsSolved.totalSolved}</p>
          <p><strong>Contests Participated:</strong> {profileData.contestsParticipated}</p>

          {pieData && (
            <div className="chart-container">
              <h3>Stats Breakdown</h3>
              <Pie data={pieData} />
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Profile;