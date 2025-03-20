"use client";

import { useState } from "react";
import { FiMenu, FiX, FiSearch } from "react-icons/fi";
import Link from "next/link";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-blue-900 text-white w-full">
      <div className="flex justify-between items-center  w-full">
        {/* Left Logo Section */}
        <div className="relative bg-yellow-500 px-6 py-2 flex items-center ">
          <div className="absolute right-0 top-0 h-full w-6 bg-blue-900 clip-triangle"></div>
          <span className="text-black font-bold text-lg flex items-center">
            <span className="mr-2"><img src="/logo.jpg" className="w-14 h-14" alt="" /></span> Global Shooting League
          </span>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex flex-1 justify-center space-x-6">
          {["Home", "About", "News", "Competitions", "Shooters", "Ranges", "More"].map(
            (item, index) => (
              <Link
                key={index}
                href={`/${item.toLowerCase()}`}
                className={`hover:text-yellow-400 text-sm font-semibold ${
                  item === "Home" ? "text-yellow-400" : ""
                }`}
              >
                {item.toUpperCase()}
              </Link>
            )
          )}
        </div>

        {/* Search Icon - Desktop */}
        <div className="hidden md:flex pr-6">
          <FiSearch className="w-5 h-5 cursor-pointer hover:text-yellow-400" />
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden px-4">
          <button onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <FiX className="w-6 h-6" /> : <FiMenu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {isOpen && (
        <div className="md:hidden bg-blue-800 text-center">
          {["Home", "About", "News", "Competitions", "Shooters", "Ranges", "More"].map(
            (item, index) => (
              <Link
                key={index}
                href={`/${item.toLowerCase()}`}
                className="block px-4 py-2 text-white hover:bg-blue-700"
                onClick={() => setIsOpen(false)}
              >
                {item}
              </Link>
            )
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
