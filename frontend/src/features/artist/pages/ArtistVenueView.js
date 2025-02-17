import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { NextSetApi } from "../../../services/api";
import "react-calendar/dist/Calendar.css";
import { ArtistVenueProfile } from "../components/ArtistVenueProfile";
import { useLoading } from "../../../contexts/LoadingContext";
import { Spinner } from "../../../shared/components/Spinner";

function ArtistVenueView() {
  const navigate = useNavigate();
  const { id: venue_id } = useParams();
  const [venue, setVenue] = useState();
  const [pitches, setPitches] = useState();
  const { isLoading, setIsLoading } = useLoading();

  useEffect(() => {
    const fetchVenue = async () => {
      try {
        setIsLoading(true);
        const venue = await NextSetApi.getVenue(venue_id);
        const pitches = await NextSetApi.getVenuePitches(venue_id);
        setVenue(venue);
        setPitches(pitches);
      } catch (e) {
        console.error(e);
      } finally {
        setIsLoading(false);
      }
    };

    fetchVenue();
  }, [venue_id, setIsLoading]);

  if (isLoading || !venue) {
    return <Spinner />;
  }
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-10">
      <div className="w-full max-w-3xl bg-white p-6 rounded-lg shadow-lg">
        <ArtistVenueProfile venue={venue} pitches={pitches} />
        {/* Quick Actions */}
        <div className="flex justify-center space-x-4 mt-6">
          <button
            className="px-6 py-3 bg-nextsetButton text-white rounded-md hover:bg-nextsetAccent transition"
            onClick={() => navigate("/venues")}
          >
            Back to Venues
          </button>
        </div>
      </div>
    </div>
  );
}

export { ArtistVenueView };
