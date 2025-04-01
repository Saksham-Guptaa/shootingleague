import React from "react";
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";

const EventsSection: React.FC = () => {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-blue-700 mb-10">
          Shooting Events
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Global Events */}
          <div className="bg-gray-50 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
            <div className="h-48 bg-gray-200 relative">
              <img
                src="/events/upcoming1.png"
                alt="Olympic Games"
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 left-4 bg-blue-700 text-white px-3 py-1 rounded-full text-sm font-medium">
                Global
              </div>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold mb-2">Global Championships</h3>
              <p className="text-gray-600 mb-4">
                Olympics, World Championships
              </p>
              <p className="text-gray-700 mb-4">
                The premier shooting events featuring the world's top
                competitors on the global stage.
              </p>
              <Link
                to="/events/global"
                className="text-blue-600 hover:underline font-medium inline-flex items-center"
              >
                Explore <ChevronRight className="h-4 w-4 ml-1" />
              </Link>
            </div>
          </div>

          {/* National Events */}
          <div className="bg-gray-50 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
            <div className="h-48 bg-gray-200 relative">
              <img
                src="/events/upcoming2.png"
                alt="National Championships"
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 left-4 bg-blue-700 text-white px-3 py-1 rounded-full text-sm font-medium">
                National
              </div>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold mb-2">National Championships</h3>
              <p className="text-gray-600 mb-4">All India Shooting Events</p>
              <p className="text-gray-700 mb-4">
                Prestigious competitions bringing together the best shooters
                from across India in multiple disciplines.
              </p>
              <Link
                to="/events/national"
                className="text-blue-600 hover:underline font-medium inline-flex items-center"
              >
                Explore <ChevronRight className="h-4 w-4 ml-1" />
              </Link>
            </div>
          </div>

          {/* Zonal Events */}
          <div className="bg-gray-50 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
            <div className="h-48 bg-gray-200 relative">
              <img
                src="/news3.png"
                alt="Zonal Championships"
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 left-4 bg-blue-700 text-white px-3 py-1 rounded-full text-sm font-medium">
                Zonal
              </div>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold mb-2">Zonal Championships</h3>
              <p className="text-gray-600 mb-4">
                North, South, East, West Zones
              </p>
              <p className="text-gray-700 mb-4">
                Regional competitions across India's zones, providing platforms
                for shooters to qualify for national events.
              </p>
              <Link
                to="/events/zonal"
                className="text-blue-600 hover:underline font-medium inline-flex items-center"
              >
                Explore <ChevronRight className="h-4 w-4 ml-1" />
              </Link>
            </div>
          </div>

          {/* Road to Olympics */}
          <div className="bg-gray-50 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
            <div className="h-48 bg-gray-200 relative">
              <img
                src="/events/upcoming3.png"
                alt="Road to Olympics"
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 left-4 bg-blue-700 text-white px-3 py-1 rounded-full text-sm font-medium">
                Olympic Path
              </div>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold mb-2">Road to Olympics</h3>
              <p className="text-gray-600 mb-4">
                Qualifiers & Selection Trials
              </p>
              <p className="text-gray-700 mb-4">
                Critical qualifying events and selection trials for athletes
                aiming to represent India at the Olympic Games.
              </p>
              <Link
                to="/events/olympic-path"
                className="text-blue-600 hover:underline font-medium inline-flex items-center"
              >
                Explore <ChevronRight className="h-4 w-4 ml-1" />
              </Link>
            </div>
          </div>
        </div>

        <div className="text-center mt-10">
          <Link to="/events/calendar">
            <button className="bg-blue-700 hover:bg-blue-800 text-white rounded-full px-6">
              View Full Event Calendar
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default EventsSection;
