import React, { useState, useEffect } from "react";
import { useUser } from "../../../contexts/UserContext";
import { EditableField } from "../../../shared/components/EditableField";
import { NextSetApi } from "../../../services/api";
import { FileUploadField } from "../../../shared/components/FileUploadField";

function ArtistProfile() {
  const { currUser, setCurrUser } = useUser();
  const [files, setFiles] = useState({
    epk: null,
    w9: null,
    rider: null,
    stage_plot: null,
  });

  // Fetch artist data on component mount
  useEffect(() => {
    const fetchArtistData = async () => {
      try {
        const artist = await NextSetApi.getArtist(currUser.artist.id);
        setFiles({
          epk: artist.epk || null,
          w9: artist.w9 || null,
          rider: artist.rider || null,
          stage_plot: artist.stage_plot || null,
        });
        setCurrUser((prev) => ({ ...prev, artist })); // Update user context
      } catch (e) {
        console.error("Error fetching artist data:", e);
      }
    };

    fetchArtistData();
  }, [currUser.artist.id, setCurrUser]);

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

  const handleFileUpload = async (fileType, file) => {
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await NextSetApi.uploadArtistFile(
        currUser.artist.id,
        fileType,
        formData
      );

      // Update the file URL in state
      setFiles((prevFiles) => ({
        ...prevFiles,
        [fileType]: response.url,
      }));
      setCurrUser({ ...currUser, artist: response.artist });
    } catch (e) {
      console.error(
        `Error uploading ${fileType}:`,
        e.response?.data?.error || e.message
      );
    }
  };

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
          <EditableField
            label="Bio"
            value={currUser.artist.bio}
            onSave={(newValue) => handleFieldSave("bio", newValue)}
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
            <EditableField
              label="Website"
              value={currUser.artist.website}
              onSave={(newValue) => handleFieldSave("website", newValue)}
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
            <EditableField
              label="Live Video"
              value={currUser.artist.live_show_url}
              onSave={(newValue) => handleFieldSave("live_show_url", newValue)}
              link={true}
            />
          </div>
        </div>

        {/* Upload Files Section */}
        <div className="p-4 bg-gray-50 rounded-lg shadow-sm mb-6">
          <h3 className="text-lg font-bold text-nextsetAccent mb-4">
            Upload Files
          </h3>
          <div className="space-y-4">
            <FileUploadField
              label="Electronic Press Kit (EPK)"
              onUpload={(file) => handleFileUpload("epk", file)}
              currentFileUrl={files.epk}
            />
            <FileUploadField
              label="W-9"
              onUpload={(file) => handleFileUpload("w9", file)}
              currentFileUrl={files.w9}
            />
            <FileUploadField
              label="Rider"
              onUpload={(file) => handleFileUpload("rider", file)}
              currentFileUrl={files.rider}
            />
            <FileUploadField
              label="Stage Plot"
              onUpload={(file) => handleFileUpload("stage_plot", file)}
              currentFileUrl={files.stage_plot}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export { ArtistProfile };
