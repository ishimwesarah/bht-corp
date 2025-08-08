import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaPaperPlane } from 'react-icons/fa';
import './Chatbot.css';

const Chatbot = () => {
  const [messages, setMessages] = useState([
    { id: 1, text: "Hello! I'm BHT-Bot, your AI assistant. How can I help you learn about our services today?", sender: 'bot' }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (inputValue.trim() === '' || isTyping) return;

    const newUserMessage = { id: Date.now(), text: inputValue, sender: 'user' };
    setMessages(prev => [...prev, newUserMessage]);
    const currentQuery = inputValue;
    setInputValue('');
    setIsTyping(true);

    try {
      const response = await fetch('/api/ask-ai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: currentQuery }),
      });

      if (!response.ok) {
        throw new Error('Failed to get a response from the server.');
      }

      const data = await response.json();
      const newBotMessage = { id: Date.now() + 1, text: data.answer, sender: 'bot' };
      setMessages(prev => [...prev, newBotMessage]);

    } catch (error) {
      console.error(error);
      const errorBotMessage = {
        id: Date.now() + 1,
        text: "I'm sorry, I'm having a little trouble connecting right now. Please try again in a moment.",
        sender: 'bot',
      };
      setMessages(prev => [...prev, errorBotMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="chatbot-container">
      <div className="chatbot-messages">
        {messages.map((msg) => (
          <motion.div
            key={msg.id}
            className={`message-bubble ${msg.sender}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {msg.text}
          </motion.div>
        ))}
        {isTyping && (
          <div className="message-bubble bot typing-indicator">
            <span></span><span></span><span></span>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      <form className="chatbot-input-form" onSubmit={handleSendMessage}>
        <input
          type="text"
          value={inputValue}
          // --- THIS IS THE CORRECTED LINE ---
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Ask about our services..."
          autoComplete="off"
          disabled={isTyping}
        />
        <button type="submit" disabled={isTyping}><FaPaperPlane /></button>
      </form>
    </div>
  );
};

export default Chatbot;
