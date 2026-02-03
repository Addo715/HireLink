import React from "react";
import { ArrowRight } from "lucide-react";

const QuickApply = () => {
  return (
    <section className="pt-10">
      <div className="bg-blue-50 py-3 px-4 sm:px-10">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            {/* Left Side - Content */}
            <div className="flex items-center gap-3">
              <span className="bg-blue-400 text-black font-bold text-xs px-2 py-1 rounded">
                NEW
              </span>
              <h3 className="text-gray-900 font-bold text-base">
                Apply for your dream job in minutes
              </h3>
              <span className="text-gray-600 text-sm hidden sm:inline">
                — Explore top opportunities and get hired faster than ever.
              </span>
            </div>

            {/* Right Side - Link */}
            <div>
              <a
                href="/apply"
                className="text-blue-600 hover:text-blue-700 font-semibold text-sm flex items-center gap-1 transition-colors"
              >
                Start Applying
                <ArrowRight size={16} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default QuickApply;
