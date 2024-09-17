import React, { useState } from 'react';
import { FaChevronDown } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './App.css';

const eventTypes = ["Wedding", "Birthday", "Reunion", "Debut", "Others"];

const CreateEvent = () => {
    const navigate = useNavigate();
    const [selectedType, setSelectedType] = useState('');
    const [customEventType, setCustomEventType] = useState('');
    const [eventName, setEventName] = useState('');
    const [eventDescription, setEventDescription] = useState('');
    const [eventDate, setEventDate] = useState('');
    const [invitationMessage, setInvitationMessage] = useState('');
    const [peopleToInvite, setPeopleToInvite] = useState('');
    const [venue, setVenue] = useState('');
    const [packageType, setPackageType] = useState('');
    const [pax, setPax] = useState('');
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const handleCancel = () => {
        navigate(-1);
    };

    const handleNext = async () => {
        const eventType = selectedType === 'Others' ? customEventType : selectedType;

        const eventData = {
            type: eventType,
            name: eventName,
            description: eventDescription,
            date: eventDate,
            pax: parseInt(pax, 10),
            invitation_message: invitationMessage,
            people_to_invite: peopleToInvite,
            venue: venue,
            package_type: packageType,
        };

        try {
            const response = await axios.post('http://localhost:8000/api/events', eventData);
            if (response.status === 201) {
                navigate('/choose-service-provider');
            } else {
                console.error('Failed to create event:', response.statusText);
            }
        } catch (error) {
            console.error('An error occurred:', error);
        }
    };

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

    const handleSelectEventType = (type) => {
        setSelectedType(type);
        setDropdownOpen(false);
    };

    return (
        <div className="gradient-container-createevent">
            <div className="container-createevent">
                <div className="content-createevent">
                    <h1 className="header-text-createevent">Create Event</h1>
                    <div className="line-createevent"></div>
                    <h2 className="event-types-text-createevent">Choose Event Type</h2>
                    
                    {/* Custom Dropdown Button */}
                    <div className="dropdown-container-createevent">
                        <div className="dropdown-button-createevent" onClick={toggleDropdown}>
                            {selectedType || "Select Event Type"}
                            <FaChevronDown />
                        </div>

                        {/* Dropdown Menu */}
                        <div className={`dropdown-menu-createevent ${dropdownOpen ? 'show' : ''}`}>
                            {eventTypes.map((type, index) => (
                                <button key={index} onClick={() => handleSelectEventType(type)}>
                                    {type}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Custom Event Type Input Field (Visible if "Others" is selected) */}
                    {selectedType === 'Others' && (
                        <div className="input-container-createevent custom-event-type-container">
                            <input
                                type="text"
                                className="text-input-createevent"
                                placeholder="Enter Custom Event Type"
                                value={customEventType}
                                onChange={(e) => setCustomEventType(e.target.value)}
                            />
                        </div>
                    )}

                    {/* Existing fields for event details */}
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
