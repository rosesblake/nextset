import React, { useEffect, useState } from "react";
import { useArtist } from "../../../contexts/ArtistContext";
import { NextSetApi } from "../../../services/api";
import { VenueCard } from "../components/VenueCard";

function VenueList() {
  const { artist } = useArtist();
  const [venues, setVenues] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchVenues() {
      try {
        const allVenues = await NextSetApi.allVenues();
        setVenues(allVenues.venues);
      } catch (e) {
        console.error("Error fetching venues:", e);
      } finally {
        setLoading(false);
      }
    }

    fetchVenues();
  }, []);

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
            <VenueCard key={venue.id} venue={venue} artist={artist} />
          ))}
        </ul>
      </div>
    </div>
  );
}

export { VenueList };
