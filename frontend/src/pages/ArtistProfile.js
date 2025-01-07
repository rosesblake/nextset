import React from "react";
import { useArtist } from "../components/ArtistContext";
import { useUser } from "../components/UserContext";
import { useNavigate } from "react-router-dom";
import { EditableField } from "../components/EditableField";
import { NextSetApi } from "../api/api";

function ArtistProfile() {
  const { currUser } = useUser();
  const { artist, setArtist } = useArtist();
  const navigate = useNavigate();

  const handleFieldSave = async (field, newValue) => {
    try {
      const data = { [field]: newValue };
      const updatedArtist = await NextSetApi.updateArtist(artist, data);
      setArtist(updatedArtist.artist);
      console.log(`Updated ${field}:`, updatedArtist);
    } catch (e) {
      console.error(e);
    }
  };

  if (!artist) {
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
            src={artist.spotify_photo || "/default-profile.png"}
            alt={artist.name}
            className="w-36 h-36 rounded-full shadow-md mx-auto mb-4"
          />
          <h1 className="text-3xl font-bold text-nextsetAccent mb-2">
            {artist.name}
          </h1>
        </div>

        {/* Hometown and Genre Section */}
        <div className="p-4 bg-gray-50 rounded-lg shadow-sm mb-6">
          <h3 className="text-lg font-bold text-nextsetAccent mb-4">
            General Information
          </h3>
          <EditableField
            label="Hometown"
            value={artist.hometown}
            onSave={(newValue) => handleFieldSave("hometown", newValue)}
          />
          <EditableField
            label="Genre"
            value={artist.genre}
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
              value={artist.manager}
              onSave={(newValue) => handleFieldSave("manager", newValue)}
            />
            <EditableField
              label="Booking Agent"
              value={artist.tour_booking_agent}
              onSave={(newValue) =>
                handleFieldSave("tour_booking_agent", newValue)
              }
            />
            <EditableField
              label="Email"
              value={artist.email || currUser.email}
              onSave={(newValue) => handleFieldSave("email", newValue)}
            />
            <EditableField
              label="Phone"
              value={artist.phone}
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
              value={artist.instagram_handle}
              onSave={(newValue) =>
                handleFieldSave("instagram_handle", newValue)
              }
            />
            <EditableField
              label="X Handle"
              value={artist.x_handle}
              onSave={(newValue) => handleFieldSave("x_handle", newValue)}
            />
            <EditableField
              label="Facebook URL"
              value={artist.facebook_url}
              onSave={(newValue) => handleFieldSave("facebook_url", newValue)}
            />
            <EditableField
              label="Spotify Profile"
              value={artist.spotify_url}
              onSave={(newValue) => handleFieldSave("spotify_url", newValue)}
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
