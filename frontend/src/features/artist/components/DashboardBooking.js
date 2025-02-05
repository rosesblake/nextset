import React from "react";
import { Link } from "react-router-dom";

function DashboardBooking({ gig }) {
  return (
    <Link to={`/artist/venue/${gig.pitches.venue_id}`} key={gig.pitch_id}>
      <li className="p-4 bg-gray-50 rounded-lg shadow-sm hover:shadow-md transition">
        <div className="flex justify-between">
          <span className="text-nextsetAccent font-medium">
            {gig.pitches.venues.name}
          </span>
          <span className="text-gray-400 font-medium">
            {gig.pitches.venues.city}, {gig.pitches.venues.state}
          </span>
          <span className="text-gray-500">
            {new Date(gig.pitches.date).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </span>
        </div>
      </li>
    </Link>
  );
}

export { DashboardBooking };
