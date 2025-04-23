import React from "react";
import { Link } from "react-router-dom";
import { Spinner } from "../shared/components/Spinner";
import { useLoading } from "../contexts/LoadingContext";

function MainLanding() {
  const { isLoading } = useLoading();

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-100 via-gray-200 to-gray-300 flex flex-col justify-center items-center py-20 px-10 mt-10">
      {/* Header Section */}
      <h1 className="text-5xl font-extrabold text-nextsetAccent mb-8 tracking-wide">
        Welcome to NextSet!
      </h1>
      <p className="text-lg text-gray-700 mb-12 text-center px-4 max-w-2xl leading-relaxed">
        Are you an{" "}
        <span className="font-semibold text-nextsetAccent">Artist</span> looking
        to showcase your talent or a{" "}
        <span className="font-semibold text-nextsetAccent">Venue</span> owner
        looking to host events? Choose your path below to get started and become
        part of the NextSet community.
      </p>

      {/* Action Modules */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-5xl px-4">
        {/* Artist Module */}
        <Link to="/register/artist" className="group">
          <div className="bg-white shadow-lg rounded-xl p-8 hover:shadow-2xl transform hover:scale-105 transition duration-300">
            <h2 className="text-4xl font-bold text-gray-800 group-hover:text-nextsetAccent">
              🎵 Artist
            </h2>
            <p className="text-gray-600 mt-4 leading-relaxed">
              Are you a musician, singer, or performer? Sign up to find venues,
              book gigs, and connect with venues.
            </p>
            <button className="mt-8 px-8 py-3 text-white bg-nextsetAccent rounded-full hover:bg-nextsetButton transition duration-300">
              Sign Up as an Artist
            </button>
          </div>
        </Link>

        {/* Venue Module */}
        <Link to="/register/venue" className="group">
          <div className="bg-white shadow-lg rounded-xl p-8 hover:shadow-2xl transform hover:scale-105 transition duration-300">
            <h2 className="text-4xl font-bold text-gray-800 group-hover:text-teal-600">
              🏢 Venue
            </h2>
            <p className="text-gray-600 mt-4 leading-relaxed">
              Do you manage a venue or event space? Sign up to list your venue,
              connect with artists, and book events.
            </p>
            <button className="mt-8 px-8 py-3 text-white bg-teal-600 rounded-full hover:bg-teal-500 transition duration-300">
              Sign Up as a Venue
            </button>
          </div>
        </Link>
      </div>

      {/* Login Section */}
      <p className="text-gray-600 text-sm mt-16">
        Already have an account?{" "}
        <Link
          to="/login"
          className="text-nextsetAccent font-medium hover:underline"
        >
          Log in here.
        </Link>
      </p>
    </div>
  );
}

export { MainLanding };
