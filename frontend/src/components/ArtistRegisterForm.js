import React, { useState, useEffect } from "react";
import { useForm } from "../hooks/useForm";
import { InputField } from "./InputField";
import { FormWrapper } from "../components/FormWrapper";
import { NextSetApi } from "../api/api";

const ArtistRegisterForm = ({ addArtist }) => {
  const INITIAL_STATE = {
    name: "",
    hometown: "",
  };

  const [spotifyResults, setSpotifyResults] = useState([]);
  const [error, setError] = useState(null);
  const [typingTimeout, setTypingTimeout] = useState(null); // Track typing timeout

  const { formData, handleChange, handleSubmit } = useForm(
    INITIAL_STATE,
    (data) => {
      addArtist(data);
    }
  );

  useEffect(() => {
    console.log("Updated spotifyResults:", spotifyResults);
  }, [spotifyResults]);

  const handleNameChange = async (e) => {
    const { value } = e.target;
    handleChange(e); // Update formData with user input

    // Clear the previous timeout to avoid unnecessary requests
    if (typingTimeout) {
      clearTimeout(typingTimeout);
    }

    // Set a new timeout to trigger the API request after 300ms
    const newTimeout = setTimeout(async () => {
      if (value) {
        try {
          const res = await NextSetApi.searchSpotifyArtist(value);
          if (res && res.artists) {
            setSpotifyResults(res.artists); // Update results
            console.log("Spotify results:", res.artists); // Debug log
          } else {
            setSpotifyResults([]);
          }
        } catch (err) {
          console.error("Error searching Spotify:", err);
          setError("Failed to search for artist");
        }
      } else {
        setSpotifyResults([]); // Clear results if input is empty
      }
    }, 200); // delay after the user stops typing

    setTypingTimeout(newTimeout); // Store the timeout ID to clear it on the next keystroke
  };

  const handleArtistSelect = (artist) => {
    setSpotifyResults([]); // Clear the dropdown
    handleChange({ target: { name: "name", value: artist.name } }); // Update formData with selected artist
  };

  const handleBlur = () => {
    setSpotifyResults([]); // Clear results when input loses focus
  };

  // Limit results to the first 5 artists
  const limitedResults = spotifyResults.slice(0, 5);

  return (
    <FormWrapper title="Artist Details" handleSubmit={handleSubmit}>
      <div className="relative">
        <InputField
          id="name"
          name="name"
          placeholder="Artist Name"
          value={formData.name}
          onChange={handleNameChange} // Call the new handleNameChange
          onBlur={handleBlur}
        />
        {error && <div className="text-red-500">{error}</div>}

        {/* Dropdown results */}
        {limitedResults.length > 0 && (
          <ul
            className="space-y-2 mt-2 border border-gray-300 rounded-md absolute bg-white shadow-lg w-full z-10"
            style={{ maxHeight: "200px", overflowY: "auto", left: 0 }}
          >
            {limitedResults.map((artist) => (
              <li
                key={artist.id}
                className="flex items-center space-x-2 cursor-pointer p-2 hover:bg-gray-200"
                onClick={() => handleArtistSelect(artist)}
              >
                {/* Check if images exist before rendering */}
                <img
                  src={
                    artist.photo && artist.photo.length > 0
                      ? artist.photo
                      : "/default-image.jpg"
                  } // Use a default image if no images exist
                  alt={artist.name}
                  className="w-10 h-10 rounded-full"
                />
                <span>{artist.name}</span>
              </li>
            ))}
          </ul>
        )}
      </div>

      <InputField
        id="hometown"
        name="hometown"
        placeholder="Hometown"
        value={formData.hometown}
        onChange={handleChange}
      />
      <button
        type="submit"
        className="w-full bg-nextsetPrimary text-white font-semibold py-2 px-4 rounded-md shadow-sm hover:bg-nextsetButton focus:outline-none focus:ring-2 focus:ring-nextsetPrimary focus:ring-offset-2"
      >
        Submit
      </button>
    </FormWrapper>
  );
};

export { ArtistRegisterForm };
