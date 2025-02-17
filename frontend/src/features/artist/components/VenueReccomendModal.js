import { useNavigate } from "react-router-dom";
import { useUser } from "../../../contexts/UserContext";
import { hasPendingPitch } from "../../../utils/hasPendingPitch";
import { DashboardBooking } from "../components/DashboardBooking";
import { VenueCard } from "../components/VenueCard";

function VenueReccomendModal({
  recommendedVenues,
  pitches,
  upcomingGigs,
  welcome,
}) {
  const { currUser } = useUser();

  const navigate = useNavigate();

  return (
    <div className="w-[700px] max-w-3xl bg-white p-8 rounded-lg shadow-lg max-w-full">
      {/* Welcome Section */}
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold text-nextsetAccent mb-4">
          Welcome back, {currUser?.full_name || "Artist"}!
        </h1>
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
                hasPendingPitch={hasPendingPitch(venue.id, pitches)}
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
              <DashboardBooking gig={gig} key={gig.pitch_id} />
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">You have no upcoming gigs.</p>
        )}
        {currUser.artist && (
          <p className="text-gray-600 text-center mt-8 text-sm">
            You are logged in as{" "}
            <span className="font-medium">{currUser.artist.name}</span>.
          </p>
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
  );
}

export { VenueReccomendModal };
