import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaArrowUp, FaCommentDots } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import './FloatingActionButtons.css';

const FloatingActionButtons = () => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    if (window.pageYOffset > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);
    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  return (
    <div className="fab-container">
      {/* The "Contact Us" button is always visible */}
      <Link to="/contact" className="fab contact-fab">
        <FaCommentDots className="fab-icon" />
        <span className="fab-text">Contact Us</span>
      </Link>

      {/* The "Scroll to Top" button appears on scroll */}
      {/* <AnimatePresence>
        {isVisible && (
          <motion.button
            className="fab scroll-fab"
            onClick={scrollToTop}
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.9 }}
            transition={{ duration: 0.3 }}
          >
            <FaArrowUp className="fab-icon" />
            <span className="fab-text">Go Up</span>
          </motion.button>
        )}
      </AnimatePresence> */}
    </div>
  );
};

export default FloatingActionButtons;