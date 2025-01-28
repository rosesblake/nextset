import React, { useEffect, useState } from "react";
import { useUser } from "../../../contexts/UserContext";
import { NextSetApi } from "../../../services/api";

function VenueDashboard() {
  const { currUser } = useUser();
  const [pitches, setPitches] = useState([]);

  useEffect(() => {
    const fetchPitches = async () => {
      if (currUser?.venue?.id) {
        try {
          const response = await NextSetApi.getVenuePitches(
            currUser.venue.id,
            currUser.account_type
          );
          setPitches(response.filter((pitch) => pitch.status !== "confirmed"));
        } catch (e) {
          console.error("error fetching pitches", e);
        }
      }
    };

    fetchPitches();
  }, [currUser]);

  const handlePitchStatus = async (pitch_id, status) => {
    try {
      await NextSetApi.updatePitchStatus(pitch_id, { status });

      setPitches((prev) =>
        prev.map((pitch) =>
          pitch.id === pitch_id ? { ...pitch, status } : pitch
        )
      );
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-6">
      <div className="w-full max-w-4xl bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold text-nextsetAccent mb-6 text-center">
          Pitches Received
        </h2>
        {pitches.length > 0 ? (
          <ul className="divide-y divide-gray-200">
            {pitches.map((pitch) => {
              const artist = pitch.artist_pitches[0]?.artists;

              return (
                <li
                  key={pitch.id}
                  className="py-6 px-4 bg-gray-50 rounded-lg shadow-sm mb-4"
                >
                  {/* Pitch Content */}
                  <div className="text-center mb-4">
                    <p className="font-semibold text-xl text-gray-800">
                      {pitch.content}
                    </p>
                    <p className="text-sm text-gray-500 mt-2">
                      Proposed Date:{" "}
                      <span className="font-medium">
                        {new Date(pitch.date).toLocaleDateString()}
                      </span>
                    </p>
                    <p className="text-sm text-gray-500 mt-2">
                      Average Tickets Sold:{" "}
                      <span className="font-medium">
                        {pitch.avg_ticket_sales}
                      </span>
                    </p>
                    <p className="text-sm text-gray-500 mt-2">
                      Support Acts:{" "}
                      <span className="font-medium">
                        {pitch.support_acts || "N/A"}
                      </span>
                    </p>
                  </div>

                  {/* Artist Details */}
                  {artist && (
                    <div className="mt-6 p-6 bg-gray-100 rounded-md text-center shadow-inner">
                      <h3 className="text-xl font-bold text-nextsetAccent">
                        Artist: {artist.name}
                      </h3>
                      <h4 className="text-md">{artist.role || "Support"}</h4>
                      <p className="text-gray-700 mt-2">{artist.bio}</p>
                      <p className="text-sm text-gray-500">
                        Genre: {artist.genre || "N/A"}
                      </p>
                      <div className="mt-4 flex justify-center space-x-6">
                        {artist.instagram_handle && (
                          <a
                            href={`https://instagram.com/${artist.instagram_handle}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-nextsetAccent font-semibold hover:underline hover:text-nextsetButton transition"
                          >
                            Instagram
                          </a>
                        )}
                        {artist.x_handle && (
                          <a
                            href={`https://x.com/${artist.x_handle}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-nextsetAccent font-semibold hover:underline hover:text-nextsetButton transition"
                          >
                            X (Twitter)
                          </a>
                        )}
                        {artist.facebook_url && (
                          <a
                            href={artist.facebook_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-nextsetAccent font-semibold hover:underline hover:text-nextsetButton transition"
                          >
                            Facebook
                          </a>
                        )}
                        {artist.spotify_url && (
                          <a
                            href={artist.spotify_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-nextsetAccent font-semibold hover:underline hover:text-nextsetButton transition"
                          >
                            Spotify
                          </a>
                        )}
                      </div>
                      {artist.spotify_photo && (
                        <img
                          src={artist.spotify_photo}
                          alt={`${artist.name}`}
                          className="w-24 h-24 rounded-full mx-auto mt-4 shadow-lg"
                        />
                      )}
                      <p className="text-sm text-nextsetPrimary mt-4">
                        Hometown: {artist.hometown || "N/A"}
                      </p>
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="mt-6 flex justify-center space-x-4">
                    {pitch.status === "accepted" ? (
                      <p className="px-6 py-2 bg-green-500 text-white font-semibold rounded-md hover:bg-green-600 transition">
                        Accepted
                      </p>
                    ) : pitch.status === "declined" ? (
                      <p className="px-6 py-2 bg-red-500 text-white font-semibold rounded-md hover:bg-red-600 transition">
                        Declined
                      </p>
                    ) : (
                      <>
                        <button
                          onClick={() =>
                            handlePitchStatus(pitch.id, "accepted")
                          }
                          className="px-6 py-2 bg-green-500 text-white font-semibold rounded-md hover:bg-green-600 transition"
                        >
                          Accept
                        </button>
                        <button
                          onClick={() =>
                            handlePitchStatus(pitch.id, "declined")
                          }
                          className="px-6 py-2 bg-red-500 text-white font-semibold rounded-md hover:bg-red-600 transition"
                        >
                          Decline
                        </button>
                      </>
                    )}
                  </div>
                </li>
              );
            })}
          </ul>
        ) : (
          <p className="text-gray-600 text-center">No pitches received yet.</p>
        )}
      </div>
    </div>
  );
}

export { VenueDashboard };
