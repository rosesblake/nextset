import React from "react";
import { SocialLinks } from "../../artist/components/SocialLinks";
import { formatDate } from "../../../utils/formatDate";

function ArtistPitchCard({
  artistDetails,
  pitch,
  openDocsModal,
  handlePitchStatus,
  preview,
}) {
  const artist = pitch ? pitch.artist_pitches[0]?.artists : artistDetails;

  const renderPitchStatus = () => {
    if (!pitch || preview) return null;

    const statusMap = {
      accepted: { text: "Awaiting Confirmation", style: "bg-green-500" },
      declined: { text: "Declined", style: "bg-red-500" },
      removed: { text: "Declined", style: "bg-red-500" },
    };

    return statusMap[pitch.status] ? (
      <p
        className={`px-6 py-2 text-white font-semibold rounded-md ${
          statusMap[pitch.status].style
        }`}
      >
        {statusMap[pitch.status].text}
      </p>
    ) : (
      <>
        <button
          onClick={() => openDocsModal(pitch, "accepted")}
          className="px-6 py-2 bg-nextsetAccent text-white font-semibold rounded-md hover:bg-nextsetButton transition"
        >
          Select Date
        </button>
        <button
          onClick={() => handlePitchStatus(pitch.id, { status: "declined" })}
          className="px-6 py-2 bg-red-500 text-white font-semibold rounded-md hover:bg-red-600 transition"
        >
          Decline
        </button>
      </>
    );
  };

  return (
    <li className="bg-gray-100 rounded-lg shadow-md mb-6 overflow-hidden">
      {pitch && (
        <div className="p-6 text-center">
          <h3 className="text-2xl font-bold text-nextsetPrimary">
            {pitch.content}
          </h3>
          <div className="inline-block bg-nextsetAccent text-white text-sm font-semibold px-4 py-1 rounded-full mt-2">
            {pitch.date
              ? formatDate(pitch.date)
              : `${formatDate(pitch.start_date)} – ${formatDate(
                  pitch.end_date
                )}`}
          </div>
          {pitch.support_acts?.length ? (
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
            <p className="text-sm text-gray-600 font-semibold">
              No support specified
            </p>
          )}
        </div>
      )}

      {artist && (
        <div className="p-6 bg-gray-50 text-center">
          {artist.spotify_photo && (
            <img
              src={artist.spotify_photo}
              alt={artist.name}
              className="w-24 h-24 rounded-full shadow-lg mx-auto object-cover"
            />
          )}
          <h3 className="text-2xl font-bold text-nextsetAccent mt-3">
            {artist.name || "Unknown Artist"}
          </h3>
          <p className="text-sm text-gray-500">
            {artist.genre || "N/A"} | {artist.hometown_city || "Unknown"},{" "}
            {artist.hometown_state || "Unknown"}
          </p>
          {artist.website && (
            <a
              href={
                artist.website.startsWith("http")
                  ? artist.website
                  : `https://${artist.website}`
              }
              className="text-nextsetAccent text-xs break-all"
              target="_blank"
              rel="noopener noreferrer"
            >
              {artist.website}
            </a>
          )}

          <p className="text-gray-600 mt-2 px-4 leading-relaxed">
            {artist.bio || "No bio available"}
          </p>
          <SocialLinks artist={artist} preview={preview} />
          {!preview && pitch && (
            <div className="mt-6 flex justify-center space-x-4">
              {renderPitchStatus()}
            </div>
          )}
        </div>
      )}
    </li>
  );
}

export { ArtistPitchCard };
