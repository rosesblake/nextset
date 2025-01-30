import React, { useState } from "react";
import { useUser } from "../../../contexts/UserContext";
import { useForm } from "../../../hooks/useForm";
import { NextSetApi } from "../../../services/api";
import { Link } from "react-router-dom";
import { useMessage } from "../../../contexts/MessageContext";
import { ErrorDisplay } from "../../../shared/forms/ErrorDisplay";

const PitchConfirmationModal = ({ pitch, closeModal }) => {
  const { currUser, setCurrUser } = useUser();
  const { showMessage } = useMessage();
  const [errorMessage, setErrorMessage] = useState([]);

  const initialState = {
    status: "confirmed",
    w9: false,
    rider: false,
    stage_plot: false,
    epk: false,
  };

  const { formData, handleChange, handleSubmit } = useForm(
    initialState,
    async (data) => {
      try {
        const payload = { status: data.status };

        // Add selected documents to the payload
        Object.entries(data).forEach(([key, value]) => {
          if (value && currUser.artist[key]) {
            payload[key] = currUser.artist[key];
          }
        });
        await NextSetApi.confirmPitch(pitch.pitch_id, {
          data: payload,
        });
        //update user context so that the change is instantanious
        setCurrUser((prevUser) => ({
          ...prevUser,
          artist: {
            ...prevUser.artist,
            artist_pitches: prevUser.artist.artist_pitches.map((p) =>
              p.pitch_id === pitch.pitch_id
                ? { ...p, pitches: { ...p.pitches, status: "confirmed" } }
                : p
            ),
          },
        }));
        closeModal();
        showMessage("Booking Confirmed", "success");
      } catch (e) {
        setErrorMessage([{ msg: e.message }]);
      }
    }
  );

  const documents = {
    w9: currUser.artist.w9,
    rider: currUser.artist.rider,
    stage_plot: currUser.artist.stage_plot,
    epk: currUser.artist.epk,
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-lg w-full relative">
        {/* Close Button */}
        <button
          onClick={closeModal}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-2xl font-bold"
        >
          ✕
        </button>
        {/* Artist Photo */}
        {currUser.artist.photo && (
          <div className="flex justify-center mb-6">
            <img
              src={currUser.artist.photo}
              alt={`${currUser.artist.name}`}
              className="w-28 h-28 rounded-full object-cover border-4 border-nextsetPrimary"
            />
          </div>
        )}
        {/* Header */}
        <h2 className="text-3xl font-bold text-center text-nextsetAccent mb-4">
          Pitch Confirmation
        </h2>
        <p className="text-center text-gray-600 mb-6">
          You've been accepted to play at{" "}
          <span className="font-semibold text-nextsetButton">
            {pitch.pitches.venues.name}
          </span>{" "}
          in {pitch.pitches.venues.city}, {pitch.pitches.venues.state}! Let’s
          confirm your details:
        </p>
        {/* Artist Details */}
        <div className="mb-6 text-center">
          <h3 className="text-xl font-semibold text-nextsetAccent">
            {currUser.artist.name}
          </h3>
          <p className="text-gray-600">{pitch.pitches.role}</p>
          <p className="text-gray-600">{pitch.pitches.content}</p>
          <div className="text-gray-600 font-bold">
            Support:{" "}
            <ul className="font-medium">
              {pitch.pitches.support_acts.map((act) => {
                return (
                  <li key={act.spotify_id}>
                    <a
                      href={act.spotify_url}
                      rel="noopener noreferrer"
                      target="_blank"
                    >
                      {act.name}
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
        {/* Document Selection */}
        <form onSubmit={handleSubmit}>
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-nextsetAccent mb-4">
              Select Documents to Send:
            </h3>
            <ul className="list-none space-y-3">
              {Object.entries(documents).map(([key, url]) =>
                url ? (
                  <li key={key} className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      name={key}
                      checked={formData[key]}
                      onChange={handleChange}
                      className="form-checkbox h-6 w-6 text-nextsetAccent"
                    />
                    <a
                      href={url}
                      className="text-nextsetButton font-medium underline"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {key.replace("_", " ").toUpperCase()}
                    </a>
                  </li>
                ) : (
                  <Link to="/artist/profile" onClick={closeModal}>
                    <li key={key} className="text-gray-500 italic">
                      Upload {key.replace("_", " ").toUpperCase()}
                      <span className="text-red-500">*</span>
                    </li>
                  </Link>
                )
              )}
            </ul>
          </div>
          <ErrorDisplay errors={errorMessage} />
          {/* Submit Button */}
          <div className="flex justify-center">
            <button
              type="submit"
              className="px-6 py-2 bg-nextsetAccent text-white rounded-md hover:bg-nextsetPrimary shadow-lg transition"
            >
              Confirm & Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export { PitchConfirmationModal };
