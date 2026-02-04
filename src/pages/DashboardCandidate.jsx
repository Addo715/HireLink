import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Briefcase, CheckCircle, XCircle, Clock, FileText, Eye } from "lucide-react";

const DashboardCandidate = () => {
  const navigate = useNavigate();
  const [applications, setApplications] = useState([]);
  const [candidateId, setCandidateId] = useState("");

  useEffect(() => {
    // Load candidate ID from localStorage (set during application submission)
    const storedCandidateId = localStorage.getItem("currentCandidateId");
    setCandidateId(storedCandidateId || "");

    // Load all applications for this candidate
    loadApplications(storedCandidateId);
  }, []);

  const loadApplications = (candidateId) => {
    if (!candidateId) return;

    try {
      const stored = localStorage.getItem("candidates");
      const allCandidates = stored ? JSON.parse(stored) : {
        applied: [],
        reviewed: [],
        interview: [],
        offer: [],
        rejected: []
      };
      
      // Ensure all stages exist
      const stages = {
        applied: allCandidates.applied || [],
        reviewed: allCandidates.reviewed || [],
        interview: allCandidates.interview || [],
        offer: allCandidates.offer || [],
        rejected: allCandidates.rejected || []
      };
      
      // Find all applications for this candidate across all stages
      const userApplications = [];
      
      Object.keys(stages).forEach((stage) => {
        const stageApplications = stages[stage].filter(
          (app) => app.id === candidateId
        );
        
        stageApplications.forEach((app) => {
          userApplications.push({
            ...app,
            status: stage,
          });
        });
      });

      setApplications(userApplications);
    } catch (error) {
      console.error('Error loading applications:', error);
      setApplications([]);
    }
  };

  const handleDeleteApplication = (applicationId) => {
    try {
      const stored = localStorage.getItem("candidates");
      const allCandidates = stored ? JSON.parse(stored) : {
        applied: [],
        reviewed: [],
        interview: [],
        offer: [],
        rejected: []
      };
      
      // Remove from all stages
      Object.keys(allCandidates).forEach((stage) => {
        if (allCandidates[stage]) {
          allCandidates[stage] = allCandidates[stage].filter(
            (app) => app.id !== applicationId
          );
        }
      });

      localStorage.setItem("candidates", JSON.stringify(allCandidates));
      loadApplications(candidateId);
    } catch (error) {
      console.error('Error deleting application:', error);
    }
  };

  const getStatusConfig = (status) => {
    const configs = {
      applied: {
        label: "Application Submitted",
        color: "bg-blue-100 text-blue-700",
        icon: Clock,
        dotColor: "bg-blue-500",
      },
      reviewed: {
        label: "Under Review",
        color: "bg-yellow-100 text-yellow-700",
        icon: FileText,
        dotColor: "bg-yellow-500",
      },
      interview: {
        label: "Interview Scheduled",
        color: "bg-purple-100 text-purple-700",
        icon: Briefcase,
        dotColor: "bg-purple-500",
      },
      offer: {
        label: "Offer Received",
        color: "bg-green-100 text-green-700",
        icon: CheckCircle,
        dotColor: "bg-green-500",
      },
      rejected: {
        label: "Not Selected",
        color: "bg-red-100 text-red-700",
        icon: XCircle,
        dotColor: "bg-red-500",
      },
    };

    return configs[status] || configs.applied;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center cursor-pointer gap-2 text-gray-600 hover:text-black transition-colors mb-4"
          >
            <ArrowLeft size={20} />
            <span className="text-sm font-medium">Back</span>
          </button>

          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">My Applications</h1>
              <p className="text-gray-600 mt-1">
                Track your job applications and their status
              </p>
            </div>
            
            {candidateId && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg px-4 py-2">
                <p className="text-xs text-blue-600 font-medium">Candidate ID</p>
                <p className="text-sm font-mono font-bold text-blue-900">{candidateId}</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {applications.length === 0 ? (
          <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
            <Briefcase size={64} className="mx-auto text-gray-400 mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No Applications Yet
            </h3>
            <p className="text-gray-600 mb-6">
              Start applying for jobs to see them here
            </p>
            <button
              onClick={() => navigate("/jobs")}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors cursor-pointer"
            >
              Browse Jobs
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-white rounded-lg border border-gray-200 p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Total Applications</p>
                    <p className="text-2xl font-bold text-gray-900">{applications.length}</p>
                  </div>
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <Briefcase size={24} className="text-blue-600" />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg border border-gray-200 p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Under Review</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {applications.filter(app => app.status === 'reviewed').length}
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                    <FileText size={24} className="text-yellow-600" />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg border border-gray-200 p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Interviews</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {applications.filter(app => app.status === 'interview').length}
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                    <Briefcase size={24} className="text-purple-600" />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg border border-gray-200 p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Offers</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {applications.filter(app => app.status === 'offer').length}
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                    <CheckCircle size={24} className="text-green-600" />
                  </div>
                </div>
              </div>
            </div>

            {/* Applications List */}
            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Job Position
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Applied Date
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Interview Date
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {applications.map((application) => {
                      const statusConfig = getStatusConfig(application.status);
                      const StatusIcon = statusConfig.icon;
                      
                      return (
                        <tr key={application.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4">
                            <div className="flex items-center">
                              <div>
                                <div className="text-sm font-medium text-gray-900">
                                  {application.jobRole || "Position Not Available"}
                                </div>
                                <div className="text-sm text-gray-500">
                                  Applied as {application.name}
                                </div>
                              </div>
                            </div>
                          </td>
                          
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">
                              {new Date(application.appliedDate).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'short',
                                day: 'numeric'
                              })}
                            </div>
                          </td>

                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${statusConfig.color}`}>
                              <span className={`w-2 h-2 rounded-full ${statusConfig.dotColor}`}></span>
                              {statusConfig.label}
                            </span>
                          </td>

                          <td className="px-6 py-4 whitespace-nowrap">
                            {application.interviewDate ? (
                              <div className="text-sm">
                                <div className="text-gray-900">{application.interviewDate}</div>
                                <div className="text-gray-500">{application.interviewTime}</div>
                              </div>
                            ) : (
                              <span className="text-sm text-gray-400">Not scheduled</span>
                            )}
                          </td>

                          <td className="px-6 py-4 whitespace-nowrap text-sm">
                            <div className="flex items-center gap-3">
                              {application.status === 'offer' && (
                                <button
                                  onClick={() => {/* View offer letter */}}
                                  className="text-blue-600 hover:text-blue-800 font-medium flex items-center gap-1"
                                >
                                  <Eye size={16} />
                                  View Offer
                                </button>
                              )}
                              
                              {application.score && (
                                <span className="text-gray-600">
                                  Score: <span className="font-semibold text-blue-600">{application.score}/5</span>
                                </span>
                              )}
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardCandidate;