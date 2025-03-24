"use client";

import { useState } from "react";
import { FiMenu, FiX, FiSearch, FiUser, FiLogIn, FiUserPlus, FiGrid } from "react-icons/fi";
import Link from "next/link";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const toggleProfileDropdown = () => {
    setIsProfileOpen(!isProfileOpen);
  };

  // Close dropdown when clicking outside
  const handleClickOutside = () => {
    if (isProfileOpen) {
      setIsProfileOpen(false);
    }
  };

  return (
    <nav className="bg-blue-900 text-white w-full">
      <div className="flex justify-between items-center w-full">
        {/* Left Logo Section */}
        <div className="relative bg-yellow-500 px-6 py-2 flex items-center">
          <div className="absolute right-0 top-0 h-full w-6 bg-blue-900 clip-triangle"></div>
          <span className="text-black font-bold text-lg flex items-center">
            <span className="mr-2"><img src="/logo.png" className="w-14 h-14" alt="" /></span> Global Shooting League
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

        {/* Right Icons Section - Desktop */}
        <div className="hidden md:flex items-center pr-6 space-x-4">
          <FiSearch className="w-5 h-5 cursor-pointer hover:text-yellow-400" />
          <div className="border-l border-blue-700 h-6 mx-2"></div>
          <div className="relative">
            <div 
              className="cursor-pointer hover:text-yellow-400 flex items-center"
              onClick={toggleProfileDropdown}
            >
              <FiUser className="w-5 h-5" />
            </div>
            
            {/* Profile Dropdown Menu */}
            {isProfileOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10 text-gray-800">
                <Link 
                  href="/shootersignup" 
                  className="flex items-center px-4 py-2 text-sm hover:bg-gray-100"
                  onClick={() => setIsProfileOpen(false)}
                >
                  <FiUserPlus className="mr-2" /> Sign Up
                </Link>
                <Link 
                  href="/login" 
                  className="flex items-center px-4 py-2 text-sm hover:bg-gray-100"
                  onClick={() => setIsProfileOpen(false)}
                >
                  <FiLogIn className="mr-2" /> Login
                </Link>
                <Link 
                  href="/athletedashboard" 
                  className="flex items-center px-4 py-2 text-sm hover:bg-gray-100"
                  onClick={() => setIsProfileOpen(false)}
                >
                  <FiGrid className="mr-2" /> Dashboard
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center px-4 space-x-4">
          <FiSearch className="w-5 h-5 cursor-pointer hover:text-yellow-400" />
          
          {/* Mobile Profile Icon with Dropdown */}
          <div className="relative">
            <FiUser 
              className="w-5 h-5 cursor-pointer hover:text-yellow-400"
              onClick={toggleProfileDropdown}
            />
            
            {/* Mobile Profile Dropdown */}
            {isProfileOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10 text-gray-800">
                <Link 
                  href="/signup" 
                  className="flex items-center px-4 py-2 text-sm hover:bg-gray-100"
                  onClick={() => {
                    setIsProfileOpen(false);
                    setIsOpen(false);
                  }}
                >
                  <FiUserPlus className="mr-2" /> Sign Up
                </Link>
                <Link 
                  href="/login" 
                  className="flex items-center px-4 py-2 text-sm hover:bg-gray-100"
                  onClick={() => {
                    setIsProfileOpen(false);
                    setIsOpen(false);
                  }}
                >
                  <FiLogIn className="mr-2" /> Login
                </Link>
                <Link 
                  href="/dashboard" 
                  className="flex items-center px-4 py-2 text-sm hover:bg-gray-100"
                  onClick={() => {
                    setIsProfileOpen(false);
                    setIsOpen(false);
                  }}
                >
                  <FiGrid className="mr-2" /> Dashboard
                </Link>
              </div>
            )}
          </div>
          
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
      
      {/* Click outside handler */}
      {isProfileOpen && (
        <div 
          className="fixed inset-0 z-0"
          onClick={handleClickOutside}
        ></div>
      )}
    </nav>
  );
};

export default Navbar;