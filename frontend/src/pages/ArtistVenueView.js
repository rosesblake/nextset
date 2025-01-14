import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { NextSetApi } from "../api/api";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css"; // Import default styles for react-calendar

function ArtistVenueView() {
  const navigate = useNavigate();
  const { id: venue_id } = useParams();
  const [venue, setVenue] = useState();

  // Define the 6-month range
  const today = new Date();
  const sixMonthsFromToday = new Date(
    today.getFullYear(),
    today.getMonth() + 6,
    today.getDate()
  );

  useEffect(() => {
    const fetchVenue = async () => {
      try {
        const res = await NextSetApi.getVenue(venue_id);
        setVenue(res);
      } catch (e) {
        console.error(e);
      }
    };

    fetchVenue();
  }, [venue_id]);

  if (!venue) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <p className="text-xl font-semibold text-gray-600">
          Loading venue details...
        </p>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-10">
      <div className="w-full max-w-3xl bg-white p-6 rounded-lg shadow-lg">
        {/* Venue Header */}
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-nextsetAccent mb-2">
            {venue.name}
          </h1>
          <p className="text-gray-500">{`${venue.city}, ${venue.state}`}</p>
        </div>

        {/* General Information */}
        <div className="p-4 bg-gray-50 rounded-lg shadow-sm mb-6">
          <h3 className="text-lg font-bold text-nextsetAccent mb-4">
            General Information
          </h3>
          <p className="mb-2">
            <strong>Capacity:</strong> {venue.capacity || "Not specified"}
          </p>
          <p className="mb-2">
            <strong>Address:</strong>{" "}
            {venue.address
              ? `${venue.address}, ${venue.city}, ${venue.state} ${venue.zip_code}`
              : "Not specified"}
          </p>
        </div>

        {/* Venue Amenities */}
        <div className="p-4 bg-gray-50 rounded-lg shadow-sm mb-6">
          <h3 className="text-lg font-bold text-nextsetAccent mb-4">
            Amenities
          </h3>
          {venue.venue_amenities && venue.venue_amenities.length > 0 ? (
            <ul className="list-disc list-inside text-gray-700">
              {venue.venue_amenities.map((amenity, index) => (
                <li key={index}>{amenity.name}</li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">No amenities listed.</p>
          )}
        </div>

        {/* Calendar Section */}
        <div className="p-4 bg-gray-50 rounded-lg shadow-sm mb-6">
          <h3 className="text-lg font-bold text-nextsetAccent mb-4 text-center">
            Available Dates
          </h3>
          <div className="flex justify-center">
            <Calendar
              className="w-full max-w-2xl border border-gray-300 rounded-lg shadow-lg p-4"
              tileClassName={({ date }) =>
                "hover:bg-nextsetAccent hover:text-white rounded-lg text-lg"
              }
              tileDisabled={({ date }) =>
                venue.blocked_dates?.some(
                  (blockedDate) =>
                    new Date(blockedDate).toDateString() === date.toDateString()
                )
              }
              nextLabel="›"
              prevLabel="‹"
              minDate={today} // Set the minimum date to today
              maxDate={sixMonthsFromToday} // Set the maximum date to 6 months from today
            />
          </div>
        </div>

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
