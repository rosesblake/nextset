import React, { useEffect, useState } from "react";
import { useUser } from "../../../contexts/UserContext";
import { NextSetApi } from "../../../services/api";
import { ArtistPitchCard } from "../components/ArtistPitchCard";

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
            {pitches.map((pitch) => (
              <ArtistPitchCard
                key={pitch.id}
                pitch={pitch}
                handlePitchStatus={handlePitchStatus}
              />
            ))}
          </ul>
        ) : (
          <p className="text-gray-600 text-center">No pitches received yet.</p>
        )}
      </div>
    </div>
  );
}

export { VenueDashboard };
