import React from 'react';
import { Link } from 'react-router-dom';
import './ServicePreviewCard.css';

const ServicePreviewCard = ({ icon, name, description, linkTo }) => {
  const IconComponent = icon;

  return (
    <Link to={linkTo} className="service-preview-card">
      <div className="card-icon-wrapper">
        <IconComponent className="card-icon" />
      </div>
      <div className="card-content">
        <h3>{name}</h3>
        <p>{description}</p>
      </div>
      
      {/* <span className="card-hover-arrow">→</span> */}
    </Link>
  );
};

export default ServicePreviewCard;