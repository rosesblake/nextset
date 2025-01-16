import React from "react";

function ArtistMessage() {
  // Hardcoded data for demonstration
  const artistName = "John Doe";
  const message =
    "Hey there! Just finished some new tracks. Let me know if you're up to collaborate.";

  const handleReply = () => {
    console.log("Reply clicked");
    // Add any reply logic here (e.g., open a modal, show a form, etc.)
  };

  return (
    <div className="mx-80 my-10 p-4 bg-gray-50 rounded-lg shadow-sm hover:shadow-md transition">
      <h2 className="text-lg font-bold text-nextsetAccent">{artistName}</h2>
      <p className="text-sm text-gray-500 mt-2">{message}</p>

      <div className="flex justify-end mt-4">
        <button
          className="px-4 py-2 bg-nextsetButton text-white rounded-md hover:bg-nextsetAccent transition"
          onClick={handleReply}
        >
          Reply
        </button>
      </div>
    </div>
  );
}

export { ArtistMessage };
