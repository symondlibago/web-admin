import React from 'react';
import './App.css'; // Import your CSS file

const inventoryData = [
  { item: "Spoon", noOfItems: 20, noOfSortItems: 20, status: "Complete" },
  { item: "Fork", noOfItems: 40, noOfSortItems: 20, status: "Missing" },
  { item: "Glass", noOfItems: 16, noOfSortItems: 20, status: "Broken" },
  { item: "Plates", noOfItems: 50, noOfSortItems: 20, status: "Broken" },
  { item: "Mug", noOfItems: 35, noOfSortItems: 20, status: "Missing" },
  { item: "Knife", noOfItems: 45, noOfSortItems: 20, status: "Complete" },
];

const getStatusStyle = (status) => {
  switch (status) {
    case "Complete":
      return { color: "green" };
    case "Missing":
      return { color: "orange" };
    case "Broken":
      return { color: "red" };
    default:
      return { color: "white" };
  }
};

const Inventory = () => {
  const totalItems = inventoryData.reduce((sum, item) => sum + item.noOfItems, 0);
  const totalBroken = inventoryData.filter(item => item.status === "Broken").length;
  const totalMissing = inventoryData.filter(item => item.status === "Missing").length;

  return (
    <div className="inventory-container">
      <div className="content-inventory">
        <div className="header-section-inventory">
          <h1 className="header-text">
            <span className="header-highlight">Inventory</span> Tracker
          </h1>
          <hr className="header-linee" />
        </div>
        <div className="table">
          <div className="table-header">
            <div className="table-header-text">ITEMS</div>
            <div className="table-header-text">NO. OF ITEMS</div>
            <div className="table-header-text">NO. OF SORT ITEMS</div>
            <div className="table-header-text">STATUS</div>
          </div>
          {inventoryData.map((item, index) => (
            <div key={index} className="table-row">
              <div className="table-row-text">{item.item}</div>
              <div className="table-row-text">{item.noOfItems}</div>
              <div className="table-row-text">{item.noOfSortItems}</div>
              <div className="table-row-text" style={getStatusStyle(item.status)}>
                {item.status}
              </div>
            </div>
          ))}
        </div>
        <div className="summary">
          <div className="summary-text">Total Items: {totalItems}</div>
          <div className="summary-text">Total Items Broken: {totalBroken}</div>
          <div className="summary-text">Total Items Missing: {totalMissing}</div>
        </div>
      </div>
    </div>
  );
};

export default Inventory;
