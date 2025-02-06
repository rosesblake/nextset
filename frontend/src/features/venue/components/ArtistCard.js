import React from "react";

function ArtistCard({ artist }) {
  return (
    <li className="p-4 bg-gray-50 rounded-lg shadow-sm hover:shadow-md transition">
      <div className="flex items-center space-x-4">
        <img
          src={artist.spotify_photo || "default-profile.jpg"}
          alt={artist.name}
          className="w-16 h-16 rounded-full"
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
    </li>
  );
}

export { ArtistCard };
