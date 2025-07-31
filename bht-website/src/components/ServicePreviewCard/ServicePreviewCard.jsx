import React from 'react';
import { Link } from 'react-router-dom';
import './ServicePreviewCard.css';

const ServicePreviewCard = ({ icon, name, description, linkTo }) => {
  const IconComponent = icon; // Assign the icon component to a variable

  return (
    <Link to={linkTo} className="service-preview-card">
      <div className="card-icon-wrapper">
        <IconComponent className="card-icon" />
      </div>
      <div className="card-content">
        <h3>{name}</h3>
        <p>{description}</p>
        <span className="card-learn-more">Learn More →</span>
      </div>
    </Link>
  );
};

export default ServicePreviewCard;