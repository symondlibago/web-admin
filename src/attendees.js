import React, { useState } from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import './App.css';
import event1Image from './images/event1.png'; // Adjust the path to your local images

// Register the necessary components for Chart.js
ChartJS.register(ArcElement, Tooltip, Legend);

// Sample data for the pie chart
const data = {
  labels: ['Present', 'Absent', 'Late'],
  datasets: [
    {
      data: [18, 36, 6],
      backgroundColor: ['#00FF00', '#F00', '#FFFF00'], // Changed Present color to green
      borderColor: '#000',
      borderWidth: 1,
    },
  ],
};

// Sample data for attendees
const allAttendees = [
  { name: 'Attendee 1', date: '10.03.26', time: '8:00 AM', table: 'A', status: '#00FF00' },
  { name: 'Attendee 2', date: '10.04.26', time: '9:00 AM', table: 'B', status: '#F00' },
  { name: 'Attendee 3', date: '10.05.26', time: '10:00 AM', table: 'C', status: '#FFFF00' },
  { name: 'Attendee 4', date: '10.06.26', time: '11:00 AM', table: 'D', status: '#00FF00' },
  // Add more attendees as needed
];

const Attendees = () => {
  const [selectedFilter, setSelectedFilter] = useState('ALL');
  const [filteredAttendees, setFilteredAttendees] = useState(allAttendees);

  const handleFilter = (filter) => {
    setSelectedFilter(filter);
    if (filter === 'ALL') {
      setFilteredAttendees(allAttendees);
    } else {
      const filtered = allAttendees.filter(attendee => {
        if (filter === 'PRESENT') return attendee.status === '#00FF00';
        if (filter === 'ABSENT') return attendee.status === '#F00';
        if (filter === 'LATE') return attendee.status === '#FFFF00';
        return true;
      });
      setFilteredAttendees(filtered);
    }
  };

  const selectedEvent = {
    title: 'Mr. & Mrs. Malik Wedding 2026',
    address: 'Luxe Hotel Lapasan, Cagayan De oro',
    date: 'August 23, 2026',
    time: '9:00 AM - 3:00 PM',
    totalVisitors: 60,
    image: event1Image, // Adjust based on selected event's image
  };

  return (
    <div className="main-container">
      <div className="header-wrapper">
        <h1 className="header-title">
          <span className="title-highlight">Attendee</span> Tracker
        </h1>
        <hr className="title-divider" />
      </div>
      
      <div className="event-chart-wrapper">
        <div className="event-info-wrapper">
          <img
            src={selectedEvent.image}
            alt="Event"
            className="event-img"
          />
          <div className="event-info">
            <h1 className="event-name">{selectedEvent.title}</h1>
            <p className="event-detail">{selectedEvent.address}</p>
            <p className="event-detail">{selectedEvent.date}</p>
            <p className="event-detail">{selectedEvent.time}</p>
            <p className="event-detail">Total Visitors: {selectedEvent.totalVisitors}</p>
          </div>
        </div>
        <div className="chart-wrapper">
          <Pie data={data} options={{ responsive: true, maintainAspectRatio: false }} />
          <div className="chart-legend">
            <span className="legend-item" style={{ color: '#00FF00' }}>Present</span>
            <span className="legend-item" style={{ color: '#F00' }}>Absent</span>
            <span className="legend-item" style={{ color: '#FFFF00' }}>Late</span>
          </div>
        </div>
      </div>

      <div className="filter-wrapper">
        <button
          className={`filter-btn ${selectedFilter === 'ALL' ? 'filter-active' : ''}`}
          onClick={() => handleFilter('ALL')}
        >
          ALL
        </button>
        <button
          className={`filter-btn ${selectedFilter === 'PRESENT' ? 'filter-active' : ''}`}
          onClick={() => handleFilter('PRESENT')}
        >
          PRESENT
        </button>
        <button
          className={`filter-btn ${selectedFilter === 'ABSENT' ? 'filter-active' : ''}`}
          onClick={() => handleFilter('ABSENT')}
        >
          ABSENT
        </button>
        <button
          className={`filter-btn ${selectedFilter === 'LATE' ? 'filter-active' : ''}`}
          onClick={() => handleFilter('LATE')}
        >
          LATE
        </button>
      </div>

      <div className="attendees-table-wrapper">
        <div className="table-header">
          <div className="header-cell">NAME</div>
          <div className="header-cell">DATE & TIME</div>
          <div className="header-cell">TABLE</div>
          <div className="header-cell">STATUS</div>
        </div>
        {filteredAttendees.map((attendee, index) => (
          <div key={index} className="table-row">
            <div className="table-cell">{attendee.name}</div>
            <div className="table-cell">{`${attendee.date} ${attendee.time}`}</div>
            <div className="table-cell">{`TABLE ${attendee.table}`}</div>
            <div className="table-cell">
              <div
                className="status-dot"
                style={{ backgroundColor: attendee.status }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Attendees;
