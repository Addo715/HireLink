import React, { useEffect, useState } from 'react';
import logo from '../assets/work.svg'; 

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`flex items-center justify-between px-6 py-3 md:py-4 shadow-sm mx-auto w-full bg-white transition-all duration-300 ${
        isScrolled
          ? "fixed top-0 left-0 right-0 z-50 rounded-none max-w-full"
          : "max-w-5xl rounded-full"
      }`}
    >
     <a href="/" className="flex items-center gap-2">
  <img src={logo} alt="logo" className="w-10 h-10 md:w-12 md:h-12" />
  <h1 className="text-blue-600 text-xl md:text-2xl font-bold">HireLink</h1>
</a>

      {/* Menu */}
      <nav
        id="menu"
        className={`max-md:fixed max-md:top-0 max-md:left-0 max-md:w-full max-md:h-screen max-md:bg-white max-md:flex max-md:flex-col max-md:items-center max-md:justify-center max-md:z-50 transition-transform duration-300 md:flex md:flex-row md:items-center gap-8 text-gray-900 text-sm font-medium ${
          menuOpen ? "max-md:translate-x-0" : "max-md:translate-x-full"
        }`}
      >
        {/* Close button for mobile */}
        <button
          className="md:hidden absolute top-6 right-6 text-gray-600"
          onClick={() => setMenuOpen(false)}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <a href="" className="hover:text-blue-600 transition">
          Find Jobs
        </a>
        <a href="" className="hover:text-blue-600 transition">
          About Us
        </a>
        <a href="" className="hover:text-blue-600 transition">
         Companies
        </a>
        <a href="" className="hover:text-blue-600 transition">
          Contact
        </a>

        {/* Mobile buttons */}
        <div className="md:hidden flex flex-col gap-4 mt-8">
          <a
            className="bg-black text-white px-6 py-3 rounded-full text-sm font-medium hover:bg-gray-800 transition text-center"
            href="/Signup"
            onClick={() => setMenuOpen(false)}
          >
            Get Started
          </a>
          <a
            className="bg-black text-white px-6 py-3 rounded-full text-sm font-medium hover:bg-gray-700 transition text-center"
            href=""
            onClick={() => setMenuOpen(false)}
          >
            Log in
          </a>
        </div>
      </nav>

      {/* Right Buttons - Desktop Only */}
      <div className="hidden md:flex items-center space-x-4">
        <a
          className="bg-black text-white px-5 py-2 rounded-full text-sm font-medium hover:bg-gray-800 transition"
          href=""
        >
          Get Started
        </a>

        <a
          className="cursor-pointer bg-black text-white px-5 py-2 rounded-full text-sm font-medium hover:bg-gray-700 transition"
          href=""
        >
          Login
        </a>
      </div>

      {/* Open mobile menu */}
      <button
        className="md:hidden text-gray-600"
        onClick={() => setMenuOpen(true)}
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          viewBox="0 0 24 24"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>
    </header>
  );
};

export default Navbar;
