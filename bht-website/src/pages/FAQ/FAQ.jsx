import React, { useState, useEffect, useRef } from 'react';
import { FaPaperPlane, FaPlus, FaMinus, FaRobot, FaUser } from 'react-icons/fa';

// FAQ Item Component
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

// Enhanced Chatbot Component
const EnhancedChatbot = () => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const messagesContainerRef = useRef(null);

  useEffect(() => {
    // Initial welcome message
    setMessages([{
      id: 1,
      text: "Hello! I'm BHT-Bot, your AI assistant. Ask me anything about BHT Corporation's services or mission.",
      sender: 'bot'
    }]);
  }, []);

  useEffect(() => {
    // Only scroll within the chatbot container, not the entire page
    if (messagesContainerRef.current && messagesEndRef.current) {
      const container = messagesContainerRef.current;
      const element = messagesEndRef.current;
      
      // Check if the element is within the chatbot container
      if (container.contains(element)) {
        element.scrollIntoView({ 
          behavior: 'smooth',
          block: 'nearest',
          inline: 'nearest'
        });
      }
    }
  }, [messages]);

  const handleSendMessage = async () => {
    if (inputValue.trim() === '' || isTyping) return;

    const newUserMessage = { id: Date.now(), text: inputValue, sender: 'user' };
    setMessages(prev => [...prev, newUserMessage]);
    const currentQuery = inputValue;
    setInputValue('');
    setIsTyping(true);

    try {
      // Simulating API call - replace with your actual endpoint
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
      <div className="chatbot-messages" ref={messagesContainerRef}>
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
      
      <style jsx>{`
        .faq-page-container {
          background: linear-gradient(135deg, #E0F0FF 0%, #F5F5F5 100%);
          padding-bottom: 5rem;
        }
        
        .faq-hero { 
          text-align: center; 
          padding: 6rem 1rem 4rem 1rem; 
        }
        
        .faq-hero h1 { 
          font-size: 2.8rem; 
          color: #005B96; 
          margin-bottom: 1rem; 
        }
        
        .faq-hero p { 
          font-size: 1.2rem; 
          color: #4F4F4F; 
          max-width: 600px; 
          margin: 0 auto; 
        }
        
        .faq-content {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 1rem;
        }
        
        .faq-grid { 
          display: grid; 
          grid-template-columns: 1fr 1.2fr; 
          gap: 3rem; 
          align-items: start; 
        }
        
        .faq-section-title { 
          font-size: 1.8rem; 
          color: #005B96; 
          margin-bottom: 1.5rem; 
        }
        
        .faq-accordion { 
          background: #FFFFFF; 
          border-radius: 12px; 
          padding: 1rem; 
          box-shadow: 0 4px 15px rgba(0,91,150,0.1); 
        }
        
        .faq-item { 
          border-bottom: 1px solid #E0F0FF; 
          padding: 1.5rem 0.5rem; 
        }
        
        .faq-item:last-child { 
          border-bottom: none; 
        }
        
        .faq-question { 
          display: flex; 
          justify-content: space-between; 
          align-items: center; 
          cursor: pointer; 
        }
        
        .faq-question h4 { 
          color: #4F4F4F; 
          margin: 0; 
          padding-right: 1rem; 
          font-size: 1.1rem; 
        }
        
        .faq-icon { 
          color: #F4C430; 
          font-size: 1.2rem; 
        }
        
        .faq-answer { 
          padding-top: 1rem; 
          color: #4F4F4F; 
          line-height: 1.6; 
        }

        /* Chatbot styles */
        .chatbot-container { 
          background: #FFFFFF; 
          border-radius: 12px; 
          box-shadow: 0 4px 15px rgba(0,91,150,0.1); 
          overflow: hidden; 
          height: 600px; 
          display: flex; 
          flex-direction: column;
          position: relative;
        }
        
        .chatbot-header { 
          background: linear-gradient(135deg, #005B96 0%, #3CB371 100%); 
          color: white; 
          padding: 1rem; 
          display: flex; 
          align-items: center; 
          gap: 0.75rem; 
        }
        
        .header-info { 
          flex: 1; 
        }
        
        .chatbot-header h3 { 
          margin: 0; 
          font-size: 1rem; 
        }
        
        .chatbot-avatar { 
          font-size: 1.5rem; 
        }
        
        .online-status { 
          font-size: 0.8rem; 
          opacity: 0.8; 
        }
        
        .chatbot-messages { 
          flex: 1; 
          overflow-y: auto; 
          overflow-x: hidden;
          padding: 1rem; 
          display: flex; 
          flex-direction: column; 
          gap: 1rem;
          scroll-behavior: smooth;
          position: relative;
        }
        
        .message-bubble { 
          display: flex; 
          gap: 0.75rem; 
          max-width: 85%; 
        }
        
        .message-bubble.user { 
          align-self: flex-end; 
          flex-direction: row-reverse; 
        }
        
        .message-bubble.bot { 
          align-self: flex-start; 
        }
        
        .message-avatar { 
          width: 32px; 
          height: 32px; 
          border-radius: 50%; 
          display: flex; 
          align-items: center; 
          justify-content: center; 
          font-size: 0.9rem; 
          flex-shrink: 0; 
          color: white; 
        }
        
        .message-bubble.user .message-avatar { 
          background: #005B96; 
        }
        
        .message-bubble.bot .message-avatar { 
          background: #3CB371; 
        }
        
        .message-content { 
          background: #F5F5F5; 
          padding: 0.75rem 1rem; 
          border-radius: 18px; 
          line-height: 1.5; 
          color: #4F4F4F; 
        }
        
        .message-bubble.user .message-content { 
          background: #005B96; 
          color: white; 
        }
        
        .typing-indicator { 
          display: flex; 
          align-items: center; 
          gap: 0.25rem; 
          padding: 1rem; 
          background: #F5F5F5; 
          border-radius: 18px; 
        }
        
        .typing-indicator span { 
          width: 8px; 
          height: 8px; 
          border-radius: 50%; 
          background: #3CB371; 
          animation: typing 1.4s infinite; 
        }
        
        .typing-indicator span:nth-child(2) { 
          animation-delay: 0.2s; 
        }
        
        .typing-indicator span:nth-child(3) { 
          animation-delay: 0.4s; 
        }
        
        .chatbot-input-container { 
          padding: 1rem; 
          background: #E0F0FF; 
          border-top: 1px solid #ccc; 
          display: flex; 
          align-items: center; 
          gap: 0.5rem; 
        }
        
        .chatbot-input { 
          flex: 1; 
          padding: 0.75rem 1rem; 
          border: 1px solid #ccc; 
          border-radius: 20px; 
          outline: none; 
          font-size: 0.95rem; 
          resize: none; 
          min-height: 44px; 
        }
        
        .chatbot-send-btn { 
          padding: 0.75rem; 
          background: #005B96; 
          color: white; 
          border: none; 
          border-radius: 50%; 
          cursor: pointer; 
          display: flex; 
          align-items: center; 
          justify-content: center; 
          width: 44px; 
          height: 44px; 
        }
        
        .chatbot-send-btn:disabled { 
          background: #ccc; 
          cursor: not-allowed; 
        }
        
        @keyframes typing { 
          0%, 60%, 100% { 
            transform: translateY(0); 
            opacity: 0.4; 
          } 
          30% { 
            transform: translateY(-5px); 
            opacity: 1; 
          } 
        }
        
        @media (max-width: 960px) {
          .faq-grid { 
            grid-template-columns: 1fr; 
            gap: 2rem; 
          }
          .faq-accordion-wrapper { 
            order: 1; 
          }
          .faq-chatbot-wrapper { 
            order: 2; 
          }
        }
      `}</style>
    </div>
  );
};

export default FAQ;