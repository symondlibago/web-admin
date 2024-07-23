import React, { useState } from 'react';
import {useNavigate } from 'react-router-dom';
import './App.css'; // Make sure to create this CSS file and add the styles mentioned below
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar, faMapMarker, faHeart, faHeartBroken, faSearch } from '@fortawesome/free-solid-svg-icons';

const eventsData = [
  { id: '1', title: 'Mr. & Mrs. Malik Wedding', image: 'event1.png', date: '2024-07-01', address: 'CDO', buttons: ['Edit', 'Equipment'] },
  { id: '2', title: 'Elizabeth Birthday', image: 'event2.png', date: '2024-08-12', address: 'CDO', buttons: ['Attendee', 'Feedback', 'Inventory'] },
  { id: '3', title: 'Class of 1979 Reunion', image: 'event3.png', date: '2024-09-25', address: 'CDO', buttons: ['Edit', 'Equipment'] },
  { id: '4', title: 'Corporate Party', image: 'event1.png', date: '2024-10-30', address: 'CDO', buttons: ['Edit', 'Equipment'] },
  { id: '5', title: 'Annual Gala', image: 'event2.png', date: '2024-11-15', address: 'CDO', buttons: ['Attendee', 'Feedback', 'Equipment'] },
  { id: '6', title: 'New Year Celebration', image: 'event3.png', date: '2024-12-31', address: 'CDO', buttons: ['Attendee', 'Feedback', 'Inventory'] },
  { id: '7', title: 'Music Festival', image: 'event1.png', date: '2024-06-22', address: 'CDO', buttons: ['Attendee'] },
  { id: '8', title: 'Art Exhibition', image: 'event2.png', date: '2024-07-05', address: 'CDO', buttons: ['Attendee', 'Equipment'] },
];

function Events() {
  const [search, setSearch] = useState('');
  const [filteredEvents, setFilteredEvents] = useState(eventsData);
  const [likedEvents, setLikedEvents] = useState({});
  const navigate = useNavigate();

  const handleSearch = (text) => {
    setSearch(text);
    if (text) {
      const newData = eventsData.filter((item) => {
        const itemData = item.title ? item.title.toUpperCase() : ''.toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setFilteredEvents(newData);
    } else {
      setFilteredEvents(eventsData);
    }
  };

  const toggleLike = (eventId) => {
    setLikedEvents((prevState) => ({
      ...prevState,
      [eventId]: !prevState[eventId],
    }));
  };

  const renderEventItem = (item) => (
    <div key={item.id} className="item-container">
      <img src={require(`./images/${item.image}`)} alt={item.title} className="image" />
      <h3 className="title">{item.title}</h3>
      <div className="detail-container">
        <div className="detail-row">
          <FontAwesomeIcon icon={faCalendar} size="lg" color="#2A93D5" />
          <span className="detail-text">{item.date}</span>
        </div>
        <div className="detail-row">
          <FontAwesomeIcon icon={faMapMarker} size="lg" color="#2A93D5" />
          <span className="detail-text">{item.address}</span>
        </div>
      </div>
      <button
        className={`heart-icon ${likedEvents[item.id] ? 'heart-liked' : ''}`}
        onClick={() => toggleLike(item.id)}
      >
        <FontAwesomeIcon icon={likedEvents[item.id] ? faHeart : faHeartBroken} size="lg" />
      </button>
      <div className="buttons-container">
        {item.buttons.map((button, index) => (
          <button
            key={index}
            className="button"
            onClick={() => {
              if (button === 'Equipment') {
                navigate('/equipment');
              } else if (button === 'Edit') {
                navigate('/edit');
              } else if (button === 'Attendee') {
                navigate('/attendees');
              } else if (button === 'Inventory') {
                navigate('/inventory');
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
    <div className="gradient-container">
      <div className="container">
        
        <div className="search-container">
          <FontAwesomeIcon icon={faSearch} size="lg" color="#888" className="search-icon" />
          <input
            type="text"
            className="search-box"
            placeholder="Search Event"
            onChange={(e) => handleSearch(e.target.value)}
            value={search}
          />
        </div>
        <div className="event-list">
          {filteredEvents.map(renderEventItem)}
        </div>
      </div>
    </div>
  );
}

export default Events;
