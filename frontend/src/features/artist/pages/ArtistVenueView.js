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
  const { isLoading, setIsLoading } = useLoading();

  useEffect(() => {
    const fetchVenue = async () => {
      try {
        setIsLoading(true);
        const res = await NextSetApi.getVenue(venue_id);
        setVenue(res);
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
        <ArtistVenueProfile venue={venue} />
        {/* Quick Actions */}
        <div className="flex justify-center space-x-4 mt-6">
          <button
            className="px-6 py-3 bg-nextsetButton text-white rounded-md hover:bg-nextsetAccent transition"
            onClick={() => navigate("/venues")}
          >
            Back to Venues
          </button>
          <button
            className="px-6 py-3 bg-nextsetAccent text-white rounded-md hover:bg-nextsetButton transition"
            onClick={() => navigate(`/venues/${venue.id}/events`)}
          >
            View Events
          </button>
        </div>
      </div>
    </div>
  );
}

export { ArtistVenueView };
