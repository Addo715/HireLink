import React, { createContext, useState, useContext } from "react";

const ApplicationContext = createContext();

export const ApplicationProvider = ({ children }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [applicationId, setApplicationId] = useState(null);
  const [formData, setFormData] = useState({
    // Personal Information
    fullName: "",
    email: "",
    phone: "",
    // Experience & Skills
    yearsExperience: "",
    skills: [],
    portfolioLink: "",
    // Resume Upload
    resume: null,
    resumeFileName: "",
  });

  const [errors, setErrors] = useState({});

  // Validation functions
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhone = (phone) => {
    const phoneRegex = /^[\d\s()+-]+$/;
    return phone.length >= 10 && phoneRegex.test(phone);
  };

  const validateURL = (url) => {
    if (!url) return true; // Portfolio is optional
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  // Step-specific validation
  const validateStep1 = () => {
    const newErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required";
    } else if (formData.fullName.length < 2) {
      newErrors.fullName = "Name must be at least 2 characters";
    } else if (formData.fullName.length > 50) {
      newErrors.fullName = "Name must not exceed 50 characters";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!validateEmail(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!validatePhone(formData.phone)) {
      newErrors.phone = "Please enter a valid phone number";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = () => {
    const newErrors = {};

    if (!formData.yearsExperience) {
      newErrors.yearsExperience = "Years of experience is required";
    } else if (formData.yearsExperience < 0 || formData.yearsExperience > 50) {
      newErrors.yearsExperience = "Please enter a valid number (0-50)";
    }

    if (formData.skills.length === 0) {
      newErrors.skills = "Please add at least one skill";
    } else if (formData.skills.length > 15) {
      newErrors.skills = "Maximum 15 skills allowed";
    }

    if (formData.portfolioLink && !validateURL(formData.portfolioLink)) {
      newErrors.portfolioLink = "Please enter a valid URL";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep3 = () => {
    const newErrors = {};

    if (!formData.resume) {
      newErrors.resume = "Please upload your resume";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Update form data
  const updateFormData = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
    // Clear error for this field when user starts typing
    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  // Navigation
  const nextStep = () => {
    let isValid = false;

    if (currentStep === 1) {
      isValid = validateStep1();
    } else if (currentStep === 2) {
      isValid = validateStep2();
    } else if (currentStep === 3) {
      isValid = validateStep3();
    }

    if (isValid && currentStep < 4) {
      setCurrentStep((prev) => prev + 1);
    }

    return isValid;
  };

  const previousStep = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
      setErrors({});
    }
  };

  const generateApplicationId = () => {
    const timestamp = Date.now();
    const random = Math.floor(Math.random() * 10000);
    return `APP-${timestamp}-${random}`;
  };

  const submitApplication = () => {
    if (validateStep3()) {
      const id = generateApplicationId();
      setApplicationId(id);
      setCurrentStep(4);
      return true;
    }
    return false;
  };

  const resetApplication = () => {
    setCurrentStep(1);
    setApplicationId(null);
    setFormData({
      fullName: "",
      email: "",
      phone: "",
      yearsExperience: "",
      skills: [],
      portfolioLink: "",
      resume: null,
      resumeFileName: "",
    });
    setErrors({});
  };

  return (
    <ApplicationContext.Provider
      value={{
        currentStep,
        formData,
        errors,
        applicationId,
        updateFormData,
        nextStep,
        previousStep,
        submitApplication,
        resetApplication,
        setErrors,
      }}
    >
      {children}
    </ApplicationContext.Provider>
  );
};

export const useApplication = () => {
  const context = useContext(ApplicationContext);
  if (!context) {
    throw new Error("useApplication must be used within ApplicationProvider");
  }
  return context;
};