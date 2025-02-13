import React from "react";
import { useModal } from "../../../contexts/ModalContext";
import { ArtistPitchCard } from "./ArtistPitchCard";

function ArtistCard({ artist }) {
  const { openModal, closeModal } = useModal();

  const handleOpenArtistPreviewModal = () => {
    openModal(
      <ArtistPitchCard artistDetails={artist} closeModal={closeModal} />
    );
  };
  return (
    <li className="p-4 bg-gray-50 rounded-lg shadow-sm hover:shadow-md transition">
      <button
        onClick={handleOpenArtistPreviewModal}
        className="w-full text-left appearance-none focus:outline-none"
      >
        <div className="flex items-center space-x-4">
          <img
            src={artist.spotify_photo}
            alt={artist.name}
            className="w-16 h-16 rounded-full object-cover"
          />
          <div>
            <h2 className="text-xl font-bold text-nextsetPrimary">
              {artist.name}
            </h2>
            <p className="text-gray-600">
              {artist.genre || "Genre not specified"}
            </p>
            <p className="text-sm text-gray-500">
              {artist.hometown_city}, {artist.hometown_state}
            </p>
          </div>
        </div>
      </button>
    </li>
  );
}

export { ArtistCard };
