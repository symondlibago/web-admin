import React from 'react';
import './App.css'; // Make sure to create this CSS file for styles

const About = () => {
  return (
    <div className="about-container">
      <h1 className="about-header">About</h1>
      <div className="about-content">
        <div className="about-left">
          <h2 className="about-subheader">A&A Events</h2>
          <p>A&A Events is committed to providing the best possible experience for both customers and service providers. I am Dedicated to creating a welcoming inclusive atmosphere that celebrates diversity & promotes cultural exchange. With continuing to set the standard for event organization and curation in the world event community</p>
        </div>
        <div className="about-right">
          <h2 className="about-subheader">EventWise</h2>
          <p>EventWise is committed to providing the best possible experience for both customers and service providers. I am Dedicated to creating a welcoming inclusive atmosphere that celebrates diversity & promotes cultural exchange. With continuing to set the standard for event organization and curation in the world event community</p>
        </div>
      </div>
    </div>
  );
};

export default About;
