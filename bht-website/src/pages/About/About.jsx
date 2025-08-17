import React from 'react';
import { motion } from 'framer-motion';
import './About.css';
import teamMember1 from '../../assets/baha.jpg';
import teamMember2 from '../../assets/jeho.jpg'; 
import teamMember3 from '../../assets/mug.jpg';
import teamMember4 from '../../assets/Sarah.jpg';
import teamMember5 from '../../assets/bas.jpg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { 
  faLinkedin, 
  faTwitter 
} from '@fortawesome/free-brands-svg-icons';
import { 
  faEnvelope, 
  faChartLine, 
  faCode, 
  faChartBar, 
  faBalanceScale, 
  faPalette 
} from '@fortawesome/free-solid-svg-icons';
import logo from '../../assets/logo.png';

// Add icons to FontAwesome library
library.add(
  faLinkedin,
  faTwitter,
  faEnvelope,
  faChartLine,
  faCode,
  faChartBar,
  faBalanceScale,
  faPalette
);

// Animation Variants for Framer Motion
const fadeIn = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.6, ease: "easeOut" }
};

const cardVariants = {
  initial: { opacity: 0, y: 50, scale: 0.9 },
  whileInView: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    transition: { 
      duration: 0.6, 
      ease: "easeOut",
      staggerChildren: 0.1 
    }
  },
  viewport: { once: true, amount: 0.2 }
};

const TeamMemberCard = ({ image, name, role, experienceLabel, experienceValue, description, socialLinks, icon, specialty }) => {
  return (
    <motion.div className="team-member-card" variants={cardVariants}>
      <div className="team-member-image-container">
        <img src={image} alt={name} />
        <div className="team-member-overlay">
          <div className="social-links">
            {socialLinks.map((link, index) => (
              <a key={index} href={link.url} aria-label={link.label} target="_blank" rel="noopener noreferrer">
                <FontAwesomeIcon icon={link.icon} />
              </a>
            ))}
          </div>
        </div>
      </div>
      
      <div className="team-member-info">
        <h3>{name}</h3>
        <span className="team-member-role">{role}</span>
        
        {/* <div className="team-member-experience">
          <span className="experience-label">{experienceLabel}</span>
          <span className="experience-value">{experienceValue}</span>
        </div> */}
        
        <p className="team-member-description">
          {description}
        </p>
        
        {/* <div className="specialty-badge">
          <FontAwesomeIcon icon={icon} />
          {specialty}
        </div> */}
      </div>
    </motion.div>
  );
};

const About = () => {
  const teamMembers = [
    {
      image: teamMember3,
      name: "Prof. Plamen",
      role: "Manager & Stategical Advisor",
      experienceLabel: "Previous Experience",
      experienceValue: "Lecturer, University of Bulgaria",
      description: "Leads strategic initiatives and corporate development.",
      socialLinks: [
        { url: "#linkedin", label: "LinkedIn", icon: faLinkedin },
      ],
      icon: faChartLine,
      specialty: "Strategy"
    },
    {
      image: teamMember1,
      name: "BAHATI Dieu Merci",
      role: "IT specialist and Operation Manager",
      experienceLabel: "Previous Experience",
      experienceValue: "IT Specialist at Rwanda Medical Supply",
      description: "Specializes in IT infrastructure and system optimization.",
      socialLinks: [
        { url: "https://www.linkedin.com/in/bahati-dieu-merci-bbaa87312/", label: "LinkedIn", icon: faLinkedin }
      ],
      icon: faCode,
      specialty: "IT Systems"
    },
    {
      image: teamMember4,
      name: "Sarah Ishimwe",
      role: "Sales & Marketing Manager",
      experienceLabel: "Core Expertise",
      experienceValue: "Market Analysis",
      description: "Drives sales strategy and market expansion.",
      socialLinks: [
        { url: "https://www.linkedin.com/in/sarah-ishimwe/", label: "LinkedIn", icon: faLinkedin }
      ],
      icon: faChartBar,
      specialty: "Marketing"
    },
    {
      image: teamMember5,
      name: "NIYONKURU Elysee",
      role: "Legal Advisor",
      experienceLabel: "Current Position",
      experienceValue: "Legal mind at Land Mark Law firm",
      description: "Oversees corporate governance and compliance.",
      socialLinks: [
        { url: "https://www.linkedin.com/in/elysee-niyonkuru-14bbb9243/", label: "LinkedIn", icon: faLinkedin }
      ],
      icon: faBalanceScale,
      specialty: "Law"
    },
    {
      image: teamMember2,
      name: "IKORUKWISHAKA Jehovanis",
      role: "Graphic Designer & innovation Manager ",
      experienceLabel: "Previous Experience",
      experienceValue: "Former Graphic design at Marran Design company",
      description: "Leads creative vision and design innovation.",
      socialLinks: [
        { url: "https://www.linkedin.com/in/jehovanis-ikorukwishaka-8675b619a/", label: "LinkedIn", icon: faLinkedin }
      ],
      icon: faPalette,
      specialty: "Design"
    }
  ];

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
              <div className="logo-display">
                 <img src={logo}  
                 alt="BHT Corporation Logo" 
                 className="company-logo"/>
                 <div className="logo-glow"></div>
              </div>
            </div>
        </motion.div>

        <motion.div {...fadeIn} className="about-section team-section">
          <h2>Meet Our Leadership Team</h2>
          <motion.div 
            className="team-grid"
            variants={cardVariants}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true, amount: 0.2 }}
          >
            {teamMembers.map((member, index) => (
              <TeamMemberCard key={index} {...member} />
            ))}
          </motion.div>
        </motion.div>
      </section>
    </div>
  );
};

export default About;