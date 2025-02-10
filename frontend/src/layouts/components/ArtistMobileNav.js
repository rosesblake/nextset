import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useUser } from "../../contexts/UserContext";
import { Menu, X } from "lucide-react";

function ArtistMobileNav({ children }) {
  const { currUser, logout } = useUser();
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <div className="relative min-h-screen bg-nextsetPrimary">
      {/* Hamburger Icon (Top Left) */}
      <button
        onClick={toggleMenu}
        className="fixed top-4 left-4 z-30 text-nextsetAccent bg-nextsetPrimary p-2 rounded-md shadow-md"
      >
        {isOpen ? <X size={28} /> : <Menu size={28} />}
      </button>

      {/* Sliding Sidebar (Left Side) */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-nextsetPrimary shadow-lg p-4 transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out z-20`}
      >
        <div className="text-nextsetAccent text-3xl font-extrabold tracking-wide mb-8 ml-16">
          NextSet
        </div>

        {currUser && currUser.artist && (
          <Link
            to="/artist/profile"
            onClick={toggleMenu}
            className="flex items-center space-x-4 p-3 hover:bg-nextsetButton rounded-lg transition duration-300 text-nextsetAccent"
          >
            <img
              src={currUser.artist.spotify_photo || "/default-profile.png"}
              alt={currUser.artist.name}
              className="w-12 h-12 rounded-full shadow-md object-cover"
            />
            <div>
              <span className="text-xl font-semibold">
                {currUser.artist.name}
              </span>
              <span className="block text-sm text-gray-300">View Profile</span>
            </div>
          </Link>
        )}

        <ul className="space-y-6 mt-6">
          <li>
            <Link
              to="/artist/dashboard"
              onClick={toggleMenu}
              className="block text-nextsetAccent text-lg font-semibold hover:text-white hover:bg-nextsetButton p-3 rounded-lg transition duration-200"
            >
              Dashboard
            </Link>
          </li>
          <li>
            <Link
              to="/artist/venue/list"
              onClick={toggleMenu}
              className="block text-nextsetAccent text-lg font-semibold hover:text-white hover:bg-nextsetButton p-3 rounded-lg transition duration-200"
            >
              Venues
            </Link>
          </li>
          <li>
            <Link
              to="/artist/bookings"
              onClick={toggleMenu}
              className="block text-nextsetAccent text-lg font-semibold hover:text-white hover:bg-nextsetButton p-3 rounded-lg transition duration-200"
            >
              Bookings
            </Link>
          </li>
          <li>
            <Link
              to="/artist/calendar"
              onClick={toggleMenu}
              className="block text-nextsetAccent text-lg font-semibold hover:text-white hover:bg-nextsetButton p-3 rounded-lg transition duration-200"
            >
              Calendar
            </Link>
          </li>
          <li>
            <button
              onClick={() => {
                logout();
                toggleMenu();
              }}
              className="w-full text-center text-nextsetPrimary bg-nextsetAccent hover:bg-nextsetButton text-lg font-semibold p-3 rounded-lg transition duration-200"
            >
              Logout
            </button>
          </li>
        </ul>
      </div>

      {/* Main Content Area */}
      <div className="z-10 relative overflow-auto min-h-screen bg-white">
        {children}
      </div>
    </div>
  );
}

export { ArtistMobileNav };
