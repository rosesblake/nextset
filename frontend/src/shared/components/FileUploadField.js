import React, { useState, useEffect } from "react";
import { generatePdfThumbnail } from "../../utils/pdfUtils";

export const FileUploadField = ({ label, onUpload, currentFileUrl }) => {
  const [isUploading, setIsUploading] = useState(false);
  const [thumbnail, setThumbnail] = useState(null);

  useEffect(() => {
    const loadThumbnail = async () => {
      try {
        if (!currentFileUrl) {
          setThumbnail(null); // Reset thumbnail if no file URL
          return;
        }

        if (currentFileUrl.endsWith(".pdf")) {
          // Generate thumbnail for PDF
          const thumbnailUrl = await generatePdfThumbnail(currentFileUrl);
          setThumbnail(thumbnailUrl);
        } else if (
          currentFileUrl.endsWith(".jpg") ||
          currentFileUrl.endsWith(".jpeg") ||
          currentFileUrl.endsWith(".png")
        ) {
          // For image files, use the file itself as the thumbnail
          setThumbnail(currentFileUrl);
        } else {
          setThumbnail(null); // Unsupported file type
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
      await onUpload(file); // Call the provided `onUpload` function
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
        {/* Hidden File Input */}
        <input
          type="file"
          id={`file-input-${label}`}
          className="hidden"
          onChange={handleFileChange}
          disabled={isUploading}
        />

        {/* Custom Upload Button */}
        <label
          htmlFor={`file-input-${label}`}
          className={`px-6 py-3 bg-nextsetButton text-white rounded-md cursor-pointer hover:bg-nextsetAccent transition ${
            isUploading ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {isUploading ? "Uploading..." : "Choose File"}
        </label>

        {/* Thumbnail or File Link */}
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
      </div>
    </div>
  );
};
