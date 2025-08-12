import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes, FaGoogle } from 'react-icons/fa';
import './LoginModal.css';
import bhtLogo from '../../assets/logo.png'; // Import your logo

const LoginModal = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    const handleEsc = (event) => {
      if (event.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Logging in with:', { email, password });
    alert('Login functionality is in development.');
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="login-modal-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          {/* --- NEW TWO-COLUMN LAYOUT --- */}
          <motion.div
            className="login-modal-content"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 120, damping: 15 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* LEFT SIDE: VISUAL BRANDING */}
            <div className="login-modal-visual">
              <img src={bhtLogo} alt="BHT Corporation Logo" className="login-modal-logo" />
              <h2>Welcome Back</h2>
              <p>Your portal to seamless service and collaboration awaits.</p>
            </div>

            {/* RIGHT SIDE: THE FORM (THIS PART IS SCROLLABLE) */}
            <div className="login-modal-form-section">
              <button className="login-close-btn" onClick={onClose}><FaTimes /></button>
              <h3>Client Login</h3>
              
              <form onSubmit={handleSubmit} className="login-form">
                <div className="login-form-group">
                  <label htmlFor="login-email">Email</label>
                  <input type="email" id="login-email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>
                <div className="login-form-group">
                  <label htmlFor="login-password">Password</label>
                  <input type="password" id="login-password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </div>
               
                <button type="submit" className="login-submit-btn">Sign In</button>
              </form>

             

              {/* <button className="google-login-btn">
                <FaGoogle className="google-icon" />
                Continue with Google
              </button>

              <p className="login-footer-text">
                Don't have an account? Your account is created by a BHT Corporation administrator.
              </p> */}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoginModal;