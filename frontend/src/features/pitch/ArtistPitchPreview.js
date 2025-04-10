import React from "react";
import { ArtistPitchCard } from "../venue/components/ArtistPitchCard";
import { useUser } from "../../contexts/UserContext";
import { PitchModal } from "./PitchModal";

function ArtistPitchPreview({
  closeModal,
  handleSubmit,
  formData,
  startDate,
  endDate,
  openModal,
  onSubmit,
  venue,
}) {
  const { currUser } = useUser();

  const pitch = {
    content: formData.content,
    start_date: startDate,
    end_date: endDate,
    id: currUser.artist.id,
    support_acts: formData.support_acts,
    artist_pitches: [{ artists: currUser.artist }],
  };

  const handleGoBack = () => {
    openModal(
      <PitchModal
        venue={venue}
        artist={currUser.artist}
        onSubmit={onSubmit}
        openModal={openModal}
        closeModal={closeModal}
      />
    );
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
      <div className="bg-white p-4 rounded-xl shadow-2xl w-full max-w-2xl relative overflow-hidden transform transition-all scale-100 max-w-xl max-h-[95vh] overflow-y-auto">
        <button
          onClick={closeModal}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-2xl font-bold transition"
        >
          ✕
        </button>

        <h2 className="text-2xl font-bold text-nextsetAccent text-center mb-4">
          Pitch Preview
        </h2>

        <div className="bg-gray-100 rounded-lg shadow-sm p-4">
          <ArtistPitchCard pitch={pitch} preview closeModal={closeModal} />
        </div>

        <div className="mt-6 flex justify-center space-x-4">
          <button
            type="button"
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
            onClick={handleGoBack}
          >
            Go Back
          </button>
          <button
            type="submit"
            onClick={handleSubmit}
            className="px-4 py-2 bg-nextsetAccent text-white rounded hover:bg-nextsetButton"
          >
            Confirm & Submit
          </button>
        </div>
      </div>
    </div>
  );
}

export { ArtistPitchPreview };
