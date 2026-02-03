import React, { createContext, useState, useContext } from "react";
import { professionals, mainCategories, serviceCategories } from "../assets/asset";



const JobContext = createContext();

export const JobProvider = ({ children }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [activeTab, setActiveTab] = useState("services");

const filteredJobs = professionals.filter((job) => {
  const matchesSearch =
    job.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    job.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
    job.services.some((service) =>
      service.toLowerCase().includes(searchQuery.toLowerCase())
    );

  const matchesCategory =
    !selectedCategory ||
    job.category === selectedCategory ||
    job.role === selectedCategory ||
    job.services.includes(selectedCategory);

  return matchesSearch && matchesCategory;
});

  return (
    <JobContext.Provider
      value={{
        searchQuery,
        setSearchQuery,
        selectedCategory,
        setSelectedCategory,
        activeTab,
        setActiveTab,
        filteredJobs,
        mainCategories,
        serviceCategories,
      }}
    >
      {children}
    </JobContext.Provider>
  );
};

export const useJobContext = () => useContext(JobContext);
