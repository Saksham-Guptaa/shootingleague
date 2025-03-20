import Link from "next/link";
import { FiMail, FiMapPin, FiPhone } from "react-icons/fi";

const Footer = () => {
  return (
    <footer className="bg-blue-900 text-white py-10">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center md:items-start">
        {/* Logo Section */}
        <div className="bg-yellow-500 px-10 py-6 rounded-lg flex flex-col items-center">
        <span className="mr-2"><img src="/logo.jpg" className="w-14 h-14" alt="" /></span> 
        <span className="text-black font-semibold text-lg mt-2">
            Global Shooting League
          </span>
        </div>

        {/* Quick Links */}
        <div className="mt-6 md:mt-0">
          <h3 className="text-lg font-semibold mb-2">Quick Links</h3>
          <ul className="space-y-1">
            {["Home", "About", "News", "Competitions", "Athletes", "Ranges", "More"].map(
              (item, index) => (
                <li key={index} className="text-sm hover:text-yellow-400 cursor-pointer">
                  <Link href={`/${item.toLowerCase()}`}>

                  {item.toUpperCase()}
                  </Link>
                 
                </li>
              )
            )}
          </ul>
        </div>

        {/* Contact Info */}
        <div className="mt-6 md:mt-0">
          <h3 className="text-lg font-semibold mb-2">Contact Us</h3>
          <ul className="space-y-1 text-sm">
            <li className="flex items-center space-x-2">
              <FiMapPin className="text-yellow-400" />
              <span>Address</span>
            </li>
            <li className="flex items-center space-x-2">
              <FiMail className="text-yellow-400" />
              <span>mail1</span>
            </li>
            <li className="flex items-center space-x-2">
              <FiMail className="text-yellow-400" />
              <span>mail2</span>
            </li>
            <li className="flex items-center space-x-2">
              <FiPhone className="text-yellow-400" />
              <span>ph. no.</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Copyright Text */}
      <div className="text-center text-sm mt-8">
        Copyright 2025 GSL. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
