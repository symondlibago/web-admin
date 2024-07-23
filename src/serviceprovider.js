import React, { useState } from 'react';
import { Modal } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
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

  const filteredEventsData = selectedType
    ? allEventsData.filter(event => event.type === selectedType)
    : allEventsData;

  const renderEventItem = (item) => (
    <div className="item-container" onClick={() => handleEventClick(item)}>
      <img src={require(`./images/${item.image}`)} alt={item.title} className="image" />
      <p className="title">{item.title}</p>
      <div className="detail-container">
        <div className="detail-row">
          <FontAwesomeIcon icon={faPlusCircle} size="sm" color="#2A93D5" />
          <p className="detail-text">{item.provider}</p>
        </div>
        <div className="detail-row">
          <FontAwesomeIcon icon={faCashRegister} size="sm" color="#2A93D5" />
          <p className="detail-text">{item.price}</p>
        </div>
      </div>
      <div
        className={`heart-icon ${likedEvents[item.id] ? 'heart-liked' : ''}`}
        onClick={() => toggleLike(item.id)}
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
    <div className="gradient-container">
      <div className="container">
        {/* Header section */}
        <div className="scroll-view">
          <div className="content">
            {/* Centered Create Event Text */}
            <p className="header-text">Service Provider</p>
            {/* Fading Line */}
            <div className="line"></div>
            {/* Event Types Section */}
            <p className="event-types-text">Add Service Provider</p>
            <div className="scroll-view-horizontal">
              {eventTypes.map((type, index) => (
                <button
                  key={index}
                  className={`event-type-button ${selectedType === type ? 'selected' : ''}`}
                  onClick={() => setSelectedType(type)}
                >
                  <p className={`event-type-text ${selectedType === type ? 'selected-text' : ''}`}>
                    {type}
                  </p>
                </button>
              ))}
            </div>
            
            {/* Scrollable Events List */}
            <div className="flat-list-container">
              {filteredEventsData.map(event => renderEventItem(event))}
            </div>
            
            {/* Added Events List */}
            {addedEvents.length > 0 && (
              <div className="added-events-container">
                <p className="added-events-header">Added Events</p>
                <div className="added-events-scroll-view">
                  {addedEvents.map(event => (
                    <div key={event.id} className="added-event-item">
                      <p className="added-event-text">{event.title}</p>
                      <p className="added-event-text">{event.type}</p>
                      <p className="added-event-text">{event.price}</p>
                      <button
                        className="remove-button"
                        onClick={() => handleRemoveEvent(event.id)}
                      >
                        <FontAwesomeIcon icon={faTrash} size="lg" color="#FF4C4C" />
                      </button>
                    </div>
                  ))}
                  <div className="footer-buttons">
                    <button className="cancel-button" onClick={() => window.history.back()}>
                      <p className="cancel-button-text">Cancel</p>
                    </button>
                    <button className="next-button" onClick={() => { /* Your logic for Add to List */ }}>
                      <p className="next-button-text">Next</p>
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
          className="modal"
        >
          <div className="modal-container">
            <div className="modal-content">
              {selectedEvent && (
                <>
                  <p className="modal-title">{selectedEvent.title}</p>
                  <p className="modal-provider">Provider: {selectedEvent.provider}</p>
                  <p className="modal-price">Price: {selectedEvent.price}</p>
                  <div className="modal-buttons">
                    <button className="cancel-button" onClick={handleCloseModal}>
                      <p className="cancel-button-text">Cancel</p>
                    </button>
                    <button className="next-button" onClick={handleNext}>
                      <p className="next-button-text">Add to List</p>
                    </button>
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
