import React, { useState, useEffect } from "react";
import { useUser } from "../../../contexts/UserContext";
import { EditableField } from "../../../shared/components/EditableField";
import { NextSetApi } from "../../../services/api";
import { FileUploadField } from "../../../shared/components/FileUploadField";
import { Spinner } from "../../../shared/components/Spinner";
import { useLoading } from "../../../contexts/LoadingContext";
import { useMessage } from "../../../contexts/MessageContext";
import { useLocation } from "react-router-dom";

function ArtistProfile() {
  const { currUser, setCurrUser } = useUser();
  const { isLoading, setIsLoading } = useLoading();
  const { showMessage } = useMessage();
  const [files, setFiles] = useState({
    epk: null,
    w9: null,
    rider: null,
    stage_plot: null,
  });
  const scrollPositionRef = React.useRef(0);

  // Fetch artist data on component mount
  useEffect(() => {
    const fetchArtistData = async () => {
      try {
        setIsLoading(true);
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
      } finally {
        setIsLoading(false);
      }
    };

    fetchArtistData();
  }, [currUser.artist.id, setCurrUser, setIsLoading]);

  const location = useLocation();

  //highlight missing files
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const highlight = queryParams.get("highlight");

    if (highlight) {
      const highlights = highlight.split(",");

      // Ensuring DOM is ready
      const ensureDomReady = () => {
        setTimeout(() => {
          highlights.forEach((key, index) => {
            const element = document.querySelector(`[data-filetype="${key}"]`);

            if (element) {
              if (index === 0) {
                element.scrollIntoView({ behavior: "smooth", block: "center" });
              }

              element.classList.add(
                "outline",
                "outline-4",
                "outline-red-400",
                "rounded-xl",
                "bg-red-50",
                "shadow-md",
                "shadow-red-400",
                "animate-pulse",
                "transition",
                "duration-500",
                "ease-in-out",
                "p-4"
              );

              setTimeout(() => {
                element.classList.remove(
                  "outline",
                  "outline-4",
                  "outline-red-400",
                  "rounded-xl",
                  "bg-red-50",
                  "shadow-md",
                  "shadow-red-400",
                  "animate-pulse",
                  "transition",
                  "duration-500",
                  "ease-in-out",
                  "p-4"
                );
              }, 5000);
            }
          });
        }, 150); // Increased delay slightly to ensure rendering is complete
      };

      // Trigger after DOM updates
      requestAnimationFrame(ensureDomReady);
    }
  }, [location.search]);

  const handleFieldSave = async (field, newValue) => {
    scrollPositionRef.current = window.scrollY;
    try {
      setIsLoading(true);
      if (field === "hometown" && typeof newValue === "object") {
        const updatedArtist = await NextSetApi.updateArtist(currUser.artist, {
          hometown_city: newValue.city,
          hometown_state: newValue.state,
          hometown_country: newValue.country,
          hometown_lat: newValue.lat,
          hometown_lng: newValue.lng,
        });
        setCurrUser((prev) => ({
          ...prev,
          artist: { ...prev.artist, ...updatedArtist },
        }));
      } else {
        const updatedArtist = await NextSetApi.updateArtist(currUser.artist, {
          [field]: newValue,
        });

        setCurrUser((prev) => ({ ...prev, artist: updatedArtist }));
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
      setTimeout(() => {
        window.scrollTo(0, scrollPositionRef.current);
      }, 0);
    }
  };

  const handleFileUpload = async (fileType, file) => {
    const formData = new FormData();
    formData.append("file", file);

    scrollPositionRef.current = window.scrollY;
    try {
      setIsLoading(true);
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
    } finally {
      setIsLoading(false);
      setTimeout(() => {
        window.scrollTo(0, scrollPositionRef.current);
      }, 0);
    }
  };

  const handleDeleteFile = async (fileType) => {
    scrollPositionRef.current = window.scrollY;

    try {
      setIsLoading(true);
      const res = await NextSetApi.deleteArtistFile(
        currUser.artist.id,
        fileType
      );
      showMessage(res.message, "success");

      // Clear the deleted file from state
      setFiles((prevFiles) => ({
        ...prevFiles,
        [fileType]: null,
      }));

      setCurrUser((prevUser) => ({
        ...prevUser,
        artist: {
          ...prevUser.artist,
          [fileType]: null,
        },
      }));
    } catch (e) {
      console.error("Error deleting file", e.message);
    } finally {
      setIsLoading(false);
      setTimeout(() => {
        window.scrollTo(0, scrollPositionRef.current);
      }, 0);
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
          <img
            src={currUser.artist.spotify_photo}
            alt={currUser.artist.name}
            className="w-36 h-36 rounded-full shadow-md mx-auto mb-4 object-cover"
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
            value={`${currUser.artist.hometown_city}, ${currUser.artist.hometown_state}`}
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
              label=" Record Label"
              value={currUser.artist.record_label}
              onSave={(newValue) => handleFieldSave("record_label", newValue)}
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
              label="Tiktok"
              value={currUser.artist.tiktok}
              onSave={(newValue) => handleFieldSave("tiktok", newValue)}
              link={true}
              png
            />
            <EditableField
              label="Twitter"
              value={currUser.artist.x_handle}
              onSave={(newValue) => handleFieldSave("x_handle", newValue)}
              link={true}
              png
            />
            <EditableField
              label="Facebook"
              value={currUser.artist.facebook_url}
              onSave={(newValue) => handleFieldSave("facebook_url", newValue)}
              link={true}
              png
            />
            <EditableField
              label="spotify"
              value={currUser.artist.spotify_url}
              onSave={(newValue) => handleFieldSave("spotify_url", newValue)}
              link={true}
            />
            <EditableField
              label="apple"
              value={currUser.artist.apple_music_url}
              onSave={(newValue) =>
                handleFieldSave("apple_music_url", newValue)
              }
              link={true}
            />
            <EditableField
              label="youtube"
              value={currUser.artist.live_show_url}
              onSave={(newValue) => handleFieldSave("live_show_url", newValue)}
              link={true}
              png
            />
            <EditableField
              label="soundcloud"
              value={currUser.artist.soundcloud}
              onSave={(newValue) => handleFieldSave("soundcloud", newValue)}
              link={true}
              png
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
              deleteFile={handleDeleteFile}
              fileType="epk"
            />
            <EditableField
              label="epk"
              value={currUser.artist.epk}
              onSave={(newValue) => handleFieldSave("epk", newValue)}
              link={true}
              linkOnly={true}
            />
            <FileUploadField
              label="Rider"
              onUpload={(file) => handleFileUpload("rider", file)}
              currentFileUrl={files.rider}
              deleteFile={handleDeleteFile}
              fileType="rider"
            />
            <EditableField
              label="rider"
              value={currUser.artist.rider}
              onSave={(newValue) => handleFieldSave("rider", newValue)}
              link={true}
              linkOnly={true}
            />
            <FileUploadField
              label="W-9"
              onUpload={(file) => handleFileUpload("w9", file)}
              currentFileUrl={files.w9}
              deleteFile={handleDeleteFile}
              fileType="w9"
            />
            <FileUploadField
              label="Stage Plot"
              onUpload={(file) => handleFileUpload("stage_plot", file)}
              currentFileUrl={files.stage_plot}
              deleteFile={handleDeleteFile}
              fileType="stage_plot"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export { ArtistProfile };
