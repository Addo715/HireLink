import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import ProfessionalDetails from "./pages/ProfessionalDetails";
import ApplicationForm from "./pages/ApplicationForm";
import AdminDashboard from "./pages/Admin/Admindashboard";
// import CandidateDashboard from "./pages/CandidateDashboard";
import Jobs from "./pages/Jobs";
import CandidateDashboard from "./pages/Candidatedashboard";

const App = () => {
  const location = useLocation();
  const isHomePage = location.pathname === "/";
  const isDashboardPage = location.pathname === "/dashboard" || location.pathname === "/admin";

  return (
    <div>
      {isHomePage && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/jobs" element={<Jobs />} />
        <Route path="/dashboard" element={<CandidateDashboard />} />
        <Route path="/:slug" element={<ProfessionalDetails />} />
        <Route path="/apply/:slug" element={<ApplicationForm />} />
        <Route path="/admin" element={<AdminDashboard />} />

        
      </Routes>
      {isHomePage && !isDashboardPage && <Footer />}
    </div>
  );
};

export default App;