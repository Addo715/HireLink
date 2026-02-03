import React, { useState } from 'react';
import { Star, MapPin, CheckCircle, Calendar, MessageSquare, ArrowLeft, Building2 } from 'lucide-react';
import { useParams, useNavigate } from 'react-router-dom';
import { professionals } from '../assets/asset';

const ProfessionalDetails = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');

  // Find the professional by slug
  const professional = professionals.find(p => p.slug === slug);

  if (!professional) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Building2 size={64} className="mx-auto text-gray-400 mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Professional Not Found</h1>
          <p className="text-gray-600 mb-6">The professional you're looking for doesn't exist.</p>
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

  const renderStars = (rating) => {
    return (
      <div className="flex">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            size={16}
            className={
              i < Math.floor(rating)
                ? 'fill-yellow-400 text-yellow-400'
                : 'text-gray-300'
            }
          />
        ))}
      </div>
    );
  };

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
                  
                  <div className="flex items-center gap-3 mt-4">
                    <div className="flex items-center gap-2">
                      {renderStars(professional.rating)}
                      <span className="text-sm font-semibold text-gray-900">
                        {professional.rating.toFixed(1)}
                      </span>
                    </div>
                    <span className="text-sm text-gray-500">
                      ({professional.reviewCount} reviews)
                    </span>
                  </div>

                  <p className="text-gray-700 mt-3 italic">
                    "{professional.tagline}"
                  </p>
                </div>
              </div>
            </div>

            {/* Tabs */}
            <div className="border-b border-gray-200">
              <div className="flex gap-8">
                <button
                  onClick={() => setActiveTab('overview')}
                  className={`pb-3 text-sm cursor-pointer font-medium border-b-2 transition-colors ${
                    activeTab === 'overview'
                      ? 'border-blue-600 text-blue-600'
                      : 'border-transparent text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Overview
                </button>
                <button
                  onClick={() => setActiveTab('reviews')}
                  className={`pb-3 cursor-pointer text-sm font-medium border-b-2 transition-colors ${
                    activeTab === 'reviews'
                      ? 'border-blue-600 text-blue-600'
                      : 'border-transparent text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Reviews ({professional.reviewCount})
                </button>
              </div>
            </div>

            {/* Tab Content */}
            {activeTab === 'overview' && (
              <div className="space-y-6">
                <div className="bg-white rounded-lg border border-gray-200 p-6">
                  <h2 className="text-lg font-bold text-gray-900 mb-4">About</h2>
                  <div className="text-gray-700 leading-relaxed whitespace-pre-line">
                    {professional.about}
                  </div>
                </div>

                <div className="bg-white rounded-lg border border-gray-200 p-6">
                  <h2 className="text-lg font-bold text-gray-900 mb-4">Services Offered</h2>
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
            )}

            {activeTab === 'reviews' && (
              <div className="space-y-4">
                <div className="bg-white rounded-lg border border-gray-200 p-6">
                  <div className="flex items-center gap-6">
                    <div className="text-center">
                      <div className="text-4xl font-bold text-gray-900">
                        {professional.rating.toFixed(1)}
                      </div>
                      <div className="mt-2">{renderStars(professional.rating)}</div>
                      <p className="text-sm text-gray-600 mt-1">
                        {professional.reviewCount} reviews
                      </p>
                    </div>
                    <div className="flex-1 space-y-2">
                      {[5, 4, 3, 2, 1].map((stars) => (
                        <div key={stars} className="flex items-center gap-3">
                          <span className="text-sm text-gray-600 w-8">{stars}★</span>
                          <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-yellow-400"
                              style={{
                                width: `${stars === 5 ? '85%' : stars === 4 ? '12%' : '3%'}`
                              }}
                            />
                          </div>
                          <span className="text-sm text-gray-600 w-12">
                            {stars === 5 ? '85%' : stars === 4 ? '12%' : '3%'}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {professional.reviews.map((review) => (
                  <div key={review.id} className="bg-white rounded-lg border border-gray-200 p-6">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="font-semibold text-gray-900">{review.author}</h3>
                        <p className="text-sm text-gray-600">{review.role}</p>
                      </div>
                      <span className="text-xs text-gray-500">{review.date}</span>
                    </div>
                    <div className="mb-3">{renderStars(review.rating)}</div>
                    <p className="text-gray-700 leading-relaxed">{review.comment}</p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Right Column */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg border border-gray-200 p-6 sticky top-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Get in Touch</h3>
              
              <div className="space-y-3 mb-6">
                <button className="w-full cursor-pointer bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-lg transition-colors flex items-center justify-center gap-2">
                  <MessageSquare size={18} />
                  Send Message
                </button>
                <button className="w-full cursor-pointer bg-white hover:bg-gray-50 text-gray-900 font-medium py-3 rounded-lg border border-gray-300 transition-colors flex items-center justify-center gap-2">
                  <Calendar size={18} />
                  Schedule Consultation
                </button>
              </div>

              <div className="border-t border-gray-200 pt-4 space-y-3 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Response time</span>
                  <span className="font-medium text-gray-900">Within 24 hours</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Consultation</span>
                  <span className="font-medium text-gray-900">Free initial call</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Availability</span>
                  <span className="font-medium text-b;ue-600">Accepting clients</span>
                </div>
              </div>

              <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                <p className="text-xs text-gray-600 leading-relaxed">
                  By contacting this professional, you agree to share your information 
                  for the purpose of receiving a response to your inquiry.
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