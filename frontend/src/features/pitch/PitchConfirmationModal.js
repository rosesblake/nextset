import React, { useState } from "react";
import { useUser } from "../../contexts/UserContext";
import { useForm } from "../../hooks/useForm";
import { NextSetApi } from "../../services/api";
import { Link, useNavigate } from "react-router-dom";
import { useMessage } from "../../contexts/MessageContext";
import { ErrorDisplay } from "../../shared/forms/ErrorDisplay";
import { Asterisk } from "lucide-react";
import { useLoading } from "../../contexts/LoadingContext";
import { formatDate } from "../../utils/formatDate";

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
        const requiredDocsObj = pitch.pitches?.pitch_required_docs || {};

        const requiredDocs = Object.keys(requiredDocsObj)
          .filter((key) => key.endsWith("_required") && requiredDocsObj[key])
          .map((key) => key.replace("_required", ""));

        const missingDocs = requiredDocs.filter((doc) => !data[doc]);

        if (missingDocs.length > 0) {
          setErrorMessage([
            {
              msg: `Missing Required Documents: ${missingDocs
                .map((doc) => doc.toUpperCase())
                .join(", ")}`,
            },
          ]);
          return;
        }

        const payload = {
          status: data.status,
          venueId: pitch.pitches.venue_id,
          date: pitch.pitches.date,
        };

        Object.entries(data).forEach(([key, value]) => {
          if (value && currUser.artist[key]) {
            payload[key] = currUser.artist[key];
          }
        });

        await NextSetApi.confirmPitch(pitch.pitch_id, {
          data: payload,
        });

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

        navigate("/artist/bookings");
        showMessage("Booking Confirmed", "success");
      } catch (e) {
        setErrorMessage([{ msg: e.message }]);
      } finally {
        setIsLoading(false);
      }
    }
  );

  const handleCancelBooking = async (pitch_id) => {
    try {
      setIsLoading(true);

      await NextSetApi.updatePitchStatus(pitch_id, { status: "canceled" });

      setCurrUser((prevUser) => ({
        ...prevUser,
        artist: {
          ...prevUser.artist,
          artist_pitches: prevUser.artist.artist_pitches?.map((p) =>
            p.pitch_id === pitch.pitch_id
              ? { ...p, pitches: { ...p.pitches, status: "canceled" } }
              : p
          ),
        },
      }));

      closeModal();
      showMessage("Booking successfully canceled", "success");
    } catch (e) {
      return console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  const documents = {
    w9: currUser.artist.w9,
    rider: currUser.artist.rider,
    stage_plot: currUser.artist.stage_plot,
    epk: currUser.artist.epk,
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
      <div className="bg-white p-6 rounded-xl shadow-2xl w-full max-w-2xl relative overflow-hidden transform transition-all scale-100">
        <button
          onClick={closeModal}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-2xl font-bold transition"
        >
          ✕
        </button>

        {currUser.artist.photo && (
          <div className="flex justify-center mb-4">
            <img
              src={currUser.artist.photo}
              alt={currUser.artist.name}
              className="w-24 h-24 rounded-full shadow-lg mx-auto object-cover"
            />
          </div>
        )}

        <h2 className="text-2xl font-bold text-nextsetAccent text-center mb-4">
          Pitch Confirmation
        </h2>

        <p className="text-center text-gray-600 mb-4">
          You've been accepted to play at{" "}
          <span className="font-bold text-nextsetButton">
            {pitch.pitches.venues.name}
          </span>{" "}
          in {pitch.pitches.venues.city}, {pitch.pitches.venues.state}{" "}
          <span className="font-bold">{formatDate(pitch.pitches.date)}</span>!
          Confirm your details:
        </p>

        <div className="text-center mb-4">
          <h3 className="text-xl font-semibold text-nextsetAccent">
            {currUser.artist.name}
          </h3>
          <p className="text-gray-600">{pitch.pitches.role}</p>
          <p className="text-gray-600">{pitch.pitches.content}</p>

          <div className="flex justify-center gap-2 mt-2">
            {pitch.pitches.support_acts.map((act) => (
              <a
                key={act.spotify_id}
                href={act.spotify_url}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gray-200 text-gray-700 text-xs font-semibold px-3 py-1 rounded-full hover:bg-nextsetAccent hover:text-white transition"
              >
                {act.name}
              </a>
            ))}
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {Object.entries(documents).map(([key, url]) => (
            <div key={key} className="flex items-center space-x-2">
              {url ? (
                <>
                  <input
                    type="checkbox"
                    name={key}
                    checked={formData[key]}
                    onChange={handleChange}
                    className="form-checkbox h-5 w-5 text-nextsetAccent"
                  />
                  <a
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-gray-200 text-gray-700 text-xs font-semibold px-3 py-1 rounded-full hover:bg-nextsetAccent hover:text-white transition"
                  >
                    {key.replace("_", " ").toUpperCase()}
                  </a>
                </>
              ) : (
                <Link
                  to={`/artist/profile?highlight=${key}`}
                  onClick={closeModal}
                  className="text-gray-500 italic"
                >
                  Upload {key.replace("_", " ").toUpperCase()}
                </Link>
              )}
              {pitch.pitches?.pitch_required_docs?.[`${key}_required`] && (
                <Asterisk size={18} className="text-red-500" />
              )}
            </div>
          ))}

          <ErrorDisplay errors={errorMessage} />

          <div className="flex justify-center space-x-4">
            <button
              type="button"
              onClick={() => handleCancelBooking(pitch.pitch_id)}
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700 shadow-md"
            >
              Decline & Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-nextsetAccent text-white rounded hover:bg-nextsetButton shadow-md"
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
