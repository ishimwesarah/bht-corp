import React from 'react';
import { motion } from 'framer-motion';
import './Services.css';

// Import the complete data and necessary components
import { allTechServices, allDesignServices } from '../../data/fullServiceData';
import ServicePreviewCard from '../../components/ServicePreviewCard/ServicePreviewCard';
import PageHero from '../../components/PageHero/PageHero'; // <-- The slideshow component is back

// Animation variants
const containerVariant = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.05 }
  }
};

const itemVariant = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { ease: 'easeOut' } }
};

const Services = () => {
  return (
    // This main div will now have the full-page gradient background
    <div className="services-page-redesigned">
      
      {/* 1. The Slideshow is back at the top */}
      <PageHero 
        title="Our Services"
        tagline="A comprehensive suite of technology and design services, tailored to empower individuals and businesses."
      />

      {/* 2. A new wrapper for the main content to control padding */}
      <div className="services-main-area">
        
        {/* TECHNOLOGY SERVICES SECTION (Now a floating panel) */}
        <motion.section 
          className="services-content-panel"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="section-title">Technology Solutions</h2>
          <motion.div 
            className="service-grid"
            variants={containerVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
          >
            {allTechServices.map((service) => (
              <motion.div key={service.id} variants={itemVariant}>
                <ServicePreviewCard 
                  icon={service.icon}
                  name={service.name}
                  description={service.description}
                  linkTo={`/services/${service.id}`}
                />
              </motion.div>
            ))}
          </motion.div>
        </motion.section>

        {/* DESIGN SERVICES SECTION (Now a floating panel) */}
        <motion.section 
          className="services-content-panel"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h2 className="section-title">Graphic Design & Creative Services</h2>
          <motion.div 
            className="service-grid"
            variants={containerVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
          >
            {allDesignServices.map((service) => (
              <motion.div key={service.id} variants={itemVariant}>
                 <ServicePreviewCard 
                  icon={service.icon}
                  name={service.name}
                  description={service.description}
                  linkTo={`/services/${service.id}`}
                />
              </motion.div>
            ))}
          </motion.div>
        </motion.section>

      </div>
    </div>
  );
};

export default Services;