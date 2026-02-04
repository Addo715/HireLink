import React, { useState, useCallback, useEffect } from "react";
import {
  User,
  Mail,
  Phone,
  Briefcase,
  Award,
  Link as LinkIcon,
  Upload,
  Check,
  AlertCircle,
  ArrowRight,
  ArrowLeft,
  FileText,
  X,
  CheckCircle,
  Copy,
  Eye,
} from "lucide-react";
import { useApplication } from "../context/ApplicationContext";
import { useParams, useNavigate } from "react-router-dom";
import { professionals } from "../assets/asset";

// Input Field Component
const InputField = ({ icon: Icon, label, error, value, onChange, ...props }) => (
  <div className="mb-5">
    <label className="block text-sm font-medium text-gray-700 mb-2">
      {label}
    </label>
    <div className="relative">
      <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
        <Icon size={18} />
      </div>
      <input
        value={value}
        onChange={onChange}
        {...props}
        className={`w-full pl-12 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-all ${
          error
            ? "border-red-500 focus:ring-red-200"
            : "border-gray-300 focus:ring-blue-200 focus:border-blue-500"
        }`}
      />
    </div>
    {error && (
      <div className="flex items-center gap-1 mt-2 text-red-600 text-sm">
        <AlertCircle size={14} />
        <span>{error}</span>
      </div>
    )}
  </div>
);

// Progress Bar Component
const ProgressBar = ({ currentStep }) => (
  <div className="mb-8">
    <div className="flex justify-between items-center mb-3">
      {[1, 2, 3].map((step) => (
        <div key={step} className="flex items-center flex-1">
          <div
            className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold text-sm transition-all ${
              currentStep >= step
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-500"
            }`}
          >
            {currentStep > step ? <Check size={20} /> : step}
          </div>
          {step < 3 && (
            <div
              className={`flex-1 h-1 mx-2 transition-all ${
                currentStep > step ? "bg-blue-600" : "bg-gray-200"
              }`}
            />
          )}
        </div>
      ))}
    </div>
    <div className="flex justify-between text-xs text-gray-600">
      <span className={currentStep === 1 ? "text-blue-600 font-medium" : ""}>
        Personal Info
      </span>
      <span className={currentStep === 2 ? "text-blue-600 font-medium" : ""}>
        Experience
      </span>
      <span className={currentStep === 3 ? "text-blue-600 font-medium" : ""}>
        Resume
      </span>
    </div>
  </div>
);

// Step 1: Personal Information Component
const Step1 = ({ formData, errors, updateFormData }) => (
  <div className="space-y-1">
    <h2 className="text-2xl font-bold text-gray-900 mb-2">
      Personal Information
    </h2>
    <p className="text-gray-600 mb-6">
      Let's start with your basic information
    </p>

    <InputField
      icon={User}
      label="Full Name"
      type="text"
      placeholder="David Doe"
      value={formData.fullName}
      onChange={(e) => updateFormData("fullName", e.target.value)}
      error={errors.fullName}
      maxLength={50}
    />

    <InputField
      icon={Mail}
      label="Email Address"
      type="email"
      placeholder="david.doe@example.com"
      value={formData.email}
      onChange={(e) => updateFormData("email", e.target.value)}
      error={errors.email}
    />

    <InputField
      icon={Phone}
      label="Phone Number"
      type="tel"
      placeholder="+233 (555) 123-4567"
      value={formData.phone}
      onChange={(e) => updateFormData("phone", e.target.value)}
      error={errors.phone}
    />
  </div>
);

// Step 2: Experience & Skills Component
const Step2 = ({ formData, errors, updateFormData, skillInput, setSkillInput, handleAddSkill, handleRemoveSkill }) => (
  <div className="space-y-1">
    <h2 className="text-2xl font-bold text-gray-900 mb-2">
      Experience & Skills
    </h2>
    <p className="text-gray-600 mb-6">Tell us about your professional background</p>

    <div className="mb-5">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Years of Experience
      </label>
      <div className="relative">
        <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
          <Briefcase size={18} />
        </div>
        <input
          type="number"
          min="0"
          max="50"
          placeholder="5"
          value={formData.yearsExperience}
          onChange={(e) => updateFormData("yearsExperience", e.target.value)}
          className={`w-full pl-12 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-all ${
            errors.yearsExperience
              ? "border-red-500 focus:ring-red-200"
              : "border-gray-300 focus:ring-blue-200 focus:border-blue-500"
          }`}
        />
      </div>
      {errors.yearsExperience && (
        <div className="flex items-center gap-1 mt-2 text-red-600 text-sm">
          <AlertCircle size={14} />
          <span>{errors.yearsExperience}</span>
        </div>
      )}
    </div>

    <div className="mb-5">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Skills (Press Enter to add)
      </label>
      <div className="relative">
        <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
          <Award size={18} />
        </div>
        <input
          type="text"
          placeholder="e.g., React, Node.js, Python"
          value={skillInput}
          onChange={(e) => setSkillInput(e.target.value)}
          onKeyDown={handleAddSkill}
          className={`w-full pl-12 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-all ${
            errors.skills
              ? "border-red-500 focus:ring-red-200"
              : "border-gray-300 focus:ring-blue-200 focus:border-blue-500"
          }`}
        />
      </div>
      {errors.skills && (
        <div className="flex items-center gap-1 mt-2 text-red-600 text-sm">
          <AlertCircle size={14} />
          <span>{errors.skills}</span>
        </div>
      )}
      {formData.skills.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-3">
          {formData.skills.map((skill, index) => (
            <span
              key={index}
              className="bg-blue-50 text-blue-700 px-3 py-1.5 rounded-full text-sm flex items-center gap-2"
            >
              {skill}
              <button
                onClick={() => handleRemoveSkill(index)}
                className="hover:text-blue-900 transition-colors cursor-pointer"
                type="button"
              >
                <X size={14} />
              </button>
            </span>
          ))}
        </div>
      )}
      <p className="text-xs text-gray-500 mt-2">
        {formData.skills.length}/15 skills added
      </p>
    </div>

    <InputField
      icon={LinkIcon}
      label="Portfolio Link (Optional)"
      type="url"
      placeholder="https://yourportfolio.com"
      value={formData.portfolioLink}
      onChange={(e) => updateFormData("portfolioLink", e.target.value)}
      error={errors.portfolioLink}
    />
  </div>
);

// Step 3: Resume Upload Component
const Step3 = ({ formData, errors, updateFormData, handleFileUpload }) => (
  <div className="space-y-1">
    <h2 className="text-2xl font-bold text-gray-900 mb-2">Upload Resume</h2>
    <p className="text-gray-600 mb-6">
      Upload your resume in PDF or DOC format
    </p>

    <div className="mb-5">
      <label className="block text-sm font-medium text-gray-700 mb-3">
        Resume Document
      </label>
      <div
        className={`border-2 border-dashed rounded-lg p-8 text-center transition-all ${
          errors.resume
            ? "border-red-300 bg-red-50"
            : formData.resume
            ? "border-blue-300 bg-blue-50"
            : "border-gray-300 hover:border-blue-400 bg-gray-50"
        }`}
      >
        {formData.resume ? (
          <div className="space-y-3">
            <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto">
              <FileText size={32} className="text-white" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900">
                {formData.resumeFileName}
              </p>
              <p className="text-xs text-gray-500 mt-1">
                {(formData.resume.size / 1024).toFixed(2)} KB
              </p>
            </div>
            <button
              onClick={() => {
                updateFormData("resume", null);
                updateFormData("resumeFileName", "");
              }}
              className="text-sm text-blue-600 hover:text-blue-700 font-medium cursor-pointer"
              type="button"
            >
              Remove and upload different file
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto">
              <Upload size={32} className="text-gray-400" />
            </div>
            <div>
              <label className="cursor-pointer">
                <span className="text-blue-600 hover:text-blue-700 font-medium">
                  Click to upload
                </span>
                <span className="text-gray-600"> or drag and drop</span>
                <input
                  type="file"
                  className="hidden"
                  accept=".pdf,.doc,.docx"
                  onChange={handleFileUpload}
                />
              </label>
              <p className="text-xs text-gray-500 mt-2">
                PDF or DOC (max. 5MB)
              </p>
            </div>
          </div>
        )}
      </div>
      {errors.resume && (
        <div className="flex items-center gap-1 mt-2 text-red-600 text-sm">
          <AlertCircle size={14} />
          <span>{errors.resume}</span>
        </div>
      )}
    </div>
  </div>
);

// Thank You Page Component
const ThankYouPage = ({ applicationId, copySuccess, copyToClipboard, resetApplication, navigate }) => (
  <div className="text-center py-8">
    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
      <CheckCircle size={48} className="text-green-600" />
    </div>

    <h2 className="text-3xl font-bold text-gray-900 mb-3">
      Application Submitted!
    </h2>
    <p className="text-gray-600 mb-8 max-w-md mx-auto">
      Thank you for applying! We've received your application and will review
      it shortly.
    </p>

    <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mb-8 max-w-md mx-auto">
      <p className="text-sm text-gray-600 mb-2">Your Candidate ID</p>
      <div className="flex items-center justify-center gap-3">
        <p className="text-xl font-mono font-bold text-gray-900">
          {applicationId}
        </p>
        <button
          onClick={copyToClipboard}
          className="p-2 hover:bg-gray-200 rounded-lg transition-colors cursor-pointer"
          title="Copy to clipboard"
          type="button"
        >
          {copySuccess ? (
            <Check size={18} className="text-green-600" />
          ) : (
            <Copy size={18} className="text-gray-600" />
          )}
        </button>
      </div>
      <p className="text-xs text-gray-500 mt-2">
        Save this ID to track all your applications
      </p>
    </div>

    <div className="space-y-3 max-w-md mx-auto">
      <div className="bg-white border border-gray-200 rounded-lg p-4">
        <h3 className="font-semibold text-gray-900 mb-2">What's Next?</h3>
        <ul className="text-sm text-gray-600 space-y-2 text-left">
          <li className="flex items-start gap-2">
            <div className="w-5 h-5 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
              1
            </div>
            <span>We'll review your application within 3-5 business days</span>
          </li>
          <li className="flex items-start gap-2">
            <div className="w-5 h-5 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
              2
            </div>
            <span>You'll receive an email about the next steps</span>
          </li>
          <li className="flex items-start gap-2">
            <div className="w-5 h-5 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
              3
            </div>
            <span>Check your spam folder if you don't hear from us</span>
          </li>
        </ul>
      </div>
    </div>

    <div className="flex flex-col sm:flex-row gap-3 mt-8 max-w-md mx-auto">
      <button
        onClick={() => navigate('/dashboard')}
        className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium cursor-pointer flex items-center justify-center gap-2"
        type="button"
      >
        <Eye size={18} />
        View Dashboard
      </button>
      
      {/* <button
        onClick={resetApplication}
        className="flex-1 px-6 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors font-medium cursor-pointer"
        type="button"
      >
        Apply Again
      </button> */}
    </div>
  </div>
);

// Main Application Form Component
const ApplicationForm = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const {
    currentStep,
    formData,
    errors,
    applicationId,
    updateFormData,
    nextStep,
    previousStep,
    submitApplication,
    resetApplication,
  } = useApplication();

  const [skillInput, setSkillInput] = useState("");
  const [copySuccess, setCopySuccess] = useState(false);

  // FIXED: Reset application state when slug changes (applying for different job)
  useEffect(() => {
    // Reset the entire application when the job slug changes
    resetApplication();
    
    if (slug) {
      const professional = professionals.find(p => p.slug === slug);
      if (professional) {
        updateFormData("jobSlug", slug);
        updateFormData("jobRole", professional.name);
      }
    }
  }, [slug, resetApplication, updateFormData]);

  // Store candidate ID when application is submitted
  useEffect(() => {
    if (applicationId && currentStep === 4) {
      localStorage.setItem("currentCandidateId", applicationId);
    }
  }, [applicationId, currentStep]);

  // Handle skill addition
  const handleAddSkill = useCallback((e) => {
    if (e.key === "Enter" && skillInput.trim()) {
      e.preventDefault();
      if (formData.skills.length < 15) {
        updateFormData("skills", [...formData.skills, skillInput.trim()]);
        setSkillInput("");
      }
    }
  }, [skillInput, formData.skills, updateFormData]);

  const handleRemoveSkill = useCallback((indexToRemove) => {
    updateFormData(
      "skills",
      formData.skills.filter((_, index) => index !== indexToRemove)
    );
  }, [formData.skills, updateFormData]);

  // Handle file upload
  const handleFileUpload = useCallback((e) => {
    const file = e.target.files[0];
    if (file) {
      const fileType = file.type;
      const validTypes = [
        "application/pdf",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      ];

      if (!validTypes.includes(fileType)) {
        alert("Please upload a PDF or DOC file");
        return;
      }

      if (file.size > 5 * 1024 * 1024) {
        alert("File size must be less than 5MB");
        return;
      }

      updateFormData("resume", file);
      updateFormData("resumeFileName", file.name);
    }
  }, [updateFormData]);

  // Copy application ID
  const copyToClipboard = useCallback(() => {
    navigator.clipboard.writeText(applicationId);
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 2000);
  }, [applicationId]);

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 via-blue-50 to-gray-50 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
          {currentStep < 4 && (
            <>
              <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  Job Application
                </h1>
                <p className="text-gray-600">
                  Complete all steps to submit your application
                </p>
                {formData.jobRole && (
                  <p className="text-sm text-blue-600 mt-2 font-medium">
                    Applying for: {formData.jobRole}
                  </p>
                )}
              </div>

              <ProgressBar currentStep={currentStep} />
            </>
          )}

          {/* Form Steps */}
          <div className="mt-8">
            {currentStep === 1 && (
              <Step1 
                formData={formData}
                errors={errors}
                updateFormData={updateFormData}
              />
            )}
            {currentStep === 2 && (
              <Step2
                formData={formData}
                errors={errors}
                updateFormData={updateFormData}
                skillInput={skillInput}
                setSkillInput={setSkillInput}
                handleAddSkill={handleAddSkill}
                handleRemoveSkill={handleRemoveSkill}
              />
            )}
            {currentStep === 3 && (
              <Step3
                formData={formData}
                errors={errors}
                updateFormData={updateFormData}
                handleFileUpload={handleFileUpload}
              />
            )}
            {currentStep === 4 && (
              <ThankYouPage
                applicationId={applicationId}
                copySuccess={copySuccess}
                copyToClipboard={copyToClipboard}
                resetApplication={resetApplication}
                navigate={navigate}
              />
            )}
          </div>

          {/* Navigation Buttons */}
          {currentStep < 4 && (
            <div className="flex justify-between mt-8 pt-6 border-t border-gray-200">
              <button
                onClick={previousStep}
                disabled={currentStep === 1}
                type="button"
                className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all cursor-pointer ${
                  currentStep === 1
                    ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                <ArrowLeft size={18} />
                Previous
              </button>

              <button
                onClick={() => {
                  if (currentStep === 3) {
                    submitApplication();
                  } else {
                    nextStep();
                  }
                }}
                type="button"
                className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all font-medium cursor-pointer"
              >
                {currentStep === 3 ? "Submit Application" : "Next"}
                <ArrowRight size={18} />
              </button>
            </div>
          )}
        </div>

        {/* Additional Information */}
        {currentStep < 4 && (
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Need help?{" "}
              <a href="#" className="text-blue-600 hover:text-blue-700 font-medium">
                Contact Support
              </a>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ApplicationForm;