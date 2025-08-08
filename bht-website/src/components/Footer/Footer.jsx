import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebook, FaInstagram, FaYoutube, FaTwitter } from 'react-icons/fa';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer-container">
      <div className="footer-content container">
        <div className="footer-section footer-about">
          <h3 className="footer-logo">BHT Corporation</h3>
          <p>
            Delivering exceptional design and IT solutions that inspire, captivate, and push the boundaries of innovation.
          </p>
          <div className="footer-socials">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"><FaFacebook /></a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer"><FaYoutube /></a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"><FaTwitter /></a>
          </div>
        </div>

        <div className="footer-section footer-links">
          <h4>Quick Links</h4>
          <ul>
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/services">Services</Link></li>
            <li><Link to="/contact">Contact</Link></li>
            <li><a href="#">Privacy Policy</a></li>
          </ul>
        </div>

        <div className="footer-section footer-contact">
          <h4>Contact Us</h4>
          <ul>
            <li>Musanze – Rwanda</li>
            <li>+250 784 589 508</li>
            <li>bhtcorpor@gmail.com</li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        © {new Date().getFullYear()} BHT Corporation Ltd. All Rights Reserved.
        <p>Guided by Faith, Driven by Excellence.</p>
      </div>
    </footer>
  );
};

export default Footer;