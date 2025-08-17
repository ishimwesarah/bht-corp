import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaWhatsapp } from 'react-icons/fa';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import './Contact.css';

// 1. Zod schema for validation
const contactSchema = z.object({
  name: z.string().min(3, { message: 'Name must be at least 3 characters.' }),
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  subject: z.string().min(5, { message: 'Subject must be at least 5 characters.' }),
  message: z.string().min(20, { message: 'Message must be at least 20 characters.' }),
});

const fadeIn = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.6, ease: "easeOut" }
};

const Contact = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: zodResolver(contactSchema),
  });

  // 2. Updated handleSubmit function to call your backend
  const onSubmit = async (data) => {
    setIsSubmitting(true);
    setSubmitStatus(null);
    try {
      // The URL points to your new Express backend endpoint
      const response = await fetch('https://bht-backend.onrender.com/api/email/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Server response was not ok.');
      }
      
      setSubmitStatus('success');
      reset(); // Clear the form after successful submission
    } catch (error) {
      console.error('Submission error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="contact-page">
      <motion.section
        className="contact-hero"
        // ... (animation props)
      >
        <div className="container">
          <h1>Get In Touch</h1>
          <p>We're here to help. Reach out to us for a quote, a question, or a consultation.</p>
        </div>
      </motion.section>

      <section className="contact-main container">
        <motion.div {...fadeIn} className="contact-info">
          <h3>Contact Information</h3>
          <p>Fill out the form and our team will get back to you within 24 hours. Or, reach us directly via WhatsApp for a faster response.</p>
          <a href="https://wa.me/250784589508" className="whatsapp-button" target="_blank" rel="noopener noreferrer">
            <FaWhatsapp className="whatsapp-icon" />
            Chat with us on WhatsApp
          </a>
          <ul className="info-list">
            <li><FaPhoneAlt /> +250 784 589 508 / 072 822 2038</li>
            <li><FaEnvelope /> bhtcorpor@gmail.com</li>
            <li><FaMapMarkerAlt /> Musanze City, Rwanda</li>
          </ul>
          <div className="map-container">
            <iframe 
              src="https://www.google.com/maps/embed/v1/place?key=AIzaSyA0s1a7phLN0iaD6-UE7m4qP-z21pH0eSc&amp;q=Ines+Ruhengeri+Musanze+Rwanda"
              width="100%" height="250" style={{border:0}} allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade">
            </iframe>
          </div>
        </motion.div>

        <motion.div {...fadeIn} className="contact-form-wrapper">
          {submitStatus === 'success' ? (
            <div className="form-success-message">
              <h3>Thank You!</h3>
              <p>Your message has been sent successfully. Our team will get back to you shortly.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} noValidate>
              <div className="form-group">
                <label htmlFor="name">Name<span className="required-asterisk">*</span></label>
                <input type="text" id="name" {...register('name')} />
                {errors.name && <p className="error-message">{errors.name.message}</p>}
              </div>
              <div className="form-group">
                <label htmlFor="email">Email<span className="required-asterisk">*</span></label>
                <input type="email" id="email" {...register('email')} />
                {errors.email && <p className="error-message">{errors.email.message}</p>}
              </div>
              <div className="form-group">
                <label htmlFor="subject">Subject<span className="required-asterisk">*</span></label>
                <input type="text" id="subject" {...register('subject')} />
                {errors.subject && <p className="error-message">{errors.subject.message}</p>}
              </div>
              <div className="form-group">
                <label htmlFor="message">Message<span className="required-asterisk">*</span></label>
                <textarea id="message" rows="6" {...register('message')}></textarea>
                {errors.message && <p className="error-message">{errors.message.message}</p>}
              </div>
              {submitStatus === 'error' && <p className="error-message form-error">An error occurred. Please try again.</p>}
              <button type="submit" className="submit-button" disabled={isSubmitting}>
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          )}
        </motion.div>
      </section>
    </div>
  );
};

export default Contact;