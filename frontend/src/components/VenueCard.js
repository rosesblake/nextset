import React, { useState } from "react";
import { Link } from "react-router-dom";
import { PitchModal } from "./PitchModal";
import { NextSetApi } from "../api/api";

function VenueCard({ venue, artist }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleSubmitPitch = async (pitchData) => {
    try {
      console.log("Pitch submitted:", pitchData);
      const pitch = await NextSetApi.sendPitch({
        ...pitchData,
        date: new Date(pitchData.date).toISOString(),
      });
      console.log(pitch);
      closeModal();
    } catch (e) {
      closeModal();
    }
  };

  return (
    <div className="p-4 bg-gray-50 rounded-lg shadow-sm hover:shadow-md transition">
      <div className="flex justify-between items-center">
        <Link to={`/venue/${venue.id}`}>
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
        <button
          className="px-4 py-2 bg-nextsetButton text-white rounded-md hover:bg-nextsetAccent transition"
          onClick={openModal}
        >
          Pitch
        </button>
      </div>

      {isModalOpen && (
        <PitchModal
          venue={venue}
          artist={artist}
          onClose={closeModal}
          onSubmit={handleSubmitPitch}
        />
      )}
    </div>
  );
}

export { VenueCard };
