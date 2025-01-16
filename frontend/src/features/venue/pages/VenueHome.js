import React from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../../contexts/UserContext";

function VenueHome() {
  const { currUser } = useUser();
  const navigate = useNavigate();

  const navigateLogin = () => {
    navigate("/login"); // Redirect to login page
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-2xl p-6 bg-white rounded-lg shadow-lg">
        {currUser ? (
          <div className="flex items-center justify-center mb-6"></div>
        ) : (
          <div className="text-center mb-6">
            <h1 className="text-3xl font-bold text-nextsetAccent mb-4">
              You need to log in to access this page.
            </h1>
            <button
              className="px-6 py-3 text-white bg-nextsetButton hover:bg-nextsetPrimary rounded-md transition duration-300"
              onClick={navigateLogin}
            >
              Go to Login
            </button>
          </div>
        )}

        {currUser && (
          <div>
            <h1 className="text-3xl font-bold text-center text-nextsetAccent mb-4">
              Welcome, {currUser.full_name}!
            </h1>
            <p className="text-lg text-gray-700 mb-4">
              You are logged in as a venue manager. Here you can manage your
              venue, update details, and view booking requests.
            </p>
            <div className="mt-6 text-center">
              <button
                className="px-6 py-3 text-white bg-nextsetButton hover:bg-nextsetPrimary rounded-md transition duration-300"
                onClick={() => alert("Go to Venue Dashboard")}
              >
                Go to Dashboard
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export { VenueHome };
