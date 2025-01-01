import React from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../components/UserContext";

function ArtistHome() {
  const { currUser } = useUser();
  const navigate = useNavigate();

  const navigateLogin = () => {
    navigate("/login");
  };
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-2xl p-6 bg-white rounded-lg shadow-lg">
        {currUser ? (
          <div>
            <h1 className="text-3xl font-bold text-center text-nextsetAccent mb-4">
              Welcome, {currUser.username}!
            </h1>
            <p className="text-lg text-gray-700 mb-4">
              You are logged in as an artist. Here you can manage your profile,
              view your artwork, and book shows.
            </p>
            <div className="mt-6 text-center">
              <button
                className="px-6 py-3 text-white bg-nextsetButton hover:bg-nextsetPrimary rounded-md transition duration-300"
                onClick={() => alert("Go to Artist Dashboard")}
              >
                Go to Dashboard
              </button>
            </div>
          </div>
        ) : (
          <div className="text-center">
            <h1 className="text-2xl font-semibold text-gray-800 mb-4">
              Please log in to view your profile.
            </h1>
            <button
              className="px-6 py-3 text-white bg-nextsetButton hover:bg-nextsetPrimary rounded-md transition duration-300"
              onClick={navigateLogin}
            >
              Login
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export { ArtistHome };
