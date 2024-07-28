import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar, faMapMarker, faHeart, faHeartBroken, faSearch } from '@fortawesome/free-solid-svg-icons';

const initialEventsData = [
  { id: '1', title: 'Mr. & Mrs. Malik Wedding', image: 'event1.png', date: '2024-07-01', address: 'CDO', buttons: ['Delete', 'Feedback'] },
  { id: '2', title: 'Elizabeth Birthday', image: 'event2.png', date: '2024-08-12', address: 'CDO', buttons: ['Delete', 'Feedback'] },
  { id: '3', title: 'Class of 1979 Reunion', image: 'event3.png', date: '2024-09-25', address: 'CDO', buttons: ['Delete', 'Feedback'] },
  { id: '4', title: 'Corporate Party', image: 'event1.png', date: '2024-10-30', address: 'CDO', buttons: ['Delete', 'Feedback'] },
  { id: '5', title: 'Annual Gala', image: 'event2.png', date: '2024-11-15', address: 'CDO', buttons: ['Delete', 'Feedback'] },
  { id: '6', title: 'New Year Celebration', image: 'event3.png', date: '2024-12-31', address: 'CDO', buttons: ['Delete', 'Feedback'] },
  { id: '7', title: 'Music Festival', image: 'event1.png', date: '2024-06-22', address: 'CDO', buttons: ['Delete', 'Feedback'] },
  { id: '8', title: 'Art Exhibition', image: 'event2.png', date: '2024-07-05', address: 'CDO', buttons: ['Delete', 'Feedback'] },
];

function Events() {
  const [search, setSearch] = useState('');
  const [filteredEvents, setFilteredEvents] = useState(initialEventsData);
  const [likedEvents, setLikedEvents] = useState({});
  const navigate = useNavigate();

  const handleSearch = (text) => {
    setSearch(text);
    if (text) {
      const newData = initialEventsData.filter((item) => {
        const itemData = item.title ? item.title.toUpperCase() : ''.toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setFilteredEvents(newData);
    } else {
      setFilteredEvents(initialEventsData);
    }
  };

  const toggleLike = (eventId) => {
    setLikedEvents((prevState) => ({
      ...prevState,
      [eventId]: !prevState[eventId],
    }));
  };

  const handleDelete = (eventId) => {
    const newData = filteredEvents.filter((item) => item.id !== eventId);
    setFilteredEvents(newData);
  };

  const renderEventItem = (item) => (
    <div key={item.id} className="item-container-eventfeedback">
      <img src={require(`./images/${item.image}`)} alt={item.title} className="image-eventfeedback" />
      <h3 className="title-eventfeedback">{item.title}</h3>
      <div className="detail-container-eventfeedback">
        <div className="detail-row-eventfeedback">
          <FontAwesomeIcon icon={faCalendar} size="lg" color="#2A93D5" />
          <span className="detail-text-eventfeedback">{item.date}</span>
        </div>
        <div className="detail-row-eventfeedback">
          <FontAwesomeIcon icon={faMapMarker} size="lg" color="#2A93D5" />
          <span className="detail-text-eventfeedback">{item.address}</span>
        </div>
      </div>
      <button
        className={`heart-icon-eventfeedback ${likedEvents[item.id] ? 'heart-liked-eventfeedback' : ''}`}
        onClick={() => toggleLike(item.id)}
      >
        <FontAwesomeIcon icon={likedEvents[item.id] ? faHeart : faHeartBroken} size="lg" />
      </button>
      <div className="buttons-container-eventfeedback">
        {item.buttons.map((button, index) => (
          <button
            key={index}
            className="button-eventfeedback"
            onClick={() => {
              if (button === 'Delete') {
                handleDelete(item.id);
              } else if (button === 'Feedback') {
                navigate('feedback-events');
              }
            }}
          >
            {button}
          </button>
        ))}
      </div>
    </div>
  );

  return (
    <div className="gradient-container-eventfeedback">
      <div className="container-eventfeedback">
        <div className="search-container-eventfeedback">
          <FontAwesomeIcon icon={faSearch} size="lg" color="#888" className="search-icon-eventfeedback" />
          <input
            type="text"
            className="search-box-eventfeedback"
            placeholder="Search Event"
            onChange={(e) => handleSearch(e.target.value)}
            value={search}
          />
        </div>
        <div className="event-list-eventfeedback">
          {filteredEvents.map(renderEventItem)}
        </div>
      </div>
    </div>
  );
}

export default Events;


