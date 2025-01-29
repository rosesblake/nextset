import React, { useState } from "react";
import { useForm } from "../../../hooks/useForm";
import DatePicker from "react-date-picker";
import { SpotifyDropdown } from "../../auth/components/SpotifyDropdown"; // Reuse the dropdown component
import { NextSetApi } from "../../../services/api";

function PitchModal({ venue, artist, onSubmit }) {
  const initialState = {
    content: "",
    support_acts: [], // Store selected support acts as an array
    role: "Headliner",
  };

  const { formData, handleChange, handleSubmit } = useForm(
    initialState,
    (data) => {
      const pitchData = {
        venue_id: venue.id,
        date,
        artist_id: artist.id,
        ...data,
        support_acts: formData.support_acts.map((act) => ({
          name: act.name,
          spotify_id: act.id,
          spotify_url: act.spotify_url,
        })),
      };
      onSubmit(pitchData);
    }
  );

  const [date, setDate] = useState(null);
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const [spotifyResults, setSpotifyResults] = useState([]);

  const handleDateChange = (newDate) => {
    setDate(newDate);
    setIsDatePickerOpen(false); // Close the DatePicker when a date is selected
  };

  const handleDatePickerToggle = () => {
    setIsDatePickerOpen((prev) => !prev);
  };

  const handleSearch = async (value) => {
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

  const handleAddSupportAct = (artist) => {
    if (!formData.support_acts.some((act) => act.id === artist.id)) {
      handleChange({
        target: {
          name: "support_acts",
          value: [...formData.support_acts, artist],
        },
      });
    }
  };

  const handleRemoveSupportAct = (artistId) => {
    handleChange({
      target: {
        name: "support_acts",
        value: formData.support_acts.filter((act) => act.id !== artistId),
      },
    });
  };

  const toggleRole = () => {
    handleChange({
      target: {
        name: "role",
        value: formData.role === "Headliner" ? "Support" : "Headliner",
      },
    });
  };

  return (
    <div>
      <h2 className="text-xl font-bold text-nextsetAccent">Pitch to Venue</h2>
      <p className="text-gray-700 mb-4">{`${venue.name} - ${venue.city}, ${venue.state}`}</p>
      {/* Role */}
      <div className="mb-4">
        <label className="block text-nextsetPrimary font-semibold mb-2">
          Role
        </label>
        <div className="flex items-center">
          <span className="mr-2">Headliner</span>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              className="sr-only peer"
              checked={formData.role === "Support"}
              onChange={toggleRole}
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:bg-nextsetAccent peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
          </label>
          <span className="ml-2">Support</span>
        </div>
      </div>
      <form onSubmit={handleSubmit}>
        {/* Date Picker */}
        <div className="mb-4">
          <label className="block text-nextsetPrimary font-semibold mb-2">
            Select a Date
          </label>
          <button
            type="button"
            className="w-full border rounded-md p-2 text-left bg-gray-100"
            onClick={handleDatePickerToggle}
          >
            {date ? new Date(date).toLocaleDateString() : "Select a date"}
          </button>
          {isDatePickerOpen && (
            <DatePicker
              value={date}
              onChange={handleDateChange}
              minDate={new Date()}
              tileDisabled={({ date }) =>
                venue.blocked_dates?.some(
                  (blockedDate) =>
                    new Date(blockedDate).toDateString() === date.toDateString()
                )
              }
              className="mt-2 w-full border rounded-md"
            />
          )}
        </div>

        {/* Event Description */}
        <label className="block text-nextsetPrimary font-semibold mb-2">
          Event Description
        </label>
        <input
          type="text"
          name="content"
          value={formData.content}
          onChange={handleChange}
          placeholder="Describe your event..."
          className="w-full border rounded-md p-2 mb-4"
        ></input>

        {/* Support Acts Search */}
        <div className="mb-4">
          <label className="block text-nextsetPrimary font-semibold mb-2">
            Add Support Acts
          </label>
          <input
            type="text"
            placeholder="Search artists on Spotify"
            className="w-full border rounded-md p-2"
            onChange={(e) => handleSearch(e.target.value)}
          />
          <SpotifyDropdown
            results={spotifyResults}
            onSelect={(artist) => {
              handleAddSupportAct(artist);
              setSpotifyResults([]); // Clear search results after selection
            }}
          />
          <ul className="mt-2">
            {formData.support_acts.map((act) => (
              <li
                key={act.id}
                className="flex items-center justify-between bg-gray-100 p-2 rounded-md mb-2"
              >
                <span className="font-semibold text-nextsetPrimary">
                  {act.name}
                </span>
                <a
                  href={act.spotify_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-nextsetAccent"
                >
                  View on Spotify
                </a>
                <button
                  type="button"
                  className="text-red-500 hover:text-red-700 ml-4 text-sm"
                  onClick={() => handleRemoveSupportAct(act.id)}
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-6 flex justify-end space-x-4">
          <button
            type="button"
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
            onClick={() => onSubmit(null)}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-nextsetAccent text-white rounded hover:bg-nextsetButton"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

export { PitchModal };
