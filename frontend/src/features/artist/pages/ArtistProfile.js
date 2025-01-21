import React from "react";
import { useUser } from "../../../contexts/UserContext";
import { useNavigate } from "react-router-dom";
import { EditableField } from "../../../shared/components/EditableField";
import { NextSetApi } from "../../../services/api";

function ArtistProfile() {
  const { currUser, setCurrUser } = useUser();
  const navigate = useNavigate();

  const handleFieldSave = async (field, newValue) => {
    try {
      const data = { [field]: newValue };
      const updatedArtist = await NextSetApi.updateArtist(
        currUser.artist,
        data
      );
      setCurrUser({ ...currUser, artist: updatedArtist });
    } catch (e) {
      console.error(e);
    }
  };

  if (!currUser.artist) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <p className="text-xl font-semibold text-gray-600">
          Loading artist profile...
        </p>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-10">
      <div className="w-full max-w-3xl bg-white p-6 rounded-lg shadow-lg">
        {/* Profile Header */}
        <div className="text-center mb-6">
          <img
            src={currUser.artist.spotify_photo}
            alt={currUser.artist.name}
            className="w-36 h-36 rounded-full shadow-md mx-auto mb-4"
          />
          <h1 className="text-3xl font-bold text-nextsetAccent mb-2">
            {currUser.artist.name}
          </h1>
        </div>

        {/* Hometown and Genre Section */}
        <div className="p-4 bg-gray-50 rounded-lg shadow-sm mb-6">
          <h3 className="text-lg font-bold text-nextsetAccent mb-4">
            General Information
          </h3>
          <EditableField
            label="Hometown"
            value={currUser.artist.hometown}
            onSave={(newValue) => handleFieldSave("hometown", newValue)}
          />
          <EditableField
            label="Genre"
            value={currUser.artist.genre}
            onSave={(newValue) => handleFieldSave("genre", newValue)}
          />
        </div>

        <div className="mb-8">
          {/* Contact Section */}
          <div className="p-4 bg-gray-50 rounded-lg shadow-sm mb-6">
            <h3 className="text-lg font-bold text-nextsetAccent mb-4">
              Contact Information
            </h3>
            <EditableField
              label="Manager"
              value={currUser.artist.manager}
              onSave={(newValue) => handleFieldSave("manager", newValue)}
            />
            <EditableField
              label="Booking Agent"
              value={currUser.artist.tour_booking_agent}
              onSave={(newValue) =>
                handleFieldSave("tour_booking_agent", newValue)
              }
            />
            <EditableField
              label="Artist Email"
              value={currUser.artist.email || currUser.email}
              onSave={(newValue) => handleFieldSave("email", newValue)}
            />
            <EditableField
              label="Phone"
              value={currUser.artist.phone}
              onSave={(newValue) => handleFieldSave("phone", newValue)}
            />
          </div>

          {/* Social Links Section */}
          <div className="p-4 bg-gray-50 rounded-lg shadow-sm mb-6">
            <h3 className="text-lg font-bold text-nextsetAccent mb-4">
              Social Links
            </h3>
            <EditableField
              label="Instagram"
              value={currUser.artist.instagram_handle}
              onSave={(newValue) =>
                handleFieldSave("instagram_handle", newValue)
              }
              link={true}
            />
            <EditableField
              label="X"
              value={currUser.artist.x_handle}
              onSave={(newValue) => handleFieldSave("x_handle", newValue)}
              link={true}
            />
            <EditableField
              label="Facebook URL"
              value={currUser.artist.facebook_url}
              onSave={(newValue) => handleFieldSave("facebook_url", newValue)}
              link={true}
            />
            <EditableField
              label="Spotify Profile"
              value={currUser.artist.spotify_url}
              onSave={(newValue) => handleFieldSave("spotify_url", newValue)}
              link={true}
            />
          </div>
        </div>

        {/* Quick Actions */}
        <div className="flex justify-center space-x-4">
          <button
            className="px-6 py-3 bg-nextsetButton text-white rounded-md hover:bg-nextsetAccent transition"
            onClick={() => navigate("/artist/home")}
          >
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );
}

export { ArtistProfile };
