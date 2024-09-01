import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './App.css';

function Dashboard() {
  const [monthlyBookings, setMonthlyBookings] = useState([]);
  const [currentMonth, setCurrentMonth] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch event data from the backend
    axios.get('http://localhost:8000/api/events')
      .then(response => {
        const today = new Date();
        const currentMonthIndex = today.getMonth(); // Get current month (0-based index)
        
        const eventDates = response.data
          .filter(event => new Date(event.date).getMonth() === currentMonthIndex) // Filter events for the current month
          .map(event => new Date(event.date).getDate()); // Extract days
        
        setMonthlyBookings(eventDates);
      })
      .catch(error => {
        console.error('Error fetching events:', error);
      });

    // Set the current month
    const today = new Date();
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    setCurrentMonth(`${monthNames[today.getMonth()]} ${today.getFullYear()}`);
  }, []);

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
                    <div key={dayIndex} className="booking">
                      {/* Adjust booking reminder logic here if needed */}
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
              <div key={day} className={`calendar-day ${monthlyBookings.includes(day) ? 'has-booking' : ''}`}>
                <span>{day}</span>
                {monthlyBookings.includes(day) && <div className="calendar-booking-dot"></div>}
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
