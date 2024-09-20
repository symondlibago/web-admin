import React, { useState } from 'react';
import './App.css'; // Import your CSS file

const inventoryData = [
  { item: "Spoon", noOfItems: 20, noOfSortItems: 20, status: "Complete" },
  { item: "Fork", noOfItems: 40, noOfSortItems: 20, status: "Missing" },
  { item: "Glass", noOfItems: 16, noOfSortItems: 20, status: "Broken" },
  { item: "Plates", noOfItems: 50, noOfSortItems: 20, status: "Broken" },
  { item: "Mug", noOfItems: 35, noOfSortItems: 20, status: "Missing" },
  { item: "Knife", noOfItems: 45, noOfSortItems: 20, status: "Complete" },
];

const Inventory = () => {
  const [inventory, setInventory] = useState(inventoryData);
  const [selectedStatus, setSelectedStatus] = useState({}); // Track selected status for each item

  const handleStatusChange = (index, newStatus) => {
    const updatedInventory = [...inventory];
    updatedInventory[index].status = newStatus;
    setInventory(updatedInventory);
    setSelectedStatus({ ...selectedStatus, [index]: newStatus }); // Update selected status
  };

  const totalItems = inventory.reduce((sum, item) => sum + item.noOfItems, 0);
  const totalBroken = inventory.filter(item => item.status === "Broken").length;
  const totalMissing = inventory.filter(item => item.status === "Missing").length;

  const renderStatusDot = (status, index) => {
    const colors = {
      Complete: 'green',
      Missing: 'orange',
      Broken: 'red',
    };

    return (
      <div className="status-dots-inventory">
        {Object.keys(colors).map((statusOption) => (
          <div
            key={statusOption}
            onClick={() => handleStatusChange(index, statusOption)}
            className="status-dot-inventory"
            style={{
              backgroundColor: colors[statusOption],
              opacity: status === statusOption ? 1 : 0.5, // Darken unselected dots
              border: status === statusOption ? '2px solid black' : 'none',
            }}
          />
        ))}
        {/* Display the selected status label */}
        <span className="status-label-inventory">
          {selectedStatus[index] || 'Select Status'}
        </span>
      </div>
    );
  };

  return (
    <div className="inventory-container">
      <div className="content-inventory">
        <div className="header-section-inventory">
          <h1 className="header-text-inventory">
            <span className="header-highlight-inventory">Inventory</span> Tracker
          </h1>
          <hr className="header-line-inventory" />
        </div>
        <div className="table-inventory">
          <div className="table-header-inventory">
            <div className="table-header-text-inventory">ITEMS</div>
            <div className="table-header-text-inventory">NO. OF ITEMS</div>
            <div className="table-header-text-inventory">NO. OF SORT ITEMS</div>
            <div className="table-header-text-inventory">STATUS</div>
          </div>
          {inventory.map((item, index) => (
            <div key={index} className="table-row-inventory">
              <div className="table-row-text-inventory">{item.item}</div>
              <div className="table-row-text-inventory">{item.noOfItems}</div>
              <div className="table-row-text-inventory">{item.noOfSortItems}</div>
              <div className="table-row-text-inventory">
                {renderStatusDot(item.status, index)}
              </div>
            </div>
          ))}
        </div>
        <div className="summary-inventory">
          <div className="summary-text-inventory">Total Items: {totalItems}</div>
          <div className="summary-text-inventory">Total Items Broken: {totalBroken}</div>
          <div className="summary-text-inventory">Total Items Missing: {totalMissing}</div>
        </div>
      </div>
    </div>
  );
};

export default Inventory;
