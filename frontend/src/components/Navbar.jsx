import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link
          to="/"
          className="text-2xl font-extrabold tracking-wide hover:text-gray-200 transition-colors duration-200"
        >
          My<span className="text-yellow-300">Blog</span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-8 font-medium text-lg">
          <Link
            to="/"
            className="relative hover:text-yellow-300 transition duration-300 after:content-[''] after:block after:h-[2px] after:bg-yellow-300 after:w-0 hover:after:w-full after:transition-all after:duration-300"
          >
            Home
          </Link>
          <Link
            to="/about"
            className="relative hover:text-yellow-300 transition duration-300 after:content-[''] after:block after:h-[2px] after:bg-yellow-300 after:w-0 hover:after:w-full after:transition-all after:duration-300"
          >
            About
          </Link>
          <Link
            to="/admin"
            className="relative hover:text-yellow-300 transition duration-300 after:content-[''] after:block after:h-[2px] after:bg-yellow-300 after:w-0 hover:after:w-full after:transition-all after:duration-300"
          >
            Admin
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-2xl focus:outline-none hover:text-yellow-300"
        >
          {isOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="md:hidden bg-blue-700 bg-opacity-95 text-white px-6 py-4 space-y-4 animate-slideDown">
          <Link
            to="/"
            onClick={() => setIsOpen(false)}
            className="block hover:text-yellow-300 text-lg"
          >
            Home
          </Link>
          <Link
            to="/about"
            onClick={() => setIsOpen(false)}
            className="block hover:text-yellow-300 text-lg"
          >
            About
          </Link>
          <Link
            to="/admin"
            onClick={() => setIsOpen(false)}
            className="block hover:text-yellow-300 text-lg"
          >
            Admin
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
