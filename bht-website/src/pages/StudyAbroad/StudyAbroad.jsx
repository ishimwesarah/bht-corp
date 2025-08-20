import React from 'react';
import { motion } from 'framer-motion';
import { FaGraduationCap, FaGlobeEurope, FaFileSignature, FaPassport } from 'react-icons/fa';
import './StudyAbroad.css';
import Button from '../../components/Button/Button';
import destinationCanada from '../../assets/abroad.jpg'; // Add example images to assets
import destinationUK from '../../assets/uk.jpg';
import destinationUSA from '../../assets/usa.jpg';

const StudyAbroad = () => {
  return (
    <div className="study-abroad-page">
      <section className="sa-hero">
        <div className="sa-hero-overlay"></div>
        <div className="container">
          <h1>Your Global Education Journey Starts Here</h1>
          <p>We provide expert guidance and comprehensive support to turn your dream of studying abroad into a reality.</p>
        </div>
      </section>

      <section className="sa-process-section container">
        <h2>A Proven Process for Success</h2>
        <div className="process-grid">
          <div className="process-step">
            <FaGraduationCap className="process-icon" />
            <h3>1. Personal Consultation</h3>
            <p>We start by understanding your academic background, career aspirations, and financial situation to create a personalized roadmap.</p>
          </div>
          <div className="process-step">
            <FaGlobeEurope className="process-icon" />
            <h3>2. University & Course Matching</h3>
            <p>We leverage our network to find the perfect universities and courses that align with your goals and qualifications.</p>
          </div>
          <div className="process-step">
            <FaFileSignature className="process-icon" />
            <h3>3. Application Support</h3>
            <p>We guide you through every step of the application process, from writing statements of purpose to gathering documents.</p>
          </div>
          <div className="process-step">
            <FaPassport className="process-icon" />
            <h3>4. Visa Guidance</h3>
            <p>Our experts provide comprehensive assistance with your student visa application, maximizing your chances of success.</p>
          </div>
        </div>
      </section>

      <section className="sa-destinations-section">
        <div className="container">
          <h2>Popular Destinations</h2>
          <div className="destinations-grid">
            <div className="destination-card" style={{backgroundImage: `url(${destinationCanada})`}}><span>Canada</span></div>
            <div className="destination-card" style={{backgroundImage: `url(${destinationUK})`}}><span>United Kingdom</span></div>
            <div className="destination-card" style={{backgroundImage: `url(${destinationUSA})`}}><span>USA</span></div>
            {/* Add more destinations */}
          </div>
        </div>
      </section>

      <section className="sa-testimonial-section container">
          <p className="testimonial-quote-sa">"BHT Corporation made my dream of studying in Canada a reality. Their guidance on the visa process was invaluable. I couldn't have done it without them!"</p>
          <span className="testimonial-author-sa">- Jeanine U., University of Toronto Student</span>
      </section>

      <section className="sa-cta-section">
        <div className="container">
          <h2>Ready to Take the Next Step?</h2>
          <p>Book a free, no-obligation consultation with our education experts today.</p>
          <Button to="/contact" buttonStyle="btn--primary" buttonSize="btn--large">
            Book a Free Consultation
          </Button>
        </div>
      </section>
    </div>
  );
};

export default StudyAbroad;