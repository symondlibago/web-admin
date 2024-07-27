import React, { useState } from 'react';
import './App.css'; // Import your CSS file
import { IoMdAddCircle, IoMdRemoveCircle } from 'react-icons/io';

let inventoryData = [
  { item: "Spoon", noOfItems: 20, noOfSortItems: 0, status: "" },
  { item: "Fork", noOfItems: 40, noOfSortItems: 0, status: "" },
  { item: "Glass", noOfItems: 16, noOfSortItems: 0, status: "" },
  { item: "Plates", noOfItems: 50, noOfSortItems: 0, status: "" },
  { item: "Mug", noOfItems: 35, noOfSortItems: 0, status: "" },
  { item: "Knife", noOfItems: 45, noOfSortItems: 0, status: "" },
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

const Equipment = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [newItem, setNewItem] = useState("");
  const [newItemCount, setNewItemCount] = useState("");
  const [removeMode, setRemoveMode] = useState(false);

  const totalItems = inventoryData.reduce((sum, item) => sum + item.noOfItems, 0);
  const totalBroken = inventoryData.filter(item => item.status === "Broken").length;
  const totalMissing = inventoryData.filter(item => item.status === "Missing").length;

  const handleAddItem = () => {
    if (newItem && newItemCount) {
      inventoryData.push({ item: newItem, noOfItems: parseInt(newItemCount), noOfSortItems: 0, status: "" });
      setNewItem("");
      setNewItemCount("");
      setModalVisible(false);
    }
  };

  const handleRemoveItem = (index) => {
    inventoryData.splice(index, 1);
    setRemoveMode(false); // Exit remove mode after deletion
  };

  return (
    <div className="equipment-container">
      <header className="header-equipment">
        <div className="header-title-equipment">
          <h1 className="header-text-equipment">
            <span className="header-highlight">Equipment</span> Tracker
          </h1>
          <hr className="header-line" />
        </div>      
      </header>

      <div className="table-container-equipment">
        <div className="table-equipment">
          <div className="table-header-equipment">
            <div className="table-header-cell-equipment">ITEMS</div>
            <div className="table-header-cell-equipment">NO. OF ITEMS</div>
            <div className="table-header-cell-equipment">NO. OF SORT ITEMS</div>
            <div className="table-header-cell-equipment">STATUS</div>
          </div>
          {inventoryData.map((item, index) => (
            <div key={index} className="table-row-equipment">
              {removeMode && (
                <button className="remove-button-equipment" onClick={() => handleRemoveItem(index)}>
                  <IoMdRemoveCircle size={24} color="red" />
                </button>
              )}
              <div className="table-cell-equipment">{item.item}</div>
              <div className="table-cell-equipment">{item.noOfItems}</div>
              <div className="table-cell-equipment">{item.noOfSortItems}</div>
              <div className="table-cell-equipment" style={getStatusStyle(item.status)}>
                {item.status}
              </div>
            </div>
          ))}
          <button className="add-button-equipment" onClick={() => setModalVisible(true)}>
            <IoMdAddCircle size={24} color="white" />
            <span>Add Item</span>
          </button>
          <button className="remove-button-equipment" onClick={() => setRemoveMode(!removeMode)}>
            <IoMdRemoveCircle size={24} color="white" />
            <span>Remove Item</span>
          </button>
        </div>

        <div className="summary-equipment">
          <div className="summary-text-equipment">Total Items: {totalItems}</div>
          <div className="summary-text-equipment">Total Items Broken: {totalBroken}</div>
          <div className="summary-text-equipment">Total Items Missing: {totalMissing}</div>
        </div>
      </div>

      {modalVisible && (
        <div className="modal-overlay-equipment">
          <div className="modal-content-equipment">
            <button className="close-button-equipment" onClick={() => setModalVisible(false)}>×</button>
            <h2 className='modal-title-equipment'>Add New Item</h2>
            <div className="modal-input-group-equipment">
              <label>Name of Item</label>
              <input
                type="text"
                value={newItem}
                onChange={(e) => setNewItem(e.target.value)}
                placeholder="Enter item name"
              />
            </div>
            <div className="modal-input-group-equipment">
              <label>No. of Items</label>
              <input
                type="number"
                value={newItemCount}
                onChange={(e) => setNewItemCount(e.target.value)}
                placeholder="Enter number of items"
              />
            </div>
            <button className="modal-button-equipment" onClick={handleAddItem}>Add Item</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Equipment;
