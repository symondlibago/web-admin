import React from 'react';
import { useNavigate } from 'react-router-dom';
import './App.css'; // Make sure to create and import your CSS file
import { MdLocationOn, MdEvent } from 'react-icons/md';

// Events data
const eventsData = [
    { id: '1', title: 'Mr. & Mrs. Malik Wedding', image: require('./images/event1.png'), date: '2024-07-01', address: 'CDO' },
    { id: '2', title: 'Elizabeth Birthday', image: require('./images/event2.png'), date: '2024-08-12', address: 'CDO' },
    { id: '3', title: 'Class of 1979 Reunion', image: require('./images/event3.png'), date: '2024-09-25', address: 'CDO' },
    { id: '4', title: 'Corporate Party', image: require('./images/event1.png'), date: '2024-10-30', address: 'CDO' },
    { id: '5', title: 'Annual Gala', image: require('./images/event2.png'), date: '2024-11-15', address: 'CDO' },
    { id: '6', title: 'New Year Celebration', image: require('./images/event3.png'), date: '2024-12-31', address: 'CDO' },
    { id: '7', title: 'Music Festival', image: require('./images/event1.png'), date: '2024-06-22', address: 'CDO' },
    { id: '8', title: 'Art Exhibition', image: require('./images/event2.png'), date: '2024-07-05', address: 'CDO' },
  ];

const Portfolio = () => {
  const navigate = useNavigate();

  return (
    <div className="gradient-container-portfolio">
      {/* Main Content */}
      <h1 className="portfolio-text-portfolio">Portfolio</h1>

      {/* Vertical Scrolling Event List */}
      <div className="events-list-container-portfolio">
        {eventsData.map((item) => (
          <div key={item.id} className="event-item-portfolio">
            <img src={item.image} alt={item.title} className="image-portfolio" />
            <h2 className="title-portfolio">{item.title}</h2>
            <div className="detail-container-portfolio">
              <div className="detail-row-portfolio">
                <MdEvent size={16} color="#2A93D5" />
                <span className="detail-text-portfolio">{item.date}</span>
              </div>
              <div className="detail-row-portfolio">
                <MdLocationOn size={16} color="#2A93D5" />
                <span className="detail-text-portfolio">{item.address}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Portfolio;
