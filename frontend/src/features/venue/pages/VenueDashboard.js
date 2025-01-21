import React from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../../contexts/UserContext";

function VenueDashboard() {
  const { currUser } = useUser();
  const navigate = useNavigate();

  const handleGoToProfile = () => {
    navigate("/venue/profile");
  };

  const handleManageBlockedDates = () => {
    navigate("/venue/block-dates");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-3xl p-6 bg-white rounded-lg shadow-lg">
        {/* Welcome Section */}
        {currUser ? (
          <div className="text-center mb-6">
            <h1 className="text-3xl font-bold text-nextsetAccent mb-4">
              Welcome back, {currUser?.full_name || "Venue Manager"}!
            </h1>
            <p className="text-gray-700">
              Manage your venue, view upcoming bookings, and update details.
            </p>
          </div>
        ) : (
          <div className="text-center mb-6">
            <h1 className="text-3xl font-bold text-nextsetAccent mb-4">
              Please log in to access your dashboard.
            </h1>
            <button
              className="px-6 py-3 text-white bg-nextsetButton hover:bg-nextsetPrimary rounded-md transition duration-300"
              onClick={() => navigate("/login")}
            >
              Log In
            </button>
          </div>
        )}

        {/* Quick Actions */}
        {currUser && (
          <div className="mt-6 text-center">
            <button
              className="px-6 py-3 mx-2 text-white bg-nextsetButton hover:bg-nextsetPrimary rounded-md transition duration-300"
              onClick={handleGoToProfile}
            >
              Update Venue Profile
            </button>
            <button
              className="px-6 py-3 mx-2 text-white bg-nextsetAccent hover:bg-nextsetButton rounded-md transition duration-300"
              onClick={handleManageBlockedDates}
            >
              Manage Blocked Dates
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export { VenueDashboard };
