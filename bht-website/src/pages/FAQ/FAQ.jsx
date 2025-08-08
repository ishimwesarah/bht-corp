import React from 'react';
import { motion } from 'framer-motion';

// Import BOTH the Chatbot and the FAQItem components
import Chatbot from '../../components/Chatbot/Chatbot';
import FAQItem from '../../components/FAQItem/FAQItem';
import './FAQ.css';

// A curated list of the most common questions for the static accordion
const topFaqData = [
  {
    question: 'What types of services do you offer?',
    answer: 'We specialize in two main areas: Technology Solutions (like website design, IT support, and visa assistance) and Graphic Design Services (including logo design, printing, custom apparel, and much more). Feel free to ask our AI assistant about a specific service!'
  },
  {
    question: 'How does the internship program work?',
    answer: 'Our internship program is designed to provide real-world experience. We accept applications for our Technology and Design departments. You can fill out our smart application form on the Careers page to be considered.'
  },
  {
    question: 'What is your process for a new website project?',
    answer: 'Our process is collaborative. We start with a Discovery phase to understand your goals, followed by Design & Prototyping, and finally Development & Launch. We keep you involved at every step.'
  },
  {
    question: 'Where are you located?',
    answer: 'BHT Corporation is located in Musanze, Rwanda. You can find a detailed map and our full address on the Contact Us page.'
  },
  {
    question: 'How can I get a price quote?',
    answer: 'The best way is to visit our Contact Us page and fill out the form with your project details. For a quick question, you can also ask our AI assistant right here!'
  },
];

const FAQ = () => {
  return (
    <div className="faq-page">
      <motion.section 
        className="faq-hero"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="container">
          <h1>Have Questions? We Have Answers.</h1>
          <p>Use our AI Assistant for specific queries, or browse our most common questions below.</p>
        </div>
      </motion.section>

      {/* --- NEW TWO-COLUMN LAYOUT --- */}
      <section className="faq-main-content container">
        <div className="faq-grid">
          {/* LEFT COLUMN: AI CHATBOT */}
          <div className="faq-chatbot-wrapper">
            <h2 className="faq-section-title">Ask Our AI Assistant</h2>
            <Chatbot />
          </div>

          {/* RIGHT COLUMN: STATIC FAQ ACCORDION */}
          <div className="faq-accordion-wrapper">
            <h2 className="faq-section-title">Most Asked Questions</h2>
            <div className="faq-accordion">
              {topFaqData.map((faq, index) => (
                <FAQItem key={index} question={faq.question} answer={faq.answer} />
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FAQ;