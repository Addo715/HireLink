// import React, { useState, useEffect } from 'react';
// import { 
//   Menu, 
//   X, 
//   Users, 
//   FileText, 
//   Calendar, 
//   Send,
//   Star,
//   ChevronRight,
//   XCircle
// } from 'lucide-react';

// const AdminDashboard = () => {
//   const [sidebarOpen, setSidebarOpen] = useState(true);
//   const [activeStage, setActiveStage] = useState('applied');
//   const [selectedCandidate, setSelectedCandidate] = useState(null);
//   const [score, setScore] = useState(0);
//   const [notes, setNotes] = useState('');
//   const [showScheduler, setShowScheduler] = useState(false);
//   const [interviewDate, setInterviewDate] = useState('');
//   const [interviewTime, setInterviewTime] = useState('');
//   const [showOffer, setShowOffer] = useState(false);
//   const [showRejectConfirm, setShowRejectConfirm] = useState(false);

//   // Load candidates from localStorage
//   const loadCandidatesFromStorage = () => {
//     try {
//       const stored = localStorage.getItem('candidates');
//       if (stored) {
//         const parsed = JSON.parse(stored);
//         // Ensure all required stages exist
//         return {
//           applied: parsed.applied || [],
//           reviewed: parsed.reviewed || [],
//           interview: parsed.interview || [],
//           offer: parsed.offer || [],
//           rejected: parsed.rejected || [],
//         };
//       }
//     } catch (error) {
//       console.error('Error loading candidates:', error);
//     }
    
//     // Default structure
//     return {
//       applied: [],
//       reviewed: [],
//       interview: [],
//       offer: [],
//       rejected: [],
//     };
//   };

//   const [candidates, setCandidates] = useState(loadCandidatesFromStorage);

//   // Save candidates to localStorage whenever they change
//   useEffect(() => {
//     try {
//       localStorage.setItem('candidates', JSON.stringify(candidates));
//     } catch (error) {
//       console.error('Error saving candidates:', error);
//     }
//   }, [candidates]);

//   const stages = [
//     { id: 'applied', name: 'Applied', icon: Users, count: candidates?.applied?.length || 0 },
//     { id: 'reviewed', name: 'Reviewed', icon: FileText, count: candidates?.reviewed?.length || 0 },
//     { id: 'interview', name: 'Interview Scheduled', icon: Calendar, count: candidates?.interview?.length || 0 },
//     { id: 'offer', name: 'Offer Sent', icon: Send, count: candidates?.offer?.length || 0 },
//     // { id: 'rejected', name: 'Rejected', icon: XCircle, count: candidates?.rejected?.length || 0 },
//   ];

//   // Move candidate to next stage
//   const moveToStage = (candidate, fromStage, toStage) => {
//     setCandidates(prev => {
//       // Ensure both stages exist
//       const newState = { ...prev };
//       if (!newState[fromStage]) newState[fromStage] = [];
//       if (!newState[toStage]) newState[toStage] = [];
      
//       return {
//         ...newState,
//         [fromStage]: newState[fromStage].filter(c => c.id !== candidate.id),
//         [toStage]: [...newState[toStage], candidate]
//       };
//     });
//   };

//   // Handle moving to reviewed
//   const moveToReviewed = (candidate) => {
//     const updatedCandidate = { ...candidate, score, notes };
//     moveToStage(updatedCandidate, 'applied', 'reviewed');
//     setSelectedCandidate(null);
//     setScore(0);
//     setNotes('');
//   };

//   // Handle interview scheduling
//   const scheduleInterview = (candidate) => {
//     const updatedCandidate = { ...candidate, interviewDate, interviewTime };
//     moveToStage(updatedCandidate, 'reviewed', 'interview');
//     setShowScheduler(false);
//     setSelectedCandidate(null);
//     setInterviewDate('');
//     setInterviewTime('');
//   };

//   // Handle offer
//   const sendOffer = (candidate) => {
//     moveToStage(candidate, 'interview', 'offer');
//     setShowOffer(false);
//     setSelectedCandidate(null);
//   };

//   // Handle rejection
//   const rejectCandidate = (candidate) => {
//     // Determine which stage to move from
//     let fromStage = 'applied';
//     if (candidates.reviewed && candidates.reviewed.some(c => c.id === candidate.id)) fromStage = 'reviewed';
//     if (candidates.interview && candidates.interview.some(c => c.id === candidate.id)) fromStage = 'interview';
    
//     moveToStage(candidate, fromStage, 'rejected');
//     setShowRejectConfirm(false);
//     setSelectedCandidate(null);
//   };

//   return (
//     <div className="flex h-screen bg-gray-100">
//       {/* Sidebar */}
//       <div className={`bg-gray-900 text-white transition-all duration-300 ${sidebarOpen ? 'w-64' : 'w-20'} flex flex-col`}>
//         {/* Header */}
//         <div className="p-4 flex items-center justify-between border-b border-gray-800">
//           {sidebarOpen && <h1 className="text-xl font-bold">HireLink Admin</h1>}
//           <button 
//             onClick={() => setSidebarOpen(!sidebarOpen)}
//             className="p-2 cursor-pointer hover:bg-gray-800 rounded-lg transition-colors"
//           >
//             {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
//           </button>
//         </div>

//         {/* Navigation */}
//         <div className="flex-1 p-4 space-y-2">
//           {stages.map((stage) => {
//             const Icon = stage.icon;
//             return (
//               <button
//                 key={stage.id}
//                 onClick={() => setActiveStage(stage.id)}
//                 className={`w-full flex items-center gap-3 p-3 rounded-lg transition-colors cursor-pointer ${
//                   activeStage === stage.id ? 'bg-blue-600' : 'hover:bg-gray-800'
//                 }`}
//               >
//                 <Icon size={20} />
//                 {sidebarOpen && (
//                   <>
//                     <span className="flex-1 text-left">{stage.name}</span>
//                     <span className="bg-gray-800 px-2 py-1 rounded text-xs">{stage.count}</span>
//                   </>
//                 )}
//               </button>
//             );
//           })}
//         </div>

//         {/* Footer */}
//         {sidebarOpen && (
//           <div className="p-4 border-t border-gray-800">
//             <p className="text-sm text-gray-400">Admin Dashboard</p>
//           </div>
//         )}
//       </div>

//       {/* Main Content */}
//       <div className="flex-1 overflow-auto">
//         {/* Header */}
//         <div className="bg-white border-b border-gray-200 p-6">
//           <h2 className="text-2xl font-bold text-gray-900">
//             {stages.find(s => s.id === activeStage)?.name}
//           </h2>
//           <p className="text-gray-600 mt-1">
//             {candidates[activeStage]?.length || 0} candidate{(candidates[activeStage]?.length || 0) !== 1 ? 's' : ''}
//           </p>
//         </div>

//         {/* Candidates Grid */}
//         <div className="p-6">
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
//             {candidates[activeStage] && candidates[activeStage].length > 0 ? (
//               candidates[activeStage].map((candidate) => (
//                 <div key={candidate.id} className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-lg transition-all hover:border-blue-300">
//                 <div className="flex items-start justify-between mb-4">
//                   <div>
//                     <h3 className="font-bold text-gray-900 text-lg">{candidate.name}</h3>
//                     <p className="text-sm text-gray-500 mt-1">{candidate.experience}</p>
//                   </div>
//                   {candidate.score && (
//                     <div className="flex items-center gap-1.5 bg-blue-50 px-2.5 py-1.5 rounded-lg">
//                       <Star size={14} className="text-blue-600 fill-blue-600" />
//                       <span className="text-sm font-bold text-blue-600">{candidate.score}</span>
//                     </div>
//                   )}
//                 </div>

//                 <div className="space-y-2.5 mb-4">
//                   <p className="text-sm text-gray-600 flex items-center gap-2">
//                     <span className="font-medium">Email:</span> {candidate.email}
//                   </p>
//                   <p className="text-sm text-gray-600 flex items-center gap-2">
//                     <span className="font-medium">Phone:</span> {candidate.phone}
//                   </p>
//                   <div className="pt-2">
//                     <p className="text-xs font-medium text-gray-700 mb-2">Skills:</p>
//                     <div className="flex flex-wrap gap-1.5">
//                       {candidate.skills.map((skill, idx) => (
//                         <span key={idx} className="text-xs bg-gray-100 text-gray-700 px-2.5 py-1 rounded-md font-medium">
//                           {skill}
//                         </span>
//                       ))}
//                     </div>
//                   </div>
//                   {candidate.interviewDate && (
//                     <div className="pt-2 mt-2 border-t border-gray-100">
//                       <p className="text-xs font-medium text-gray-700">Interview:</p>
//                       <p className="text-sm text-gray-600 mt-1">
//                         {candidate.interviewDate} at {candidate.interviewTime}
//                       </p>
//                     </div>
//                   )}
//                 </div>

//                 <button
//                   onClick={() => setSelectedCandidate(candidate)}
//                   className="w-full cursor-pointer bg-blue-600 text-white py-2.5 px-4 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 font-medium"
//                 >
//                   View Details
//                   <ChevronRight size={18} />
//                 </button>
//               </div>
//             ))
//           ) : null}
//           </div>

//           {(!candidates[activeStage] || candidates[activeStage].length === 0) && (
//             <div className="text-center py-20">
//               <div className="bg-gray-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
//                 <Users size={32} className="text-gray-400" />
//               </div>
//               <p className="text-gray-500 font-medium">No candidates in this stage</p>
//             </div>
//           )}
//         </div>
//       </div>

//       {/* Candidate Review Panel */}
//       {selectedCandidate && (
//         <div className="fixed inset-0 bg-blue-50 bg-opacity-50 flex items-center justify-center p-4 z-50">
//           <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-auto shadow-2xl">
//             <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between rounded-t-2xl">
//               <h3 className="text-2xl font-bold text-gray-900">Candidate Review</h3>
//               <button
//                 onClick={() => {
//                   setSelectedCandidate(null);
//                   setShowScheduler(false);
//                   setShowOffer(false);
//                   setShowRejectConfirm(false);
//                 }}
//                 className="p-2 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer"
//               >
//                 <X size={24} />
//               </button>
//             </div>

//             <div className="p-6 space-y-6">
//               {/* Candidate Info */}
//               <div className="bg-gray-50 rounded-xl p-5">
//                 <h4 className="font-bold text-gray-900 mb-4 text-lg">Candidate Information</h4>
//                 <div className="space-y-3">
//                   <div className="flex items-start">
//                     <span className="font-semibold text-gray-700 w-32">Name:</span>
//                     <span className="text-gray-900">{selectedCandidate.name}</span>
//                   </div>
//                   <div className="flex items-start">
//                     <span className="font-semibold text-gray-700 w-32">Email:</span>
//                     <span className="text-gray-900">{selectedCandidate.email}</span>
//                   </div>
//                   <div className="flex items-start">
//                     <span className="font-semibold text-gray-700 w-32">Phone:</span>
//                     <span className="text-gray-900">{selectedCandidate.phone}</span>
//                   </div>
//                   <div className="flex items-start">
//                     <span className="font-semibold text-gray-700 w-32">Experience:</span>
//                     <span className="text-gray-900">{selectedCandidate.experience}</span>
//                   </div>
//                   <div className="flex items-start">
//                     <span className="font-semibold text-gray-700 w-32">Skills:</span>
//                     <div className="flex flex-wrap gap-2">
//                       {selectedCandidate.skills.map((skill, idx) => (
//                         <span key={idx} className="bg-blue-100 text-blue-700 px-3 py-1.5 rounded-lg font-medium text-sm">
//                           {skill}
//                         </span>
//                       ))}
//                     </div>
//                   </div>
//                   {selectedCandidate.portfolioLink && (
//                     <div className="flex items-start">
//                       <span className="font-semibold text-gray-700 w-32">Portfolio:</span>
//                       <a 
//                         href={selectedCandidate.portfolioLink} 
//                         target="_blank" 
//                         rel="noopener noreferrer"
//                         className="text-blue-600 hover:text-blue-700 underline"
//                       >
//                         {selectedCandidate.portfolioLink}
//                       </a>
//                     </div>
//                   )}
//                   {selectedCandidate.jobRole && (
//                     <div className="flex items-start">
//                       <span className="font-semibold text-gray-700 w-32">Applied For:</span>
//                       <span className="text-gray-900">{selectedCandidate.jobRole}</span>
//                     </div>
//                   )}
//                 </div>
//               </div>

//               {/* Reject Button - Show for applied, reviewed, interview stages */}
//               {(activeStage === 'applied' || activeStage === 'reviewed' || activeStage === 'interview') && !showRejectConfirm && (
//                 <button
//                   onClick={() => setShowRejectConfirm(true)}
//                   className="w-full cursor-pointer bg-red-600 hover:bg-red-700 text-white py-3 rounded-xl transition-colors font-bold text-lg flex items-center justify-center gap-2"
//                 >
//                   <XCircle size={20} />
//                   Reject Candidate
//                 </button>
//               )}

//               {/* Reject Confirmation */}
//               {showRejectConfirm && (
//                 <div className="bg-red-50 border-2 border-red-200 rounded-xl p-6">
//                   <h4 className="font-bold text-red-900 mb-3 text-lg">Confirm Rejection</h4>
//                   <p className="text-red-800 mb-4">
//                     Are you sure you want to reject this candidate? This action will move them to the rejected stage.
//                   </p>
//                   <div className="flex gap-3">
//                     <button
//                       onClick={() => setShowRejectConfirm(false)}
//                       className="flex-1 px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors cursor-pointer"
//                     >
//                       Cancel
//                     </button>
//                     <button
//                       onClick={() => rejectCandidate(selectedCandidate)}
//                       className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors cursor-pointer"
//                     >
//                       Confirm Rejection
//                     </button>
//                   </div>
//                 </div>
//               )}

//               {/* Score & Notes (Applied Stage) */}
//               {activeStage === 'applied' && !showRejectConfirm && (
//                 <>
//                   <div>
//                     <label className="block font-bold text-gray-900 mb-3 text-lg">
//                       Score Candidate (1-5)
//                     </label>
//                     <div className="flex gap-3">
//                       {[1, 2, 3, 4, 5].map((num) => (
//                         <button
//                           key={num}
//                           onClick={() => setScore(num)}
//                           className={`w-14 cursor-pointer h-14 rounded-xl border-2 transition-all text-lg font-bold ${
//                             score === num
//                               ? 'border-blue-600 bg-blue-600 text-white shadow-lg scale-110'
//                               : 'border-gray-300 hover:border-blue-400 hover:bg-blue-50'
//                           }`}
//                         >
//                           {num}
//                         </button>
//                       ))}
//                     </div>
//                   </div>

//                   <div>
//                     <label className="block font-bold text-gray-900 mb-3 text-lg">
//                       Notes
//                     </label>
//                     <textarea
//                       value={notes}
//                       onChange={(e) => setNotes(e.target.value)}
//                       className="w-full border-2 border-gray-300 rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                       rows="5"
//                       placeholder="Add your notes about this candidate..."
//                     />
//                   </div>

//                   <button
//                     onClick={() => moveToReviewed(selectedCandidate)}
//                     className="w-full cursor-pointer bg-blue-600 text-white py-4 rounded-xl hover:bg-blue-700 transition-colors font-bold text-lg shadow-lg hover:shadow-xl"
//                   >
//                     Move to Reviewed
//                   </button>
//                 </>
//               )}

//               {/* Interview Scheduler (Reviewed Stage) */}
//               {activeStage === 'reviewed' && !showRejectConfirm && (
//                 <>
//                   {selectedCandidate.score && (
//                     <div className="bg-blue-50 border border-blue-200 p-5 rounded-xl">
//                       <div className="flex items-center gap-2 mb-2">
//                         <Star size={18} className="text-blue-600 fill-blue-600" />
//                         <p className="font-bold text-gray-900">Score: {selectedCandidate.score}/5</p>
//                       </div>
//                       {selectedCandidate.notes && (
//                         <div className="mt-3 pt-3 border-t border-blue-200">
//                           <p className="font-semibold text-gray-700 mb-1">Notes:</p>
//                           <p className="text-gray-900">{selectedCandidate.notes}</p>
//                         </div>
//                       )}
//                     </div>
//                   )}

//                   {!showScheduler ? (
//                     <button
//                       onClick={() => setShowScheduler(true)}
//                       className="w-full cursor-pointer bg-blue-600 text-white py-4 rounded-xl hover:bg-blue-700 transition-colors font-bold text-lg flex items-center justify-center gap-3 shadow-lg hover:shadow-xl"
//                     >
//                       <Calendar size={22} />
//                       Schedule Interview
//                     </button>
//                   ) : (
//                     <div className="space-y-5">
//                       <div>
//                         <label className="block font-bold text-gray-900 mb-3">
//                           Interview Date
//                         </label>
//                         <input
//                           type="date"
//                           value={interviewDate}
//                           onChange={(e) => setInterviewDate(e.target.value)}
//                           className="w-full border-2 border-gray-300 rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-lg"
//                         />
//                       </div>

//                       <div>
//                         <label className="block font-bold text-gray-900 mb-3">
//                           Interview Time
//                         </label>
//                         <input
//                           type="time"
//                           value={interviewTime}
//                           onChange={(e) => setInterviewTime(e.target.value)}
//                           className="w-full border-2 border-gray-300 rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-lg"
//                         />
//                       </div>

//                       <button
//                         onClick={() => scheduleInterview(selectedCandidate)}
//                         disabled={!interviewDate || !interviewTime}
//                         className="w-full cursor-pointer bg-blue-600 text-white py-4 rounded-xl hover:bg-blue-700 transition-colors font-bold text-lg disabled:bg-gray-300 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
//                       >
//                         Confirm Schedule
//                       </button>
//                     </div>
//                   )}
//                 </>
//               )}

//               {/* Offer Stage */}
//               {activeStage === 'interview' && !showRejectConfirm && (
//                 <>
//                   {selectedCandidate.interviewDate && (
//                     <div className="bg-green-50 border border-green-200 p-5 rounded-xl">
//                       <p className="font-bold text-gray-900 mb-2">Interview Scheduled</p>
//                       <p className="text-gray-700">
//                         <span className="font-semibold">Date:</span> {selectedCandidate.interviewDate}
//                       </p>
//                       <p className="text-gray-700">
//                         <span className="font-semibold">Time:</span> {selectedCandidate.interviewTime}
//                       </p>
//                     </div>
//                   )}

//                   {!showOffer ? (
//                     <button
//                       onClick={() => setShowOffer(true)}
//                       className="w-full cursor-pointer bg-blue-600 text-white py-4 rounded-xl hover:bg-blue-700 transition-colors font-bold text-lg flex items-center justify-center gap-3 shadow-lg hover:shadow-xl"
//                     >
//                       <FileText size={22} />
//                       Draft Offer Letter
//                     </button>
//                   ) : (
//                     <div className="space-y-5">
//                       <div className="bg-white border-2 border-gray-300 rounded-xl p-6">
//                         <h4 className="font-bold text-gray-900 mb-5 text-xl text-center">OFFER LETTER</h4>
//                         <div className="space-y-4 text-gray-700 leading-relaxed">
//                           <p>Dear <strong>{selectedCandidate.name}</strong>,</p>
//                           <p>
//                             We are pleased to offer you a position at <strong>HireLink</strong>.
//                           </p>
//                           <p>
//                             Your skills and experience, particularly in <strong>{selectedCandidate.skills.join(', ')}</strong>, 
//                             make you an excellent fit for our team.
//                           </p>
//                           <div className="bg-gray-50 p-4 rounded-lg space-y-2 my-4">
//                             <p><strong>Position:</strong> {selectedCandidate.jobRole || 'Senior Developer'}</p>
//                             <p><strong>Start Date:</strong> To Be Determined</p>
//                             <p><strong>Salary:</strong> Competitive package based on experience</p>
//                           </div>
//                           <p>
//                             Please review this offer and let us know your decision within <strong>5 business days</strong>.
//                           </p>
//                           <p className="pt-4">
//                             Sincerely,<br />
//                             <strong>HireLink Team</strong>
//                           </p>
//                         </div>
//                       </div>

//                       <button
//                         onClick={() => sendOffer(selectedCandidate)}
//                         className="w-full cursor-pointer bg-blue-600 text-white py-4 rounded-xl hover:bg-blue-700 transition-colors font-bold text-lg shadow-lg hover:shadow-xl"
//                       >
//                         Send Offer
//                       </button>
//                     </div>
//                   )}
//                 </>
//               )}

//               {/* Offer Sent Stage */}
//               {activeStage === 'offer' && (
//                 <div className="bg-green-50 border-2 border-green-300 rounded-xl p-6 text-center">
//                   <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3">
//                     <Send size={32} className="text-green-600" />
//                   </div>
//                   <p className="text-green-800 font-bold text-lg">Offer Successfully Sent!</p>
//                   <p className="text-green-700 mt-2">This candidate has received the offer letter.</p>
//                 </div>
//               )}

//               {/* Rejected Stage */}
//               {activeStage === 'rejected' && (
//                 <div className="bg-red-50 border-2 border-red-300 rounded-xl p-6 text-center">
//                   <div className="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3">
//                     <XCircle size={32} className="text-red-600" />
//                   </div>
//                   <p className="text-red-800 font-bold text-lg">Candidate Rejected</p>
//                   <p className="text-red-700 mt-2">This candidate was not selected for the position.</p>
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default AdminDashboard;

import React, { useState, useEffect } from 'react';
import { 
  Menu, 
  X, 
  Users, 
  FileText, 
  Calendar, 
  Send,
  Star,
  ChevronRight,
  // XCircle    ← commented out
} from 'lucide-react';

const AdminDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeStage, setActiveStage] = useState('applied');
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [score, setScore] = useState(0);
  const [notes, setNotes] = useState('');
  const [showScheduler, setShowScheduler] = useState(false);
  const [interviewDate, setInterviewDate] = useState('');
  const [interviewTime, setInterviewTime] = useState('');
  const [showOffer, setShowOffer] = useState(false);
  // const [showRejectConfirm, setShowRejectConfirm] = useState(false);  ← commented out

  // Load candidates from localStorage
  const loadCandidatesFromStorage = () => {
    try {
      const stored = localStorage.getItem('candidates');
      if (stored) {
        const parsed = JSON.parse(stored);
        // Ensure all required stages exist (removed rejected)
        return {
          applied: parsed.applied || [],
          reviewed: parsed.reviewed || [],
          interview: parsed.interview || [],
          offer: parsed.offer || [],
          // rejected: parsed.rejected || [],  ← commented out
        };
      }
    } catch (error) {
      console.error('Error loading candidates:', error);
    }
    
    // Default structure (removed rejected)
    return {
      applied: [],
      reviewed: [],
      interview: [],
      offer: [],
      // rejected: [],  ← commented out
    };
  };

  const [candidates, setCandidates] = useState(loadCandidatesFromStorage);

  // Save candidates to localStorage whenever they change
  useEffect(() => {
    try {
      localStorage.setItem('candidates', JSON.stringify(candidates));
    } catch (error) {
      console.error('Error saving candidates:', error);
    }
  }, [candidates]);

  const stages = [
    { id: 'applied', name: 'Applied', icon: Users, count: candidates?.applied?.length || 0 },
    { id: 'reviewed', name: 'Reviewed', icon: FileText, count: candidates?.reviewed?.length || 0 },
    { id: 'interview', name: 'Interview Scheduled', icon: Calendar, count: candidates?.interview?.length || 0 },
    { id: 'offer', name: 'Offer Sent', icon: Send, count: candidates?.offer?.length || 0 },
    // { id: 'rejected', name: 'Rejected', icon: XCircle, count: candidates?.rejected?.length || 0 },  ← commented out
  ];

  // Move candidate to next stage
  const moveToStage = (candidate, fromStage, toStage) => {
    setCandidates(prev => {
      const newState = { ...prev };
      if (!newState[fromStage]) newState[fromStage] = [];
      if (!newState[toStage]) newState[toStage] = [];
      
      return {
        ...newState,
        [fromStage]: newState[fromStage].filter(c => c.id !== candidate.id),
        [toStage]: [...newState[toStage], candidate]
      };
    });
  };

  // Handle moving to reviewed
  const moveToReviewed = (candidate) => {
    const updatedCandidate = { ...candidate, score, notes };
    moveToStage(updatedCandidate, 'applied', 'reviewed');
    setSelectedCandidate(null);
    setScore(0);
    setNotes('');
  };

  // Handle interview scheduling
  const scheduleInterview = (candidate) => {
    const updatedCandidate = { ...candidate, interviewDate, interviewTime };
    moveToStage(updatedCandidate, 'reviewed', 'interview');
    setShowScheduler(false);
    setSelectedCandidate(null);
    setInterviewDate('');
    setInterviewTime('');
  };

  // Handle offer
  const sendOffer = (candidate) => {
    moveToStage(candidate, 'interview', 'offer');
    setShowOffer(false);
    setSelectedCandidate(null);
  };

  // // Handle rejection ← completely commented out
  // const rejectCandidate = (candidate) => {
  //   let fromStage = 'applied';
  //   if (candidates.reviewed && candidates.reviewed.some(c => c.id === candidate.id)) fromStage = 'reviewed';
  //   if (candidates.interview && candidates.interview.some(c => c.id === candidate.id)) fromStage = 'interview';
  //   
  //   moveToStage(candidate, fromStage, 'rejected');
  //   setShowRejectConfirm(false);
  //   setSelectedCandidate(null);
  // };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className={`bg-gray-900 text-white transition-all duration-300 ${sidebarOpen ? 'w-64' : 'w-20'} flex flex-col`}>
        {/* Header */}
        <div className="p-4 flex items-center justify-between border-b border-gray-800">
          {sidebarOpen && <h1 className="text-xl font-bold">HireLink Admin</h1>}
          <button 
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 cursor-pointer hover:bg-gray-800 rounded-lg transition-colors"
          >
            {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Navigation */}
        <div className="flex-1 p-4 space-y-2">
          {stages.map((stage) => {
            const Icon = stage.icon;
            return (
              <button
                key={stage.id}
                onClick={() => setActiveStage(stage.id)}
                className={`w-full flex items-center gap-3 p-3 rounded-lg transition-colors cursor-pointer ${
                  activeStage === stage.id ? 'bg-blue-600' : 'hover:bg-gray-800'
                }`}
              >
                <Icon size={20} />
                {sidebarOpen && (
                  <>
                    <span className="flex-1 text-left">{stage.name}</span>
                    <span className="bg-gray-800 px-2 py-1 rounded text-xs">{stage.count}</span>
                  </>
                )}
              </button>
            );
          })}
        </div>

        {/* Footer */}
        {sidebarOpen && (
          <div className="p-4 border-t border-gray-800">
            <p className="text-sm text-gray-400">Admin Dashboard</p>
          </div>
        )}
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 p-6">
          <h2 className="text-2xl font-bold text-gray-900">
            {stages.find(s => s.id === activeStage)?.name}
          </h2>
          <p className="text-gray-600 mt-1">
            {candidates[activeStage]?.length || 0} candidate{(candidates[activeStage]?.length || 0) !== 1 ? 's' : ''}
          </p>
        </div>

        {/* Candidates Grid */}
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {candidates[activeStage] && candidates[activeStage].length > 0 ? (
              candidates[activeStage].map((candidate) => (
                <div key={candidate.id} className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-lg transition-all hover:border-blue-300">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="font-bold text-gray-900 text-lg">{candidate.name}</h3>
                      <p className="text-sm text-gray-500 mt-1">{candidate.experience}</p>
                    </div>
                    {candidate.score && (
                      <div className="flex items-center gap-1.5 bg-blue-50 px-2.5 py-1.5 rounded-lg">
                        <Star size={14} className="text-blue-600 fill-blue-600" />
                        <span className="text-sm font-bold text-blue-600">{candidate.score}</span>
                      </div>
                    )}
                  </div>

                  <div className="space-y-2.5 mb-4">
                    <p className="text-sm text-gray-600 flex items-center gap-2">
                      <span className="font-medium">Email:</span> {candidate.email}
                    </p>
                    <p className="text-sm text-gray-600 flex items-center gap-2">
                      <span className="font-medium">Phone:</span> {candidate.phone}
                    </p>
                    <div className="pt-2">
                      <p className="text-xs font-medium text-gray-700 mb-2">Skills:</p>
                      <div className="flex flex-wrap gap-1.5">
                        {candidate.skills.map((skill, idx) => (
                          <span key={idx} className="text-xs bg-gray-100 text-gray-700 px-2.5 py-1 rounded-md font-medium">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                    {candidate.interviewDate && (
                      <div className="pt-2 mt-2 border-t border-gray-100">
                        <p className="text-xs font-medium text-gray-700">Interview:</p>
                        <p className="text-sm text-gray-600 mt-1">
                          {candidate.interviewDate} at {candidate.interviewTime}
                        </p>
                      </div>
                    )}
                  </div>

                  <button
                    onClick={() => setSelectedCandidate(candidate)}
                    className="w-full cursor-pointer bg-blue-600 text-white py-2.5 px-4 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 font-medium"
                  >
                    View Details
                    <ChevronRight size={18} />
                  </button>
                </div>
              ))
            ) : null}
          </div>

          {(!candidates[activeStage] || candidates[activeStage].length === 0) && (
            <div className="text-center py-20">
              <div className="bg-gray-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users size={32} className="text-gray-400" />
              </div>
              <p className="text-gray-500 font-medium">No candidates in this stage</p>
            </div>
          )}
        </div>
      </div>

      {/* Candidate Review Panel */}
      {selectedCandidate && (
        <div className="fixed inset-0 bg-blue-50 bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-auto shadow-2xl">
            <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between rounded-t-2xl">
              <h3 className="text-2xl font-bold text-gray-900">Candidate Review</h3>
              <button
                onClick={() => {
                  setSelectedCandidate(null);
                  setShowScheduler(false);
                  setShowOffer(false);
                  // setShowRejectConfirm(false);  ← commented out
                }}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer"
              >
                <X size={24} />
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* Candidate Info */}
              <div className="bg-gray-50 rounded-xl p-5">
                <h4 className="font-bold text-gray-900 mb-4 text-lg">Candidate Information</h4>
                <div className="space-y-3">
                  <div className="flex items-start">
                    <span className="font-semibold text-gray-700 w-32">Name:</span>
                    <span className="text-gray-900">{selectedCandidate.name}</span>
                  </div>
                  <div className="flex items-start">
                    <span className="font-semibold text-gray-700 w-32">Email:</span>
                    <span className="text-gray-900">{selectedCandidate.email}</span>
                  </div>
                  <div className="flex items-start">
                    <span className="font-semibold text-gray-700 w-32">Phone:</span>
                    <span className="text-gray-900">{selectedCandidate.phone}</span>
                  </div>
                  <div className="flex items-start">
                    <span className="font-semibold text-gray-700 w-32">Experience:</span>
                    <span className="text-gray-900">{selectedCandidate.experience}</span>
                  </div>
                  <div className="flex items-start">
                    <span className="font-semibold text-gray-700 w-32">Skills:</span>
                    <div className="flex flex-wrap gap-2">
                      {selectedCandidate.skills.map((skill, idx) => (
                        <span key={idx} className="bg-blue-100 text-blue-700 px-3 py-1.5 rounded-lg font-medium text-sm">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                  {selectedCandidate.portfolioLink && (
                    <div className="flex items-start">
                      <span className="font-semibold text-gray-700 w-32">Portfolio:</span>
                      <a 
                        href={selectedCandidate.portfolioLink} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-700 underline"
                      >
                        {selectedCandidate.portfolioLink}
                      </a>
                    </div>
                  )}
                  {selectedCandidate.jobRole && (
                    <div className="flex items-start">
                      <span className="font-semibold text-gray-700 w-32">Applied For:</span>
                      <span className="text-gray-900">{selectedCandidate.jobRole}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Reject Button - Commented out */}
              {/* {(activeStage === 'applied' || activeStage === 'reviewed' || activeStage === 'interview') && !showRejectConfirm && (
                <button
                  onClick={() => setShowRejectConfirm(true)}
                  className="w-full cursor-pointer bg-red-600 hover:bg-red-700 text-white py-3 rounded-xl transition-colors font-bold text-lg flex items-center justify-center gap-2"
                >
                  <XCircle size={20} />
                  Reject Candidate
                </button>
              )} */}

              {/* Reject Confirmation - Completely commented out */}
              {/* {showRejectConfirm && (
                <div className="bg-red-50 border-2 border-red-200 rounded-xl p-6">
                  <h4 className="font-bold text-red-900 mb-3 text-lg">Confirm Rejection</h4>
                  <p className="text-red-800 mb-4">
                    Are you sure you want to reject this candidate? This action will move them to the rejected stage.
                  </p>
                  <div className="flex gap-3">
                    <button
                      onClick={() => setShowRejectConfirm(false)}
                      className="flex-1 px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => rejectCandidate(selectedCandidate)}
                      className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors cursor-pointer"
                    >
                      Confirm Rejection
                    </button>
                  </div>
                </div>
              )} */}

              {/* Score & Notes (Applied Stage) */}
              {activeStage === 'applied' /* && !showRejectConfirm */ && (
                <>
                  <div>
                    <label className="block font-bold text-gray-900 mb-3 text-lg">
                      Score Candidate (1-5)
                    </label>
                    <div className="flex gap-3">
                      {[1, 2, 3, 4, 5].map((num) => (
                        <button
                          key={num}
                          onClick={() => setScore(num)}
                          className={`w-14 cursor-pointer h-14 rounded-xl border-2 transition-all text-lg font-bold ${
                            score === num
                              ? 'border-blue-600 bg-blue-600 text-white shadow-lg scale-110'
                              : 'border-gray-300 hover:border-blue-400 hover:bg-blue-50'
                          }`}
                        >
                          {num}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block font-bold text-gray-900 mb-3 text-lg">
                      Notes
                    </label>
                    <textarea
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      className="w-full border-2 border-gray-300 rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      rows="5"
                      placeholder="Add your notes about this candidate..."
                    />
                  </div>

                  <button
                    onClick={() => moveToReviewed(selectedCandidate)}
                    className="w-full cursor-pointer bg-blue-600 text-white py-4 rounded-xl hover:bg-blue-700 transition-colors font-bold text-lg shadow-lg hover:shadow-xl"
                  >
                    Move to Reviewed
                  </button>
                </>
              )}

              {/* Interview Scheduler (Reviewed Stage) */}
              {activeStage === 'reviewed' /* && !showRejectConfirm */ && (
                <>
                  {selectedCandidate.score && (
                    <div className="bg-blue-50 border border-blue-200 p-5 rounded-xl">
                      <div className="flex items-center gap-2 mb-2">
                        <Star size={18} className="text-blue-600 fill-blue-600" />
                        <p className="font-bold text-gray-900">Score: {selectedCandidate.score}/5</p>
                      </div>
                      {selectedCandidate.notes && (
                        <div className="mt-3 pt-3 border-t border-blue-200">
                          <p className="font-semibold text-gray-700 mb-1">Notes:</p>
                          <p className="text-gray-900">{selectedCandidate.notes}</p>
                        </div>
                      )}
                    </div>
                  )}

                  {!showScheduler ? (
                    <button
                      onClick={() => setShowScheduler(true)}
                      className="w-full cursor-pointer bg-blue-600 text-white py-4 rounded-xl hover:bg-blue-700 transition-colors font-bold text-lg flex items-center justify-center gap-3 shadow-lg hover:shadow-xl"
                    >
                      <Calendar size={22} />
                      Schedule Interview
                    </button>
                  ) : (
                    <div className="space-y-5">
                      <div>
                        <label className="block font-bold text-gray-900 mb-3">
                          Interview Date
                        </label>
                        <input
                          type="date"
                          value={interviewDate}
                          onChange={(e) => setInterviewDate(e.target.value)}
                          className="w-full border-2 border-gray-300 rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-lg"
                        />
                      </div>

                      <div>
                        <label className="block font-bold text-gray-900 mb-3">
                          Interview Time
                        </label>
                        <input
                          type="time"
                          value={interviewTime}
                          onChange={(e) => setInterviewTime(e.target.value)}
                          className="w-full border-2 border-gray-300 rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-lg"
                        />
                      </div>

                      <button
                        onClick={() => scheduleInterview(selectedCandidate)}
                        disabled={!interviewDate || !interviewTime}
                        className="w-full cursor-pointer bg-blue-600 text-white py-4 rounded-xl hover:bg-blue-700 transition-colors font-bold text-lg disabled:bg-gray-300 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
                      >
                        Confirm Schedule
                      </button>
                    </div>
                  )}
                </>
              )}

              {/* Offer Stage */}
              {activeStage === 'interview' /* && !showRejectConfirm */ && (
                <>
                  {selectedCandidate.interviewDate && (
                    <div className="bg-green-50 border border-green-200 p-5 rounded-xl">
                      <p className="font-bold text-gray-900 mb-2">Interview Scheduled</p>
                      <p className="text-gray-700">
                        <span className="font-semibold">Date:</span> {selectedCandidate.interviewDate}
                      </p>
                      <p className="text-gray-700">
                        <span className="font-semibold">Time:</span> {selectedCandidate.interviewTime}
                      </p>
                    </div>
                  )}

                  {!showOffer ? (
                    <button
                      onClick={() => setShowOffer(true)}
                      className="w-full cursor-pointer bg-blue-600 text-white py-4 rounded-xl hover:bg-blue-700 transition-colors font-bold text-lg flex items-center justify-center gap-3 shadow-lg hover:shadow-xl"
                    >
                      <FileText size={22} />
                      Draft Offer Letter
                    </button>
                  ) : (
                    <div className="space-y-5">
                      <div className="bg-white border-2 border-gray-300 rounded-xl p-6">
                        <h4 className="font-bold text-gray-900 mb-5 text-xl text-center">OFFER LETTER</h4>
                        <div className="space-y-4 text-gray-700 leading-relaxed">
                          <p>Dear <strong>{selectedCandidate.name}</strong>,</p>
                          <p>
                            We are pleased to offer you a position at <strong>HireLink</strong>.
                          </p>
                          <p>
                            Your skills and experience, particularly in <strong>{selectedCandidate.skills.join(', ')}</strong>, 
                            make you an excellent fit for our team.
                          </p>
                          <div className="bg-gray-50 p-4 rounded-lg space-y-2 my-4">
                            <p><strong>Position:</strong> {selectedCandidate.jobRole || 'Senior Developer'}</p>
                            <p><strong>Start Date:</strong> To Be Determined</p>
                            <p><strong>Salary:</strong> Competitive package based on experience</p>
                          </div>
                          <p>
                            Please review this offer and let us know your decision within <strong>5 business days</strong>.
                          </p>
                          <p className="pt-4">
                            Sincerely,<br />
                            <strong>HireLink Team</strong>
                          </p>
                        </div>
                      </div>

                      <button
                        onClick={() => sendOffer(selectedCandidate)}
                        className="w-full cursor-pointer bg-blue-600 text-white py-4 rounded-xl hover:bg-blue-700 transition-colors font-bold text-lg shadow-lg hover:shadow-xl"
                      >
                        Send Offer
                      </button>
                    </div>
                  )}
                </>
              )}

              {/* Offer Sent Stage */}
              {activeStage === 'offer' && (
                <div className="bg-green-50 border-2 border-green-300 rounded-xl p-6 text-center">
                  <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Send size={32} className="text-green-600" />
                  </div>
                  <p className="text-green-800 font-bold text-lg">Offer Successfully Sent!</p>
                  <p className="text-green-700 mt-2">This candidate has received the offer letter.</p>
                </div>
              )}

              {/* Rejected Stage - Commented out */}
              {/* {activeStage === 'rejected' && (
                <div className="bg-red-50 border-2 border-red-300 rounded-xl p-6 text-center">
                  <div className="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3">
                    <XCircle size={32} className="text-red-600" />
                  </div>
                  <p className="text-red-800 font-bold text-lg">Candidate Rejected</p>
                  <p className="text-red-700 mt-2">This candidate was not selected for the position.</p>
                </div>
              )} */}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;