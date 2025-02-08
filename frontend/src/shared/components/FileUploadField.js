import React, { useState, useEffect } from "react";
import { generatePdfThumbnail } from "../../utils/pdfUtils";
import { ImageUp, Trash2 } from "lucide-react";

export const FileUploadField = ({
  label,
  onUpload,
  currentFileUrl,
  deleteFile,
  fileType,
}) => {
  const [isUploading, setIsUploading] = useState(false);
  const [thumbnail, setThumbnail] = useState(null);

  useEffect(() => {
    const loadThumbnail = async () => {
      try {
        if (!currentFileUrl) {
          setThumbnail(null);
          return;
        }

        if (currentFileUrl.endsWith(".pdf")) {
          const thumbnailUrl = await generatePdfThumbnail(currentFileUrl);
          setThumbnail(thumbnailUrl);
        } else if (
          currentFileUrl.endsWith(".jpg") ||
          currentFileUrl.endsWith(".jpeg") ||
          currentFileUrl.endsWith(".png")
        ) {
          setThumbnail(currentFileUrl);
        } else {
          setThumbnail(null);
        }
      } catch (error) {
        console.error("Error loading thumbnail:", error);
        setThumbnail(null);
      }
    };

    loadThumbnail();
  }, [currentFileUrl]);

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setIsUploading(true);
    try {
      await onUpload(file);
    } catch (error) {
      console.error(`Error uploading ${label}:`, error);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="mb-6">
      <label className="block font-semibold text-nextsetAccent mb-2">
        {label}
      </label>
      <div className="flex items-center space-x-4">
        <input
          type="file"
          id={`file-input-${label}`}
          className="hidden"
          onChange={handleFileChange}
          disabled={isUploading}
        />

        <label
          htmlFor={`file-input-${label}`}
          className={`px-4 py-2 bg-nextsetButton text-white rounded-md cursor-pointer hover:bg-nextsetAccent transition ${
            isUploading ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {isUploading ? (
            "Uploading..."
          ) : (
            <div className="flex flex-row gap-2 justify-center">
              <ImageUp size={20} /> <span className="text-sm">Upload File</span>
            </div>
          )}
        </label>

        {thumbnail ? (
          <a href={currentFileUrl} target="_blank" rel="noopener noreferrer">
            <img
              src={thumbnail}
              alt={`${label} Thumbnail`}
              className="w-20 h-20 object-cover rounded-md"
            />
          </a>
        ) : currentFileUrl ? (
          <a
            href={currentFileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-blue-500 underline"
          >
            View File
          </a>
        ) : null}

        {currentFileUrl && (
          <button
            onClick={() => deleteFile(fileType)}
            className="p-2 bg-red-400 hover:bg-red-500 text-white rounded-full transition"
          >
            <Trash2 size={18} />
          </button>
        )}
      </div>
    </div>
  );
};
