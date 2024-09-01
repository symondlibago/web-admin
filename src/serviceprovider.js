import React, { useState } from 'react';
import { Modal } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate } from 'react-router-dom'; // Corrected import
import { faHeart, faHeartBroken, faPlusCircle, faCashRegister, faTrash } from '@fortawesome/free-solid-svg-icons';
import './App.css';

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

const eventTypes = ["Food Catering", "Photography", "Video Editing", "Florists"];

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
      setAddedEvents(prevEvents => [...prevEvents, selectedEvent]);
      handleCloseModal();
    }
  };

  const handleRemoveEvent = (eventId) => {
    setAddedEvents(prevEvents => prevEvents.filter(event => event.id !== eventId));
  };

  const handleFinish = async () => {
    const eventData = JSON.parse(localStorage.getItem('eventData')) || {};
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
    <div className="event-item" onClick={() => handleEventClick(item)} key={item.id}>
      <img src={require(`./images/${item.image}`)} alt={item.title} className="event-image" />
      <p className="event-title">{item.title}</p>
      <div className="event-details">
        <div className="event-detail-row">
          <FontAwesomeIcon icon={faPlusCircle} size="sm" color="#2A93D5" />
          <p className="event-detail-text">{item.provider}</p>
        </div>
        <div className="event-detail-row">
          <FontAwesomeIcon icon={faCashRegister} size="sm" color="#2A93D5" />
          <p className="event-detail-text">{item.price}</p>
        </div>
      </div>
      <div
        className={`like-icon ${likedEvents[item.id] ? 'liked' : ''}`}
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
    <div className="gradient-background">
      <div className="main-container">
        {/* Header section */}
        <div className="scrollable-content">
          <div className="content">
            {/* Centered Create Event Text */}
            <p className="header-title">Service Provider</p>
            {/* Fading Line */}
            <div className="separator-line"></div>
            {/* Event Types Section */}
            <p className="service-type-label">Add Service Provider</p>
            <div className="horizontal-scroll">
              {eventTypes.map((type, index) => (
                <button
                  key={index}
                  className={`event-type-button ${selectedType === type ? 'selected' : ''}`}
                  onClick={() => setSelectedType(type)}
                >
                  <p className={`event-type-text ${selectedType === type ? 'selected' : ''}`}>
                    {type}
                  </p>
                </button>
              ))}
            </div>
            
            {/* Scrollable Events List */}
            <div className="event-list-container">
              {filteredEventsData.map(event => renderEventItem(event))}
            </div>
            
            {/* Added Events List */}
            {addedEvents.length > 0 && (
              <div className="added-events-section">
                <p className="added-events-title">Added Events</p>
                <div className="added-events-scroll">
                  {addedEvents.map(event => (
                    <div key={event.id} className="added-event-item">
                      <p className="added-event-text">{event.title}</p>
                      <p className="added-event-text">{event.type}</p>
                      <p className="added-event-text">{event.price}</p>
                      <button
                        className="remove-event-button"
                        onClick={() => handleRemoveEvent(event.id)}
                      >
                        <FontAwesomeIcon icon={faTrash} size="lg" color="#FF4C4C" />
                      </button>
                    </div>
                  ))}
                  <div className="footer-buttons">
                    <button className="modal-cancel-button" onClick={() => window.history.back()}>
                      <p className="modal-cancel-button-text">Cancel</p>
                    </button>
                    <button className="modal-add-button" onClick={handleFinish}>
                      <p className="modal-add-button-text">Finish</p>
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
          className="modal-overlay"
        >
          <div className="modal-content-container">
            <div className="modal-body">
              {selectedEvent && (
                <>
                  <p className="modal-title">{selectedEvent.title}</p>
                  <p className="modal-provider">Provider: {selectedEvent.provider}</p>
                  <p className="modal-price">Price: {selectedEvent.price}</p>
                  <div className="modal-actions">
                    <button className="modal-add-button" onClick={handleNext}>Add</button>
                    <button className="modal-cancel-button" onClick={handleCloseModal}>Cancel</button>
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

export default ChooseServiceProv;
