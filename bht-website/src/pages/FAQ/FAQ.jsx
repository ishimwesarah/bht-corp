import React from 'react';
import { motion } from 'framer-motion';
import FAQItem from '../../components/FAQItem/FAQItem'; // Your existing component
import './FAQ.css';

const faqData = [
  {
    question: 'How long does it take to build a website?',
    answer: 'A typical business website takes 4-6 weeks from start to finish. This can vary depending on the complexity of the project, the number of pages, and how quickly we receive content and feedback from you.'
  },
  {
    question: 'What do you need from me to start a design project?',
    answer: 'To start, we typically need a clear project brief describing your goals and vision. Any branding materials you have (like a logo), and the text/image content for the project are also very helpful.'
  },
  {
    question: 'Do you offer support after the project is complete?',
    answer: 'Yes! We offer ongoing support and maintenance packages for websites and IT systems to ensure everything continues to run smoothly. We believe in building long-term partnerships with our clients.'
  },
  {
    question: 'Can you help with just the visa application, or the whole study abroad process?',
    answer: 'We can help with both! We offer services for standalone visa applications as well as comprehensive packages that include university selection, scholarship applications, and visa guidance.'
  },
  {
    question: 'What is your payment process?',
    answer: 'For most projects, we require a 50% deposit to begin work, with the remaining 50% due upon completion and your final approval. We accept various payment methods for your convenience.'
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
          <h1>Frequently Asked Questions</h1>
          <p>Have a question? We're here to help. Find answers to common questions below.</p>
        </div>
      </motion.section>

      <section className="faq-list-section container">
        {faqData.map((faq, index) => (
          <FAQItem key={index} question={faq.question} answer={faq.answer} />
        ))}
      </section>
    </div>
  );
};

export default FAQ;