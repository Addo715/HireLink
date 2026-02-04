import React, { createContext, useState, useContext, useMemo } from "react";
import { professionals, mainCategories } from "../assets/asset";

const JobContext = createContext();

export const JobProvider = ({ children }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [activeTab, setActiveTab] = useState("services");

  const filteredJobs = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    return professionals.filter((job) => {
      // ── Search filter ───────────────────────────────────────
      let matchesSearch = true;

      if (query) {
        matchesSearch =
          job.name?.toLowerCase().includes(query) ||
          job.role?.toLowerCase().includes(query) ||
          job.shortDescription?.toLowerCase().includes(query) ||
          job.location?.toLowerCase().includes(query) ||
          job.services?.some((s) => s.toLowerCase().includes(query));
      }

      // ── Category filter ─────────────────────────────────────
      let matchesCategory = true;

      if (selectedCategory) {
        // Adjust these conditions based on YOUR actual data structure
        matchesCategory =
          job.services?.some(
            (s) => s.toLowerCase() === selectedCategory.toLowerCase()
          ) ||
          job.role?.toLowerCase() === selectedCategory.toLowerCase() ||
          // If you later add a real "category" field, add:
          // job.category?.toLowerCase() === selectedCategory.toLowerCase() ||
          false;
      }

      return matchesSearch && matchesCategory;
    });
  }, [professionals, searchQuery, selectedCategory]); // ← important deps

  const value = {
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    activeTab,
    setActiveTab,
    filteredJobs,
    mainCategories,
  };

  return <JobContext.Provider value={value}>{children}</JobContext.Provider>;
};

export const useJobContext = () => useContext(JobContext);