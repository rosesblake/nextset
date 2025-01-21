import React from "react";
import { useUser } from "../../../contexts/UserContext";
import { useNavigate } from "react-router-dom";
import { EditableField } from "../../../shared/components/EditableField";
import { NextSetApi } from "../../../services/api";
import { Spinner } from "../../../shared/components/Spinner";

function VenueProfile() {
  const { currUser, setCurrUser, isLoading } = useUser();
  const navigate = useNavigate();

  const handleFieldSave = async (field, newValue) => {
    try {
      const data = { [field]: newValue };
      const updatedVenue = await NextSetApi.updateVenue(currUser.venue, data);
      setCurrUser({ ...currUser, venue: updatedVenue });
    } catch (e) {
      console.error(e);
    }
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-10">
      <div className="w-full max-w-3xl bg-white p-6 rounded-lg shadow-lg">
        {/* Profile Header */}
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-nextsetAccent mb-2">
            {currUser.venue.name}
          </h1>
          <p className="text-gray-600">
            Located in {currUser.venue.city}, {currUser.venue.state}
          </p>
        </div>

        {/* General Information Section */}
        <div className="p-4 bg-gray-50 rounded-lg shadow-sm mb-6">
          <h3 className="text-lg font-bold text-nextsetAccent mb-4">
            General Information
          </h3>
          <EditableField
            label="Capacity"
            value={currUser.venue.capacity?.toString() || "N/A"}
            onSave={(newValue) =>
              handleFieldSave("capacity", parseInt(newValue))
            }
          />
          <EditableField
            label="Address"
            value={currUser.venue.address || "N/A"}
            onSave={(newValue) => handleFieldSave("address", newValue)}
          />
          <EditableField
            label="City"
            value={currUser.venue.city || "N/A"}
            onSave={(newValue) => handleFieldSave("city", newValue)}
          />
          <EditableField
            label="State"
            value={currUser.venue.state || "N/A"}
            onSave={(newValue) => handleFieldSave("state", newValue)}
          />
          <EditableField
            label="Zip Code"
            value={currUser.venue.zip_code?.toString() || "N/A"}
            onSave={(newValue) =>
              handleFieldSave("zip_code", parseInt(newValue))
            }
          />
        </div>

        {/* Blocked Dates Section */}
        <div className="p-4 bg-gray-50 rounded-lg shadow-sm mb-6">
          <h3 className="text-lg font-bold text-nextsetAccent mb-4">
            Blocked Dates
          </h3>
          <ul>
            {currUser.venue.blocked_dates?.length > 0 ? (
              currUser.venue.blocked_dates.map((date, idx) => (
                <li key={idx} className="text-gray-600">
                  {new Date(date).toLocaleDateString()}
                </li>
              ))
            ) : (
              <p className="text-gray-500">No blocked dates set.</p>
            )}
          </ul>
        </div>

        {/* Quick Actions */}
        <div className="flex justify-center space-x-4">
          <button
            className="px-6 py-3 bg-nextsetButton text-white rounded-md hover:bg-nextsetAccent transition"
            onClick={() => navigate("/venue/dashboard")}
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
}

export { VenueProfile };
