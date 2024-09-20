import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './App.css';
import proPic from './images/pro_pic.png';

const initialMessages = [
  { id: '1', name: 'John Doe', message: 'Looking forward to the event!', daysAgo: '1d', unreadCount: 2, replies: [] },
  { id: '2', name: 'Jane Smith', message: 'Can I get more details?', daysAgo: '3d', unreadCount: 1, replies: [] },
  { id: '3', name: 'Emily Johnson', message: 'Excited to attend!', daysAgo: '5d', unreadCount: 0, replies: [] },
];

const Messages = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [reply, setReply] = useState('');
  const [messages, setMessages] = useState(initialMessages);
  const [selectedMessage, setSelectedMessage] = useState(null);

  const handleBack = () => {
    navigate(-1);
  };

  const handleReplyClick = (message) => {
    setSelectedMessage(message);
    setIsModalOpen(true);
  };

  const handleSendMessage = () => {
    if (reply.trim() === '') return; // Prevent empty replies

    const updatedMessages = messages.map((msg) => {
      if (msg.id === selectedMessage.id) {
        const newReplies = [...msg.replies, reply];
        return {
          ...msg,
          replies: newReplies, // Add reply to the selected message
        };
      }
      return msg;
    });

    setMessages(updatedMessages);
    setReply(''); // Clear the input

    // Update selectedMessage to show the latest reply immediately
    const newSelectedMessage = updatedMessages.find(msg => msg.id === selectedMessage.id);
    setSelectedMessage(newSelectedMessage);
  };

  return (
    <div className="gradientContainer-messages">
      <button onClick={handleBack} className="closeButton-messages">
        &#x2715;
      </button>
      <div className="scrollViewContent-messages">
        {messages.map((message) => (
          <div key={message.id} className="messageContainer-messages" onClick={() => handleReplyClick(message)}>
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

      {isModalOpen && selectedMessage && (
        <div className="modal-messages">
          <div className="modalContent-messages">
            <h3>Reply to {selectedMessage.name}</h3>
            <p><strong>Message:</strong> {selectedMessage.message}</p>
            <p className="messageTime-messages">{selectedMessage.daysAgo}</p>
            
            {/* Display all replies */}
            <div className="repliesContainer-messages">
              {selectedMessage.replies.map((reply, index) => (
                <p key={index} className="replyMessage-messages">{reply}</p>
              ))}
            </div>
            
            <textarea
              className="replyInput-messages"
              value={reply}
              onChange={(e) => setReply(e.target.value)}
              placeholder="Type your message here..."
            />
            <button className="sendButton-messages" onClick={handleSendMessage}>Send Message</button>
            <button className="closeButton-modal" onClick={() => setIsModalOpen(false)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Messages;
