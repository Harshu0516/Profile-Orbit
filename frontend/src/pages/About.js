import React from 'react';
import './About.css'; // we'll create this next

function About() {
  return (
    <div className="about-container">
      <div className="about-image">
        <img src="/assets/about.jpg" alt="About Us" />
      </div>
      <div className="about-content">
        <h1>About Profile Orbit</h1>
        <p>
          Welcome to <strong>Profile Orbit 🚀</strong> — the ultimate platform to track, analyze, and showcase your coding journey across multiple platforms like LeetCode, GeeksforGeeks, and more.
        </p>
        <p>
          We believe that your hard work and consistency deserve recognition. Our mission is to unify all your coding activity in one beautiful dashboard, helping you improve, stay motivated, and shine in the tech world.
        </p>
        <p>
          Whether you're preparing for interviews, participating in contests, or just love solving problems — Profile Orbit keeps you on track with real-time insights and powerful tools.
        </p>
        <p><strong>Let's code. Let's grow. 🌟</strong></p>
      </div>
    </div>
  );
}

export default About;
