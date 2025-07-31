import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import './ServiceCard.css';

// No change to variants needed
const itemVariant = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.5 }
  }
};

// Add a new 'imageSrc' prop
const ServiceCard = ({ imageSrc, title, description, linkTo, linkText }) => {
  return (
    <motion.div 
      className="service-card"
      variants={itemVariant}
      whileHover={{ y: -10, boxShadow: '0 10px 30px rgba(0, 91, 150, 0.15)' }}
    >
      {/* Add the image container and img tag here */}
      <div className="service-card-image-container">
        <img src={imageSrc} alt={`${title} icon`} className="service-card-image" />
      </div>
      
      <h3>{title}</h3>
      <p>{description}</p>
      <Link to={linkTo} className="card-link">{linkText}</Link>
    </motion.div>
  );
};

export default ServiceCard;