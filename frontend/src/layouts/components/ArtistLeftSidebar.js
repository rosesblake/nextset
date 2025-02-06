import React from "react";
import { Link } from "react-router-dom";
import { useUser } from "../../contexts/UserContext";

function ArtistLeftSidebar({ isCollapsed, toggleSidebars }) {
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

          {/* Artist Name */}
          {currUser && currUser.artist && (
            <Link
              to="/artist/profile"
              className="block text-nextsetAccent mb-6 hover:bg-nextsetButton hover:text-white transition duration-200 rounded-lg"
            >
              <div className="flex items-center space-x-4 p-3 hover:bg-nextsetButton hover:shadow-lg rounded-lg transition duration-300">
                <img
                  src={currUser.artist.spotify_photo || "/default-profile.png"}
                  alt={currUser.artist.name}
                  className="w-12 h-12 rounded-full shadow-md object-cover"
                />
                <div className="flex flex-col">
                  <span className="text-xl font-semibold">
                    {currUser.artist.name}
                  </span>
                  <span className="text-sm text-gray-300 hover:text-gray-100">
                    View Profile
                  </span>
                </div>
              </div>
            </Link>
          )}

          {/* Navigation Links */}
          <ul className="space-y-6">
            <li>
              <Link
                to="/artist/dashboard"
                className="flex items-center text-nextsetAccent text-lg font-semibold hover:text-white hover:bg-nextsetButton p-3 rounded-lg transition duration-200"
              >
                <span>Dashboard</span>
              </Link>
            </li>
            <li>
              <Link
                to="/artist/venue/list"
                className="flex items-center text-nextsetAccent text-lg font-semibold hover:text-white hover:bg-nextsetButton p-3 rounded-lg transition duration-200"
              >
                <span>Venues</span>
              </Link>
            </li>
            <li>
              <Link
                to="/artist/bookings"
                className="flex items-center text-nextsetAccent text-lg font-semibold hover:text-white hover:bg-nextsetButton p-3 rounded-lg transition duration-200"
              >
                <span>Bookings</span>
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

export { ArtistLeftSidebar };
