import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import emailjs from '@emailjs/browser';
import './Careers.css';

const createDynamicSchema = (status) => {
  const baseSchema = {
    fullName: z.string().min(3, { message: 'Full name is required (min 3 characters)' }),
    email: z.string().email({ message: 'A valid email is required' }),
    phone: z.string().min(10, { message: 'A valid phone number is required' }),
    status: z.string().min(1, { message: 'Please select your current status' }),
    customStatus: z.string().optional(),
    program: z.string().min(1, { message: 'Please select a program' }),
    portfolioUrl: z.string()
      .url({ message: 'Please provide a valid URL (https://...)' })
      .optional()
      .or(z.literal('')),
    startDate: z.string().min(1, { message: 'Start date is required' }),
    endDate: z.string().min(1, { message: 'End date is required' }),
    coverLetter: z.string().min(100, { message: 'Cover letter must be at least 100 characters' }),
  };

  if (status === 'Student') {
    return z.object({
      ...baseSchema,
      university: z.string().min(2, { message: 'University name is required' }),
      fieldOfStudy: z.string().min(2, { message: 'Field of study is required' }),
    });
  }
  if (status === 'Professional') {
    return z.object({
      ...baseSchema,
      currentCompany: z.string().min(2, { message: 'Company name is required' }),
      yearsOfExperience: z.string().min(1, { message: 'Please select experience level' }),
    });
  }
  return z.object(baseSchema);
};

const Careers = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [currentSchema, setCurrentSchema] = useState(createDynamicSchema(''));

  const { 
    register, 
    handleSubmit, 
    formState: { errors }, 
    reset, 
    control, 
    watch 
  } = useForm({
    resolver: zodResolver(currentSchema),
    mode: 'onChange'
  });

  const watchedStatus = useWatch({ control, name: 'status', defaultValue: '' });
  const showCustomStatus = watch('status') === 'Other';

  useEffect(() => {
    setCurrentSchema(createDynamicSchema(watchedStatus));
  }, [watchedStatus]);

const onSubmit = async (data) => {
  setIsSubmitting(true);
  setSubmitStatus(null);

  try {
    // Configure the email to appear from the applicant
    const templateParams = {
      // Core applicant information
      fullName: data.fullName || '',
      email: data.email || '',
      phone: data.phone || '',
      status: data.status === 'Other' ? (data.customStatus || '') : (data.status || ''),
      program: data.program || '',
      startDate: data.startDate || '',
      endDate: data.endDate || '',
      portfolioUrl: data.portfolioUrl || '',
      coverLetter: data.coverLetter || '',
      university: data.university || '',
      fieldOfStudy: data.fieldOfStudy || '',
      currentCompany: data.currentCompany || '',
      yearsOfExperience: data.yearsOfExperience || '',
      
      // EmailJS sender configuration - THESE ARE KEY!
      from_name: data.fullName || 'Internship Applicant', // This shows as sender name
      from_email: data.email || '', // This shows as sender email
      reply_to: data.email || '', // Where replies will go
      
      // Optional: Your organization's email (where the email should be sent)
      to_email: 'hr@bhtcorporation.com', // Replace with your HR email
      to_name: 'BHT Corporation HR Team'
    };

    console.log('Template params:', templateParams);

    // Send application to organization
    await emailjs.send(
      'service_7656cfg',
      'template_txhorzd',
      templateParams,
      'nRgg6ciFfMfgfzZ6M'
    );

    // Send confirmation to applicant (this one should come from you/organization)
    await emailjs.send(
      'service_7656cfg',
      'template_k5t8i8l',
      {
        to_name: data.fullName || '',
        to_email: data.email || '',
        fullName: data.fullName || '',
        program: data.program || '',
        status: data.status === 'Other' ? (data.customStatus || '') : (data.status || ''),
        
        // For confirmation email, use your organization details as sender
        from_name: 'BHT Corporation HR Team',
        from_email: 'hr@bhtcorporation.com', // Use your verified EmailJS email
        reply_to: 'hr@bhtcorporation.com'
      },
      'nRgg6ciFfMfgfzZ6M'
    );

    setSubmitStatus('success');
    reset();
  } catch (error) {
    console.error('Email submission error:', error);
    setSubmitStatus('error');
  } finally {
    setIsSubmitting(false);
  }
};
  const renderStatusSpecificFields = () => (
    <AnimatePresence mode="wait">
      {watchedStatus && (
        <motion.div
          key={watchedStatus}
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
        >
          {watchedStatus === 'Student' && (
            <div className="form-section dynamic-section">
              <h3 className="section-title">🎓 Student Information</h3>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="university">University/School *</label>
                  <input 
                    type="text" 
                    id="university" 
                    {...register('university')} 
                    placeholder="University of Rwanda"
                  />
                  {errors.university && <p className="error-message">{errors.university.message}</p>}
                </div>
                <div className="form-group">
                  <label htmlFor="fieldOfStudy">Field of Study *</label>
                  <input 
                    type="text" 
                    id="fieldOfStudy" 
                    {...register('fieldOfStudy')} 
                    placeholder="Computer Science"
                  />
                  {errors.fieldOfStudy && <p className="error-message">{errors.fieldOfStudy.message}</p>}
                </div>
              </div>
            </div>
          )}

          {watchedStatus === 'Professional' && (
            <div className="form-section dynamic-section">
              <h3 className="section-title">💼 Professional Experience</h3>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="currentCompany">Current Company *</label>
                  <input 
                    type="text" 
                    id="currentCompany" 
                    {...register('currentCompany')} 
                    placeholder="Your current employer"
                  />
                  {errors.currentCompany && <p className="error-message">{errors.currentCompany.message}</p>}
                </div>
                <div className="form-group">
                  <label htmlFor="yearsOfExperience">Years of Experience *</label>
                  <select id="yearsOfExperience" {...register('yearsOfExperience')}>
                    <option value="">Select experience level</option>
                    <option value="Less than 1 year">Less than 1 year</option>
                    <option value="1-2 years">1-2 years</option>
                    <option value="3-5 years">3-5 years</option>
                    <option value="More than 5 years">More than 5 years</option>
                  </select>
                  {errors.yearsOfExperience && <p className="error-message">{errors.yearsOfExperience.message}</p>}
                </div>
              </div>
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );

  return (
    <div className="careers-page">
      <section className="careers-hero">
        <div className="container">
          <h1>Grow With Us: Internship Program</h1>
          <p>Gain real-world experience and build your future with BHT Corporation</p>
        </div>
      </section>

      <section className="internship-form-section container">
        <div className="form-intro">
          <h2>Apply for an Internship</h2>
          <p>Complete this form to apply for our internship program. Fields marked with * are required.</p>
        </div>
        
        {submitStatus === 'success' ? (
          <div className="form-success-message">
            <h3>Thank You!</h3>
            <p>Your application has been submitted successfully. We'll contact you soon.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="internship-form" noValidate>
            <div className="form-section">
              <h3 className="section-title">Personal Information</h3>
              
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="fullName">Full Name *</label>
                  <input 
                    type="text" 
                    id="fullName" 
                    {...register('fullName')} 
                    placeholder="Your full name"
                  />
                  {errors.fullName && <p className="error-message">{errors.fullName.message}</p>}
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email Address *</label>
                  <input 
                    type="email" 
                    id="email" 
                    {...register('email')} 
                    placeholder="your.email@example.com"
                  />
                  {errors.email && <p className="error-message">{errors.email.message}</p>}
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="phone">Phone Number *</label>
                  <input 
                    type="tel" 
                    id="phone" 
                    {...register('phone')} 
                    placeholder="+250 XXX XXX XXX"
                  />
                  {errors.phone && <p className="error-message">{errors.phone.message}</p>}
                </div>
              </div>
            </div>

            <div className="form-section">
              <h3 className="section-title">Background Information</h3>
              
              <div className="form-group">
                <label>Current Status *</label>
                <select id="status" {...register('status')}>
                  <option value="">Select your status</option>
                  <option value="Student">Student</option>
                  <option value="Professional">Working Professional</option>
                  <option value="Recent Graduate">Recent Graduate</option>
                  <option value="Career Changer">Career Changer</option>
                  <option value="Other">Other (please specify)</option>
                </select>
                {errors.status && <p className="error-message">{errors.status.message}</p>}
              </div>

              {showCustomStatus && (
                <div className="form-group">
                  <label htmlFor="customStatus">Please specify *</label>
                  <input 
                    type="text" 
                    id="customStatus" 
                    {...register('customStatus')} 
                    placeholder="Your current status"
                  />
                </div>
              )}
              
              {renderStatusSpecificFields()}

              <div className="form-group">
                <label htmlFor="program">Internship Program *</label>
                <select id="program" {...register('program')}>
                  <option value="">Select a program</option>
                  <option value="Information Technology">Information Technology (IT)</option>
                  <option value="Printing and Design">Printing and Design</option>
                </select>
                {errors.program && <p className="error-message">{errors.program.message}</p>}
              </div>

              <div className="form-group">
                <label htmlFor="portfolioUrl">Portfolio/Profile URL (Optional)</label>
                <input 
                  type="url" 
                  id="portfolioUrl" 
                  {...register('portfolioUrl')} 
                  placeholder="https://yourportfolio.com"
                />
                {errors.portfolioUrl && <p className="error-message">{errors.portfolioUrl.message}</p>}
              </div>
            </div>

            <div className="form-section">
              <h3 className="section-title">Internship Details</h3>
              
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="startDate">Start Date *</label>
                  <input 
                    type="date" 
                    id="startDate" 
                    {...register('startDate')} 
                  />
                  {errors.startDate && <p className="error-message">{errors.startDate.message}</p>}
                </div>
                <div className="form-group">
                  <label htmlFor="endDate">End Date *</label>
                  <input 
                    type="date" 
                    id="endDate" 
                    {...register('endDate')} 
                  />
                  {errors.endDate && <p className="error-message">{errors.endDate.message}</p>}
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="coverLetter">Cover Letter *</label>
                <textarea 
                  id="coverLetter" 
                  rows="6" 
                  {...register('coverLetter')}
                  placeholder="Tell us why you're a great fit for this internship..."
                ></textarea>
                {errors.coverLetter && <p className="error-message">{errors.coverLetter.message}</p>}
              </div>
            </div>
            
            {submitStatus === 'error' && (
              <div className="form-error">
                <p>An error occurred while submitting. Please try again.</p>
              </div>
            )}

            <button 
              type="submit" 
              className="submit-button" 
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <span className="spinner"></span> Submitting...
                </>
              ) : (
                'Submit Application'
              )}
            </button>
          </form>
        )}
      </section>
    </div>
  );
};

export default Careers;