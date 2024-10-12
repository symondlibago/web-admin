import React, { useState } from 'react';
import { Modal } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faHeartBroken, faPlusCircle, faCashRegister, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FaChevronDown, FaTimes, FaMapMarkerAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { FaArrowRight} from 'react-icons/fa';
import './App.css';


import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

// CREATE EVENT
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


// CHOOSE PACKAGE
const packagesData = [
    { id: '1', packagename: 'Package A', image: require('./images/package1.png'), price: '100,000', description: 'Perfect for intimate gatherings, this package offers a cozy setting with essential amenities for up to 100 guests.' },
    { id: '2', packagename: 'Package B', image: require('./images/package2.png'), price: '150,000', description: 'Ideal for mid-sized events, Package B includes additional features such as catering and audiovisual support for up to 100 guests.' },
    { id: '3', packagename: 'Package C', image: require('./images/package3.png'), price: '200,000', description: 'Designed for larger events, this package accommodates up to 150 guests and provides a comprehensive solution with premium decorations.' },
    { id: '4', packagename: 'Package D', image: require('./images/package4.png'), price: '250,000', description: 'The ultimate choice for grand celebrations, Package D caters to events of up to 250 guests with bespoke services and expert planning.' },
  ];



//   SERVICE PROVIDER

const allEventsData = [
    { id: '1', title: 'Diwata Pares', image: 'event1.png', provider: 'Boss Kenshin', price: '$500', type: 'Photography' },
    { id: '2', title: 'Diwata Pares', image: 'event2.png', provider: 'Boss Kenshin', price: '$2000', type: 'Photography' },
    { id: '3', title: 'Diwata Pares', image: 'event3.png', provider: 'Boss Kenshin', price: '$1000', type: 'Photography' },
    { id: '4', title: 'Diwata Pares', image: 'event1.png', provider: 'Boss Kenshin', price: '$800', type: 'Food Catering' },
    { id: '5', title: 'Diwata Pares', image: 'event2.png', provider: 'Boss Kenshin', price: '$1200', type: 'Photography' },
    { id: '6', title: 'Diwata Pares', image: 'event3.png', provider: 'Boss Kenshin', price: '$1500', type: 'Food Catering' },
    { id: '7', title: 'Diwata Pares', image: 'event1.png', provider: 'Boss Kenshin', price: '$600', type: 'Video Editing' },
    { id: '8', title: 'Diwata Pares', image: 'event2.png', provider: 'Boss Kenshin', price: '$400', type: 'Food Catering' },
  ];
  
  const eventServices = ["Food Catering", "Photography", "Video Editing", "Florists"];
  


const CreateEvent = () => {
    const navigate = useNavigate();
    const [selectedType, setSelectedType] = useState('');
    const [customEventType, setCustomEventType] = useState('');
    const [eventName, setEventName] = useState('');
    const [eventDate, setEventDate] = useState('');
    const [pax, setPax] = useState('');
    const [venue, setVenue] = useState('');
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [venueOverlayOpen, setVenueOverlayOpen] = useState(false);
    const [venueDetailsOverlay, setVenueDetailsOverlay] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

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
        localStorage.setItem('eventData', JSON.stringify(eventData));

        try {
            const response = await axios.post('http://localhost:8000/api/events', eventData);
            if (response.status === 201) {
                navigate('/choose-package', { state: { eventData } }); // Navigate to the blank page
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
        setVenueOverlayOpen(false);
    };

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
                    <div className="dropdown-container-createevent">
                        <div className="dropdown-button-createevent" onClick={toggleDropdown}>
                            {selectedType || "Select Event Type"}
                            <FaChevronDown />
                        </div>
                        <div className={`dropdown-menu-createevent ${dropdownOpen ? 'show' : ''}`}>
                            {eventTypes.map((type, index) => (
                                <button key={index} onClick={() => handleSelectEventType(type)}>
                                    {type}
                                </button>
                            ))}
                        </div>
                    </div>
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

// Blank Page Component
const ChoosePackage = () => {
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [isOverlayOpen, setIsOverlayOpen] = useState(false);
  const navigate = useNavigate();

  const openOverlay = (pkg) => {
    setSelectedPackage(pkg);
    setIsOverlayOpen(true);
    localStorage.setItem('selectedPackage', JSON.stringify(pkg)); 
  };
  
  const closeOverlay = () => {
    setIsOverlayOpen(false);
    setSelectedPackage(null);
  };

  return (
    <div className="container-choosepackage">
      <h1 className="header-choosepackage">Choose Package</h1>

      <button className="customize-btn-choosepackage" onClick={() => navigate('/choose-service-provider')}>
        Click here if you want to customize <FaArrowRight />
      </button>

      <div className="packages-row-choosepackage">
        {packagesData.map((pkg) => (
          <div key={pkg.id} className="package-choosepackage">
            <img src={pkg.image} alt={pkg.packagename} className="image-choosepackage" />
            <h3>{pkg.packagename}</h3>
            <p>{pkg.description}</p>
            <p>Price: {pkg.price}</p>
            <button className="choose-btn-choosepackage" onClick={() => openOverlay(pkg)}>
              Choose
            </button>
          </div>
        ))}
      </div>

      <button className="next-btn-choosepackage" onClick={() => navigate('/add-guest')}>Next</button>

      {isOverlayOpen && selectedPackage && (
        <div className="overlay-choosepackage">
          <div className="overlay-content-choosepackage">
            <h2 className="overlay-header-choosepackage">Chosen Package: {selectedPackage.packagename}</h2>
            <button className="close-btn-choosepackage" onClick={closeOverlay}>
              <FaTimes />
            </button>
            <img src={selectedPackage.image} alt={selectedPackage.packagename} className="overlay-image-choosepackage" />
            <p>{selectedPackage.description}</p>
            <p>Price: {selectedPackage.price}</p>
            <button className="confirm-btn-choosepackage" onClick={closeOverlay}>
              Confirm
            </button>
          </div>
        </div>
      )}
    </div>
  );
};


const ChooseServiceProv = () => {
    const navigate = useNavigate(); // Corrected useNavigate
    const [selectedType, setSelectedType] = useState(null);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [likedEvents, setLikedEvents] = useState({});
    const [modalVisible, setModalVisible] = useState(false);
    const [addedEvents, setAddedEvents] = useState([]);
  
    const toggleLike = (eventId) => {
      setLikedEvents(prevState => ({
        ...prevState,
        [eventId]: !prevState[eventId],
      }));
    };
  
    const handleEventClick = (item) => {
      setSelectedEvent(item);
      setModalVisible(true);
    };
  
    const handleCloseModal = () => {
      setModalVisible(false);
      setSelectedEvent(null);
    };
  
    const handleNext = () => {
  if (selectedEvent) {
    const eventToAdd = {
      id: selectedEvent.id,
      title: selectedEvent.title,
      type: selectedEvent.type,
      // Include other properties as needed
    };
    
    const updatedEvents = [...addedEvents, eventToAdd];
    console.log('Updated Events:', updatedEvents); // Log before stringify

    try {
      localStorage.setItem('addedEvents', JSON.stringify(updatedEvents)); // Updated for local storage
    } catch (error) {
      console.error('Error stringifying addedEvents:', error);
    }
    
    setAddedEvents(updatedEvents);
    handleCloseModal();
  }
};

  
    const handleRemoveEvent = (eventId) => {
      setAddedEvents(prevEvents => prevEvents.filter(event => event.id !== eventId));
    };
  
    const handleFinish = async () => {
      const eventData = JSON.parse(localStorage.getItem('eventData')) || {};
      const selectedPackage = JSON.parse(localStorage.getItem('selectedPackage'));
      const addedEvents = JSON.parse(localStorage.getItem('addedEvents')) || [];
  
      try {
          const response = await fetch('/api/events', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                  ...eventData,
                  providers: addedEvents,
              }),
          });
  
          if (!response.ok) {
              throw new Error('Network response was not ok.');
          }
  
          const data = await response.json();
          console.log('Event saved successfully:', data);
          localStorage.removeItem('eventData');
          localStorage.removeItem('addedEvents');
          navigate('/dashboard');
      } catch (error) {
          console.error('Error saving event:', error);
      }
  };
  
  
  
    const filteredEventsData = selectedType
      ? allEventsData.filter(event => event.type === selectedType)
      : allEventsData;
  
    const renderEventItem = (item) => (
      <div className="event-item-sp" onClick={() => handleEventClick(item)} key={item.id}>
        <img src={require(`./images/${item.image}`)} alt={item.title} className="event-image-sp" />
        <p className="event-title-sp">{item.title}</p>
        <div className="event-details-sp">
          <div className="event-detail-row-sp">
            <FontAwesomeIcon icon={faPlusCircle} size="sm" color="#2A93D5" />
            <p className="event-detail-text-sp">{item.provider}</p>
          </div>
          <div className="event-detail-row-sp">
            <FontAwesomeIcon icon={faCashRegister} size="sm" color="#2A93D5" />
            <p className="event-detail-text-sp">{item.price}</p>
          </div>
        </div>
        <div
          className={`like-icon-sp ${likedEvents[item.id] ? 'liked' : ''}`}
          onClick={(e) => {
            e.stopPropagation();
            toggleLike(item.id);
          }}
        >
          <FontAwesomeIcon
            icon={likedEvents[item.id] ? faHeart : faHeartBroken}
            color={likedEvents[item.id] ? '#FF0000' : '#888'}
            size="lg"
          />
        </div>
      </div>
    );
  
    return (
      <div className="gradient-background-sp">
        <div className="main-container-sp">
          {/* Header section */}
          <div className="scrollable-conten-spt">
            <div className="content-sp">
              {/* Centered Create Event Text */}
              <p className="header-title-sp">Service Provider</p>
              {/* Fading Line */}
              <div className="separator-line-sp"></div>
              {/* Event Types Section */}
              <p className="service-type-label-sp">Add Service Provider</p>
              <div className="horizontal-scroll-sp">
                {eventServices.map((type, index) => (
                  <button
                    key={index}
                    className={`event-type-button-sp ${selectedType === type ? 'selected' : ''}`}
                    onClick={() => setSelectedType(type)}
                  >
                    <p className={`event-type-text-sp ${selectedType === type ? 'selected' : ''}`}>
                      {type}
                    </p>
                  </button>
                ))}
              </div>
              
              {/* Scrollable Events List */}
              <div className="event-list-container-sp">
                {filteredEventsData.map(event => renderEventItem(event))}
              </div>
              
              {/* Added Events List */}
              {addedEvents.length > 0 && (
                <div className="added-events-section-sp">
                  <p className="added-events-title-sp">Added Events</p>
                  <div className="added-events-scroll-sp">
                    {addedEvents.map(event => (
                      <div key={event.id} className="added-event-item-sp">
                        <p className="added-event-text-sp">{event.title}</p>
                        <p className="added-event-text-sp">{event.type}</p>
                        <p className="added-event-text-sp">{event.price}</p>
                        <button
                          className="remove-event-button-sp"
                          onClick={() => handleRemoveEvent(event.id)}
                        >
                          <FontAwesomeIcon icon={faTrash} size="lg" color="#FF4C4C" />
                        </button>
                      </div>
                    ))}
                    <div className="footer-buttons-sp">
                      <button className="modal-cancel-button-sp" onClick={() => window.history.back()}>
                        <p className="modal-cancel-button-text-sp">Cancel</p>
                      </button>
                      <button className="modal-add-button-sp" onClick={handleFinish}>
                        <p className="modal-add-button-text-sp" onClick={()=> navigate('/add-guest')}>Finish</p>
                      </button>
                    </div>
                  </div>  
                </div>
              )}
            </div>
          </div>
  
          {/* Modal for Event Details */}
          <Modal
            open={modalVisible}
            onClose={handleCloseModal}
            className="modal-overlay-sp"
          >
            <div className="modal-content-container-sp">
              <div className="modal-body-sp">
                {selectedEvent && (
                  <>
                    <p className="modal-title-sp">{selectedEvent.title}</p>
                    <p className="modal-provider-sp">Provider: {selectedEvent.provider}</p>
                    <p className="modal-price-sp">Price: {selectedEvent.price}</p>
                    <div className="modal-actions-sp">
                      <button className="modal-add-button-sp" onClick={handleNext}>Add</button>
                      <button className="modal-cancel-button-sp" onClick={handleCloseModal}>Cancel</button>
                    </div>
                  </>
                )}
              </div>
            </div>
          </Modal>
        </div>
      </div>
    );
  };

//   const style = {
//     position: 'absolute',
//     top: '50%',
//     left: '50%',
//     transform: 'translate(-50%, -50%)',
//     p: 4,
// };

const ReviewOverlay = ({ isOpen, onClose, packagesData, allEventsData, guests }) => {
  
  const eventData = JSON.parse(localStorage.getItem('eventData'));
  const selectedPackage = JSON.parse(localStorage.getItem('selectedPackage')); // Retrieve selectedPackage
  const addedEvents = JSON.parse(localStorage.getItem('addedEvents')); 
  const [modalVisible, setModalVisible] = useState(false); // State for modal visibility

  const handleBookEvent = () => {
    setModalVisible(true); // Show the overlay when booking an event
  };
  const handleCloseModal = () => {
    setModalVisible(false); // Close the overlay
  };

  console.log('Selected Package:', selectedPackage); // Debugging log

  return (
    <Modal
    open={isOpen}
    onClose={onClose}
    aria-labelledby="modal-title"
    aria-describedby="modal-description"
>
  <Box>
    <div className="overlay-content-reviewoverlay">
      <div className="overlay-left">
        <div className="overlay-header-reviewoverlay">
          <h2 className="modal-title">Review Details</h2>
          <button onClick={onClose} className="close-button-reviewoverlay">X</button>
        </div>
        <h3>Event Details</h3>
        <p>Event Name: {(eventData.name)}</p>
        <p>Date: {(eventData.date)}</p>
        <p>Pax: {(eventData.pax)}</p>
        <p>Location: {(eventData.venue)}</p>

        <h3>Package Details</h3>
        {selectedPackage ? (
          <>
            <p>Package Name: {(selectedPackage.packagename)}</p>
            <p>Price: {(selectedPackage.price)}</p>
          </>
        ) : (
          <p>No package selected.</p>
        )}
      </div>
      <div className="overlay-right">
        <h3>Service Providers</h3>
        {Array.isArray(addedEvents) && addedEvents.length > 0 ? (
          addedEvents.map((serviceProvider, index) => (
            <p key={index}>{serviceProvider.title} - {(serviceProvider.type)}</p>
          ))
        ) : (
          <p>No service providers added.</p>
        )}

        <h3>Guests</h3>
        {Array.isArray(guests) && guests.length > 0 ? (
          guests.slice(0, 5).map((guest, index) => (
            <p key={index}>{(guest.name)} - {(guest.email)}</p>
          ))
        ) : (
          <p>No guests added.</p>
        )}
        <button className="book-event-btn-guestpage" onClick={handleBookEvent}>
        Book Event
      </button>
      <Modal
        open={modalVisible}
        onClose={handleCloseModal}
        className="modal-overlay-guestpage"
      >
        <div className="modal-content-guestpage">
          <button className="close-modal-btn-guestpage" onClick={handleCloseModal}>
            &times; {/* X Button */}
          </button>
          <img src={require('./images/popup.png')} alt="Popup" className="popup-image-guestpage" />
          <p className="modal-text-guestpage">Your event has been booked!</p>
        </div>
      </Modal>
      </div>
     
    </div>
    
  </Box>
</Modal>
  );
};



  
const GuestPage = ({ packagesData, allEventsData, selectedEvent }) => {
  const [guests, setGuests] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [overlayVisible, setOverlayVisible] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  // Handling guest addition
  const handleAddGuest = () => {
      if (!name.trim() || !email.trim()) {
          alert("Please fill in both name and email.");
          return;
      }
      if (!/\S+@\S+\.\S+/.test(email)) {
          alert("Please enter a valid email address.");
          return;
      }
      setGuests([...guests, { name, email }]);
      setName('');
      setEmail('');
  };

  // Handling guest removal
  const handleRemoveGuest = (index) => {
      const newGuests = guests.filter((_, i) => i !== index);
      setGuests(newGuests);
  };

  const handleBookEvent = () => {
      setModalVisible(true); // Show the review overlay
  };

  const handleCloseModal = () => {
      setModalVisible(false); // Close the overlay
  };

  const openOverlay = () => {
      setOverlayVisible(true);
  };

  const closeOverlay = () => {
      setOverlayVisible(false);
  };

  return (
      <div className="guest-page-container-guestpage">
          <h1 className="header-guestpage">Add Guest</h1>
          <div className="guest-container-guestpage">
              <div className="right-section-guestpage">
                  <table className="guest-table-guestpage">
                      <thead>
                          <tr>
                              <th>Name</th>
                              <th>Email</th>
                              <th>Action</th>
                          </tr>
                      </thead>
                      <tbody>
                          {guests.map((guest, index) => (
                              <tr key={index}>
                                  <td>{guest.name}</td>
                                  <td>{guest.email}</td>
                                  <td>
                                      <button
                                          className="remove-btn-guestpage"
                                          onClick={() => handleRemoveGuest(index)}
                                      >
                                          Remove
                                      </button>
                                  </td>
                              </tr>
                          ))}
                      </tbody>
                  </table>
              </div>
          </div>

          <button className="add-guest-btn-guestpage" onClick={openOverlay}>
              Add Guest
          </button>

          <button className="book-event-btn-guestpage" onClick={handleBookEvent}>
              Book Event
          </button>

          {overlayVisible && (
              <div className="overlay-guestpage">
                  <div className="overlay-content-guestpage">
                      <button className="close-btn-guestpage" onClick={closeOverlay}>
                          X
                      </button>
                      <h2 className="overlay-header-guestpage">Add Guest</h2>
                      <label className="name-label-guestpage">Name</label>
                      <input
                          type="text"
                          placeholder="Enter name"
                          value={name}
                          className="name-input-guestpage"
                          onChange={(e) => setName(e.target.value)}
                      />
                      <label className="email-label-guestpage">Email</label>
                      <input
                          type="email"
                          placeholder="Enter email"
                          value={email}
                          className="email-input-guestpage"
                          onChange={(e) => setEmail(e.target.value)}
                      />
                      <button className="confirm-add-btn-guestpage" onClick={handleAddGuest}>
                          Add
                      </button>
                  </div>
              </div>
          )}

          <ReviewOverlay
              isOpen={modalVisible}
              onClose={handleCloseModal}
              selectedEvent={selectedEvent}
              packagesData={packagesData}
              allEventsData={allEventsData}
              guests={guests}
          />
      </div>
  );
};


export { CreateEvent, ChoosePackage, ChooseServiceProv, GuestPage };
 