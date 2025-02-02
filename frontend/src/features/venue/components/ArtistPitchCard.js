import React from "react";
import { SocialLinks } from "../../artist/components/SocialLinks";

function ArtistPitchCard({ pitch, handlePitchStatus, preview }) {
  const artist = pitch.artist_pitches[0]?.artists;

  return (
    <li
      key={pitch.id}
      className="bg-gray-100 rounded-lg shadow-md mb-6 overflow-hidden"
    >
      <div className="p-6 text-center">
        <h3 className="text-2xl font-bold text-nextsetPrimary">
          {pitch.content}
        </h3>

        {/* Date Badge */}
        <div className="inline-block bg-nextsetAccent text-white text-sm font-semibold px-4 py-1 rounded-full mt-2">
          {new Date(pitch.date).toLocaleDateString("en-US", {
            weekday: "long",
            month: "long",
            day: "numeric",
            year: "numeric",
          })}
        </div>

        {/* Support Acts */}
        {pitch.support_acts?.length > 0 ? (
          <div className="mt-4">
            <h4 className="text-sm text-gray-600 font-semibold mb-2">
              Support Acts:
            </h4>
            <div className="flex flex-wrap justify-center gap-2">
              {pitch.support_acts.map((act) => (
                <a
                  key={act.spotify_id || act.id}
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
        ) : (
          <div className="mt-4 text-sm text-gray-600 font-semibold mb-2">
            No support specified
          </div>
        )}
      </div>

      {/* Artist Info */}
      {artist && (
        <div className="p-6 bg-gray-50 text-center">
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
          <SocialLinks artist={artist} preview={preview} />

          {!preview && (
            <div className="mt-6 flex justify-center space-x-4">
              {pitch.status === "accepted" ? (
                <p className="px-6 py-2 bg-green-500 text-white font-semibold rounded-md hover:bg-green-600 transition">
                  Awaiting Confirmation
                </p>
              ) : pitch.status === "declined" ? (
                <p className="px-6 py-2 bg-red-500 text-white font-semibold rounded-md hover:bg-red-600 transition">
                  Declined
                </p>
              ) : (
                <>
                  <button
                    onClick={() => handlePitchStatus(pitch.id, "accepted")}
                    className="px-6 py-2 bg-green-500 text-white font-semibold rounded-md hover:bg-green-600 transition"
                  >
                    Accept
                  </button>
                  <button
                    onClick={() => handlePitchStatus(pitch.id, "declined")}
                    className="px-6 py-2 bg-red-500 text-white font-semibold rounded-md hover:bg-red-600 transition"
                  >
                    Decline
                  </button>
                </>
              )}
            </div>
          )}
        </div>
      )}
    </li>
  );
}

export { ArtistPitchCard };
