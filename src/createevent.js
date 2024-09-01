import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaChevronDown } from 'react-icons/fa';
import axios from 'axios'; // Import axios for making HTTP requests
import './App.css';

const eventTypes = ["Wedding", "Birthday", "Reunion", "Debut"];

const CreateEvent = () => {
    const navigate = useNavigate();
    const [selectedType, setSelectedType] = useState('');
    const [eventName, setEventName] = useState('');
    const [eventDescription, setEventDescription] = useState('');
    const [eventDate, setEventDate] = useState('');
    const [invitationMessage, setInvitationMessage] = useState('');
    const [peopleToInvite, setPeopleToInvite] = useState('');
    const [venue, setVenue] = useState('');
    const [packageType, setPackageType] = useState('');
    const [pax, setPax] = useState('');

    const handleCancel = () => {
        console.log('Cancel button pressed');
        navigate(-1); // Navigate back to the previous page
    };

    const handleNext = async () => {
        console.log('Next button pressed');

        const eventData = {
            type: selectedType,
            name: eventName,
            description: eventDescription,
            date: eventDate,
            pax: parseInt(pax, 10), // Ensure pax is an integer
            invitation_message: invitationMessage,
            people_to_invite: peopleToInvite,
            venue: venue,
            package_type: packageType,
        };

        try {
            // Send a POST request to your backend
            const response = await axios.post('http://localhost:8000/api/events', eventData);

            if (response.status === 201) {
                // Navigate to the next page if the request was successful
                navigate('/choose-service-provider');
            } else {
                console.error('Failed to create event:', response.statusText);
            }
        } catch (error) {
            console.error('An error occurred:', error);
        }
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
                            type="date"
                            className="text-input"
                            placeholder="Choose Event Date"
                            value={eventDate}
                            onChange={(e) => setEventDate(e.target.value)}
                        />
                    </div>
                    <div className="input-container">
                        <input
                            type="text"
                            className="text-input"
                            placeholder="Pax"
                            value={pax}
                            onChange={(e) => setPax(e.target.value)}
                        />
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
                            placeholder="People to Invite"
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
