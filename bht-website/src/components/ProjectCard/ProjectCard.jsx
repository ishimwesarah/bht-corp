import React from 'react';
import './ProjectCard.css';

const ProjectCard = ({ image, category, title, description }) => {
  return (
    <div className="project-card">
      <div className="project-image-container">
        <img src={image} alt={title} />
        <div className="project-overlay">
          <p>{description}</p>
        </div>
      </div>
      <div className="project-info">
        <span className="project-category">{category}</span>
        <h3 className="project-title">{title}</h3>
      </div>
    </div>
  );
};

export default ProjectCard;