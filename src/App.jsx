import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import ProfessionalDetails from "./pages/ProfessionalDetails";
import ApplicationForm from "./pages/ApplicationForm";
import AdminDashboard from "./pages/Admin/Admindashboard";
// import AdminDashboard from "./pages/AdminDashboard";

const App = () => {
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  return (
    <div>
      {isHomePage && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:slug" element={<ProfessionalDetails />} />
        <Route path="/apply/:slug" element={<ApplicationForm />} />
        <Route path="/admin" element={<AdminDashboard />} />
     
        
      </Routes>
      {isHomePage && <Footer />}
    </div>
  );
};

export default App;