import { Pencil, Plus, Save } from "lucide-react";
import React, { useState } from "react";
import { LocationInput } from "../../utils/LocationInput";

// Common genres
const commonGenres = [
  "Pop",
  "Rock",
  "Hip Hop",
  "R&B",
  "Jazz",
  "Classical",
  "Country",
  "Electronic",
  "Reggae",
  "Blues",
  "Folk",
  "Metal",
  "Punk",
  "Soul",
  "Funk",
  "Indie",
  "Latin",
  "Gospel",
  "Alternative",
  "EDM",
];

function EditableField({ label, value, onSave, link, linkOnly, png }) {
  const [isEditing, setIsEditing] = useState(false);
  const [inputValue, setInputValue] = useState(value || "");
  const [pendingLocationData, setPendingLocationData] = useState(null);

  const handleSave = () => {
    if (label === "Hometown" && pendingLocationData) {
      onSave(pendingLocationData);
    } else if (
      label === "Hometown" &&
      !pendingLocationData &&
      inputValue.trim()
    ) {
      onSave({ city: inputValue }); // Fallback if no location data selected
    } else if (inputValue.trim() !== value) {
      onSave(inputValue); // Handle text or genre input
    }
    setIsEditing(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSave();
    }
  };

  return (
    <div
      className="flex justify-between items-center mb-2"
      data-filetype={label.toLowerCase()}
    >
      <div className="flex items-center space-x-2">
        {label && !link && (
          <span className="text-nextsetButton font-bold">{label}:</span>
        )}
        {!link ? (
          <span>{value}</span>
        ) : (
          <a
            href={value}
            className="text-nextsetAccent flex flex-row"
            target="_blank"
            rel="noopener noreferrer"
          >
            {!linkOnly && (
              <img
                src={
                  png
                    ? `/images/${label.toLowerCase()}_icon.png`
                    : `/images/${label.toLowerCase()}_icon.svg`
                }
                alt={label}
                className="w-8 h-8 mr-4"
              />
            )}
            <span>{value}</span>
          </a>
        )}
      </div>

      <div>
        {!isEditing ? (
          <button
            onClick={() => setIsEditing(true)}
            className="text-sm text-nextsetAccent hover:underline"
          >
            {value ? <Pencil size={18} /> : <Plus size={18} />}
          </button>
        ) : (
          <div className="flex items-center space-x-2">
            {label === "Hometown" ? (
              <LocationInput
                value={inputValue}
                onChange={(locationData) => {
                  if (locationData) {
                    setPendingLocationData(locationData);
                    setInputValue(locationData.city); // Sync with inputValue
                  }
                }}
                onKeyDown={handleKeyDown}
              />
            ) : label === "Genre" ? (
              <select
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className="border border-gray-300 rounded-md p-1 text-sm"
                autoFocus
              >
                <option value="" disabled>
                  Select a genre
                </option>
                {commonGenres.map((genre) => (
                  <option key={genre} value={genre}>
                    {genre}
                  </option>
                ))}
              </select>
            ) : (
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                className="border border-gray-300 rounded-md p-1 text-sm"
                autoFocus
              />
            )}
            <button
              onMouseDown={handleSave}
              className="text-sm text-nextsetAccent hover:underline"
            >
              <Save size={20} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export { EditableField };
