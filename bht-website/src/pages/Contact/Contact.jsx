import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from 'react-icons/fa';
import './Contact.css';

const fadeIn = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.6, ease: "easeOut" }
};

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        // Here you would connect to a backend service to send the email
        console.log('Form submitted:', formData);
        alert('Thank you for your message! We will get back to you soon.');
        setFormData({ name: '', email: '', subject: '', message: '' });
    }

  return (
    <div className="contact-page">
      <motion.section 
        className="contact-hero"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="container">
          <h1>Get In Touch</h1>
          <p>We're here to help. Reach out to us for a quote, a question, or a consultation.</p>
        </div>
      </motion.section>

      <section className="contact-main container">
        <motion.div {...fadeIn} className="contact-info">
          <h3>Contact Information</h3>
          <p>Fill out the form and our team will get back to you within 24 hours.</p>
          <ul className="info-list">
            <li><FaPhoneAlt /> +250 784 589 508 / 072 822 2038</li>
            <li><FaEnvelope /> info@bhtcorp.com</li>
            <li><FaMapMarkerAlt /> Musanze City, Rwanda</li>
          </ul>
          <div className="map-container">
          <iframe 
            src="https://www.google.com/maps/embed/v1/place?key=AIzaSyA0s1a7phLN0iaD6-UE7m4qP-z21pH0eSc&amp;q=Ines+Ruhengeri+Musanze+Rwanda"  
            width="100%" 
            height="250" 
            style={{border:0}} 
            allowFullScreen="" 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade">
           </iframe>
          </div>
        </motion.div>

        <motion.div {...fadeIn} className="contact-form-wrapper">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label htmlFor="subject">Subject</label>
              <input type="text" id="subject" name="subject" value={formData.subject} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea id="message" name="message" rows="6" value={formData.message} onChange={handleChange} required></textarea>
            </div>
            <button type="submit" className="submit-button">Send Message</button>
          </form>
        </motion.div>
      </section>
    </div>
  );
};

export default Contact;