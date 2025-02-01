import React from "react";
import { FileText, FileWarning } from "lucide-react"; // File icons
import { Link } from "react-router-dom";

function EditPitchModal({ gig, closeModal }) {
  const g = gig.pitches;
  const files = [
    { label: "Electronic Press Kit (EPK)", url: g.epk },
    { label: "Rider", url: g.rider },
    { label: "W-9", url: g.w9 },
    { label: "Stage Plot", url: g.stage_plot },
  ];

  return (
    <div className="p-6 bg-white rounded-xl shadow-lg w-full max-w-lg">
      <h2 className="text-2xl font-bold text-nextsetAccent text-center mb-4">
        View/Edit Documents
      </h2>

      <div className="space-y-4">
        {files.map((file, index) => (
          <div
            key={index}
            className="flex items-center justify-between bg-gray-100 p-4 rounded-lg shadow-sm"
          >
            <p className="text-gray-700 font-medium">{file.label}</p>
            {file.url ? (
              <a
                href={file.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center text-nextsetButton font-semibold hover:underline"
              >
                <FileText size={20} className="mr-2" />
                View File
              </a>
            ) : (
              <Link to="/artist/profile" onClick={closeModal}>
                <p className="text-gray-400 flex items-center">
                  <FileWarning size={18} className="mr-2" />
                  Click to Upload
                </p>
              </Link>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export { EditPitchModal };
