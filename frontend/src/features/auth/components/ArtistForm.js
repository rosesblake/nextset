import React, { useState } from "react";
import { FormWrapper } from "../../../shared/forms/FormWrapper";
import { SpotifyDropdown } from "./SpotifyDropdown";
import { SharedFields } from "../../../shared/forms/SharedFields";
import { InputField } from "../../../shared/forms/InputField";
import { useForm } from "../../../hooks/useForm";
import { NextSetApi } from "../../../services/api";

function ArtistForm({ onSubmit }) {
  const [spotifyResults, setSpotifyResults] = useState([]);
  const [artistSpotify, setArtistSpotify] = useState(null);

  const { formData, handleChange, handleSubmit } = useForm(
    {
      artist_name: "",
      hometown: "",
      full_name: "",
      email: "",
      password: "",
    },
    (data) => {
      onSubmit({
        ...data,
        spotify_id: artistSpotify?.id,
        spotify_photo: artistSpotify?.photo || "",
        spotify_url: artistSpotify?.spotify_url || "",
        spotify_popularity: artistSpotify?.popularity || 0,
        spotify_followers: artistSpotify?.followers || 0,
      });
    }
  );

  const handleSearch = async (value) => {
    if (value !== formData.artist_name) {
      setArtistSpotify(null);
    }

    handleChange({ target: { name: "artist_name", value } });
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
    handleChange({ target: { name: "artist_name", value: artist.name } });
  };
  return (
    <FormWrapper title="Register as Artist" handleSubmit={handleSubmit}>
      <InputField
        id="artist_name"
        name="artist_name"
        placeholder="Artist Name"
        value={formData.artist_name}
        onChange={(e) => handleSearch(e.target.value)}
        autocomplete={"off"}
      />
      <div className="relative w-full">
        <SpotifyDropdown
          results={spotifyResults}
          onSelect={handleArtistSelect}
        />
      </div>
      <InputField
        id="hometown"
        name="hometown"
        placeholder="City, State"
        value={formData.hometown}
        onChange={handleChange}
      />
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
