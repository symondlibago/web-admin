import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css'; // Import your CSS file
import { IoMdAddCircle, IoMdRemoveCircle } from 'react-icons/io';

const Equipment = () => {
  const [inventoryData, setInventoryData] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [newItem, setNewItem] = useState("");
  const [newItemCount, setNewItemCount] = useState("");
  const [removeMode, setRemoveMode] = useState(false);

  useEffect(() => {
    fetchInventory();
  }, []);

  const fetchInventory = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/equipment');
      console.log(response.data); // Add this line
      setInventoryData(response.data);
    } catch (error) {
      console.error("There was an error fetching the inventory data:", error);
    }
  };
  

  const handleAddItem = async () => {
    if (newItem && newItemCount) {
      try {
        await axios.post('http://localhost:8000/api/equipment', {
          item: newItem,
          number_of_items: parseInt(newItemCount),
          number_of_sort_items: 0,
          status: "",
        });
        fetchInventory();
        setNewItem("");
        setNewItemCount("");
        setModalVisible(false);
      } catch (error) {
        console.error("There was an error adding the item:", error);
      }
    }
  };

  const handleRemoveItem = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/api/equipment/${id}`);
      fetchInventory();
      setRemoveMode(false);
    } catch (error) {
      console.error("There was an error removing the item:", error);
    }
  };

  const totalItems = inventoryData.reduce((sum, item) => sum + item.number_of_items, 0);
  const totalBroken = inventoryData.filter(item => item.status === "Broken").length;
  const totalMissing = inventoryData.filter(item => item.status === "Missing").length;

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
          {inventoryData.map((item) => (
            <div key={item.event_id} className="table-row-equipment">
              {removeMode && (
                <button className="remove-button-equipment" onClick={() => handleRemoveItem(item.event_id)}>
                  <IoMdRemoveCircle size={24} color="red" />
                </button>
              )}
              <div className="table-cell-equipment">{item.item}</div>
              <div className="table-cell-equipment">{item.number_of_items}</div>
              <div className="table-cell-equipment">{item.number_of_sort_items}</div>
              <div className="table-cell-equipment" style={{ color: item.status === "Broken" ? 'red' : 'black' }}>
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
