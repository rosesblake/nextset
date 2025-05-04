import React, { useEffect, useMemo, useState } from "react";
import { useForm } from "../../hooks/useForm";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { isSameDay } from "date-fns";
import { SpotifyDropdown } from "../auth/components/SpotifyDropdown";
import { NextSetApi } from "../../services/api";
import { ArtistPitchPreview } from "./ArtistPitchPreview";
import { Trash2 } from "lucide-react";
import { useUser } from "../../contexts/UserContext";
import { useNavigate } from "react-router-dom";
import { useHandleSubmitPitch } from "../../hooks/useHandleSubmitPitch";
import { useModal } from "../../contexts/ModalContext";
import { useMessage } from "../../contexts/MessageContext";

// Helpers
function formatDateRangeLabel(range) {
  if (!range?.from) return "Select a date range";
  const fromDate = range.from.toLocaleDateString();
  const toDate =
    range.to && !isSameDay(range.from, range.to)
      ? range.to.toLocaleDateString()
      : null;
  return toDate ? `${fromDate} – ${toDate}` : fromDate;
}

function isDateBlocked(date, blockedDates) {
  return blockedDates?.some((blocked) => isSameDay(date, new Date(blocked)));
}

function handleRangeSelect(selectedRange, setRange) {
  if (!selectedRange) {
    setRange({ from: undefined, to: undefined });
  } else if (selectedRange.from && !selectedRange.to) {
    setRange({ from: selectedRange.from, to: selectedRange.from });
  } else {
    setRange(selectedRange);
  }
}

function PitchModal({ venue }) {
  const { currUser } = useUser();
  const { openModal, closeModal } = useModal();
  const { showMessage } = useMessage();
  const navigate = useNavigate();

  const artist = currUser.artist;
  const onSubmit = useHandleSubmitPitch();

  const [range, setRange] = useState({ from: undefined, to: undefined });
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [spotifyResults, setSpotifyResults] = useState([]);

  const requiredProfileFields = useMemo(() => ["bio", "genre", "name"], []);

  const initialState = {
    content: "",
    support_acts: [],
    role: "Headliner",
  };

  const { formData, handleChange, handleSubmit } = useForm(
    initialState,
    (data) => {
      const pitchData = {
        venue_id: venue.id,
        artist_id: artist.id,
        start_date: range?.from ?? null,
        end_date: range?.to ?? range?.from ?? null,
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

  useEffect(() => {
    const missing = requiredProfileFields.filter((key) => !artist[key]);
    if (missing.length > 0) {
      closeModal();
      navigate(`/artist/profile?highlight=${missing.join(",")}`, {
        replace: true,
      });
      showMessage(
        `Please update profile [${missing.join(", ")}] then try again`,
        "error"
      );
    }
  }, [
    currUser,
    requiredProfileFields,
    artist,
    closeModal,
    navigate,
    showMessage,
  ]);

  const handleDatePickerToggle = () => {
    setIsDatePickerOpen((prev) => !prev);
  };

  const handleSearch = async (value) => {
    setSearchInput(value);
    if (!value) return setSpotifyResults([]);
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
    setSearchInput("");
    setSpotifyResults([]);
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

  const handlePitchPreviewModal = (e) => {
    e.preventDefault();
    if (!formData.content || !range.from) {
      return showMessage("Please fill out all required fields", "error");
    }
    if (formData.content.length > 20) {
      return showMessage("Description must be 20 characters or less.", "error");
    }
    closeModal();
    openModal(
      <ArtistPitchPreview
        closeModal={closeModal}
        openModal={openModal}
        handleSubmit={handleSubmit}
        formData={formData}
        startDate={range.from}
        endDate={range.to}
        onSubmit={onSubmit}
        venue={venue}
      />
    );
  };

  const handleBack = () => {
    localStorage.setItem("justLoggedIn", "true");
    closeModal();
  };

  return (
    <div className="w-[400px] min-w-[400px] max-w-lg max-h-[75vh] overflow-y-auto">
      <h2 className="text-xl font-bold text-nextsetAccent">Pitch to Venue</h2>
      <p className="text-gray-700 mb-4">{`${venue.name} - ${venue.city}, ${venue.state}`}</p>

      {/* Role Toggle */}
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
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:bg-nextsetAccent peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all" />
          </label>
          <span className="ml-2">Support</span>
        </div>
      </div>

      <form onSubmit={handlePitchPreviewModal}>
        {/* Date Range Picker */}
        <div className="mb-4">
          <label className="block text-nextsetPrimary font-semibold mb-2">
            Select a Date Range
          </label>
          <button
            type="button"
            className="w-full border rounded-md p-2 text-left bg-gray-100"
            onClick={handleDatePickerToggle}
          >
            {formatDateRangeLabel(range)}
          </button>

          {isDatePickerOpen && (
            <div className="mt-2 border rounded-md bg-white z-10">
              <DayPicker
                mode="range"
                selected={range}
                onSelect={(r) => handleRangeSelect(r, setRange)}
                disabled={(date) => isDateBlocked(date, venue.blocked_dates)}
                className="p-4"
              />
            </div>
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
        />

        {/* Support Acts */}
        <div className="mb-4 relative z-20">
          <label className="block text-nextsetPrimary font-semibold mb-2">
            Add Support Acts
          </label>
          <input
            type="text"
            placeholder="Search artists on Spotify"
            className="w-full border rounded-md p-2"
            value={searchInput}
            onChange={(e) => handleSearch(e.target.value)}
          />
          <SpotifyDropdown
            results={spotifyResults}
            onSelect={(artist) => {
              handleAddSupportAct(artist);
              setSpotifyResults([]);
            }}
          />
          <ul className="mt-2">
            {formData.support_acts.map((act) => (
              <li
                key={act.id}
                className="flex items-center justify-between bg-gray-100 p-2 rounded-md mb-2"
              >
                <a
                  href={act.spotify_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-row"
                >
                  <img
                    src="/images/spotify_icon.svg"
                    className="w-5 mr-2 object-cover"
                    alt="Spotify"
                  />
                  <span className="font-semibold text-nextsetPrimary">
                    {act.name}
                  </span>
                </a>
                <button
                  type="button"
                  className="text-red-700"
                  onClick={() => handleRemoveSupportAct(act.id)}
                >
                  <Trash2 size={20} />
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Footer Buttons */}
        <div className="mt-6 flex justify-end space-x-4">
          <button
            type="button"
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
            onClick={handleBack}
          >
            Back
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-nextsetAccent text-white rounded hover:bg-nextsetButton"
          >
            Review
          </button>
        </div>
      </form>
    </div>
  );
}

export { PitchModal };
