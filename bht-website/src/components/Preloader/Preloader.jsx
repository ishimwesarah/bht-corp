import React from 'react';
import './Preloader.css';
import bhtLogo from '../../assets/logo.png'; // Make sure this path is correct

const Preloader = () => {
  return (
    <div 
      className="preloader-overlay"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: '#E0F0FF',
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        margin: 0,
        padding: 0,
        border: 0
      }}
    >
      <div className="preloader-content">
        <img src={bhtLogo} alt="BHT Corporation Logo" className="preloader-logo" />
        <div className="preloader-dots">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </div>
  );
};

export default Preloader;