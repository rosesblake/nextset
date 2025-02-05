import React from "react";

function ArtistDocuments({ booking, pdfThumbnails }) {
  return (
    <div className="p-4 bg-white rounded-lg shadow-md mt-4">
      <h2 className="text-2xl font-bold text-nextsetPrimary mb-4">Documents</h2>
      <div className="grid grid-cols-2 gap-4">
        {["rider", "epk", "stage_plot", "w9"].map(
          (fileType) =>
            booking[fileType] && (
              <a
                key={fileType}
                href={booking[fileType]}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 bg-gray-50 hover:bg-gray-100 p-3 rounded-lg shadow transition"
              >
                <img
                  src={
                    pdfThumbnails[booking.id]?.[fileType] ||
                    "/images/doc_icon.svg"
                  }
                  alt={fileType.toUpperCase()}
                  className="w-6 h-6"
                />
                <span className="text-nextsetAccent font-semibold">
                  {fileType.replace("_", " ").toUpperCase()}
                </span>
              </a>
            )
        )}
      </div>
    </div>
  );
}

export { ArtistDocuments };
