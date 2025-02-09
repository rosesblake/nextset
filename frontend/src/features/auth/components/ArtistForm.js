import React, { useState } from "react";
import { FormWrapper } from "../../../shared/forms/FormWrapper";
import { SpotifyDropdown } from "./SpotifyDropdown";
import { SharedFields } from "../../../shared/forms/SharedFields";
import { InputField } from "../../../shared/forms/InputField";
import { useForm } from "../../../hooks/useForm";
import { LocationInput } from "../../../utils/LocationInput";
import { NextSetApi } from "../../../services/api";
import { useMessage } from "../../../contexts/MessageContext";

function ArtistForm({ onSubmit }) {
  const [spotifyResults, setSpotifyResults] = useState([]);
  const [artistSpotify, setArtistSpotify] = useState(null);
  const [pendingLocationData, setPendingLocationData] = useState(null);
  const { showMessage } = useMessage();

  const { formData, handleChange, handleSubmit } = useForm(
    {
      name: "",
      full_name: "",
      email: "",
      password: "",
    },
    (data) => {
      if (!pendingLocationData) {
        showMessage(
          "Please select a valid location from the suggestions.",
          "error"
        );
        return;
      }

      onSubmit({
        ...data,
        spotify_id: artistSpotify?.id,
        spotify_photo: artistSpotify?.photo || "",
        spotify_url: artistSpotify?.spotify_url || "",
        spotify_popularity: artistSpotify?.popularity || 0,
        spotify_followers: artistSpotify?.followers || 0,
        pendingLocationData: pendingLocationData,
      });
    }
  );

  const handleSearch = async (value) => {
    if (value !== formData.name) {
      setArtistSpotify(null);
    }

    handleChange({ target: { name: "name", value } });
    if (!value) {
      setSpotifyResults([]);
      return;
    }
    try {
      const res = await NextSetApi.searchSpotifyArtist(value);
      setSpotifyResults(res.artists || []);
    } catch (err) {
      console.error("Error searching Spotify:", err);
    }
  };

  const handleArtistSelect = (artist) => {
    setSpotifyResults([]);
    setArtistSpotify(artist);
    handleChange({ target: { name: "name", value: artist.name } });
  };
  console.log(artistSpotify);
  return (
    <FormWrapper title="Register as Artist" handleSubmit={handleSubmit}>
      <InputField
        id="name"
        name="name"
        placeholder="Artist Name"
        value={formData.name}
        onChange={(e) => handleSearch(e.target.value)}
        autoComplete="off"
      />
      <div className="relative w-full">
        <SpotifyDropdown
          results={spotifyResults}
          onSelect={handleArtistSelect}
        />
      </div>

      <div className="mb-4">
        <label
          htmlFor="hometown"
          className="block text-sm font-medium text-gray-700"
        >
          Hometown
        </label>
        <LocationInput
          id="hometown"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-nextsetButton focus:ring-nextsetButton sm:text-sm"
          value={pendingLocationData?.city || ""}
          onChange={(locationData) => {
            setPendingLocationData(locationData);
          }}
        />
      </div>

      <SharedFields formData={formData} onChange={handleChange} />
      <button
        type="submit"
        className="w-full bg-nextsetPrimary text-white font-semibold py-2 px-4 rounded-md shadow-sm hover:bg-nextsetButton focus:outline-none focus:ring-2 focus:ring-nextsetButton focus:ring-offset-2"
      >
        Register
      </button>
    </FormWrapper>
  );
}

export { ArtistForm };
