import React, { useState, useEffect, useRef } from 'react'; // <-- Import useRef and useEffect
import { motion, AnimatePresence } from 'framer-motion';
import { FaPlus, FaMinus, FaCheckCircle } from 'react-icons/fa';
import './Services.css';

import { allTechServices, allDesignServices } from '../../data/fullServiceData';
import PageHero from '../../components/PageHero/PageHero';
import Button from '../../components/Button/Button';

const Services = () => {
  const [activeTab, setActiveTab] = useState('tech');
  const [activeService, setActiveService] = useState(allTechServices[0]);

  // --- NEW: Refs to get the DOM elements of the tabs ---
  const techTabRef = useRef(null);
  const designTabRef = useRef(null);
  
  // --- NEW: State to hold the style of the sliding indicator ---
  const [indicatorStyle, setIndicatorStyle] = useState({});

  // --- NEW: This effect runs whenever the activeTab changes ---
  useEffect(() => {
    // Determine which tab is currently active
    const activeTabElement = activeTab === 'tech' ? techTabRef.current : designTabRef.current;
    
    // If the element exists, measure it and update the indicator's style
    if (activeTabElement) {
      setIndicatorStyle({
        left: activeTabElement.offsetLeft,
        width: activeTabElement.offsetWidth,
      });
    }
  }, [activeTab]); // This effect re-runs every time 'activeTab' changes

  const servicesToDisplay = activeTab === 'tech' ? allTechServices : allDesignServices;

  const handleServiceClick = (service) => {
    setActiveService(service);
  };
  
  const handleTabClick = (tab) => {
    setActiveTab(tab);
    const newActiveService = tab === 'tech' ? allTechServices[0] : allDesignServices[0];
    setActiveService(newActiveService);
  };

  return (
    <div className="services-page-container">
      <PageHero 
        title="Our Full Suite of Services"
        tagline="Your Vision, Our Expertise. Explore our capabilities in technology and creative design."
      />

      <div className="services-content-wrapper">
        <div className="container">
          {/* --- The Tab Container now has the sliding indicator inside --- */}
          <div className="services-tabs">
            <button 
              ref={techTabRef} // <-- Attach the ref
              className={`tab-btn ${activeTab === 'tech' ? 'active' : ''}`}
              onClick={() => handleTabClick('tech')}
            >
              Technology Solutions
            </button>
            <button 
              ref={designTabRef} // <-- Attach the ref
              className={`tab-btn ${activeTab === 'design' ? 'active' : ''}`}
              onClick={() => handleTabClick('design')}
            >
              Graphic Design Services
            </button>
            {/* The animated sliding indicator */}
            <div className="tab-indicator" style={indicatorStyle}></div>
          </div>

          <div className="services-content-grid">
            {/* --- LEFT COLUMN: SERVICE LIST --- */}
            <div className="service-list-column">
              {/* This section uses AnimatePresence to smoothly switch between tab content */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab} // The key ensures the animation runs when the tab changes
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  {servicesToDisplay.map((service) => (
                    <div 
                      key={service.id} 
                      className={`service-list-item ${activeService.id === service.id ? 'active' : ''}`}
                      onClick={() => handleServiceClick(service)}
                    >
                      <div className="service-list-icon-wrapper">
                        {React.createElement(service.icon)}
                      </div>
                      <div className="service-list-text">
                        <h4>{service.name}</h4>
                        <p>{service.description}</p>
                      </div>
                    </div>
                  ))}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* --- RIGHT COLUMN: DYNAMIC CONTENT PANE --- */}
            <div className="service-detail-pane">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeService.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4, ease: 'easeInOut' }}
                >
                  <div className="detail-pane-image-frame">
                    <img src={activeService.image} alt={activeService.name} />
                  </div>
                  <div className="detail-pane-content">
                    <h3>What's Included:</h3>
                    <ul className="deliverables-list">
                      {activeService.deliverables.map((item, index) => (
                        <li key={index}><FaCheckCircle /> {item}</li>
                      ))}
                    </ul>
                    <Button to="/contact" buttonStyle="btn--primary" buttonSize="btn--large">
                      {activeService.ctaText}
                    </Button>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;