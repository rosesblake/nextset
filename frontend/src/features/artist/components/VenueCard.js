import React from "react";
import { Link } from "react-router-dom";
import { useModal } from "../../../contexts/ModalContext";
import { PitchModal } from "../../pitch/PitchModal";

function VenueCard({ venue, hasPendingPitch }) {
  const { openModal, closeModal } = useModal();

  const handleOpenPitchModal = () => {
    openModal(<PitchModal venue={venue} />);
  };

  return (
    <div className="p-4 bg-gray-50 rounded-lg shadow-sm hover:shadow-md transition">
      <div className="flex justify-between items-center">
        <Link
          to={`/artist/venue/${venue.id}`}
          className="flex-grow"
          onClick={closeModal}
        >
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
          <p className="px-4 py-2 bg-nextsetAccent opacity-75 text-white rounded-md hover:bg-nextsetAccent transition">
            Pitched
          </p>
        )}
      </div>
    </div>
  );
}

export { VenueCard };
