import React, { createContext, useContext, useState } from 'react';

const ApplicationContext = createContext();

export const useApplication = () => {
  const context = useContext(ApplicationContext);
  if (!context) {
    throw new Error('useApplication must be used within ApplicationProvider');
  }
  return context;
};

export const ApplicationProvider = ({ children }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [applicationId, setApplicationId] = useState('');
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    yearsExperience: '',
    skills: [],
    portfolioLink: '',
    resume: null,
    resumeFileName: '',
    jobSlug: '', // Store the job slug for tracking
    jobRole: '', // Store the job role name
  });
  const [errors, setErrors] = useState({});

  const updateFormData = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const validateStep = (step) => {
    const newErrors = {};

    if (step === 1) {
      if (!formData.fullName.trim()) {
        newErrors.fullName = 'Full name is required';
      }
      if (!formData.email.trim()) {
        newErrors.email = 'Email is required';
      } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        newErrors.email = 'Email is invalid';
      }
      if (!formData.phone.trim()) {
        newErrors.phone = 'Phone number is required';
      }
    }

    if (step === 2) {
      if (!formData.yearsExperience || formData.yearsExperience < 0) {
        newErrors.yearsExperience = 'Years of experience is required';
      }
      if (formData.skills.length === 0) {
        newErrors.skills = 'At least one skill is required';
      }
      if (formData.portfolioLink && !/^https?:\/\/.+/.test(formData.portfolioLink)) {
        newErrors.portfolioLink = 'Please enter a valid URL';
      }
    }

    if (step === 3) {
      if (!formData.resume) {
        newErrors.resume = 'Resume is required';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const previousStep = () => {
    setCurrentStep(prev => prev - 1);
  };

  const generateApplicationId = () => {
    const timestamp = Date.now();
    const random = Math.floor(Math.random() * 10000);
    return `APP-${timestamp}-${random}`;
  };

  const submitApplication = () => {
    if (validateStep(3)) {
      const newApplicationId = generateApplicationId();
      setApplicationId(newApplicationId);

      // Create candidate object
      const candidate = {
        id: newApplicationId,
        name: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        experience: `${formData.yearsExperience} years`,
        skills: formData.skills,
        portfolioLink: formData.portfolioLink,
        resumeFileName: formData.resumeFileName,
        jobSlug: formData.jobSlug,
        jobRole: formData.jobRole,
        appliedDate: new Date().toISOString(),
      };

      // Get existing candidates from localStorage
      const existingCandidates = JSON.parse(localStorage.getItem('candidates') || '{"applied":[],"reviewed":[],"interview":[],"offer":[]}');
      
      // Add new candidate to applied stage
      existingCandidates.applied.push(candidate);
      
      // Save back to localStorage
      localStorage.setItem('candidates', JSON.stringify(existingCandidates));

      // Store applied jobs for the user
      const appliedJobs = JSON.parse(localStorage.getItem('appliedJobs') || '[]');
      if (!appliedJobs.includes(formData.jobSlug)) {
        appliedJobs.push(formData.jobSlug);
        localStorage.setItem('appliedJobs', JSON.stringify(appliedJobs));
      }

      setCurrentStep(4);
    }
  };

  const resetApplication = () => {
    setCurrentStep(1);
    setFormData({
      fullName: '',
      email: '',
      phone: '',
      yearsExperience: '',
      skills: [],
      portfolioLink: '',
      resume: null,
      resumeFileName: '',
      jobSlug: '',
      jobRole: '',
    });
    setErrors({});
    setApplicationId('');
  };

  const value = {
    currentStep,
    formData,
    errors,
    applicationId,
    updateFormData,
    nextStep,
    previousStep,
    submitApplication,
    resetApplication,
  };

  return (
    <ApplicationContext.Provider value={value}>
      {children}
    </ApplicationContext.Provider>
  );
};