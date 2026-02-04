import React from "react";
import { Search, CheckCircle, MapPin } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useJobContext } from "../context/JobContext.jsx";

const ProfessionalCard = ({ professional }) => {
  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-5 hover:shadow-sm transition-shadow">
      <div className="flex items-start gap-3 mb-3">
        <img
          src={professional.logo}
          alt={professional.name}
          className="w-14 h-14 rounded-lg object-cover"
        />
        <div className="flex-1 min-w-0">
          <h3 className="text-base font-semibold text-gray-900 mb-1 truncate">
            {professional.name}
          </h3>
          <p className="text-sm text-gray-600">{professional.role}</p>
        </div>
        {professional.verified && (
          <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded flex items-center gap-1 shrink-0">
            <CheckCircle size={12} className="text-blue-600" />
            {professional.status}
          </span>
        )}
      </div>

      <div className="flex items-center gap-1 mb-3">
        <MapPin size={14} className="text-gray-500" />
        <span className="text-sm text-gray-600">{professional.location}</span>
      </div>

      <p className="text-sm text-gray-700 mb-4 line-clamp-2">
        {professional.shortDescription}
      </p>

      <div className="flex flex-wrap gap-2 mb-4">
        {professional.services.slice(0, 3).map((service, index) => (
          <span
            key={index}
            className="text-xs bg-gray-50 text-gray-700 px-2.5 py-1 rounded"
          >
            {service}
          </span>
        ))}
      </div>

      <button
        onClick={() => navigate(`/${professional.slug}`)}
        className="block w-full bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-2.5 rounded transition-colors text-center cursor-pointer"
      >
        View Details
      </button>
    </div>
  );
};

const MatchCard = () => {
  const {
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    activeTab,
    setActiveTab,
    filteredJobs,
    mainCategories,
  } = useJobContext();

  // Limit to 8 jobs
  const displayedJobs = filteredJobs.slice(0, 6);

  return (
    <div className="min-h-screen bg-white pt-10">
      {/* Main Categories */}
      <div className="border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-10 py-4">
          <div className="flex items-center justify-center gap-2 overflow-x-auto">
            <button
              onClick={() => setSelectedCategory(null)}
              className={`flex items-center cursor-pointer justify-center w-10 h-10 rounded-lg shrink-0 transition-colors ${
                selectedCategory === null
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              <span className="text-sm font-bold">All</span>
            </button>
            {mainCategories.map((category) => (
              <button
                key={category}
                onClick={() =>
                  setSelectedCategory(selectedCategory === category ? null : category)
                }
                className={`px-4 py-2 rounded cursor-pointer text-sm font-medium whitespace-nowrap transition-colors shrink-0 ${
                  selectedCategory === category
                    ? "bg-gray-200 text-gray-900"
                    : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-300"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Tabs & Search */}
      <div className="border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-10">
          {/* Tabs */}
          <div className="flex justify-center gap-8 mb-4">
            {["services", "industries", "specialties"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-3 text-sm cursor-pointer font-medium border-b-2 transition-colors ${
                  activeTab === tab
                    ? "border-blue-600 text-blue-600"
                    : "border-transparent text-gray-600 hover:text-gray-900"
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>

          {/* Search */}
          <div className="pb-4 flex justify-center">
            <div className="relative w-full max-w-xl">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                placeholder="Search by company, role, skills..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-blue-600"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Job Results */}
      <section className="bg-gray-50 px-4 sm:px-10 py-8">
        <div className="max-w-7xl mx-auto">
          {displayedJobs.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {displayedJobs.map((job) => (
                <ProfessionalCard key={job.id} professional={job} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
                <Search size={32} className="text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                No jobs found
              </h3>
              <p className="text-gray-600 mb-6">
                Try adjusting your search or filters
              </p>
              <button
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory(null);
                }}
                className="px-6 cursor-pointer py-2.5 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors text-sm font-medium"
              >
                Clear All Filters
              </button>
            </div>
          )}
        </div>

        {filteredJobs.length > 8 && (
         
       <div className="text-center pt-10">
  <a
    href="/jobs"
    className="inline-block px-10 py-2.5 bg-black text-white rounded hover:bg-gray-800 transition-colors text-sm font-medium cursor-pointer"
  >
    Load More
  </a>
</div>

          
        )}
      </section>
    </div>
  );
};

export default MatchCard;