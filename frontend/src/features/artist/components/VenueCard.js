import React from "react";
import { Link } from "react-router-dom";
import { useModal } from "../../../contexts/ModalContext";
import { useMessage } from "../../../contexts/MessageContext";
import { useUser } from "../../../contexts/UserContext";
import { PitchModal } from "../../pitch/PitchModal";
import { NextSetApi } from "../../../services/api";
import { useLoading } from "../../../contexts/LoadingContext";

function VenueCard({ venue, artist, hasPendingPitch }) {
  const { openModal, closeModal } = useModal();
  const { showMessage } = useMessage();
  const { currUser, setCurrUser } = useUser();
  const { setIsLoading } = useLoading();

  const handleSubmitPitch = async (pitchData) => {
    closeModal();
    try {
      setIsLoading(true);
      await NextSetApi.sendPitch({
        ...pitchData,
        date: new Date(pitchData.date).toISOString(),
      });

      const updatedArtist = await NextSetApi.getArtist(artist.id);
      setCurrUser({ ...currUser, artist: updatedArtist });
    } catch (e) {
      console.error(e);
      closeModal();
      showMessage(e.message, "error");
    } finally {
      setIsLoading(false);
      showMessage("Submission successful!", "success");
    }
  };

  const handleOpenPitchModal = () => {
    openModal(
      <PitchModal
        venue={venue}
        artist={currUser.artist}
        onSubmit={handleSubmitPitch}
        openModal={openModal}
        closeModal={closeModal}
        showMessage={showMessage}
      />
    );
  };

  return (
    <div className="p-4 bg-gray-50 rounded-lg shadow-sm hover:shadow-md transition">
      <div className="flex justify-between items-center">
        <Link to={`/artist/venue/${venue.id}`} className="flex-grow">
          <div>
            <h3 className="text-lg font-bold text-nextsetAccent">
              {venue.name}
            </h3>
            <p className="text-sm text-gray-500">
              {venue.city}, {venue.state}
            </p>
            <p className="text-sm font-medium text-gray-600">
              <span className="text-nextsetButton font-semibold">
                Capacity:
              </span>{" "}
              {venue.capacity || "N/A"}
            </p>
          </div>
        </Link>
        {!hasPendingPitch ? (
          <button
            className="px-4 py-2 bg-nextsetButton text-white rounded-md hover:bg-nextsetAccent transition"
            onClick={handleOpenPitchModal}
          >
            Pitch
          </button>
        ) : (
          <p className="px-4 py-2 bg-nextsetButton text-white rounded-md hover:bg-nextsetAccent transition">
            Pitched
          </p>
        )}
      </div>
    </div>
  );
}

export { VenueCard };
