import React from "react";
import { Link } from "react-router-dom";
import { useUser } from "../components/UserContext";
import { useArtist } from "../components/ArtistContext";

function LeftSidebar({ isCollapsed, toggleSidebars }) {
  const { currUser, logout } = useUser();
  const { artist } = useArtist();

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
          {currUser && artist && (
            <Link
              to="/artist/profile"
              className="block text-nextsetAccent mb-6 hover:bg-nextsetButton hover:text-white transition duration-200 rounded-lg"
            >
              <div className="flex items-center space-x-4 p-3 hover:bg-nextsetButton hover:shadow-lg rounded-lg transition duration-300">
                <img
                  src={artist.spotify_photo || "/default-profile.png"}
                  alt={artist.name}
                  className="w-12 h-12 rounded-full shadow-md"
                />
                <div className="flex flex-col">
                  <span className="text-xl font-semibold">{artist.name}</span>
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
                to="/venue/list"
                className="flex items-center text-nextsetAccent text-lg font-semibold hover:text-white hover:bg-nextsetButton p-3 rounded-lg transition duration-200"
              >
                <span>Venues</span>
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

export { LeftSidebar };
