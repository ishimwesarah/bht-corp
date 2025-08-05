import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaSearch, FaTimes } from 'react-icons/fa';
import { Link } from 'react-router-dom';

// Import all our service data to search through
import { allTechServices, allDesignServices } from '../../data/fullServiceData';
import './SearchModal.css';

const allServices = [...allTechServices, ...allDesignServices];

const SearchModal = ({ isOpen, onClose }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  // Perform search whenever the search term changes
  useEffect(() => {
    if (searchTerm.trim() === '') {
      setSearchResults([]);
      return;
    }

    const filtered = allServices.filter(service => 
      service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      service.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setSearchResults(filtered);
  }, [searchTerm]);

  // Handle closing the modal with the Escape key
  useEffect(() => {
    const handleEsc = (event) => {
      if (event.keyCode === 27) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEsc);

    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, [onClose]);

  // Reset search term when modal closes
  useEffect(() => {
      if (!isOpen) {
          setSearchTerm('');
      }
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="search-modal-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="search-modal-content">
            <div className="search-input-wrapper">
              <FaSearch className="search-input-icon" />
              <input
                type="text"
                placeholder="Search for services, e.g., 'website' or 'logo'..."
                className="search-input"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                autoFocus
              />
              <button className="close-btn" onClick={onClose}>
                <FaTimes />
              </button>
            </div>

            <div className="search-results-container">
              {searchTerm && searchResults.length > 0 && (
                <ul className="search-results-list">
                  {searchResults.map(service => (
                    <li key={service.id}>
                      <Link to={`/services/${service.id}`} className="search-result-item" onClick={onClose}>
                        <div className="result-icon">{React.createElement(service.icon)}</div>
                        <div className="result-text">
                          <h4>{service.name}</h4>
                          <p>{service.description}</p>
                        </div>
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
              {searchTerm && searchResults.length === 0 && (
                <p className="no-results">No services found for "{searchTerm}"</p>
              )}
            </div>
            <div className="search-modal-footer">Press Esc to close</div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SearchModal;