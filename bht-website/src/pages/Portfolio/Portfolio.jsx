import React from 'react';
import { motion } from 'framer-motion';
import ProjectCard from '../../components/ProjectCard/ProjectCard'; // Your existing component
import './Portfolio.css';

// --- DUMMY DATA: Replace this with your actual projects ---
// --- Action: Add these images (or your own) to your src/assets folder ---
import project1Img from '../../assets/download.jpg';
import project2Img from '../../assets/home.jpg';
import project3Img from '../../assets/sky.jpg';
import project4Img from '../../assets/techicon.jpg';
import project5Img from '../../assets/that.png';
import project6Img from '../../assets/int.jpg';

const portfolioData = [
  {
    image: project1Img,
    category: 'Website Design',
    title: 'E-commerce Site for Local Artisans',
    description: 'A fully responsive e-commerce platform built with React and Node.js to help local artisans sell their crafts online.',
  },
  {
    image: project2Img,
    category: 'Branding & Logo Design',
    title: 'XYZ Cafe Branding',
    description: 'Complete branding package including logo, menu design, and promotional materials for a new cafe in Musanze.',
  },
  {
    image: project3Img,
    category: 'IT Solutions',
    title: 'Network Installation for a Hotel',
    description: 'Designed and deployed a high-speed, secure Wi-Fi network across a 50-room hotel complex.',
  },
  {
    image: project4Img,
    category: 'UV Printing',
    title: 'Custom Crystal Awards',
    description: 'High-detail UV printing on crystal awards for a corporate recognition event.',
  },
  {
    image: project5Img,
    category: 'Apparel Design',
    title: 'Tour Company Uniforms',
    description: 'Designed and produced durable and stylish T-shirts and hats using heat press sublimation.',
  },
  {
    image: project6Img,
    category: 'Visa Assistance',
    title: 'Student Visa ',
    description: 'guides a student through the complex application process for different universities university.',
  },
];

const Portfolio = () => {
  return (
    <div className="portfolio-page">
      <motion.section 
        className="portfolio-hero"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="container">
          <h1>Our Work</h1>
          <p>We take pride in our work. Explore some of the projects we've delivered for our amazing clients.</p>
        </div>
      </motion.section>

      <section className="portfolio-grid-section container">
        <div className="portfolio-grid">
          {portfolioData.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <ProjectCard {...project} />
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Portfolio;