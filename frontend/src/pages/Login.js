import React, { useState } from 'react';
import './Login.css';
import { useNavigate } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    setFormData({ 
      ...formData, 
      [e.target.name]: e.target.value 
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Login Data:', formData);

    // In real app: Verify with backend
    // After successful login:
    localStorage.setItem('userProfile', JSON.stringify({
      name: formData.name,
      email: formData.email,
    }));

    navigate('/profile');  // redirect to Profile Page
  };

  const handleGuestLogin = () => {
    localStorage.setItem('userProfile', JSON.stringify({
      name: 'Guest User',
      email: 'guest@profileorbit.com',
    }));

    navigate('/profile');
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <h2>Welcome to our platform</h2>
        <p>Login to Profile Orbit</p>
        <form onSubmit={handleSubmit}>
          <input 
            type="text" 
            name="name"
            placeholder="Name" 
            value={formData.name}
            onChange={handleChange}
            required 
          />
          <input 
            type="email" 
            name="email"
            placeholder="Email" 
            value={formData.email}
            onChange={handleChange}
            required 
          />
          <input 
            type="password" 
            name="password"
            placeholder="Password" 
            value={formData.password}
            onChange={handleChange}
            required 
          />
          <button type="submit">Login</button>
          <button type="button" className="guest-btn" onClick={handleGuestLogin}>
            Continue as Guest
          </button>
        </form>
      </div>
      <div className="login-image">
        <img 
          src="https://img.freepik.com/free-vector/woman-smiling-greeting-icon_24877-82631.jpg" 
          alt="Welcome" 
        />
      </div>
    </div>
  );
}

export default Login;
