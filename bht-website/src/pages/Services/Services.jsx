import React, { useState, useEffect, useRef } from 'react'; // <-- useRef and useEffect are back
import { motion, AnimatePresence } from 'framer-motion';
import { FaPlus, FaMinus, FaCheckCircle, FaTimes } from 'react-icons/fa'; // <-- Added FaTimes for modal
import './Services.css';

import { allTechServices, allDesignServices } from '../../data/fullServiceData';
import PageHero from '../../components/PageHero/PageHero';
import Button from '../../components/Button/Button';

// A small, reusable component for the detail content to keep our code DRY
const ServiceDetailContent = ({ service }) => (
  <>
    <div className="detail-pane-image-frame">
      <img src={service.image} alt={service.name} />
    </div>
    <div className="detail-pane-content">
      <h3>What's Included:</h3>
      <ul className="deliverables-list">
        {service.deliverables.map((item, index) => (
          <li key={index}><FaCheckCircle /> {item}</li>
        ))}
      </ul>
      <Button to="/contact" buttonStyle="btn--primary" buttonSize="btn--large">
        {service.ctaText}
      </Button>
    </div>
  </>
);

const Services = () => {
  const [activeTab, setActiveTab] = useState('tech');
  const [activeService, setActiveService] = useState(allTechServices[0]);
  const [mobileOpenId, setMobileOpenId] = useState(null);
  
  // --- TABS ARE BACK: Refs to get the DOM elements of the tabs ---
  const techTabRef = useRef(null);
  const designTabRef = useRef(null);
  const [indicatorStyle, setIndicatorStyle] = useState({});

  // --- TABS ARE BACK: This effect runs whenever the activeTab changes ---
  useEffect(() => {
    const activeTabElement = activeTab === 'tech' ? techTabRef.current : designTabRef.current;
    if (activeTabElement) {
      setIndicatorStyle({
        left: activeTabElement.offsetLeft,
        width: activeTabElement.offsetWidth,
      });
    }
  }, [activeTab]);

  const servicesToDisplay = activeTab === 'tech' ? allTechServices : allDesignServices;

  const handleServiceClick = (service) => {
    setActiveService(service);
    if (window.innerWidth <= 960) {
      setMobileOpenId(prevId => (prevId === service.id ? null : service.id));
    }
  };
  
  const handleTabClick = (tab) => {
    setActiveTab(tab);
    const newActiveService = tab === 'tech' ? allTechServices[0] : allDesignServices[0];
    setActiveService(newActiveService);
    setMobileOpenId(null);
  };

  return (
    <div className="services-page-container">
      <PageHero 
        title="Our Full Suite of Services"
        tagline="Your Vision, Our Expertise. Explore our capabilities in technology and creative design."
      />

      <div className="services-content-wrapper">
        <div className="container">

          {/* --- THE TABS ARE BACK AND FULLY FUNCTIONAL --- */}
          <div className="services-tabs">
            <button 
              ref={techTabRef}
              className={`tab-btn ${activeTab === 'tech' ? 'active' : ''}`}
              onClick={() => handleTabClick('tech')}
            >
              Technology Solutions
            </button>
            <button 
              ref={designTabRef}
              className={`tab-btn ${activeTab === 'design' ? 'active' : ''}`}
              onClick={() => handleTabClick('design')}
            >
              Graphic Design Services
            </button>
            <div className="tab-indicator" style={indicatorStyle}></div>
          </div>

          <div className="services-content-grid">
            <div className="service-list-column">
              {servicesToDisplay.map((service) => (
                <React.Fragment key={service.id}>
                  <div 
                    className={`service-list-item ${activeService.id === service.id ? 'active-desktop' : ''} ${mobileOpenId === service.id ? 'active-mobile' : ''}`}
                    onClick={() => handleServiceClick(service)}
                  >
                    <div className="service-list-icon-wrapper">{React.createElement(service.icon)}</div>
                    <div className="service-list-text">
                      <h4>{service.name}</h4>
                      <p>{service.description}</p>
                    </div>
                  </div>
                  <AnimatePresence>
                    {mobileOpenId === service.id && (
                      <motion.div
                        className="mobile-detail-content"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.4, ease: 'easeInOut' }}
                      >
                        <ServiceDetailContent service={service} />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </React.Fragment>
              ))}
            </div>

            <div className="service-detail-pane">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeService.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4, ease: 'easeInOut' }}
                >
                  <ServiceDetailContent service={activeService} />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
      
      {/* Mobile Modal Logic would go here if we were using it, but the inline accordion is better */}
    </div>
  );
};

export default Services;