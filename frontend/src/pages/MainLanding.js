import React from "react";
import { Link } from "react-router-dom";

function MainLanding() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center">
      <h1 className="text-4xl font-bold text-gray-800 mb-8">
        Welcome to NextSet!
      </h1>
      <p className="text-lg text-gray-600 mb-12 text-center px-4 max-w-2xl">
        Are you an **Artist** looking to showcase your talent or a **Venue**
        owner looking to host events? Choose your path below to get started and
        become part of the NextSet community.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl px-4">
        {/* Artist Module */}
        <Link to="/register?account_type=artist" className="group">
          <div className="bg-white shadow-md rounded-lg p-8 hover:shadow-xl transform hover:-translate-y-1 transition duration-300">
            <h2 className="text-3xl font-bold text-gray-800 group-hover:text-indigo-600">
              🎵 Artist
            </h2>
            <p className="text-gray-600 mt-2">
              Are you a musician, singer, or performer? Sign up to find venues,
              book gigs, and connect with venues.
            </p>
            <button className="mt-6 px-6 py-2 text-white bg-indigo-600 rounded-md hover:bg-indigo-500 transition duration-300">
              Sign Up as an Artist
            </button>
          </div>
        </Link>

        {/* Venue Module */}
        <Link to="/register?account_type=venue" className="group">
          <div className="bg-white shadow-md rounded-lg p-8 hover:shadow-xl transform hover:-translate-y-1 transition duration-300">
            <h2 className="text-3xl font-bold text-gray-800 group-hover:text-teal-600">
              🏢 Venue
            </h2>
            <p className="text-gray-600 mt-2">
              Do you manage a venue or event space? Sign up to list your venue,
              connect with artists, and book events with ease.
            </p>
            <button className="mt-6 px-6 py-2 text-white bg-teal-600 rounded-md hover:bg-teal-500 transition duration-300">
              Sign Up as a Venue
            </button>
          </div>
        </Link>
      </div>

      <p className="text-gray-500 text-sm mt-12">
        Already have an account?{" "}
        <Link to="/login" className="text-indigo-600 hover:underline">
          Log in here.
        </Link>
      </p>
    </div>
  );
}

export { MainLanding };
