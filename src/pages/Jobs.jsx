import React, { useState } from "react";
import {
  Search,
  SlidersHorizontal,
  X,
  MapPin,
  CheckCircle,
  Briefcase,
  ArrowLeft,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { professionals, mainCategories } from "../assets/asset";

const Jobs = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedLocations, setSelectedLocations] = useState([]);
  const [selectedExperience, setSelectedExperience] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState([]);

  // Extract unique locations and experience levels
  const locations = [
    ...new Set(professionals.map((p) => p.location).filter(Boolean)),
  ];
  const experienceLevels = [
    "0-2 years",
    "3-5 years",
    "6-10 years",
    "10+ years",
  ];
  const statuses = ["Verified", "Premium", "Standard"];

  // Filter jobs based on all criteria
  const filteredJobs = professionals.filter((job) => {
    const matchesSearch =
      job.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.role?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (job.services &&
        job.services.some((service) =>
          service.toLowerCase().includes(searchQuery.toLowerCase()),
        ));

    const matchesCategory =
      selectedCategories.length === 0 ||
      selectedCategories.includes(job.category) ||
      (job.services &&
        job.services.some((service) => selectedCategories.includes(service)));

    const matchesLocation =
      selectedLocations.length === 0 ||
      selectedLocations.includes(job.location);

    const matchesExperience =
      selectedExperience.length === 0 ||
      selectedExperience.some((exp) => {
        const years = job.yearsExperience || 0;
        if (exp === "0-2 years") return years <= 2;
        if (exp === "3-5 years") return years >= 3 && years <= 5;
        if (exp === "6-10 years") return years >= 6 && years <= 10;
        if (exp === "10+ years") return years > 10;
        return false;
      });

    const matchesStatus =
      selectedStatus.length === 0 ||
      (selectedStatus.includes("Verified") && job.verified) ||
      selectedStatus.includes(job.status);

    return (
      matchesSearch &&
      matchesCategory &&
      matchesLocation &&
      matchesExperience &&
      matchesStatus
    );
  });

  // Toggle filter selections
  const toggleFilter = (filterArray, setFilterArray, value) => {
    if (filterArray.includes(value)) {
      setFilterArray(filterArray.filter((item) => item !== value));
    } else {
      setFilterArray([...filterArray, value]);
    }
  };

  // Clear all filters
  const clearAllFilters = () => {
    setSearchQuery("");
    setSelectedCategories([]);
    setSelectedLocations([]);
    setSelectedExperience([]);
    setSelectedStatus([]);
  };

  // Filter Section Component
  const FilterSection = ({ mobile = false }) => (
    <div
      className={`${mobile ? "fixed inset-0 bg-white z-50 overflow-y-auto" : "sticky top-6"}`}
    >
      {mobile && (
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h2 className="text-lg font-bold text-gray-900">Filters</h2>
          <button
            onClick={() => setShowFilters(false)}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X size={20} className="text-gray-600" />
          </button>
        </div>
      )}

      <div
        className={
          mobile ? "p-4" : "bg-white rounded-lg border border-gray-200 p-6"
        }
      >
        {!mobile && (
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold text-gray-900">Filters</h2>
            <button
              onClick={clearAllFilters}
              className="text-sm text-blue-600 hover:text-blue-700 font-medium"
            >
              Clear All
            </button>
          </div>
        )}

        {/* Categories Filter */}
        <div className="mb-6">
          <h3 className="text-sm font-semibold text-gray-900 mb-3">
            Categories
          </h3>
          <div className="space-y-2">
            {mainCategories.map((category) => (
              <label
                key={category}
                className="flex items-center gap-2 cursor-pointer group"
              >
                <input
                  type="checkbox"
                  checked={selectedCategories.includes(category)}
                  onChange={() =>
                    toggleFilter(
                      selectedCategories,
                      setSelectedCategories,
                      category,
                    )
                  }
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <span className="text-sm text-gray-700 group-hover:text-gray-900">
                  {category}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Location Filter */}
        <div className="mb-6 pb-6 border-b border-gray-200">
          <h3 className="text-sm font-semibold text-gray-900 mb-3">Location</h3>
          <div className="space-y-2">
            {locations.slice(0, 6).map((location) => (
              <label
                key={location}
                className="flex items-center gap-2 cursor-pointer group"
              >
                <input
                  type="checkbox"
                  checked={selectedLocations.includes(location)}
                  onChange={() =>
                    toggleFilter(
                      selectedLocations,
                      setSelectedLocations,
                      location,
                    )
                  }
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <span className="text-sm text-gray-700 group-hover:text-gray-900">
                  {location}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Experience Level Filter */}
        <div className="mb-6 pb-6 border-b border-gray-200">
          <h3 className="text-sm font-semibold text-gray-900 mb-3">
            Experience Level
          </h3>
          <div className="space-y-2">
            {experienceLevels.map((level) => (
              <label
                key={level}
                className="flex items-center gap-2 cursor-pointer group"
              >
                <input
                  type="radio"
                  name="experience"
                  checked={selectedExperience.includes(level)}
                  onChange={() => setSelectedExperience([level])}
                  className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                />
                <span className="text-sm text-gray-700 group-hover:text-gray-900">
                  {level}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Status Filter */}
        <div className="mb-6">
          <h3 className="text-sm font-semibold text-gray-900 mb-3">Status</h3>
          <div className="space-y-2">
            {statuses.map((status) => (
              <label
                key={status}
                className="flex items-center gap-2 cursor-pointer group"
              >
                <input
                  type="checkbox"
                  checked={selectedStatus.includes(status)}
                  onChange={() =>
                    toggleFilter(selectedStatus, setSelectedStatus, status)
                  }
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <span className="text-sm text-gray-700 group-hover:text-gray-900">
                  {status}
                </span>
              </label>
            ))}
          </div>
        </div>

        {mobile && (
          <div className="flex gap-3 pt-4">
            <button
              onClick={clearAllFilters}
              className="flex-1 px-4 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
            >
              Clear All
            </button>
            <button
              onClick={() => setShowFilters(false)}
              className="flex-1 px-4 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              Apply Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );

  // Job Card Component
  const JobCard = ({ job }) => (
    <div className="bg-white rounded-lg border border-gray-200 p-5 hover:shadow-md transition-shadow">
      <div className="flex items-start gap-4 mb-4">
        <img
          src={job.logo || "/placeholder-logo.png"}
          alt={job.name || "Company"}
          className="w-16 h-16 rounded-lg object-cover"
        />
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-semibold text-gray-900 mb-1 truncate">
            {job.name || "Company Name"}
          </h3>
          <p className="text-sm text-gray-600 mb-2">{job.role || "Position"}</p>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <MapPin size={14} />
            <span>{job.location || "Location"}</span>
            {job.verified && (
              <>
                <span>•</span>
                <span className="flex items-center gap-1 text-blue-600">
                  <CheckCircle size={14} />
                  Verified
                </span>
              </>
            )}
          </div>
        </div>
      </div>

      <p className="text-sm text-gray-700 mb-4 line-clamp-2">
        {job.shortDescription || job.description || "No description available"}
      </p>

      <div className="flex flex-wrap gap-2 mb-4">
        {job.services && job.services.length > 0 ? (
          job.services.slice(0, 3).map((service, index) => (
            <span
              key={index}
              className="text-xs bg-gray-100 text-gray-700 px-2.5 py-1 rounded"
            >
              {service}
            </span>
          ))
        ) : (
          <span className="text-xs text-gray-500">No services listed</span>
        )}
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-gray-200">
        <span className="text-sm text-gray-600">
          {job.yearsExperience || 0}+ years exp.
        </span>
        <button
          onClick={() => navigate(`/${job.slug}`)}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors cursor-pointer flex items-center gap-2"
        >
          <Briefcase size={16} />
          View Details
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 pt-5">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center cursor-pointer gap-2 text-gray-600 hover:text-black transition-colors"
          >
            <ArrowLeft size={20} />
            <span className="text-sm font-medium">Back</span>
          </button>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Find Your Next Job
          </h1>
          <p className="text-gray-600">
            Discover {professionals.length} available positions
          </p>
        </div>
      </div>

      {/* Search Bar */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex gap-3">
            <div className="relative flex-1">
              <Search
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={20}
              />
              <input
                type="text"
                placeholder="Search by company, role, skills..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600"
              />
            </div>
            <button
              onClick={() => setShowFilters(true)}
              className="lg:hidden flex items-center gap-2 px-4 py-2.5 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors cursor-pointer"
            >
              <SlidersHorizontal size={18} />
              <span className="text-sm font-medium">Filters</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-4 gap-6">
          {/* Jobs List - Left Side */}
          <div className="lg:col-span-3">
            <div className="mb-4 flex items-center justify-between">
              <p className="text-sm text-gray-600">
                Showing{" "}
                <span className="font-semibold text-gray-900">
                  {filteredJobs.length}
                </span>{" "}
                jobs
              </p>
            </div>

            {filteredJobs.length > 0 ? (
              <div className="space-y-4">
                {filteredJobs.map((job) => (
                  <JobCard key={job.id} job={job} />
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
                <Search size={48} className="mx-auto text-gray-400 mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  No jobs found
                </h3>
                <p className="text-gray-600 mb-6">
                  Try adjusting your search or filters
                </p>
                <button
                  onClick={clearAllFilters}
                  className="px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium cursor-pointer"
                >
                  Clear All Filters
                </button>
              </div>
            )}
          </div>

          {/* Filters - Right Side (Desktop) */}
          <div className="hidden lg:block lg:col-span-1">
            <FilterSection />
          </div>
        </div>
      </div>

      {/* Mobile Filter Modal */}
      {showFilters && <FilterSection mobile={true} />}
    </div>
  );
};

export default Jobs;
