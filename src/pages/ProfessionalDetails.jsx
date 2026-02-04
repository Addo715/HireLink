import React, { useState, useEffect } from 'react';
import { Star, MapPin, CheckCircle, ArrowLeft, Building2, Briefcase } from 'lucide-react';
import { useParams, useNavigate } from 'react-router-dom';
import { professionals } from '../assets/asset';

const ProfessionalDetails = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [hasApplied, setHasApplied] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, []);

  // Find the professional by slug
  const professional = professionals.find(p => p.slug === slug);

  // Check if user has applied for this job
  useEffect(() => {
    const appliedJobs = JSON.parse(localStorage.getItem('appliedJobs') || '[]');
    setHasApplied(appliedJobs.includes(slug));
  }, [slug]);

  if (!professional) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Building2 size={64} className="mx-auto text-gray-400 mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Job Not Found</h1>
          <p className="text-gray-600 mb-6">The job you're looking for doesn't exist.</p>
          <button
            onClick={() => navigate('/')}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center cursor-pointer gap-2 text-gray-600 hover:text-black transition-colors"
          >
            <ArrowLeft size={20} />
            <span className="text-sm font-medium">Back</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Profile Header */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="flex items-start gap-4">
                <img
                  src={professional.logo}
                  alt={professional.name}
                  className="w-20 h-20 rounded-xl object-cover"
                />
                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <div>
                      <h1 className="text-2xl font-bold text-gray-900 mb-1">
                        {professional.name}
                      </h1>
                      <p className="text-gray-600 mb-2">{professional.role}</p>
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <div className="flex items-center gap-1">
                          <MapPin size={16} />
                          <span>{professional.location}</span>
                        </div>
                        <span>•</span>
                        <span>{professional.yearsExperience} years experience</span>
                      </div>
                    </div>
                    {professional.verified && (
                      <span className="flex items-center gap-1 text-xs bg-gray-100 text-gray-700 px-3 py-1 rounded-full">
                        <CheckCircle size={14} className="text-blue-600" />
                        {professional.status}
                      </span>
                    )}
                  </div>

                  <p className="text-gray-700 mt-3 italic">
                    "{professional.tagline}"
                  </p>
                </div>
              </div>
            </div>

            {/* Job Description Section */}
            <div className="space-y-6">
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <h2 className="text-lg font-bold text-gray-900 mb-4">Job Description</h2>
                <div className="text-gray-700 leading-relaxed whitespace-pre-line">
                  {professional.description}
                </div>
              </div>

              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <h2 className="text-lg font-bold text-gray-900 mb-4">Required Skills</h2>
                <div className="grid grid-cols-2 gap-3">
                  {professional.services.map((service, index) => (
                    <div key={index} className="flex items-center gap-2 text-gray-700">
                      <CheckCircle size={16} className="text-blue-600" />
                      <span className="text-sm">{service}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <h2 className="text-lg font-bold text-gray-900 mb-4">Industry Expertise</h2>
                <div className="flex flex-wrap gap-2">
                  {professional.expertise.map((item, index) => (
                    <span key={index} className="px-3 py-1.5 bg-gray-100 text-gray-700 rounded-full text-sm">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Apply for Job */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg border border-gray-200 p-6 sticky top-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Apply for Job</h3>
              
              <div className="space-y-3 mb-6">
                {hasApplied ? (
                  <button 
                    disabled
                    className="w-full cursor-not-allowed bg-green-600 text-white font-medium py-3 rounded-lg transition-colors flex items-center justify-center gap-2 opacity-75"
                  >
                    <CheckCircle size={18} />
                    Applied
                  </button>
                ) : (
                  <button 
                    onClick={() => navigate(`/apply/${professional.slug}`)}
                    className="w-full cursor-pointer bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-lg transition-colors flex items-center justify-center gap-2"
                  >
                    <Briefcase size={18} />
                    Apply Now
                  </button>
                )}
              </div>

              <div className="border-t border-gray-200 pt-4 space-y-3 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Job Type</span>
                  <span className="font-medium text-gray-900">Full-time</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Experience</span>
                  <span className="font-medium text-gray-900">{professional.yearsExperience}+ years</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Location</span>
                  <span className="font-medium text-gray-900">{professional.location}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Status</span>
                  <span className="font-medium text-blue-600">Actively Hiring</span>
                </div>
              </div>

              <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                <p className="text-xs text-gray-600 leading-relaxed">
                  By applying for this position, you agree to share your information 
                  with the employer for recruitment purposes.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfessionalDetails;
