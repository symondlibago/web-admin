import React, { useState } from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import './App.css';
import event1Image from './images/event1.png'; // Adjust the path to your local images
import { FaPlus, FaTimes, FaMinus } from 'react-icons/fa';

// Register the necessary components for Chart.js
ChartJS.register(ArcElement, Tooltip, Legend);

// Sample data for the pie chart
const getChartData = (attendees) => {
  const presentCount = attendees.filter(att => att.status === '#00FF00').length;
  const absentCount = attendees.filter(att => att.status === '#F00').length;
  const lateCount = attendees.filter(att => att.status === '#FFFF00').length;

  return {
    labels: ['Present', 'Absent', 'Late'],
    datasets: [
      {
        data: [presentCount, absentCount, lateCount],
        backgroundColor: ['#00FF00', '#F00', '#FFFF00'], // Present color is green
        borderColor: '#000',
        borderWidth: 1,
      },
    ],
  };
};

// Sample data for attendees with unique ids
const initialAttendees = [
  { id: 1, name: 'Attendee 1', date: '2026-10-03', table: 'A', status: '#00FF00' },
  { id: 2, name: 'Attendee 2', date: '2026-10-04', table: 'B', status: '#F00' },
  { id: 3, name: 'Attendee 3', date: '2026-10-05', table: 'C', status: '#FFFF00' },
  { id: 4, name: 'Attendee 4', date: '2026-10-06', table: 'D', status: '#00FF00' },
  // Add more attendees as needed
];

const Attendees = () => {
  const [selectedFilter, setSelectedFilter] = useState('ALL');
  const [attendees, setAttendees] = useState(initialAttendees);
  const [showOverlay, setShowOverlay] = useState(false);
  const [newAttendee, setNewAttendee] = useState({ id: 0, name: '', date: '', table: '', status: '#00FF00' });
  const [showRemovePopup, setShowRemovePopup] = useState(false);
  const [attendeeToRemove, setAttendeeToRemove] = useState(null);

  const handleFilter = (filter) => {
    setSelectedFilter(filter);
  };

  const filteredAttendees = attendees.filter(attendee => {
    if (selectedFilter === 'ALL') return true;
    if (selectedFilter === 'PRESENT') return attendee.status === '#00FF00';
    if (selectedFilter === 'ABSENT') return attendee.status === '#F00';
    if (selectedFilter === 'LATE') return attendee.status === '#FFFF00';
    return true;
  });

  const handleStatusChange = (index, status) => {
    const updatedAttendees = [...attendees];
    updatedAttendees[index].status = status;
    setAttendees(updatedAttendees);
  };

  const handleAddAttendee = () => {
    setShowOverlay(true);
  };

  const handleInsertAttendee = () => {
    // Generate a new unique id
    const newId = Math.max(...attendees.map(att => att.id), 0) + 1;
    setAttendees([...attendees, { ...newAttendee, id: newId }]);
    setNewAttendee({ id: 0, name: '', date: '', table: '', status: '#00FF00' });
    // Do not close the overlay to add another attendee
  };

  const handleOverlayChange = (e) => {
    const { name, value } = e.target;
    setNewAttendee({ ...newAttendee, [name]: value });
  };

  const handleRemoveClick = (attendee) => {
    setAttendeeToRemove(attendee);
    setShowRemovePopup(true);
  };

  const handleConfirmRemove = () => {
    setAttendees(attendees.filter(att => att !== attendeeToRemove));
    setShowRemovePopup(false);
  };

  const handleCancelRemove = () => {
    setShowRemovePopup(false);
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
          <Pie data={getChartData(attendees)} options={{ responsive: true, maintainAspectRatio: false }} />
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
        <button className="add-attendee-btn" onClick={handleAddAttendee}>
          <FaPlus /> Add Attendee
        </button>
      </div>

      <div className="attendees-table-wrapper">
        <div className="table-header">
          <div className="header-cell">REMOVE</div>
          <div className="header-cell">NAME</div>
          <div className="header-cell">DATE</div>
          <div className="header-cell">TABLE</div>
          <div className="header-cell">STATUS</div>
        </div>
        {filteredAttendees.map((attendee, index) => (
          <div key={attendee.id} className="table-row">
            <div className="table-cell">
              <button className="remove-btn" onClick={() => handleRemoveClick(attendee)}>
                <FaMinus />
              </button>
            </div>
            <div className="table-cell">{attendee.name}</div>
            <div className="table-cell">{attendee.date}</div>
            <div className="table-cell">{`TABLE ${attendee.table}`}</div>
            <div className="table-cell">
              <div className="status-dots">
                <div
                  className={`status-dot ${attendee.status === '#00FF00' ? 'active' : ''}`}
                  style={{ backgroundColor: '#00FF00' }}
                  onClick={() => handleStatusChange(index, '#00FF00')}
                />
                <div
                  className={`status-dot ${attendee.status === '#F00' ? 'active' : ''}`}
                  style={{ backgroundColor: '#F00' }}
                  onClick={() => handleStatusChange(index, '#F00')}
                />
                <div
                  className={`status-dot ${attendee.status === '#FFFF00' ? 'active' : ''}`}
                  style={{ backgroundColor: '#FFFF00' }}
                  onClick={() => handleStatusChange(index, '#FFFF00')}
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Overlay for adding a new attendee */}
      {showOverlay && (
        <div className="overlay">
          <div className="overlay-content">
          <button className="close-btn" onClick={() => setShowOverlay(false)}><FaTimes /></button>
            <h2>Add New Attendee</h2>
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={newAttendee.name}
              onChange={handleOverlayChange}
            />
            <input
              type="date"
              name="date"
              placeholder="Date"
              value={newAttendee.date}
              onChange={handleOverlayChange}
            />
            <input
              type="text"
              name="table"
              placeholder="Table"
              value={newAttendee.table}
              onChange={handleOverlayChange}
            />
            
            <button className="insert-btn" onClick={handleInsertAttendee}>Insert Attendee</button>
          </div>
        </div>
      )}

      {/* Confirmation Popup */}
      {showRemovePopup && (
        <div className="remove-popup">
          <div className="popup-content">
            <h2>Confirm Removal</h2>
            <p>Are you sure you want to remove this attendee?</p>
            <button onClick={handleConfirmRemove}>Yes, Remove</button>
            <button onClick={handleCancelRemove}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Attendees;
