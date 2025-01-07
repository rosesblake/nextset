import React, { useEffect, useState } from "react";
import { NextSetApi } from "../api/api";
import { Link } from "react-router-dom";

function VenueList() {
  const [venues, setVenues] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchVenues() {
      try {
        const allVenues = await NextSetApi.allVenues();
        setVenues(allVenues.venues);
      } catch (err) {
        console.error("Error fetching venues:", err);
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
        <h1 className="text-3xl font-bold text-nextsetPrimary mb-6 text-center">
          All Venues
        </h1>
        <ul className="space-y-4">
          {venues.map((venue) => (
            <li
              key={venue.id}
              className="p-4 bg-gray-50 rounded-lg shadow-sm hover:shadow-md transition"
            >
              <div className="flex justify-between items-center">
                <Link to={`/venue/${venue.id}`}>
                  <div>
                    <h3 className="text-lg font-bold text-nextsetAccent">
                      {venue.name}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {venue.city}, {venue.state}
                    </p>
                    <p className="text-sm font-medium text-gray-600">
                      <span className="text-nextsetButton font-semibold">
                        Capacity:
                      </span>{" "}
                      {venue.capacity || "N/A"}
                    </p>
                  </div>
                </Link>
                <button
                  className="px-4 py-2 bg-nextsetButton text-white rounded-md hover:bg-nextsetAccent transition"
                  onClick={() => alert(`Pitch to ${venue.name}`)}
                >
                  Pitch
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export { VenueList };
