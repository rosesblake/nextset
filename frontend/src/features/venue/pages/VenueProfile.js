import React, { useState } from "react";
import { useUser } from "../../../contexts/UserContext";
import { useNavigate } from "react-router-dom";
import { EditableField } from "../../../shared/components/EditableField";
import { NextSetApi } from "../../../services/api";
import { Spinner } from "../../../shared/components/Spinner";
import { useLoading } from "../../../contexts/LoadingContext";
import { Plus, Save, X } from "lucide-react";
import { useForm } from "../../../hooks/useForm";
import { useMessage } from "../../../contexts/MessageContext";

function VenueProfile() {
  const { currUser, setCurrUser } = useUser();
  const navigate = useNavigate();
  const { isLoading, setIsLoading } = useLoading();
  const [isAddingAmenities, setIsAddingAmenities] = useState(false);
  const { showMessage } = useMessage();

  const handleFieldSave = async (field, newValue) => {
    try {
      setIsLoading(true);
      const data = { [field]: newValue };
      const updatedVenue = await NextSetApi.updateVenue(currUser.venue, data);
      setCurrUser({ ...currUser, venue: updatedVenue });
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddAmenities = async (data) => {
    try {
      setIsLoading(true);
      if (!data.amenity) {
        toggleAddingAmenities();
        return;
      }
      // Prevent adding duplicate amenities
      const exists = currUser.venue?.venue_amenities?.some(
        (a) => a.amenities.name.toLowerCase() === data.amenity.toLowerCase()
      );

      if (exists) {
        showMessage("Amenity already exists.", "info");
        setIsAddingAmenities(false);
        return;
      }

      const newAmenity = await NextSetApi.addVenueAmenity(
        currUser.venue.id,
        data
      );
      //update context
      setCurrUser((prevUser) => ({
        ...prevUser,
        venue: {
          ...prevUser.venue,
          venue_amenities: [
            ...(prevUser.venue.venue_amenities || []),
            {
              venue_id: newAmenity.venue_id,
              amenity_id: newAmenity.amenity_id,
              amenities: newAmenity.amenities,
            },
          ],
        },
      }));

      toggleAddingAmenities();
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteAmenity = async (venueId, amenityId) => {
    try {
      setIsLoading(true);
      await NextSetApi.deleteVenueAmenity(venueId, amenityId);

      // Remove the association from the local state
      setCurrUser((prevUser) => ({
        ...prevUser,
        venue: {
          ...prevUser.venue,
          venue_amenities: prevUser.venue.venue_amenities.filter(
            (amenity) => amenity.amenity_id !== amenityId
          ),
        },
      }));
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  const { formData, handleChange, handleSubmit } = useForm(
    { amenity: "" },
    (data) => {
      handleAddAmenities(data);
    }
  );

  const toggleAddingAmenities = () => {
    if (!isAddingAmenities) {
      //  Clear the input when opening the form
      handleChange({ target: { name: "amenity", value: "" } });
    }
    setIsAddingAmenities((prev) => !prev);
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
        <div className="p-4 bg-gray-50 rounded-lg shadow-sm mb-6">
          <h3 className="text-lg font-bold text-nextsetAccent mb-4">
            Amenities
          </h3>
          <div className="relative mb-4">
            {/* Plus Button - Only Visible When Form is Hidden */}
            {!isAddingAmenities && (
              <button
                onClick={toggleAddingAmenities}
                className="absolute left-4 top-4 z-20 bg-nextsetAccent text-white p-2 rounded-full shadow-md hover:bg-nextsetButton transition-transform transform hover:scale-110"
              >
                <Plus size={20} />
              </button>
            )}

            {/* Input Container with Reserved Space */}
            <div className="h-16 flex items-center justify-center relative z-10">
              <form
                onSubmit={handleSubmit}
                className={`absolute inset-0 flex items-center gap-2 bg-white shadow-md p-3 rounded-lg border border-gray-300 transform transition-all duration-300 ease-in-out ${
                  isAddingAmenities
                    ? "opacity-100 scale-100"
                    : "opacity-0 scale-95 pointer-events-none"
                }`}
              >
                <input
                  id="amenity"
                  name="amenity"
                  placeholder="Add Amenity"
                  type="text"
                  value={formData.amenity}
                  onChange={handleChange}
                  className="flex-1 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-nextsetAccent transition"
                />
                <button
                  type="submit"
                  className="bg-nextsetAccent text-white px-3 py-2 rounded-lg hover:bg-nextsetButton transition"
                >
                  <Save size={18} />
                </button>
              </form>
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            {currUser.venue.venue_amenities?.map((amenity) => (
              <div
                key={amenity.amenity_id}
                className="flex items-center bg-nextsetAccent text-white rounded-2xl px-4 py-1 shadow-md transition-transform transform hover:scale-105"
              >
                <span className="mr-2 text-sm font-medium">
                  {amenity.amenities?.name}
                </span>
                <button
                  onClick={() =>
                    handleDeleteAmenity(currUser.venue.id, amenity.amenity_id)
                  }
                  className="p-1 hover:bg-white hover:text-nextsetAccent rounded-full transition-colors"
                >
                  <X size={12} />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="flex justify-center space-x-4">
          <button
            className="px-6 py-3 bg-nextsetButton text-white rounded-md hover:bg-nextsetAccent transition"
            onClick={() => navigate("/venue/dashboard")}
          >
            Back to Dashboard
          </button>
          <button
            className="px-6 py-3 bg-nextsetAccent text-white rounded-md hover:bg-nextsetButton transition"
            onClick={() => navigate("/venue/calendar")}
          >
            View Calendar
          </button>
        </div>
      </div>
    </div>
  );
}

export { VenueProfile };
