import React, { useRef } from 'react';
import './App.css'; // Ensure the CSS file is correctly imported
import { IoMdCreate, IoMdArrowForward } from 'react-icons/io';
import { useNavigate } from 'react-router-dom'; // Assuming you're using react-router for navigation
import profilePic from './images/pro_pic.png'; // Correctly imported profile picture

const eventsData = [
  { id: '1', title: 'Mr. & Mrs. Malik Wedding', image: require('./images/event1.png'), date: '2024-07-01', address: 'CDO' },
  { id: '2', title: 'Elizabeth Birthday', image: require('./images/event2.png'), date: '2024-08-12', address: 'CDO' },
  { id: '3', title: 'Class of 1979 Reunion', image: require('./images/event3.png'), date: '2024-09-25', address: 'CDO' },
  { id: '4', title: 'Corporate Party', image: require('./images/event1.png'), date: '2024-10-30', address: 'CDO' },
  { id: '5', title: 'Annual Gala', image: require('./images/event2.png'), date: '2024-11-15', address: 'CDO' },
  { id: '6', title: 'New Year Celebration', image: require('./images/event3.png'), date: '2024-12-31', address: 'CDO' },
  { id: '7', title: 'Music Festival', image: require('./images/event1.png'), date: '2024-06-22', address: 'CDO' },
  { id: '8', title: 'Art Exhibition', image: require('./images/event2.png'), date: '2024-07-05', address: 'CDO' },
  { id: '9', title: 'Art Exhibition', image: require('./images/event2.png'), date: '2024-05-05', address: 'CDO' },
];

// Utility function to group and sort events by month and year
const groupAndSortEventsByMonth = (events) => {
  const groupedEvents = events.reduce((acc, event) => {
    const eventDate = new Date(event.date);
    const month = eventDate.toLocaleString('default', { month: 'long' });
    const year = eventDate.getFullYear();
    const key = `${month} ${year}`;

    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push(event);

    return acc;
  }, {});

  // Sort months and events
  const sortedKeys = Object.keys(groupedEvents).sort((a, b) => {
    const [monthA, yearA] = a.split(' ');
    const [monthB, yearB] = b.split(' ');

    const monthOrder = new Date(Date.parse(monthA + ' 1, 2012')).getMonth();
    const monthBOrder = new Date(Date.parse(monthB + ' 1, 2012')).getMonth();

    return (yearA - yearB) || (monthOrder - monthBOrder);
  });

  const sortedGroupedEvents = sortedKeys.reduce((acc, key) => {
    acc[key] = groupedEvents[key].sort((a, b) => new Date(a.date) - new Date(b.date));
    return acc;
  }, {});

  return sortedGroupedEvents;
};

const Profile = () => {
  const navigate = useNavigate();
  const eventListRef = useRef(null);

  // Function to render each event item
  const renderEventItem = (item) => (
    <div className="event-item-profile" key={item.id}>
      <img src={item.image} alt={item.title} className="image-profile" />
      <h3 className="title-profile">{item.title}</h3>
      <div className="detail-container-profile">
        <div className="detail-row-profile">
          <span className="detail-text-profile">{item.date}</span>
        </div>
        <div className="detail-row-profile">
          <span className="detail-text-profile">{item.address}</span>
        </div>
      </div>
    </div>
  );

  // Function to handle scrolling
  const scroll = (direction) => {
    if (eventListRef.current) {
      eventListRef.current.scrollBy({
        left: direction === 'left' ? -300 : 300, // Adjust scroll amount as needed
        behavior: 'smooth',
      });
    }
  };

  // Group and sort events by month
  const groupedEvents = groupAndSortEventsByMonth(eventsData);

  return (
    <div className="gradient-container-profile">
      <div className="scroll-view-profile">
        <h1 className="header-text-profile">Profile</h1>
        <hr className="header-line-profile" />

        {/* Profile Section */}
        <div className="profile-section-profile">
          <img src={profilePic} alt="Profile" className="profile-picture-profile" />
          <h2 className="name-text-profile">Organizer</h2>
          <p className="address-text-profile">Service Provider Address</p>
          <div className="schedule-container-profile">
            <div className="schedule-item-profile">
              <span className="schedule-text-profile">Open</span>
              <span className="schedule-time-profile">6:00 AM</span>
            </div>
            <div className="schedule-item-profile">
              <span className="schedule-text-profile">Close</span>
              <span className="schedule-time-profile">9:00 PM</span>
            </div>
          </div>
          <div className="button-container-profile">
            <button className="edit-button-profile" onClick={() => navigate('/edit-profile')}>
              <IoMdCreate size={24} color="black" />
              <span className="edit-button-text-profile">Edit Profile</span>
            </button>
            <button className="portfolio-button-profile" onClick={() => navigate('/portfolioadmin')}>
              <IoMdArrowForward size={24} color="black" />
              <span className="portfolio-button-text-profile">Portfolio</span>
            </button>
          </div>
        </div>

        {/* Popular Event Text */}
        <h2 className="popular-event-text-profile">Popular Events</h2>

        {/* Horizontal Scrolling Event List */}
        <div className="events-list-container-profile" ref={eventListRef}>
          {Object.keys(groupedEvents).map((month, index) => (
            <div key={index} className="month-group-profile">
              <h3 className="month-title-profile">{month}</h3>
              {groupedEvents[month].map(renderEventItem)}
            </div>
          ))}
        </div>

        
      </div>
    </div>
  );
};

export default Profile;
