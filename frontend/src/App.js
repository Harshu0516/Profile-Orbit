import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import Footer from './components/Footer';
import Login from './pages/Login';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar /> {/* ✅ Always shown */}
        <Routes>
          <Route path="/" element={
            <>
              <Hero />
              <Features />
            </>
          } />
          <Route path="/login" element={<Login />} />
        </Routes>
        <Footer /> {/* ✅ Always shown */}
      </div>
    </Router>
  );
}

export default App;
