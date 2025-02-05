import React, { useState } from "react";
import { useUser } from "../../contexts/UserContext";
import { useForm } from "../../hooks/useForm";
import { NextSetApi } from "../../services/api";
import { Link, useNavigate } from "react-router-dom";
import { useMessage } from "../../contexts/MessageContext";
import { ErrorDisplay } from "../../shared/forms/ErrorDisplay";
import { Asterisk } from "lucide-react";
import { useLoading } from "../../contexts/LoadingContext";

const PitchConfirmationModal = ({ pitch, closeModal }) => {
  const { currUser, setCurrUser } = useUser();
  const { showMessage } = useMessage();
  const [errorMessage, setErrorMessage] = useState([]);
  const navigate = useNavigate();
  const { setIsLoading } = useLoading();

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
        setIsLoading(true);
        // Ensure pitch_required_docs exists to prevent `.map()` error
        const requiredDocsObj = pitch.pitches?.pitch_required_docs || {};

        // Extract required documents, ignoring `id` and `pitch_id`
        const requiredDocs = Object.keys(requiredDocsObj)
          .filter((key) => key.endsWith("_required") && requiredDocsObj[key])
          .map((key) => key.replace("_required", "")); // Convert `w9_required` -> `w9`

        // Find missing required documents
        const missingDocs = requiredDocs.filter((doc) => !data[doc]);

        if (missingDocs.length > 0) {
          setErrorMessage([
            {
              msg: `Missing Required Documents: ${missingDocs
                .map((doc) => doc.toUpperCase())
                .join(", ")}`,
            },
          ]);
          return; // Prevent submission if required docs are missing
        }

        const payload = { status: data.status };

        // Attach selected documents to payload
        Object.entries(data).forEach(([key, value]) => {
          if (value && currUser.artist[key]) {
            payload[key] = currUser.artist[key];
          }
        });

        await NextSetApi.confirmPitch(pitch.pitch_id, { data: payload });

        // Instantly update user context
        setCurrUser((prevUser) => ({
          ...prevUser,
          artist: {
            ...prevUser.artist,
            artist_pitches: prevUser.artist.artist_pitches?.map((p) =>
              p.pitch_id === pitch.pitch_id
                ? { ...p, pitches: { ...p.pitches, status: "confirmed" } }
                : p
            ),
          },
        }));

        closeModal();
      } catch (e) {
        setErrorMessage([{ msg: e.message }]);
      } finally {
        setIsLoading(false);
        navigate("/artist/bookings");
        showMessage("Booking Confirmed", "success");
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
              {pitch.pitches.support_acts.map((act) => (
                <li key={act.spotify_id}>
                  <a
                    href={act.spotify_url}
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    {act.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Document Selection */}
        <form onSubmit={handleSubmit}>
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-nextsetAccent">
              Select Documents to Send:
            </h3>
            <ul className="list-none space-y-3">
              {Object.entries(documents).map(([key, url]) => (
                <li key={key} className="flex items-center space-x-2">
                  {url ? (
                    <>
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
                    </>
                  ) : (
                    <Link
                      to="/artist/profile"
                      onClick={closeModal}
                      className="flex items-center space-x-1 text-gray-500 italic"
                    >
                      <span>Upload {key.replace("_", " ").toUpperCase()}</span>
                    </Link>
                  )}

                  {pitch.pitches?.pitch_required_docs?.[`${key}_required`] && (
                    <span className="text-red-500 flex items-center">
                      <Asterisk size={18} />
                    </span>
                  )}
                </li>
              ))}
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
