import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useAuth } from '../../context/AuthContext';
import apiClient from '../../utils/apiClient';
import './ClientDashboard.css';
import Button from '../../components/Button/Button';

const ClientDashboard = () => {
  const { userInfo } = useAuth();
  const { register, handleSubmit, reset } = useForm();
  
  // --- 1. ADD NEW isSubmitting STATE ---
  const [isSubmitting, setIsSubmitting] = useState(false);
  // Optional: Add an error state for better feedback
  const [error, setError] = useState('');

  const handleCommandSubmit = async (data) => {
    // 2. SET LOADING STATE TO TRUE
    setIsSubmitting(true);
    setError('');

    const formData = new FormData();
    formData.append('message', data.commandMessage);
    
    if (data.attachment && data.attachment.length > 0) {
      formData.append('attachment', data.attachment[0]);
    }

    try {
      await apiClient.post('/commands/with-file', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      alert("Your command has been sent successfully!");
      reset();
    } catch (err) {
      console.error("Failed to send command", err);
      setError('Failed to send your command. Please try again.');
    } finally {
      // 3. SET LOADING STATE BACK TO FALSE
      setIsSubmitting(false);
    }
  };

  return (
    <div className="client-dashboard">
      <h1>Welcome, {userInfo?.name}!</h1>
      <p>This is your personal client portal. Send us new requests and track their status.</p>

      <div className="dashboard-card command-card">
        <h3>Submit a New Command or Request</h3>
        <form onSubmit={handleSubmit(handleCommandSubmit)}>
          <div className="form-group">
            <label>Your Message / Command</label>
            <textarea 
              {...register('commandMessage', { required: true })}
              placeholder="Describe your new project or request in detail..." 
              rows="5"
            ></textarea>
          </div>

          <div className="form-group">
            <label>Attach a File (Optional)</label>
            <p className="field-description">You can attach a logo sample, design brief, or any relevant document.</p>
            <input 
              type="file" 
              {...register('attachment')} 
            />
          </div>
          
          {error && <p className="error-message">{error}</p>}

          {/* --- 4. UPDATE THE BUTTON'S STATE --- */}
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Sending...' : 'Send Command'}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ClientDashboard;