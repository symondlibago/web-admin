import React, { useState } from 'react';
import package1 from './images/package1.png';
import package2 from './images/package2.png';
import package3 from './images/package3.png';
import package4 from './images/package4.png';
import { useNavigate } from 'react-router-dom';
import { FaArrowRight, FaTimes } from 'react-icons/fa';
import './App.css'; // External CSS file

const ChoosePackage = () => {
  const [selectedPackage, setSelectedPackage] = useState(null); // Track selected package
  const [isOverlayOpen, setIsOverlayOpen] = useState(false);    // Track overlay visibility
  const navigate = useNavigate();


  // Function to handle opening the overlay
  const openOverlay = (pkg) => {
    setSelectedPackage(pkg);
    setIsOverlayOpen(true);
  };

  // Function to close the overlay
  const closeOverlay = () => {
    setIsOverlayOpen(false);
    setSelectedPackage(null);
  };

  return (
    <div className="container-choosepackage">
      {/* Header */}
      <h1 className="header-choosepackage">Choose Package</h1>

      {/* Customization Button */}
      <button className="customize-btn-choosepackage" onClick={()=> navigate('/choose-service-provider')}>
        Click here if you want to customize <FaArrowRight />
      </button>

      {/* Package Images Container */}
      <div className="packages-row-choosepackage">
        {[package1, package2, package3, package4].map((pkg, index) => (
          <div key={index} className="package-choosepackage">
            <img src={pkg} alt={`Package ${index + 1}`} className="image-choosepackage" />
            <button 
              className="choose-btn-choosepackage" 
              onClick={() => openOverlay(pkg)}>
              Choose
            </button>
          </div>
        ))}
      </div>

      {/* Next Button at the Footer */}
      <button className="next-btn-choosepackage" onClick={() => navigate('/add-guest')}>Next</button>

      {/* Overlay for Image Details */}
      {isOverlayOpen && (
        <div className="overlay-choosepackage">
          <div className="overlay-content-choosepackage">
            {/* Overlay Header */}
            <h2 className="overlay-header-choosepackage">Chosen Package</h2>
            <button className="close-btn-choosepackage" onClick={closeOverlay}>
              <FaTimes />
            </button>
            {/* Enlarged Image */}
            <img src={selectedPackage} alt="Selected Package" className="overlay-image-choosepackage" />
            {/* Confirm Button */}
            <button className="confirm-btn-choosepackage" onClick={closeOverlay}>
              Confirm
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChoosePackage;
