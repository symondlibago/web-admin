import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './App.css';

// Feedback (Dashboard Summary) component
const DashboardSummary = () => {
  const feedbackData = {
    total: 100,
    positive: 50,
    neutral: 30,
    negative: 20,
  };

  return (
    <div className="summary-dashboard">
      <h3>Summary</h3> {/* Added Summary header */}
      <div className="dashboard-summary-container">
        <div className="dashboard-summary-box positive-box-dash">
          <p>Total Feedback</p>
          <p>{feedbackData.total}</p>
        </div>
        <div className="dashboard-summary-box positive-box-dash">
          <p>Positive</p>
          <p>{feedbackData.positive}</p>
        </div>
        <div className="dashboard-summary-box neutral-box-dash">
          <p>Neutral</p>
          <p>{feedbackData.neutral}</p>
        </div>
        <div className="dashboard-summary-box negative-box-dash">
          <p>Negative</p>
          <p>{feedbackData.negative}</p>
        </div>
      </div>
    </div>
  );
};

// Sample data for packages
const packagesData = [
  { id: '1', packagename: 'Package A', image: require('./images/event1.png'), price: '100,000', pax: '300 pax' },
  { id: '2', packagename: 'Package B', image: require('./images/event2.png'), price: '100,000', pax: '250 pax' },
  { id: '3', packagename: 'Package C', image: require('./images/event3.png'), price: '100,000', pax: '150 pax' },
  { id: '4', packagename: 'Package D', image: require('./images/event1.png'), price: '100,000', pax: '200 pax' },
  { id: '5', packagename: 'Package E', image: require('./images/event2.png'), price: '100,000', pax: '100 pax' },
  { id: '6', packagename: 'Package F', image: require('./images/event3.png'), price: '100,000', pax: '50 pax' },
  { id: '7', packagename: 'Package G', image: require('./images/event1.png'), price: '100,000', pax: '50 pax' },
  { id: '8', packagename: 'Package H', image: require('./images/event2.png'), price: '100,000', pax: '200 pax' },
  { id: '9', packagename: 'Package I', image: require('./images/event2.png'), price: '100,000', pax: '500 pax' },
];

// Render function for package items
const renderPackageItem = (item) => (
  <div className="package-item-dashboard" key={item.id}>
    <img src={item.image} alt={item.packagename} className="image-dashboard" />
    <div className="packagename-dashboard">{item.packagename}</div>
    <div className="detail-container-dashboard">
      <div className="detail-row-dashboard">
        <span className="detail-text-dashboard">{item.price}</span>
      </div>
      <div className="detail-row-dashboard">
        <span className="detail-text-dashboard">{item.pax}</span>
      </div>
    </div>
  </div>
);

function Dashboard() {
  const [monthlyBookings, setMonthlyBookings] = useState([]);
  const [currentMonth, setCurrentMonth] = useState('');
  const [hoveredDay, setHoveredDay] = useState(null);
  const [events, setEvents] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch event data from the backend
    axios.get('http://localhost:8000/api/events')
      .then(response => {
        const today = new Date();
        const currentMonthIndex = today.getMonth(); // Get current month (0-based index)

        // Filter events for the current month
        const eventDates = response.data
          .filter(event => new Date(event.date).getMonth() === currentMonthIndex)
          .map(event => new Date(event.date).getDate());

        setMonthlyBookings(eventDates);
        setCurrentMonth(`${today.toLocaleString('default', { month: 'long' })} ${today.getFullYear()}`);
      })
      .catch(error => {
        console.error('Error fetching events:', error);
      });
  }, []);

  const fetchEventsForDay = (day) => {
    const date = `${new Date().getFullYear()}-${String(new Date().getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    axios.get('http://localhost:8000/api/events', {
      params: { date: date }
    })
      .then(response => {
        const filteredEvents = response.data.filter(event => new Date(event.date).getDate() === day);
        setEvents(filteredEvents);
      })
      .catch(error => {
        console.error('Error fetching events for day:', error);
        setEvents([]);
      });
  };

  const handleMouseEnter = (day) => {
    setHoveredDay(day);
    fetchEventsForDay(day);
  };

  const handleMouseLeave = () => {
    setHoveredDay(null);
    setEvents([]);
  };

  const daysInMonth = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0).getDate();

  return (
    <div className="dashboard-container">
      <div className="dashboard-content">
        <div className="left-side">
          <DashboardSummary />
        </div>
        <div className="right-side">
          <div className="calendar">
            <div className="calendar-header">
              <span>{currentMonth}</span>
            </div>
            <div className="calendar-body">
              {Array.from({ length: daysInMonth }, (_, i) => i + 1).map(day => (
                <div
                  key={day}
                  className={`calendar-day ${monthlyBookings.includes(day) ? 'has-booking' : ''}`}
                  onMouseEnter={() => handleMouseEnter(day)}
                  onMouseLeave={handleMouseLeave}
                  style={{ position: 'relative' }}
                >
                  <span>{day}</span>
                  {monthlyBookings.includes(day) && <div className="calendar-booking-dot"></div>}
                  {hoveredDay === day && (
                    <div className="event-overlay">
                      <ul>
                        {events.length > 0 ? (
                          events.map(event => (
                            <li key={event.id}>{event.name}</li>
                          ))
                        ) : (
                          <li>No events</li>
                        )}
                      </ul>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
          <button className="create-event-button" onClick={() => navigate('/create-event')}>Create an Event</button>
          <button className="events-button" onClick={() => navigate('/events')}>Events</button>
        </div>
      </div>
      <div className="packages-section-dashboard">
        <h2>Packages</h2>
        <div className="events-list-container-dashboard">
          {packagesData.map(renderPackageItem)}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
