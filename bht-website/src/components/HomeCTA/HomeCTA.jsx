import React from 'react';
import Button from '../Button/Button';
import './HomeCTA.css';

const HomeCTA = () => {
  return (
    <section className="home-cta-section">
      <div className="home-cta-content container">
        <h2>Let's Build Something Great Together</h2>
        <p>Have a project in mind? We'd love to hear about it. Contact us for a free, no-obligation consultation.</p>
        <Button to="/contact" buttonStyle="btn--primary" buttonSize="btn--large">
          Get Your Free Quote
        </Button>
      </div>
    </section>
  );
};

export default HomeCTA;