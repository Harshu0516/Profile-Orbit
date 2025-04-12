import React from 'react';
import './Features.css';

function Features() {
  const features = [
    "Unified Progress Tracker",
    "Contest Performance Insights",
    "Daily Coding Streak Heatmaps",
    "Leaderboard & Peer Comparison",
    "CSV Upload & Data Backup"
  ];

  return (
    <section className="features">
      <h2>Why Profile Orbit?</h2>
      <div className="feature-cards">
        {features.map((item, index) => (
          <div className="card" key={index}>
            <h3>{item}</h3>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Features;
