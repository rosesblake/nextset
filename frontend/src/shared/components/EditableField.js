import React, { useState } from "react";

function EditableField({ label, value, onSave, link = false }) {
  const [isEditing, setIsEditing] = useState(false);
  const [inputValue, setInputValue] = useState(value || "");

  const handleSave = () => {
    if (inputValue.trim() !== value) {
      onSave(inputValue); // Save only if the value has changed
    }
    setIsEditing(false);
  };

  const handleBlur = () => {
    setIsEditing(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSave();
    }
  };

  return (
    <div className="flex justify-between items-center mb-2">
      <div className="flex items-center space-x-2">
        {label && (
          <span className="text-nextsetButton font-bold">{label}:</span>
        )}
        {!link ? (
          <span className="text-gray-600">{value}</span>
        ) : (
          <a
            href={value}
            className="text-nextsetAccent"
            target="_blank"
            rel="noopener noreferrer"
          >
            {value}
          </a>
        )}
      </div>

      <div>
        {!isEditing ? (
          <button
            onClick={() => setIsEditing(true)}
            className="text-sm text-nextsetAccent hover:underline"
          >
            {value ? "Edit" : "Add"}
          </button>
        ) : (
          <div className="flex items-center space-x-2">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onBlur={handleBlur}
              className="border border-gray-300 rounded-md p-1 text-sm"
              onKeyDown={handleKeyDown}
              autoFocus
            />
            <button
              onMouseDown={handleSave}
              className="text-sm text-nextsetAccent hover:underline"
            >
              Save
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export { EditableField };
