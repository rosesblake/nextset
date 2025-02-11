import React from "react";
import { Link } from "react-router-dom";
import { useUser } from "../../contexts/UserContext";
import { Settings } from "lucide-react";

function VenueLeftSidebar({ isCollapsed, toggleSidebars }) {
  const { currUser, logout } = useUser();

  return (
    <div
      className={`fixed left-0 top-0 h-full ${
        isCollapsed ? "w-16" : "w-80"
      } bg-nextsetPrimary shadow-md p-4 z-10 transition-width duration-300`}
    >
      {/* Toggle Button */}
      <button
        onClick={toggleSidebars}
        className="absolute top-4 right-2 text-nextsetAccent z-20 text-2xl font-bold"
      >
        {isCollapsed ? "→" : "←"}
      </button>

      {/* Sidebar Content */}
      {!isCollapsed && (
        <div>
          {/* App Name */}
          <div className="text-nextsetAccent text-3xl font-extrabold tracking-wide mb-12">
            NextSet
          </div>

          {/* Venue Info with Settings Icon */}
          {currUser && currUser.venue && (
            <div className="block text-nextsetAccent mb-6 hover:bg-nextsetButton hover:text-white transition duration-200 rounded-lg">
              <div className="flex items-center justify-between p-3 hover:bg-nextsetButton hover:shadow-lg rounded-lg transition duration-300">
                <Link to="/venue/profile">
                  <div className="flex items-center space-x-4">
                    <div className="flex flex-col">
                      <span className="text-xl font-semibold">
                        {currUser.venue.name}
                      </span>
                      <span className="text-sm text-gray-300 hover:text-gray-100">
                        Manage Venue
                      </span>
                    </div>
                  </div>
                </Link>

                {/* Settings Icon */}
                <Link
                  to="/venue/settings"
                  className="hover:text-nextsetAccent transition"
                >
                  <Settings size={28} />
                </Link>
              </div>
            </div>
          )}

          {/* Navigation Links */}
          <ul className="space-y-6">
            <li>
              <Link
                to="/venue/dashboard"
                className="flex items-center text-nextsetAccent text-lg font-semibold hover:text-white hover:bg-nextsetButton p-3 rounded-lg transition duration-200"
              >
                <span>Dashboard</span>
              </Link>
            </li>
            <li>
              <Link
                to="/venue/bookings"
                className="flex items-center text-nextsetAccent text-lg font-semibold hover:text-white hover:bg-nextsetButton p-3 rounded-lg transition duration-200"
              >
                <span>Bookings</span>
              </Link>
            </li>
            <li>
              <Link
                to="/venue/calendar"
                className="flex items-center text-nextsetAccent text-lg font-semibold hover:text-white hover:bg-nextsetButton p-3 rounded-lg transition duration-200"
              >
                <span>Calendar</span>
              </Link>
            </li>
            <li>
              <Link
                to="/venue/explore"
                className="flex items-center text-nextsetAccent text-lg font-semibold hover:text-white hover:bg-nextsetButton p-3 rounded-lg transition duration-200"
              >
                <span>Explore</span>
              </Link>
            </li>

            <li>
              <button
                onClick={logout}
                className="flex items-center justify-center text-nextsetPrimary text-lg font-semibold bg-nextsetAccent hover:bg-nextsetButton p-3 rounded-lg transition duration-200 w-full"
              >
                Logout
              </button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}

export { VenueLeftSidebar };
