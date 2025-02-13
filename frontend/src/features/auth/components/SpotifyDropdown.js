import React from "react";

function SpotifyDropdown({ results, onSelect }) {
  if (!results || results.length === 0) return null;

  return (
    <ul
      className={
        "absolute bg-white border border-gray-300 w-full rounded-md shadow-lg max-h-60 overflow-y-auto z-10"
      }
    >
      {results.map((artist) => (
        <li
          key={artist.id}
          className="p-2 flex items-center hover:bg-gray-200 cursor-pointer"
          onClick={() => onSelect(artist)}
          onBlur={() => onSelect()}
        >
          <img
            src={artist.photo || ""}
            alt={artist.name}
            className="w-10 h-10 rounded-full mr-3 object-cover"
          />
          <span>{artist.name}</span>
        </li>
      ))}
    </ul>
  );
}

export { SpotifyDropdown };
