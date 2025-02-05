import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../../contexts/UserContext";
import { NextSetApi } from "../../../services/api";
import { VenueCard } from "../components/VenueCard";
import { Spinner } from "../../../shared/components/Spinner";
import { DashboardBooking } from "../components/DashboardBooking";
import { useLoading } from "../../../contexts/LoadingContext";

function ArtistDashboard() {
  const { currUser } = useUser();
  const { isLoading, setIsLoading } = useLoading();
  const navigate = useNavigate();
  const [venues, setVenues] = useState();
  const [pitches, setPitches] = useState([]);
  const [upcomingGigs, setUpcomingGigs] = useState([]);

  useEffect(() => {
    async function fetchVenues() {
      try {
        setIsLoading(true);
        const allVenues = await NextSetApi.allVenues();
        const artistPitches = await NextSetApi.getArtistPitches(
          currUser.artist.id
        );
        setVenues(allVenues.venues);
        setPitches(artistPitches);
        setUpcomingGigs(
          artistPitches.filter((pitch) => pitch.pitches?.status === "confirmed")
        );
      } catch (e) {
        console.error("Error fetching venues:", e);
      } finally {
        setIsLoading(false);
      }
    }

    fetchVenues();
  }, [currUser, setIsLoading]);

  //filter out confirmed venues.
  const recommendedVenues = venues?.slice(0, 3).filter((venue) => {
    const venuePitches = pitches.filter(
      (pitch) => pitch.pitches.venue_id === venue.id
    );
    return !venuePitches.some((pitch) => pitch.pitches?.status === "confirmed");
  });

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-10">
      <div className="w-full max-w-3xl bg-white p-6 rounded-lg shadow-lg">
        {/* Welcome Section */}
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-nextsetAccent mb-2">
            Welcome back, {currUser?.full_name || "Artist"}!
          </h1>
          {currUser.artist && (
            <p className="text-gray-600">
              You are logged in as{" "}
              <span className="font-medium">{currUser.artist.name}</span>.
            </p>
          )}
        </div>

        {/* Recommended Venues */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-nextsetPrimary mb-4">
            Recommended Venues
          </h2>
          <ul className="space-y-4">
            {recommendedVenues?.length > 0 &&
              recommendedVenues.map((venue) => (
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
          <div className="text-right mt-4">
            <button
              className="text-nextsetAccent hover:underline"
              onClick={() => navigate("/artist/venue/list")}
            >
              View All Venues
            </button>
          </div>
        </div>

        {/* Upcoming Gigs */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-nextsetPrimary mb-4">
            Upcoming Gigs
          </h2>
          {upcomingGigs?.length > 0 ? (
            <ul className="space-y-4">
              {upcomingGigs.map((gig) => (
                <DashboardBooking gig={gig} />
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">You have no upcoming gigs.</p>
          )}
        </div>

        {/* Quick Links */}
        <div className="flex justify-center space-x-4">
          <button
            className="px-6 py-3 bg-nextsetButton text-white rounded-md hover:bg-nextsetAccent transition"
            onClick={() => navigate("/artist/profile")}
          >
            View Profile
          </button>
          <button
            className="px-6 py-3 bg-nextsetAccent text-white rounded-md hover:bg-nextsetButton transition"
            onClick={() => navigate("/artist/venue/list")}
          >
            Explore Venues
          </button>
        </div>
      </div>
    </div>
  );
}

export { ArtistDashboard };
