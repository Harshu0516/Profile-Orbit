import React from 'react';
import './Features.css';

function Features() {
  const features = [
    {
      title: "Track Your Questions 📈",
      description: "Monitor the total number of problems you've solved across all Platforms."
    },
    {
      title: "Daily Practice Analyzer 🔥",
      description: "See how many days you've coded and keep the streak alive with heatmaps."
    },
    {
      title: "Contest Insights 💡",
      description: "Review your rankings, questions solved, and progress over time in contests."
    },
    {
      title: "Leaderboard & Community 🥇",
      description: "Compare your performance with peers and stay motivated."
    },
  ];

  return (
    <section className="features">
      <h2>🌌 Your Orbit Roadmap</h2>
      <div className="roadmap">
        {features.map((feature, index) => (
          <div className="roadmap-step" key={index}>
            <div className="step-circle">{index + 1}</div>
            <div className="step-content">
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Features;
