import React from 'react';
import './Hero.css';
import { useNavigate } from 'react-router-dom';

function Hero() {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/login');
  };

  return (
    <section className="hero">
      <div className="hero-content">
        <h1>Your Coding Journey, Unified.</h1>
        <p>Track, analyze, and compare your competitive coding progress across platforms.</p>
        <button className="cta-btn" onClick={handleGetStarted}>Get Started</button>
      </div>
    </section>
  );
}

export default Hero;
