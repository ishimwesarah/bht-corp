import React, { useState, useEffect, useRef } from 'react';
import { FaPaperPlane, FaPlus, FaMinus, FaRobot, FaUser } from 'react-icons/fa';
import './FAQ.css'; // We will use a separate CSS file

// FAQ Item Component (kept inside for simplicity as requested)
const FAQItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="faq-item">
      <div className="faq-question" onClick={() => setIsOpen(!isOpen)}>
        <h4>{question}</h4>
        <div className="faq-icon">{isOpen ? <FaMinus /> : <FaPlus />}</div>
      </div>
      {isOpen && <div className="faq-answer"><p>{answer}</p></div>}
    </div>
  );
};

// Enhanced Chatbot Component (now integrated with the backend)
const EnhancedChatbot = () => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    // Initial welcome message
    setMessages([{
      id: 1,
      text: "Hello! I'm BHT-Bot, your AI assistant. Ask me anything about BHT Corporation's services or mission.",
      sender: 'bot'
    }]);
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async () => {
    if (inputValue.trim() === '' || isTyping) return;

    const newUserMessage = { id: Date.now(), text: inputValue, sender: 'user' };
    setMessages(prev => [...prev, newUserMessage]);
    const currentQuery = inputValue;
    setInputValue('');
    setIsTyping(true);

    try {
      // --- THIS IS THE REAL INTEGRATION ---
      const response = await fetch('https://bht-backend.onrender.com/api/ai/ask', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: currentQuery }),
      });

      if (!response.ok) {
        throw new Error('Failed to get a response from the AI server.');
      }

      const data = await response.json();
      const newBotMessage = { id: Date.now() + 1, text: data.answer, sender: 'bot' };
      setMessages(prev => [...prev, newBotMessage]);

    } catch (error) {
      console.error('Error with AI service:', error);
      const errorMessage = {
        id: Date.now() + 1,
        text: "I'm sorry, I'm having a little trouble connecting to my brain right now. Please try again in a moment.",
        sender: 'bot'
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="chatbot-container">
      <div className="chatbot-header">
        <FaRobot className="chatbot-avatar" />
        <div className="header-info">
          <h3>BHT-Bot Assistant</h3>
          <span className="online-status">Online • AI Powered</span>
        </div>
      </div>
      <div className="chatbot-messages">
        {messages.map((msg) => (
          <div key={msg.id} className={`message-bubble ${msg.sender}`}>
            <div className="message-avatar">{msg.sender === 'bot' ? <FaRobot /> : <FaUser />}</div>
            <div className="message-content">
              {msg.text.split('\n').map((line, i) => <div key={i}>{line}</div>)}
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="message-bubble bot typing">
            <div className="message-avatar"><FaRobot /></div>
            <div className="typing-indicator"><span></span><span></span><span></span></div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      <div className="chatbot-input-container">
        <textarea
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Ask about our services..."
          disabled={isTyping}
          className="chatbot-input"
          rows={1}
        />
        <button onClick={handleSendMessage} disabled={isTyping || inputValue.trim() === ''} className="chatbot-send-btn">
          <FaPaperPlane />
        </button>
      </div>
    </div>
  );
};


// Main FAQ Page Component
const FAQ = () => {
  const faqData = [
    { question: 'What types of services do you offer?', answer: 'We specialize in Technology Solutions and Graphic Design Services. Ask our AI assistant for details on any specific service!' },
    { question: 'How does the internship program work?', answer: 'We offer hands-on experience in Technology and Design. Apply through our Careers page.' },
    { question: 'Where are you located?', answer: 'BHT Corporation is located in Musanze, Rwanda. See our Contact Us page for a map.' },
    { question: 'How can I get a price quote?', answer: 'The best way is to use our Contact Us page form. Our team will provide a custom quote within 24 hours.' },
  ];

  return (
    <div className="faq-page-container">
      <div className="faq-hero">
        <h1>Have Questions? We Have Answers.</h1>
        <p>Use our AI Assistant for specific queries, or browse our most common questions below.</p>
      </div>
      <div className="faq-content container">
        <div className="faq-grid">
          <div className="faq-accordion-wrapper">
            <h2 className="faq-section-title">Most Asked Questions</h2>
            <div className="faq-accordion">
              {faqData.map((faq, index) => (
                <FAQItem key={index} question={faq.question} answer={faq.answer} />
              ))}
            </div>
          </div>
          <div className="faq-chatbot-wrapper">
            <h2 className="faq-section-title">Ask Our AI Assistant</h2>
            <EnhancedChatbot />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQ;