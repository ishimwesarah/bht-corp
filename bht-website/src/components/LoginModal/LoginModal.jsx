import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes, FaGoogle } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './LoginModal.css';
import bhtLogo from '../../assets/logo.png';

const LoginModal = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = useNavigate();
  const { login } = useAuth();

  // Clear error when modal opens
  useEffect(() => {
    if (isOpen) {
      setError('');
    }
  }, [isOpen]);
  
  // Handle closing the modal with the Escape key
  useEffect(() => {
    const handleEsc = (event) => {
      if (event.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      const response = await fetch('https://bht-backend.onrender.com/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to login.');
      }

      login(data); // Save user info to global context
      onClose(); // Close the modal

      // Redirect user based on their role
      if (data.role === 'admin') {
        navigate('/admin/dashboard');
      } else {
        navigate('/client/dashboard');
      }

    } catch (err) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
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
          <motion.div
            className="login-modal-content"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 120, damping: 15 }}
            onClick={(e) => e.stopPropagation()}
          >
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
                {/* <div className="login-options">
                  <label className="remember-me"><input type="checkbox" /> Remember me</label>
                  <a href="#" className="forgot-password">Forgot password?</a>
                </div> */}
                {error && <p className="login-error-message">{error}</p>}
                <button type="submit" className="login-submit-btn" disabled={isSubmitting}>
                  {isSubmitting ? 'Signing In...' : 'Sign In'}
                </button>
              </form>

              {/* <div className="login-divider"><span>OR</span></div> */}

              {/* <button className="google-login-btn">
                <FaGoogle className="google-icon" />
                Continue with Google
              </button> */}
            </div>
            
            <div className="login-modal-visual">
              <img src={bhtLogo} alt="BHT Corporation Logo" className="login-modal-logo" />
              <h2>Welcome Back</h2>
              <p>Your portal to seamless service and collaboration awaits.</p>
              <p className="login-footer-text">
                Don't have an account? Your account is created by a BHT Corporation administrator.
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoginModal;