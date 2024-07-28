import React from 'react';
import { useNavigate } from 'react-router-dom'; // Use react-router-dom for navigation
import './App.css'; // Import the CSS file for styles

import proPic from './images/pro_pic.png'; // Updated path for image

const initialMessages = [
  { id: '1', name: 'John Doe', message: 'Looking forward to the event!', daysAgo: '1d', unreadCount: 2 },
  { id: '2', name: 'Jane Smith', message: 'Can I get more details?', daysAgo: '3d', unreadCount: 1 },
  { id: '3', name: 'Emily Johnson', message: 'Excited to attend!', daysAgo: '5d', unreadCount: 0 },
  // Add more message data as needed
];

const Messages = () => {
  const navigate = useNavigate(); // Use react-router-dom for navigation

  const handleBack = () => {
    navigate(-1); // Navigate back
  };

  return (
    <div className="gradientContainer-messages">
      <button onClick={handleBack} className="closeButton-messages">
        &#x2715; {/* Close icon */}
      </button>
      <div className="scrollViewContent-messages">
        {initialMessages.map((message) => (
          <div key={message.id} className="messageContainer-messages">
            <img src={proPic} alt="Profile" className="profileImage-messages" />
            <div className="messageContent-messages">
              <p className="senderName-messages">{message.name}</p>
              <p className="messagePreview-messages">{message.message}</p>
            </div>
            <div className="messageDetails-messages">
              <p className="daysAgo-messages">{message.daysAgo}</p>
              {message.unreadCount > 0 && (
                <div className="reminderCircle-messages">
                  <p className="reminderText-messages">{message.unreadCount}</p>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Messages;
