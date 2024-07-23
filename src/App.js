import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './login';
import Dashboard from './dashboard';
import Navbar from './navbar'; // Import the Navbar component
import Notification from './notification';
import Events from './event';
import CreateEvent from './createevent';
import ChooseServiceProv from './serviceprovider';

function App() {
  return (
    <Router>
      <div className="App">
     
        <Routes>
          <Route exact path="/" element={<Login />} />
          <Route path="/dashboard" element={<><Navbar /><Dashboard /></>} />
          <Route path="/notifications" element={<><Navbar /><Notification/></>} />
          <Route path="/events" element={<><Navbar /><Events/></>} />
          <Route path="/create-event" element={<><Navbar /><CreateEvent/></>} />
          <Route path="/choose-service-provider" element={<><Navbar /><ChooseServiceProv/></>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
