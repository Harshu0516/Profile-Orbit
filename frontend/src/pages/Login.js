import React from 'react';
import './Login.css';

function Login() {
  return (
    <div className="login-container">
      <div className="login-form">
        <h2>Welcome to our platform </h2>
        <p>Login to Profile Orbit</p>
        <form>
          <input type="text" placeholder="Name" required />
          <input type="email" placeholder="Email" required />
          <input type="password" placeholder="Password" required />
          <button type="submit">Login</button>
          <button type="button" className="guest-btn">Continue as Guest</button>
        </form>
      </div>
      <div className="login-image">
        <img src="https://img.freepik.com/free-vector/woman-smiling-greeting-icon_24877-82631.jpg" alt="Welcome" />
      </div>
    </div>
  );
}

export default Login;
