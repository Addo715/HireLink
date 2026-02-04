import React, { useState } from "react";
import { Briefcase, Code, PenTool, Users } from "lucide-react";

const Hero = () => {
  const [selectedCategory, setSelectedCategory] = useState(
    "Software Developers",
  );

  const categories = [
    { name: "Software Developers", icon: Code },
    { name: "Designers", icon: PenTool },
    { name: "Marketers", icon: Users },
    { name: "Project Managers", icon: Briefcase },
  ];

  return (
    <section className="px-4 sm:px-10 py-10">
      <main className="flex flex-col lg:flex-row max-w-7xl mx-auto w-full gap-12 items-center">
        <div className="flex flex-col lg:w-1/2">
          <h1 className="text-gray-900 font-bold text-4xl sm:text-5xl md:text-6xl leading-tight mb-6">
            Hire Top Talent in Minutes
          </h1>
          <p className="text-gray-600 text-lg mb-8">
            Join HireLink today and connect with top companies looking for
            skilled professionals. Apply, get hired, and grow your career faster
            than ever.
          </p>

          <div className="flex flex-wrap gap-4">
            {categories.map((category) => {
              const IconComponent = category.icon;
              return (
                <button
                  key={category.name}
                  onClick={() => setSelectedCategory(category.name)}
                  className={`px-5 py-3 cursor-pointer rounded-full text-sm font-medium flex items-center gap-2 transition-all ${
                    selectedCategory === category.name
                      ? "bg-blue-600 text-white shadow-lg"
                      : "bg-white text-gray-800 hover:bg-gray-100 border border-gray-200"
                  }`}
                >
                  <IconComponent size={18} />
                  {category.name}
                </button>
              );
            })}
          </div>

          <div className="mt-10 flex flex-wrap gap-4">
            <a
              href="/jobs"
              className="bg-blue-600 text-white px-6 py-3 rounded-full font-medium text-sm hover:bg-blue-700 transition-all"
            >
              Apply Now
            </a>
            <a
              href="/Signup"
              className="bg-white text-blue-600 px-6 py-3 rounded-full font-medium text-sm border border-blue-600 hover:bg-teal-50 transition-all"
            >
              Get Started
            </a>
          </div>
        </div>

        <div className="hidden lg:block lg:w-1/2">
          <img
            src="https://images.unsplash.com/photo-1629904853716-f0bc54eea481?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGpvYnxlbnwwfHwwfHx8MA%3D%3D"
            alt="Job search illustration"
            className="w-full h-auto rounded"
          />
        </div>
      </main>
    </section>
  );
};

export default Hero;
