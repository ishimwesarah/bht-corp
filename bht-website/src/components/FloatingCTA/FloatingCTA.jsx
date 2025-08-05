import React from 'react';
import { Link } from 'react-router-dom';
import { FaPaperPlane } from 'react-icons/fa';
import './FloatingCTA.css';

const FloatingCTA = () => {
  return (
    <Link to="/contact" className="floating-cta">
      <FaPaperPlane className="floating-cta-icon" />
      <span>Get a Quote</span>
    </Link>
  );
};

export default FloatingCTA;