import React, { useState } from 'react';
import { FaChevronDown, FaTimes, FaMapMarkerAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './App.css';

const eventTypes = ["Wedding", "Birthday", "Reunion", "Debut", "Others"];
const venues = [
    { id: '1', venuename: 'Cove Garden Resort', image: require('./images/venue1.jpg'), address: 'Zone 3 Old Road, Cagayan de Oro, 9000 Misamis Oriental', description: 'Nestled on the shore of the magnificent Macajalar Bay, Cove Garden Resort is the perfect event venue for you, your loved ones, and your colleagues.' },
    { id: '2', venuename: 'Garcia Residencia', image: require('./images/venue2.jpg'), address: ' Captain E Jabulin St Centro, Cagayan de Oro, 9000 Misamis Oriental', description: 'GARCIA RESIDENCIA -A modern American style venue for any occasion situated in Cagayan de Oro City. We cater venue rental for: ➡️ Weddings ➡️ Debut ➡️ Birthdays ➡️' },
    { id: '3', venuename: 'Elarvee', image: require('./images/venue3.jpg'), address: 'CJVV+C66, S Diversion Rd, Cagayan de Oro, 9000 Misamis Oriental', description: 'Party planner sa Lungsod ng Cagayan de Oro' },
    { id: '4', venuename: 'Casa de Canitoan', image: require('./images/venue4.jpg'), address: 'Macapagal Dr, Cagayan de Oro, 9000 Misamis Oriental', description: 'Property Name: Casa de Canitoan ; Street Address: Macapagal Drive ; Apt, suite, floor etc. : Casa de Canitoan ; City : Cagayan de Oro City - Misamis Oriental.' },
    { id: '5', venuename: '4 Kings Event Center Uptown', image: require('./images/venue5.jpg'), address: 'FJ3C+P5F, Pacific St, Cagayan de Oro, 9000 Misamis Oriental', description: 'Fronting Terrazzo Restaurant, behind Prawn House Seafood Restaurant. 4 KINGS EVENT CENTER is the ideal spot to celebrate your occasions!' },
    { id: '6', venuename: 'Cove Garden Resort', image: require('./images/venue1.jpg'), address: 'Zone 3 Old Road, Cagayan de Oro, 9000 Misamis Oriental', description: 'Nestled on the shore of the magnificent Macajalar Bay, Cove Garden Resort is the perfect event venue for you, your loved ones, and your colleagues.' },
    { id: '7', venuename: 'Garcia Residencia', image: require('./images/venue2.jpg'), address: ' Captain E Jabulin St Centro, Cagayan de Oro, 9000 Misamis Oriental', description: 'GARCIA RESIDENCIA -A modern American style venue for any occasion situated in Cagayan de Oro City. We cater venue rental for: ➡️ Weddings ➡️ Debut ➡️ Birthdays ➡️' },
    { id: '8', venuename: 'Elarvee', image: require('./images/venue3.jpg'), address: 'CJVV+C66, S Diversion Rd, Cagayan de Oro, 9000 Misamis Oriental', description: 'Party planner sa Lungsod ng Cagayan de Oro' },
    { id: '9', venuename: 'Casa de Canitoan', image: require('./images/venue4.jpg'), address: 'Macapagal Dr, Cagayan de Oro, 9000 Misamis Oriental', description: 'Property Name: Casa de Canitoan ; Street Address: Macapagal Drive ; Apt, suite, floor etc. : Casa de Canitoan ; City : Cagayan de Oro City - Misamis Oriental.' },
    { id: '10', venuename: '4 Kings Event Center Uptown', image: require('./images/venue5.jpg'), address: 'FJ3C+P5F, Pacific St, Cagayan de Oro, 9000 Misamis Oriental', description: 'Fronting Terrazzo Restaurant, behind Prawn House Seafood Restaurant. 4 KINGS EVENT CENTER is the ideal spot to celebrate your occasions!' },
];

const CreateEvent = () => {
    const navigate = useNavigate();
    const [selectedType, setSelectedType] = useState('');
    const [customEventType, setCustomEventType] = useState('');
    const [eventName, setEventName] = useState('');
    const [eventDate, setEventDate] = useState('');
    const [pax, setPax] = useState('');
    const [venue, setVenue] = useState('');
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [venueOverlayOpen, setVenueOverlayOpen] = useState(false); // For venue selection overlay
    const [venueDetailsOverlay, setVenueDetailsOverlay] = useState(null); // For selected venue details
    const [searchTerm, setSearchTerm] = useState(''); // For venue search

    const handleCancel = () => {
        navigate(-1);
    };

    const handleNext = async () => {
        const eventType = selectedType === 'Others' ? customEventType : selectedType;

        const eventData = {
            type: eventType,
            name: eventName,
            date: eventDate,
            pax: parseInt(pax, 10),
            venue: venue,
        };

        try {
            const response = await axios.post('http://localhost:8000/api/events', eventData);
            if (response.status === 201) {
                navigate('/choose-package');
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

    const openVenueOverlay = () => {
        setVenueOverlayOpen(true);
    };

    const selectVenue = (venue) => {
        setVenueDetailsOverlay(venue);
    };

    const confirmVenueSelection = () => {
        setVenue(venueDetailsOverlay.venuename);
        closedVenueDetailsOverlay();
    };
    const closedVenueDetailsOverlay = () => {
        setVenueDetailsOverlay(null);
        setVenueOverlayOpen(false);
    };
    const closeVenueDetailsOverlay = () => {
        setVenueDetailsOverlay(null);
    };

    const closeVenueOverlay = () => {
        setVenueOverlayOpen(false); // Close the overlay
    };

    // Filter venues based on search term
    const filteredVenues = venues.filter((venue) =>
        venue.venuename.toLowerCase().includes(searchTerm.toLowerCase()) ||
        venue.address.toLowerCase().includes(searchTerm.toLowerCase())
    );

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

                    {/* Event Details Inputs */}
                    <div className="input-container-createevent">
                        <input
                            type="text"
                            className="text-input-createevent"
                            placeholder="Event Name"
                            value={eventName}
                            onChange={(e) => setEventName(e.target.value)}
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
                        <button className="choose-venue-button-createevent" onClick={openVenueOverlay}>
                            Choose Venue
                        </button>
                        <button className="next-button-createevent" onClick={handleNext}>
                            Next
                        </button>
                    </div>
                </div>
            </div>

            {/* Venue Selection Overlay */}
            {venueOverlayOpen && (
                <div className="overlay-createevent">
                    <FaTimes className="close-button1-createevent" onClick={closeVenueOverlay} />
                    <div className="venue-selection-container-createevent">
                        <div className="searchbox-container-createevent">
                            <input
                                type="text"
                                className="search-box-createevent"
                                placeholder="Search your Venue here!"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>

                        <div className="venue-selection-container-createevent">
                            {/* Filtered Venue List */}
                            {filteredVenues.map((venue) => (
                                <div key={venue.id} className="venue-item-createevent">
                                    <div className="venue-box-createevent">
                                        <img src={venue.image} alt={venue.venuename} className="venue-image-createevent" />
                                        <h3 className="venue-name-createevent">{venue.venuename}</h3>
                                        <p className="venue-address-createevent">
                                            <FaMapMarkerAlt /> {venue.address}
                                        </p>
                                        <button className="venue-choose-button-createevent" onClick={() => selectVenue(venue)}>
                                            Choose
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {/* Venue Details Overlay */}
            {venueDetailsOverlay && (
                <div className="overlay-createevent">
                    <div className="venue-details-container-createevent">
                        <FaTimes className="close-button-createevent" onClick={closeVenueDetailsOverlay} />
                        <img src={venueDetailsOverlay.image} alt={venueDetailsOverlay.venuename} className="venue-details-image-createevent" />
                        <h2 className="venue-name-createevent">{venueDetailsOverlay.venuename}</h2>
                        <p className="venue-address-createevent">{venueDetailsOverlay.address}</p>
                        <p className="venue-description-createevent">{venueDetailsOverlay.description}</p>
                        <button className="venue-select-button-createevent" onClick={confirmVenueSelection}>
                            Select Venue
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CreateEvent;
