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
        <div className="gradient-container-createevent">
            <div className="container-createevent">
                <div className="content-createevent">
                    <h1 className="header-text-createevent">Create Event</h1>
                    <div className="line-createevent"></div>
                    <h2 className="event-types-text-createevent">Choose Event Type</h2>
                    <div className="event-types-container-createevent">
                        {eventTypes.map((type, index) => (
                            <button
                                key={index}
                                className={`event-type-button-createevent ${selectedType === type ? 'selected-createevent' : ''}`}
                                onClick={() => setSelectedType(type)}
                            >
                                {type}
                            </button>
                        ))}
                    </div>
                    <div className="input-container-createevent">
                        <input
                            type="text"
                            className="text-input-createevent"
                            placeholder="Event Name"
                            value={eventName}
                            onChange={(e) => setEventName(e.target.value)}
                        />
                    </div>
                    <div className="input-container-createevent">
                        <input
                            type="text"
                            className="text-input-createevent"
                            placeholder="Description"
                            value={eventDescription}
                            onChange={(e) => setEventDescription(e.target.value)}
                        />
                    </div>
                    <div className="input-container-createevent date-input-createevent">
                        <input
                            type="date"
                            className="text-input-createevent"
                            placeholder="Choose Event Date"
                            value={eventDate}
                            onChange={(e) => setEventDate(e.target.value)}
                        />
                    </div>
                    <div className="input-container-createevent">
                        <input
                            type="text"
                            className="text-input-createevent"
                            placeholder="Pax"
                            value={pax}
                            onChange={(e) => setPax(e.target.value)}
                        />
                    </div>
                    <div className="input-container-createevent">
                        <input
                            type="text"
                            className="text-input-createevent"
                            placeholder="Invitation Message"
                            value={invitationMessage}
                            onChange={(e) => setInvitationMessage(e.target.value)}
                        />
                    </div>
                    <div className="input-container-createevent">
                        <input
                            type="text"
                            className="text-input-createevent"
                            placeholder="People to Invite"
                            value={peopleToInvite}
                            onChange={(e) => setPeopleToInvite(e.target.value)}
                        />
                    </div>
                    <div className="input-container-createevent venue-input-createevent">
                        <input
                            type="text"
                            className="text-input-createevent"
                            placeholder="Choose Package"
                            value={packageType}
                            onChange={(e) => setPackageType(e.target.value)}
                        />
                        <FaChevronDown size={24} color="#B0B0B0" className="icon-right-createevent" />
                    </div>
                    <div className="input-container-createevent venue-input-createevent">
                        <input
                            type="text"
                            className="text-input-createevent"
                            placeholder="Choose Venue"
                            value={venue}
                            onChange={(e) => setVenue(e.target.value)}
                        />
                        <FaChevronDown size={24} color="#B0B0B0" className="icon-right-createevent" />
                    </div>
                    <div className="button-container-createevent">
                        <button className="cancel-button-createevent" onClick={handleCancel}>
                            Cancel
                        </button>
                        <button className="next-button-createevent" onClick={handleNext}>
                            Next
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreateEvent;
