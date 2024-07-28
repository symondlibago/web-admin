import React, { useState } from 'react';
import './App.css'; // Import the CSS file for styling
import { useNavigate } from 'react-router-dom';

const initialGuests = [
  { id: '1', name: 'John Doe', role: 'Speaker', mobile: '123-456-7890', email: 'john.doe@example.com' },
  { id: '2', name: 'Jane Smith', role: 'Attendee', mobile: '098-765-4321', email: 'jane.smith@example.com' },
  { id: '3', name: 'Emily Johnson', role: 'Organizer', mobile: '111-222-3333', email: 'emily.johnson@example.com' },
  // Add more guest data as needed
];

const GroupAttendees = () => {
  const navigate = useNavigate();
  const [guests, setGuests] = useState(initialGuests);
  const [selectedGuest, setSelectedGuest] = useState(null);
  const [isEditModalVisible, setEditModalVisible] = useState(false);
  const [isDeleteModalVisible, setDeleteModalVisible] = useState(false);
  const [isEditGuestModalVisible, setEditGuestModalVisible] = useState(false);

  const handleEditGuest = () => {
    setEditModalVisible(true);
    setEditGuestModalVisible(true);
  };

  const handleDeleteGuest = () => {
    setDeleteModalVisible(true);
  };

  const handleSaveEdit = () => {
    if (selectedGuest) {
      setGuests(guests.map(guest =>
        guest.id === selectedGuest.id ? selectedGuest : guest
      ));
    }
    setEditGuestModalVisible(false);
    setEditModalVisible(false);
  };

  const handleConfirmDelete = () => {
    setGuests(guests.filter(guest => guest.id !== selectedGuest.id));
    setDeleteModalVisible(false);
    setEditModalVisible(false);
  };

  const renderItem = (item) => (
    <tr key={item.id} onClick={() => { setSelectedGuest(item); setEditModalVisible(true); }} className="row-groupattendee">
      <td className="cell-groupattendee cellNo-groupattendee">{item.id}</td>
      <td className="cell-groupattendee cellName-groupattendee">{item.name}</td>
      <td className="cell-groupattendee cellRole-groupattendee">{item.role}</td>
      <td className="cell-groupattendee cellMobile-groupattendee">{item.mobile}</td>
      <td className="cell-groupattendee cellEmail-groupattendee">{item.email}</td>
    </tr>
  );

  return (
    <div className="container-groupattendee">
      <h1 className="headerText-groupattendee">Group Attendees</h1>
      <div className="line-groupattendee"></div>
      <h2 className="eventTypesText-groupattendee">People In Event</h2>
      <div className="tableContainer-groupattendee">
        <table className="table-groupattendee">
          <thead>
            <tr className="headerRow-groupattendee">
              <th className="headerCell-groupattendee headerNo-groupattendee">No.</th>
              <th className="headerCell-groupattendee headerName-groupattendee">Name</th>
              <th className="headerCell-groupattendee headerRole-groupattendee">Role</th>
              <th className="headerCell-groupattendee headerMobile-groupattendee">Mobile Number</th>
              <th className="headerCell-groupattendee headerEmail-groupattendee">Email</th>
            </tr>
          </thead>
          <tbody>
            {guests.map(renderItem)}
          </tbody>
        </table>
      </div>
      {/* Edit/Delete Modal */}
      {isEditModalVisible && (
        <div className="modal-groupattendee">
          <div className="modalContent-groupattendee">
            <h2 className="modalTitle-groupattendee">Edit or Delete Guest</h2>
            <button onClick={handleEditGuest} className="edit">Edit Guest</button>
            <button onClick={handleDeleteGuest} className="delete">Delete Guest</button>
            <button onClick={() => setEditModalVisible(false)} className="close">Close</button>
          </div>
        </div>
      )}
      {/* Edit Guest Modal */}
      {isEditGuestModalVisible && (
        <div className="modal-groupattendee">
          <div className="modalContent-groupattendee">
            <h2 className="modalTitle-groupattendee">Edit Guest</h2>
            <input
              className="input-groupattendee"
              placeholder="Name"
              value={selectedGuest?.name || ''}
              onChange={(e) => setSelectedGuest({ ...selectedGuest, name: e.target.value })}
            />
            <input
              className="input-groupattendee"
              placeholder="Role"
              value={selectedGuest?.role || ''}
              onChange={(e) => setSelectedGuest({ ...selectedGuest, role: e.target.value })}
            />
            <input
              className="input-groupattendee"
              placeholder="Mobile Number"
              value={selectedGuest?.mobile || ''}
              onChange={(e) => setSelectedGuest({ ...selectedGuest, mobile: e.target.value })}
            />
            <input
              className="input-groupattendee"
              placeholder="Email"
              value={selectedGuest?.email || ''}
              onChange={(e) => setSelectedGuest({ ...selectedGuest, email: e.target.value })}
            />
            <button onClick={handleSaveEdit} className="edit">Save</button>
            <button onClick={() => setEditGuestModalVisible(false)} className="close">Close</button>
          </div>
        </div>
      )}
      {/* Delete Confirmation Modal */}
      {isDeleteModalVisible && (
        <div className="modal-groupattendee">
          <div className="modalContent-groupattendee">
            <h2 className="modalTitle-groupattendee">Are you sure you want to delete this guest?</h2>
            <button onClick={handleConfirmDelete} className="delete">Confirm</button>
            <button onClick={() => setDeleteModalVisible(false)} className="close">Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default GroupAttendees;
