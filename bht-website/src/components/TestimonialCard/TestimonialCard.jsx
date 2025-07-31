import React from 'react';
import { FaQuoteLeft } from 'react-icons/fa';
import './TestimonialCard.css';

const TestimonialCard = ({ quote, name, company }) => {
  return (
    <div className="testimonial-card">
      <FaQuoteLeft className="quote-icon" />
      <p className="testimonial-quote">{quote}</p>
      <div className="testimonial-author">
        <span className="author-name">{name}</span>
        <span className="author-company">{company}</span>
      </div>
    </div>
  );
};

export default TestimonialCard;