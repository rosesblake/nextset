import React from "react";
import { ImageIcon } from "lucide-react";

function ArtistDocuments({ booking, pdfThumbnails }) {
  const files = ["rider", "epk", "stage_plot", "w9"];
  return (
    <div className="p-4 bg-white rounded-lg shadow-md mt-4">
      {files.some((fileType) => booking[fileType]) ? (
        <>
          <h2 className="text-2xl font-bold text-nextsetPrimary mb-4">
            Documents
          </h2>
          <div className="grid grid-cols-2 gap-4">
            {files.map((fileType) => (
              <a
                key={fileType}
                href={booking[fileType]}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 bg-gray-50 hover:bg-gray-100 p-3 rounded-lg shadow transition"
              >
                {pdfThumbnails[booking.id]?.[fileType] ? (
                  <img
                    src={pdfThumbnails[booking.id][fileType]}
                    alt={fileType.toUpperCase()}
                    className="w-6 h-6"
                  />
                ) : (
                  <ImageIcon className="w-6 h-6 text-gray-300" />
                )}

                <span className="text-nextsetAccent font-semibold">
                  {fileType.replace("_", " ").toUpperCase()}
                </span>
              </a>
            ))}
          </div>
        </>
      ) : (
        <h2 className="text-2xl font-bold text-nextsetPrimary">No Documents</h2>
      )}
    </div>
  );
}

export { ArtistDocuments };
