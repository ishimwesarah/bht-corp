import React, { useState, useEffect, useRef } from 'react';
import { FaPaperPlane, FaPlus, FaMinus, FaRobot, FaUser, FaMicrophone, FaMicrophoneSlash } from 'react-icons/fa';

// BHT Corporation Knowledge Base (for context)
const BHT_KNOWLEDGE_BASE = {
  services: {
    technology: [
      "Computer Maintenance & Repairs",
      "Networking Services & Installation", 
      "Website Design & Development",
      "Stolen Phone Tracking Services",
      "E-learning Platform Development",
      "Internship Programs",
      "Computer & Networking Accessories",
      "E-Government Services Support",
      "Study Abroad Consultation",
      "Visa Application Assistance"
    ],
    design: [
      "Crystal Design & Awards",
      "Custom Mug Design",
      "Epoxy Design & Crafts",
      "Heat Press Services",
      "Precision Engraving",
      "UV Printing Services",
      "Invitation Design",
      "Custom Stamp Design",
      "T-Shirt Design & Printing",
      "Custom Bracelets Design",
      "Photo Studio Services",
      "Brochure Design",
      "Book Cover Design",
      "Logo Design & Branding",
      "Product Label Design",
      "Large Format Printing",
      "Package Design",
      "Video Editing Services",
      "Custom Sticker Design",
      "Live Streaming Services"
    ]
  },
  location: "Musanze, Rwanda",
  contact: "Visit our Contact Us page for detailed information",
  companyInfo: "BHT Corporation is a leading technology and design company based in Musanze, Rwanda, offering comprehensive solutions for businesses and individuals."
};

// AI Service Class (Mock implementation for demo)
class AIService {
  constructor() {
    // Mock service for demo purposes
  }

  buildContext(history) {
    const recentHistory = history.slice(-6);
    return recentHistory.map(msg => `${msg.sender}: ${msg.text}`).join('\n');
  }

  buildPrompt(query, context) {
    return `You are BHT-Bot, an AI assistant for BHT Corporation, a technology and design company in Musanze, Rwanda.

COMPANY INFORMATION:
- Services: ${JSON.stringify(BHT_KNOWLEDGE_BASE.services)}
- Location: ${BHT_KNOWLEDGE_BASE.location}
- Contact: ${BHT_KNOWLEDGE_BASE.contact}

CONVERSATION CONTEXT:
${context}

INSTRUCTIONS:
1. Be helpful, professional and friendly
2. Provide specific information about BHT Corporation services
3. If you don't know something, suggest contacting the company
4. Keep responses concise but informative
5. Use bullet points when listing services

USER QUERY: ${query}

Please provide a helpful response about BHT Corporation:`;
  }

  async generateResponse(prompt, conversationHistory = []) {
    // Mock response for demo
    return new Promise((resolve) => {
      setTimeout(() => {
        const responses = [
          "Thank you for your question! BHT Corporation offers comprehensive technology and design services. We specialize in:\n\n• Website Design & Development\n• Computer Maintenance & Repairs\n• Graphic Design Services\n• Custom Product Design\n\nWould you like to know more about any specific service?",
          "I'd be happy to help! Our services include both technology solutions and creative design work. We're located in Musanze, Rwanda, and serve clients locally and internationally.\n\nFor detailed pricing and project discussions, please visit our Contact Us page.",
          "Great question! BHT Corporation has been providing quality services in technology and design. Our team specializes in:\n\n• IT Support & Networking\n• Logo & Brand Design\n• Custom Printing Services\n• E-learning Platform Development\n\nHow can we help with your specific needs?"
        ];
        resolve(responses[Math.floor(Math.random() * responses.length)]);
      }, 1500);
    });
  }
}

// Speech Recognition Hook
const useSpeechRecognition = () => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const recognitionRef = useRef(null);

  useEffect(() => {
    if ('webkitSpeechRecognition' in window) {
      recognitionRef.current = new window.webkitSpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = 'en-US';

      recognitionRef.current.onresult = (event) => {
        const result = event.results[0][0].transcript;
        setTranscript(result);
        setIsListening(false);
      };

      recognitionRef.current.onerror = () => {
        setIsListening(false);
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
      };
    }
  }, []);

  const startListening = () => {
    if (recognitionRef.current && !isListening) {
      setIsListening(true);
      recognitionRef.current.start();
    }
  };

  const stopListening = () => {
    if (recognitionRef.current && isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    }
  };

  return { isListening, transcript, startListening, stopListening };
};

// Enhanced Chatbot Component
const EnhancedChatbot = () => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [aiService] = useState(() => new AIService());
  const messagesEndRef = useRef(null);
  const lastRequestTime = useRef(0);
  const [shouldAutoScroll, setShouldAutoScroll] = useState(true);
  
  const { isListening, transcript, startListening, stopListening } = useSpeechRecognition();

  useEffect(() => {
    initializeChat();
  }, []);

  useEffect(() => {
    if (transcript) {
      setInputValue(transcript);
    }
  }, [transcript]);

  // Only auto-scroll when user sends a message or bot responds, not on initial load
  useEffect(() => {
    if (shouldAutoScroll && messages.length > 1) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, shouldAutoScroll]);

  const initializeChat = () => {
    const welcomeMessage = {
      id: 1,
      text: "Hello! I'm BHT-Bot, your AI assistant for BHT Corporation. I can help you learn about our Technology Solutions, Graphic Design Services, and much more. What would you like to know?",
      sender: 'bot'
    };

    setMessages([welcomeMessage]);
    // Don't auto-scroll on initial load
    setShouldAutoScroll(false);
  };

  const handleSendMessage = async () => {
    if (inputValue.trim() === '' || isTyping) return;

    // Rate limiting protection
    const now = Date.now();
    if (now - lastRequestTime.current < 1000) {
      return;
    }
    lastRequestTime.current = now;

    const newUserMessage = { 
      id: Date.now(), 
      text: inputValue, 
      sender: 'user'
    };
    
    setMessages(prev => [...prev, newUserMessage]);
    const currentQuery = inputValue;
    setInputValue('');
    setIsTyping(true);
    setShouldAutoScroll(true); // Enable auto-scroll when user interacts

    try {
      // Generate AI response
      const response = await aiService.generateResponse(currentQuery, messages);

      const newBotMessage = { 
        id: Date.now() + 1, 
        text: response, 
        sender: 'bot'
      };
      
      setMessages(prev => [...prev, newBotMessage]);
    } catch (error) {
      console.error('Error generating response:', error);
      const errorMessage = {
        id: Date.now() + 1,
        text: "I apologize for the inconvenience. Please try again or contact us directly.",
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

  const formatMessage = (text) => {
    return text.split('\n').map((line, index) => {
      if (line.startsWith('• ') || line.startsWith('- ')) {
        return <div key={index} className="bullet-point">{line}</div>;
      }
      if (line.startsWith('**') && line.endsWith('**')) {
        return <div key={index} className="message-heading">{line.slice(2, -2)}</div>;
      }
      if (line.trim() === '') {
        return <br key={index} />;
      }
      return <div key={index}>{line}</div>;
    });
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
          <div
            key={msg.id}
            className={`message-bubble ${msg.sender}`}
          >
            <div className="message-avatar">
              {msg.sender === 'bot' ? <FaRobot /> : <FaUser />}
            </div>
            <div className="message-content">
              {formatMessage(msg.text)}
              <div className="message-meta">
                <small>{new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</small>
              </div>
            </div>
          </div>
        ))}
        
        {isTyping && (
          <div className="message-bubble bot typing">
            <div className="message-avatar">
              <FaRobot />
            </div>
            <div className="typing-indicator">
              <span></span><span></span><span></span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      
      <div className="chatbot-input-container">
        <div className="input-wrapper">
          <textarea
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask about our services..."
            disabled={isTyping}
            className="chatbot-input"
            rows={1}
          />
          <button
            onClick={isListening ? stopListening : startListening}
            className={`voice-btn ${isListening ? 'listening' : ''}`}
            disabled={isTyping}
          >
            {isListening ? <FaMicrophoneSlash /> : <FaMicrophone />}
          </button>
          <button 
            onClick={handleSendMessage} 
            disabled={isTyping || inputValue.trim() === ''}
            className="chatbot-send-btn"
          >
            <FaPaperPlane />
          </button>
        </div>
      </div>
    </div>
  );
};

// FAQ Item Component
const FAQItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="faq-item">
      <div className="faq-question" onClick={() => setIsOpen(!isOpen)}>
        <h4>{question}</h4>
        <div className="faq-icon">
          {isOpen ? <FaMinus /> : <FaPlus />}
        </div>
      </div>
      {isOpen && (
        <div className="faq-answer">
          <p>{answer}</p>
        </div>
      )}
    </div>
  );
};

// Main FAQ Component
const EnhancedFAQ = () => {
  const faqData = [
    {
      question: 'What types of services do you offer?',
      answer: 'We specialize in Technology Solutions (website design, IT support, networking, visa assistance) and Graphic Design Services (logo design, printing, custom products, video production). Ask our AI assistant for detailed information about any specific service!'
    },
    {
      question: 'How does the internship program work?',
      answer: 'Our internship program provides hands-on experience in Technology and Design departments. We offer mentorship, real project work, and skill development opportunities. Apply through our Careers page.'
    },
    {
      question: 'What is your website development process?',
      answer: 'We follow a collaborative approach: Discovery & Analysis → Design & Prototyping → Development & Testing → Launch & Support. You\'re involved at every step to ensure we exceed your expectations.'
    },
    {
      question: 'Where are you located and how can I visit?',
      answer: 'BHT Corporation is located in Musanze, Rwanda. Visit our Contact Us page for our detailed address, map, and directions. We welcome both appointments and walk-ins during business hours.'
    },
    {
      question: 'How can I get a price quote for my project?',
      answer: 'Contact us through our website with your project details, or ask our AI assistant for general pricing information. We provide custom quotes within 24 hours based on your specific requirements.'
    }
  ];

  return (
    <div className="faq-container">
      <div className="faq-hero">
        <h1>Have Questions? We Have Answers.</h1>
        <p>Use our AI Assistant for specific queries, or browse our most common questions below.</p>
      </div>

      <div className="faq-content">
        <div className="faq-grid">
          {/* STATIC FAQ ACCORDION - Now first on mobile */}
          <div className="faq-accordion-wrapper">
            <div className="faq-header">
              <h2>Most Asked Questions</h2>
            </div>
            <div className="faq-accordion">
              {faqData.map((faq, index) => (
                <FAQItem key={index} question={faq.question} answer={faq.answer} />
              ))}
            </div>
          </div>

          {/* AI CHATBOT - Now second on mobile */}
          <div className="faq-chatbot-wrapper">
            <h2>Ask Our AI Assistant</h2>
            <EnhancedChatbot />
          </div>
        </div>
      </div>

      <style jsx>{`
        .faq-container {
          min-height: 100vh;
          background: linear-gradient(135deg, #E0F0FF 0%, #F5F5F5 100%);
          padding: 2rem 0;
          margin-top: 30px;
        }

        .faq-hero {
          text-align: center;
          margin-bottom: 3rem;
        }

        .faq-hero h1 {
          font-size: 2.5rem;
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
          padding: 0 2rem;
        }

        .faq-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 3rem;
          align-items: start;
        }

        .faq-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1.5rem;
        }

        .faq-header h2 {
          font-size: 1.8rem;
          color: #005B96;
          margin: 0;
        }

        .faq-accordion {
          background: #FFFFFF;
          border-radius: 12px;
          padding: 1rem;
          box-shadow: 0 4px 15px rgba(0,91,150,0.1);
          border: 2px solid #E0F0FF;
        }

        .chatbot-container {
          background: #FFFFFF;
          border-radius: 12px;
          box-shadow: 0 4px 15px rgba(0,91,150,0.1);
          overflow: hidden;
          height: 600px;
          display: flex;
          flex-direction: column;
          border: 2px solid #E0F0FF;
        }

        .chatbot-header {
          background: linear-gradient(135deg, #005B96 0%, #3CB371 100%);
          color: white;
          padding: 1rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
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
          padding: 1rem;
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .message-bubble {
          display: flex;
          gap: 0.75rem;
          max-width: 85%;
          animation: fadeInUp 0.3s ease;
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
        }

        .message-bubble.user .message-avatar {
          background: linear-gradient(135deg, #005B96 0%, #F4C430 100%);
          color: white;
        }

        .message-bubble.bot .message-avatar {
          background: linear-gradient(135deg, #3CB371 0%, #005B96 100%);
          color: white;
        }

        .message-content {
          background: #F5F5F5;
          padding: 0.75rem 1rem;
          border-radius: 18px;
          line-height: 1.5;
          word-wrap: break-word;
          color: #4F4F4F;
          position: relative;
        }

        .message-bubble.user .message-content {
          background: linear-gradient(135deg, #005B96 0%, #F4C430 100%);
          color: white;
        }

        .message-meta {
          font-size: 0.7rem;
          opacity: 0.7;
          margin-top: 0.5rem;
        }

        .bullet-point {
          margin: 0.25rem 0;
          padding-left: 1rem;
        }

        .message-heading {
          font-weight: bold;
          color: #005B96;
          margin: 0.5rem 0 0.25rem 0;
        }

        .message-bubble.user .message-heading {
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
          border-top: 1px solid #3CB371;
        }

        .input-wrapper {
          display: flex;
          align-items: flex-end;
          gap: 0.5rem;
        }

        .chatbot-input {
          flex: 1;
          padding: 0.75rem 1rem;
          border: 2px solid #005B96;
          border-radius: 20px;
          outline: none;
          font-size: 0.95rem;
          color: #4F4F4F;
          resize: none;
          max-height: 100px;
          min-height: 44px;
          font-family: inherit;
        }

        .chatbot-input:focus {
          border-color: #F4C430;
          box-shadow: 0 0 0 3px rgba(244, 196, 48, 0.1);
        }

        .voice-btn {
          padding: 0.75rem;
          background: linear-gradient(135deg, #3CB371 0%, #005B96 100%);
          color: white;
          border: none;
          border-radius: 50%;
          cursor: pointer;
          transition: all 0.2s;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 44px;
          height: 44px;
        }

        .voice-btn:hover {
          transform: scale(1.05);
          box-shadow: 0 4px 12px rgba(60, 179, 113, 0.3);
        }

        .voice-btn.listening {
          background: linear-gradient(135deg, #FF6B6B 0%, #FF8E8E 100%);
          animation: pulse 1s infinite;
        }

        .chatbot-send-btn {
          padding: 0.75rem;
          background: linear-gradient(135deg, #F4C430 0%, #005B96 100%);
          color: white;
          border: none;
          border-radius: 50%;
          cursor: pointer;
          transition: all 0.2s;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 44px;
          height: 44px;
        }

        .chatbot-send-btn:hover {
          transform: scale(1.05);
          box-shadow: 0 4px 12px rgba(244, 196, 48, 0.3);
        }

        .chatbot-send-btn:disabled,
        .voice-btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
          transform: none;
        }

        .faq-item {
          border-bottom: 1px solid #E0F0FF;
          padding: 1.5rem 0;
        }

        .faq-question {
          display: flex;
          justify-content: space-between;
          align-items: center;
          cursor: pointer;
          transition: color 0.2s;
        }

        .faq-question:hover {
          color: #005B96;
        }

        .faq-question h4 {
          color: #4F4F4F;
          margin: 0;
          padding-right: 1rem;
          font-size: 1.1rem;
          transition: color 0.2s;
        }

        .faq-question:hover h4 {
          color: #005B96;
        }

        .faq-icon {
          color: #F4C430;
          font-size: 1.2rem;
          transition: all 0.2s;
        }

        .faq-question:hover .faq-icon {
          color: #3CB371;
          transform: scale(1.1);
        }

        .faq-answer {
          overflow: hidden;
          transition: all 0.3s ease-in-out;
        }

        .faq-answer p {
          padding-top: 1rem;
          margin: 0;
          color: #4F4F4F;
          line-height: 1.6;
        }

        @keyframes typing {
          0%, 60%, 100% {
            transform: translateY(0);
            opacity: 0.4;
          }
          30% {
            transform: translateY(-10px);
            opacity: 1;
          }
        }

        @keyframes pulse {
          0% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.1);
          }
          100% {
            transform: scale(1);
          }
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        /* Scrollbar Styling */
        .chatbot-messages::-webkit-scrollbar {
          width: 6px;
        }

        .chatbot-messages::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 3px;
        }

        .chatbot-messages::-webkit-scrollbar-thumb {
          background: #3CB371;
          border-radius: 3px;
        }

        .chatbot-messages::-webkit-scrollbar-thumb:hover {
          background: #005B96;
        }

        /* Responsive Design */
        @media (max-width: 768px) {
          .faq-grid {
            grid-template-columns: 1fr;
            gap: 2rem;
          }

          /* FAQ accordion appears first on mobile */
          .faq-accordion-wrapper {
            order: 1;
          }

          /* Chatbot appears second on mobile */
          .faq-chatbot-wrapper {
            order: 2;
          }
          
          .chatbot-container {
            height: 500px;
          }

          .chatbot-header {
            padding: 0.75rem;
          }

          .chatbot-messages {
            padding: 0.75rem;
          }

          .chatbot-input-container {
            padding: 0.75rem;
          }

          .message-bubble {
            max-width: 95%;
          }

          .chatbot-input {
            font-size: 16px;
          }

          .faq-hero h1 {
            font-size: 2rem;
          }

          .faq-hero p {
            font-size: 1rem;
            padding: 0 1rem;
          }
        }

        @media (max-width: 480px) {
          .chatbot-header {
            flex-direction: column;
            align-items: flex-start;
            gap: 0.5rem;
          }

          .input-wrapper {
            flex-direction: column;
            gap: 0.75rem;
          }

          .voice-btn,
          .chatbot-send-btn {
            width: 100%;
            border-radius: 22px;
          }

          .faq-content {
            padding: 0 1rem;
          }
        }

        .chatbot-input:disabled {
          background-color: #f5f5f5;
          cursor: not-allowed;
        }

        .voice-btn:focus,
        .chatbot-send-btn:focus {
          outline: 2px solid #F4C430;
          outline-offset: 2px;
        }

        .chatbot-input:focus {
          border-color: #F4C430;
          box-shadow: 0 0 0 3px rgba(244, 196, 48, 0.1);
        }

        @media (prefers-contrast: high) {
          .message-content {
            border: 1px solid #000;
          }
          
          .chatbot-input {
            border: 2px solid #000;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .message-bubble,
          .faq-answer,
          .typing-indicator span {
            animation: none !important;
            transition: none !important;
          }
        }
      `}</style>
    </div>
  );
};

export default EnhancedFAQ;