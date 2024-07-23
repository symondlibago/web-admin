import React from 'react';
import { useNavigate } from 'react-router-dom';
import './App.css';

function Login() {
  const navigate = useNavigate();

  const handleLogin = () => {
    // Navigate to the dashboard page
    navigate('/dashboard');
  };

  return (
    <div className="login-container">
      <div className="blobs">
        <div className="blob"></div>
        <div className="blob"></div>
        <div className="blob"></div>
        <div className="blob"></div>
        <div className="blob"></div>
      </div>
      <div className="login-content">
        <h1 className="login-title">Login</h1>
        <p className="login-subtitle">Please enter Email</p>
        <input type="email" className="login-input" />
        <p className="login-subtitle">Please enter Password</p>
        <input type="password" className="login-input" />
        <div className="forgot-password">
          <span>Forgot Password?</span>
          <span className="recover-link">Recover</span>
        </div>
        <button className="login-button" onClick={handleLogin}>Login</button>
        <p className="register-link">Not a member? <span>Register now</span></p>
      </div>
    </div>
  );
}

export default Login;
