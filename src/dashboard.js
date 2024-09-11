import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './App.css';

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

  // Fetch events for a specific day
  const fetchEventsForDay = (day) => {
    const date = `${new Date().getFullYear()}-${String(new Date().getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    axios.get('http://localhost:8000/api/events', {
      params: {
        date: date
      }
    })
      .then(response => {
        // Filter the response data to include only events for the hovered day
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

  // Generate calendar days for the current month
  const daysInMonth = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0).getDate();

  return (
    <div className="dashboard-container">
      <div className="left-side">
        <h1 className="calendar-title">Calendar</h1>
        <div className="date-range">
          <span>1-{daysInMonth}</span>
          <span>{currentMonth}</span>
        </div>
        <div className="week-calendar">
          <div className="days-header">
            {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].map((day, index) => (
              <div key={index} className="day">
                <span>{day}</span>
                <span className="date">{12 + index}</span>
              </div>
            ))}
          </div>
          <div className="time-slots">
            {["8am", "9am", "10am", "11am", "12pm", "1pm", "2pm", "3pm"].map((time, timeIndex) => (
              <div key={timeIndex} className="time-slot">
                <span>{time}</span>
                <div className="bookings">
                  {Array.from({ length: 7 }, (_, dayIndex) => (
                    <div
                      key={dayIndex}
                      className="booking"
                      onMouseEnter={() => handleMouseEnter(12 + dayIndex)}
                      onMouseLeave={handleMouseLeave}
                    >
                      {monthlyBookings.includes(12 + dayIndex) && <div className="booking-reminder"></div>}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
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
  );
}

export default Dashboard;
