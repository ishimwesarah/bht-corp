import React from 'react';
import { motion } from 'framer-motion';
import './Home.css';

// Import our custom components
import Button from '../../components/Button/Button';
import ServiceCard from '../../components/ServiceCard/ServiceCard';
import TestimonialCard from '../../components/TestimonialCard/TestimonialCard';
import HeroSlider from '../../components/HeroSlider/HeroSlider';

// Import images for the cards
import techImage from '../../assets/techicon.jpg';
import designImage from '../../assets/home.jpg';

// Animation variants
const sectionVariant = {
  hidden: { opacity: 0, y: 50 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { 
      duration: 0.6, 
      ease: 'easeOut',
      staggerChildren: 0.2 
    }
  }
};

const itemVariant = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.5 }
  }
};

const Home = () => {
  return (
    <div className="home-page">
      {/* --- The Hero Slider is the first thing on the page --- */}
      <HeroSlider />

      {/* --- Services Overview Section --- */}
      <motion.section 
        className="services-overview-section container"
        variants={sectionVariant}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <motion.h2 variants={itemVariant}>Our Core Offerings</motion.h2>
        <div className="services-overview-grid">
          <ServiceCard
            imageSrc={techImage}
            title="Technology Solutions"
            description="From network installations and computer maintenance to visa applications and e-learning, we provide robust IT services for a developing world."
            linkTo="/services"
            linkText="See All Tech Services"
          />
          <ServiceCard
            imageSrc={designImage}
            title="Graphic Design & Printing"
            description="Bring your ideas to life with our creative design services, including UV printing, custom apparel, logo design, and large format printing."
            linkTo="/services"
            linkText="See All Design Services"
          />
        </div>
      </motion.section>

      {/* --- Why Choose Us Section --- */}
      <motion.section 
        className="why-choose-us-section"
        variants={sectionVariant}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <div className="container">
          <motion.h2 variants={itemVariant}>Why BHT Corporation?</motion.h2>
          <div className="features-grid">
            <motion.div variants={itemVariant} className="feature-item">
              <h4>High-Quality, Low Cost</h4>
              <p>We use our motto "Best But Cheaper (BBC)" by controlling the entire production process, ensuring top quality at an affordable price.</p>
            </motion.div>
            <motion.div variants={itemVariant} className="feature-item">
              <h4>Client-Centric Approach</h4>
              <p>We listen. Through observation and feedback, we tailor our solutions to meet the unique needs of the Musanze community and beyond.</p>
            </motion.div>
            <motion.div variants={itemVariant} className="feature-item">
              <h4>Faith-Driven & Accountable</h4>
              <p>Our work is guided by our core beliefs, ensuring we operate with integrity, responsibility, and a commitment to service.</p>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* --- Testimonials Section --- */}
      <motion.section 
        className="testimonials-section container"
        variants={sectionVariant}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <motion.h2 variants={itemVariant}>What Our Clients Say</motion.h2>
        <div className="testimonials-grid">
          <motion.div variants={itemVariant}>
            <TestimonialCard 
              quote="BHT Corporation delivered a website that exceeded our expectations. The process was smooth, professional, and on time. Highly recommended!"
              name="Alain M."
              company="Musanze Business Hub"
            />
          </motion.div>
          <motion.div variants={itemVariant}>
            <TestimonialCard 
              quote="The custom T-shirts and branding materials they designed for our event were a huge hit. The quality and creativity were top-notch."
              name="Sarah K."
              company="Rwanda Tourism Board"
            />
          </motion.div>
          <motion.div variants={itemVariant}>
            <TestimonialCard 
              quote="Their team is incredibly skilled and responsive. They helped us with a complex network installation, and the results are fantastic."
              name="John Uwimana"
              company="Gorilla Vets Lodge"
            />
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
};

export default Home;