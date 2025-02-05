import React from "react";
import { SocialLinks } from "../../artist/components/SocialLinks";
import { ArtistDocuments } from "./ArtistDocuments";

function ArtistBookingCard({ artist, booking, pdfThumbnails }) {
  return (
    <li
      key={booking.id}
      className="bg-gray-100 rounded-lg shadow-md mb-6 overflow-hidden"
    >
      {/* Booking Info - White Background */}
      <div className="p-6 text-center bg-white">
        <h3 className="text-2xl font-bold text-nextsetPrimary">
          {booking.content}
        </h3>

        {/* Date Badge */}
        <div className="inline-block bg-nextsetAccent text-white text-sm font-semibold px-4 py-1 rounded-full mt-2">
          {new Date(booking.date).toLocaleDateString("en-US", {
            weekday: "long",
            month: "long",
            day: "numeric",
            year: "numeric",
          })}
        </div>

        {/* Support Acts */}
        {booking.support_acts?.length > 0 && (
          <div className="mt-4">
            <h4 className="text-sm text-gray-600 font-semibold mb-2">
              Support Acts:
            </h4>
            <div className="flex flex-wrap justify-center gap-2">
              {booking.support_acts.map((act) => (
                <a
                  key={act.spotify_id}
                  href={act.spotify_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-gray-200 text-gray-700 text-xs font-semibold px-3 py-1 rounded-full hover:bg-nextsetAccent hover:text-white transition"
                >
                  {act.name}
                </a>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Artist Info  */}
      {artist && (
        <div className="p-6 bg-gray-50 text-center">
          {/* Artist Photo & Name*/}
          {artist.spotify_photo && (
            <img
              src={artist.spotify_photo}
              alt={artist.name}
              className="w-24 h-24 rounded-full shadow-lg mx-auto"
            />
          )}
          <h3 className="text-2xl font-bold text-nextsetAccent mt-3">
            {artist.name}
          </h3>
          <p className="text-sm text-gray-500">
            {artist.genre || "N/A"} | {artist.hometown || "N/A"}
          </p>

          {/* Bio */}
          <p className="text-gray-600 mt-4 px-4 leading-relaxed">
            {artist.bio}
          </p>

          {/* Social Media & Music Links */}
          <SocialLinks artist={artist} />

          {/* Artist Docs */}
          <ArtistDocuments booking={booking} pdfThumbnails={pdfThumbnails} />

          {/* Action Buttons - Inside Artist Section */}
          <div className="mt-6 flex justify-center space-x-4">
            <button className="px-6 py-2 bg-nextsetAccent text-white font-semibold rounded-md hover:bg-nextsetButton transition">
              Message Artist
            </button>
          </div>
        </div>
      )}
    </li>
  );
}

export { ArtistBookingCard };
