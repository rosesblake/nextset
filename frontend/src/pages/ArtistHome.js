import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../components/UserContext";
import { useArtist } from "../components/ArtistContext";
import { NextSetApi } from "../api/api";
import { VenueCard } from "../components/VenueCard";

function ArtistHome() {
  const { currUser } = useUser();
  const { artist } = useArtist();
  const navigate = useNavigate();
  const [venues, setVenues] = useState();
  const [loading, setLoading] = useState(true);

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
      <div className="w-full max-w-3xl bg-white p-6 rounded-lg shadow-lg">
        {/* Welcome Section */}
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-nextsetAccent mb-2">
            Welcome back, {currUser?.full_name || "Artist"}!
          </h1>
          {artist && (
            <p className="text-gray-600">
              You are logged in as{" "}
              <span className="font-medium">{artist.name}</span>.
            </p>
          )}
        </div>

        {/* Recommended Venues */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-nextsetPrimary mb-4">
            Recommended Venues
          </h2>
          <ul className="space-y-4">
            {venues?.slice(0, 2).map((venue) => (
              <VenueCard key={venue.id} venue={venue} artist={artist} />
            ))}
          </ul>
          <div className="text-right mt-4">
            <button
              className="text-nextsetAccent hover:underline"
              onClick={() => navigate("/venue/list")}
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
          {upcomingGigs.length > 0 ? (
            <ul className="space-y-4">
              {upcomingGigs.map((gig) => (
                <li
                  key={gig.id}
                  className="p-4 bg-gray-50 rounded-lg shadow-sm hover:shadow-md transition"
                >
                  <div className="flex justify-between">
                    <span className="text-nextsetAccent font-medium">
                      {gig.venue}
                    </span>
                    <span className="text-gray-500">{gig.date}</span>
                  </div>
                </li>
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
            onClick={() => navigate("/venue/list")}
          >
            Explore Venues
          </button>
        </div>
      </div>
    </div>
  );
}

export { ArtistHome };
