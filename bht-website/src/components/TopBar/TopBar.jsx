import React from 'react';
import { FaPhoneAlt, FaEnvelope, FaFacebook, FaInstagram, FaTwitter, FaYoutube } from 'react-icons/fa';
import './TopBar.css';

const TopBar = () => {
  return (
    <div className="top-bar">
      <div className="top-bar-container container">
        <div className="top-bar-contact">
          <a href="tel:+250784589508" className="contact-item">
            <FaPhoneAlt />
            <span>+250 784 589 508</span>
          </a>
          <a href="mailto:bhtcorpor@gmail.com" className="contact-item">
            <FaEnvelope />
            <span>bhtcorpor@gmail.com</span>
          </a>
        </div>
        <div className="top-bar-socials">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"><FaFacebook /></a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"><FaTwitter /></a>
          <a href="https://youtube.com" target="_blank" rel="noopener noreferrer"><FaYoutube /></a>
        </div>
      </div>
    </div>
  );
};

export default TopBar;