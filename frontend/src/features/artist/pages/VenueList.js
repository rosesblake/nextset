import React, { useEffect, useState } from "react";
import { NextSetApi } from "../../../services/api";
import { VenueCard } from "../components/VenueCard";
import { useUser } from "../../../contexts/UserContext";
import { useLoading } from "../../../contexts/LoadingContext";
import { Spinner } from "../../../shared/components/Spinner";
import { hasPendingPitch } from "../../../utils/hasPendingPitch";

function VenueList() {
  const [venues, setVenues] = useState([]);
  const { isLoading, setIsLoading } = useLoading();
  const { currUser } = useUser();

  const [pitches, setPitches] = useState([]);

  useEffect(() => {
    async function fetchVenues() {
      try {
        setIsLoading(true);
        const allVenues = await NextSetApi.allVenues();
        setVenues(allVenues.venues);

        const artistPitches = await NextSetApi.getArtistPitches(
          currUser.artist.id
        );
        setPitches(artistPitches);
      } catch (e) {
        console.error("Error fetching venues:", e);
      } finally {
        setIsLoading(false);
      }
    }

    fetchVenues();
  }, [currUser, setIsLoading]);

  if (isLoading) {
    return <Spinner />;
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
              hasPendingPitch={hasPendingPitch(venue.id, pitches)}
            />
          ))}
        </ul>
      </div>
    </div>
  );
}

export { VenueList };
