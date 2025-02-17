import React from "react";
import { Link } from "react-router-dom";
import { formatDate } from "../../../utils/formatDate";

function DashboardBooking({ gig }) {
  const venue = gig.pitches.venues;

  // Normalize City & State Formatting
  const city = venue.city
    ? venue.city.trim().replace(/\s+/g, " ")
    : "Unknown City";
  const state = venue.state ? venue.state.trim() : "Unknown State";

  return (
    <Link to={`/artist/venue/${gig.pitches.venue_id}`} key={gig.pitch_id}>
      <li className="p-4 bg-gray-50 rounded-lg shadow-sm hover:shadow-md transition">
        <div className="flex items-center justify-between">
          {/* Venue Name */}
          <span className="text-nextsetAccent font-medium w-1/3 truncate">
            {venue.name}
          </span>

          {/* City & State (Fixed Width to Align Properly) */}
          <span className="text-gray-400 font-medium w-1/3 text-center truncate">
            {city}, {state}
          </span>

          {/* Date (Right-Aligned) */}
          <span className="text-gray-500 text-sm w-1/3 text-right">
            {formatDate(gig.pitches.date)}
          </span>
        </div>
      </li>
    </Link>
  );
}

export { DashboardBooking };
