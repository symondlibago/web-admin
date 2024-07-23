import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaCalendarAlt, FaChevronDown,  } from 'react-icons/fa'; // FontAwesome icons
import './App.css'; // Create this CSS file for styling

const CreateEvent = () => {
  const navigate = useNavigate();
  const [selectedType, setSelectedType] = useState(null);
  const [eventName, setEventName] = useState('');
  const [eventDescription, setEventDescription] = useState(''); // Added state for description
  const [eventDate, setEventDate] = useState('');
  const [invitationMessage, setInvitationMessage] = useState(''); // Added state for invitation message
  const [peopleToInvite, setPeopleToInvite] = useState(''); // Added state for people to invite
  const [venue, setVenue] = useState('');
  const [packageType, setPackageType] = useState(''); // Added state for package

  const eventTypes = ["Wedding", "Birthday", "Reunion", "Debut"];

  const handleCancel = () => {
    console.log('Cancel button pressed');
    navigate(-1); // Go back to the previous page
  };

  const handleNext = () => {
    console.log('Next button pressed');
    navigate('/choose-service-provider'); // Navigate to ChooseServiceProv screen
  };

  const handleIconClick = (page) => {
    navigate(page);
  };

  return (
    <div className="gradient-container">
      <div className="container">
        
        <div className="content">
          <h1 className="header-text">Create Event</h1>
          <div className="line"></div>
          <h2 className="event-types-text">Choose Event Type</h2>
          <div className="event-types-container">
            {eventTypes.map((type, index) => (
              <button
                key={index}
                className={`event-type-button ${selectedType === type ? 'selected' : ''}`}
                onClick={() => setSelectedType(type)}
              >
                {type}
              </button>
            ))}
          </div>
          <div className="input-container">
            <input
              type="text"
              className="text-input"
              placeholder="Event Name"
              value={eventName}
              onChange={(e) => setEventName(e.target.value)}
            />
          </div>
          <div className="input-container">
            <input
              type="text"
              className="text-input"
              placeholder="Description"
              value={eventDescription}
              onChange={(e) => setEventDescription(e.target.value)}
            />
          </div>
          <div className="input-container date-input">
            <input
              type="text"
              className="text-input"
              placeholder="Choose Event Date"
              value={eventDate}
              onChange={(e) => setEventDate(e.target.value)}
            />
            <FaCalendarAlt size={24} color="#B0B0B0" className="icon-right" />
          </div>
          <div className="input-container">
            <input
              type="text"
              className="text-input"
              placeholder="Invitation Message"
              value={invitationMessage}
              onChange={(e) => setInvitationMessage(e.target.value)}
            />
          </div>
          <div className="input-container">
            <input
              type="text"
              className="text-input"
              placeholder="People to invite"
              value={peopleToInvite}
              onChange={(e) => setPeopleToInvite(e.target.value)}
            />
          </div>
          <div className="input-container venue-input">
            <input
              type="text"
              className="text-input"
              placeholder="Choose Package"
              value={packageType}
              onChange={(e) => setPackageType(e.target.value)}
            />
            <FaChevronDown size={24} color="#B0B0B0" className="icon-right" />
          </div>
          <div className="input-container venue-input">
            <input
              type="text"
              className="text-input"
              placeholder="Choose Venue"
              value={venue}
              onChange={(e) => setVenue(e.target.value)}
            />
            <FaChevronDown size={24} color="#B0B0B0" className="icon-right" />
          </div>
          <div className="button-container">
            <button className="cancel-button" onClick={handleCancel}>
              Cancel
            </button>
            <button className="next-button" onClick={handleNext}>
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateEvent;
