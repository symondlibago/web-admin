import React, { useState } from 'react';
import './App.css'; // Import the CSS file for styling
import { IoMdAdd } from 'react-icons/io'; // Import the + icon for creating a new event
import { useNavigate } from 'react-router-dom'; // Navigation for routing

const Settings = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [contactNumber, setContactNumber] = useState('');

  const handleSubmit = () => {
    alert('Settings updated successfully');
  };

  return (
    <div className="gradient-container-settings">
      <div className="scroll-view-settings">
        <div className="container-settings">
          <h1 className="header-text-settings">Settings</h1>

          <div className="content-settings">
            <p className="settings-text-settings">Edit Email</p>
            <input
              type="email"
              className="text-input-settings"
              placeholder="Enter your Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <p className="settings-text-settings">Edit Username</p>
            <input
              type="text"
              className="text-input-settings"
              placeholder="Enter your Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <p className="settings-text-settings">Change Password</p>
            <input
              type="password"
              className="text-input-settings"
              placeholder="Enter new Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <p className="settings-text-settings">Contact Number</p>
            <input
              type="text"
              className="text-input-settings"
              placeholder="Enter your Contact Number"
              value={contactNumber}
              onChange={(e) => setContactNumber(e.target.value)}
            />

            <div className="button-container-settings">
              <button className="create-event-button-settings" onClick={() => navigate('/create-event-portfolio')}>
                <IoMdAdd size={24} color="white" />
                <span className="create-event-text-settings">Create New Event Portfolio</span>
              </button>
            </div>

            <div className="button-container-settings">
              <button className="submit-button-settings" onClick={handleSubmit}>
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
