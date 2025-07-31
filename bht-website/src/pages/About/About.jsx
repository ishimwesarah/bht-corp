import React from 'react';
import { motion } from 'framer-motion';
import './About.css';
// import teamMember1 from '../../assets/bahati.jpg'; // Example image
// import teamMember2 from '../../assets/jehovanis.jpg'; // Example image

// Animation Variants for Framer Motion
const fadeIn = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.6, ease: "easeOut" }
};

const About = () => {
  return (
    <div className="about-page">
      <motion.section 
        className="about-hero"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="container">
          <h1>About BHT Corporation</h1>
          <p>Pushing the boundaries of design innovation, integrating new technologies and trends to create impactful visual experiences.</p>
        </div>
      </motion.section>

      <section className="about-content container">
        <motion.div {...fadeIn} className="about-section">
          <h2>Our Vision & Mission</h2>
          <p><strong>Vision:</strong> To become a leader in the creative industry by consistently delivering exceptional design and IT solutions that inspire and captivate audiences.</p>
          <p><strong>Mission:</strong> We want to contribute to the spread of the kingdom of God by helping people, both by providing them with jobs and good services, and by doing charitable works.</p>
        </motion.div>

        <motion.div {...fadeIn} className="about-section business-structure">
            <div className="structure-text">
                <h2>Our Guiding Principle</h2>
                <p>In our beliefs, we believe that God is above all. That is why in each and every step we take, we start with God.</p>
                <blockquote>"Unless the LORD builds the house, its builders labor in vain."
                    <span>- Psalm 127:1</span>
                </blockquote>
                <p>This principle forms the bedrock of our business structure, ensuring that all our endeavors are grounded in purpose and integrity.</p>
            </div>
            <div className="structure-image">
                {/* You can place a symbolic image here */}
            </div>
        </motion.div>

        <motion.div {...fadeIn} className="about-section team-section">
          <h2>Meet Our Key Team</h2>
          <div className="team-grid">
            <div className="team-member-card">
              {/* <img src={teamMember1} alt="BAHATI Dieu Merci" /> */}
              <div className="team-member-placeholder">BDM</div>
              <h3>BAHATI Dieu Merci</h3>
              <span>Manager & IT Specialist</span>
              <p>Former IT at Rwanda Medical Supply, leading our technology and management efforts with skill and vision.</p>
            </div>
            <div className="team-member-card">
              {/* <img src={teamMember2} alt="IKORUKWISHAKA Jehovanis" /> */}
               <div className="team-member-placeholder">IJ</div>
              <h3>IKORUKWISHAKA Jehovanis</h3>
              <span>Graphic Designer & Innovator</span>
              <p>Currently at Marran Design, bringing cutting-edge creativity and innovation to our design projects.</p>
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  );
};

export default About;