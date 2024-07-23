import React from 'react';
import { useNavigate } from 'react-router-dom';
import './App.css';

function Dashboard() {
  const navigate = useNavigate();

  // Mock data for booking reminders
  const bookingReminders = Array.from({ length: 20 }, () => {
    const day = Math.floor(Math.random() * 7);
    const time = Math.floor(Math.random() * 8) + 8; // Time between 8am to 3pm
    return { day, time };
  });

  // Mock data for monthly calendar bookings
  const monthlyBookings = Array.from({ length: 15 }, () => Math.floor(Math.random() * 28) + 1); // Dates between 1 to 28

  return (
    <div className="dashboard-container">
      <div className="left-side">
        <h1 className="calendar-title">Calendar</h1>
        <div className="date-range">
          <span>12-18</span>
          <span>July 2024</span>
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
                      {bookingReminders.some(reminder => reminder.day === dayIndex && reminder.time === (timeIndex + 8)) && (
                        <div className="booking-reminder"></div>
                      )}
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
            <span>July 2024</span>
          </div>
          <div className="calendar-body">
            {Array.from({ length: 31 }, (_, i) => i + 1).map(day => (
              <div key={day} className="calendar-day">
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
