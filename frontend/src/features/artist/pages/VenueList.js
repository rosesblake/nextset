import React, { useEffect, useState } from "react";
import { NextSetApi } from "../../../services/api";
import { VenueCard } from "../components/VenueCard";
import { useUser } from "../../../contexts/UserContext";

function VenueList() {
  const [venues, setVenues] = useState([]);
  const [loading, setLoading] = useState(true);
  const { currUser } = useUser();

  const [pitches, setPitches] = useState([]);

  // Temporary upcoming gigs data
  const upcomingGigs = [
    { id: 1, venue: "The Velvet Room", date: "Jan 15, 2025" },
    { id: 2, venue: "Blue Note Stage", date: "Jan 20, 2025" },
  ];

  useEffect(() => {
    async function fetchVenues() {
      try {
        const allVenues = await NextSetApi.allVenues();
        setVenues(allVenues.venues);

        const artistPitches = await NextSetApi.getArtistPitches(
          currUser.artist.id
        );
        setPitches(artistPitches);
      } catch (e) {
        console.error("Error fetching venues:", e);
      } finally {
        setLoading(false);
      }
    }

    fetchVenues();
  }, [currUser]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <p className="text-xl font-semibold text-gray-600">Loading...</p>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-10">
      <div className="w-full max-w-4xl bg-white p-6 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-nextsetAccent mb-6">
          Explore Venues
        </h1>
        <ul className="space-y-4">
          {venues.map((venue) => (
            <VenueCard
              key={venue.id}
              venue={venue}
              artist={currUser.artist}
              pitches={pitches.some(
                (pitch) => pitch.pitches.venue_id === venue.id
              )}
            />
          ))}
        </ul>
      </div>
    </div>
  );
}

export { VenueList };
