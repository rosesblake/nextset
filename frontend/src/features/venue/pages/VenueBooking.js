import React, { useEffect, useState } from "react";
import { useUser } from "../../../contexts/UserContext";
import { NextSetApi } from "../../../services/api";
import { Spinner } from "../../../shared/components/Spinner";

function VenueBooking() {
  const { currUser, isLoading } = useUser(); // Get the current user (and venue) from context
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    async function fetchBookings() {
      try {
        // Replace this with the correct API call to fetch events for the current venue
        const data = await NextSetApi.getVenueBookings(currUser.venue.id);
        setBookings(data);
      } catch (err) {
        console.error("Error fetching bookings:", err);
      }
    }

    if (currUser?.venue) {
      fetchBookings();
    }
  }, [currUser]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Spinner />
      </div>
    );
  }

  if (!bookings.length) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-xl font-semibold text-gray-600">
          No bookings found for your venue.
        </p>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-10">
      <div className="w-full max-w-4xl bg-white p-6 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-nextsetAccent mb-6 text-center">
          Current Bookings for {currUser.venue.name}
        </h1>
        <ul className="space-y-4">
          {bookings.map((event) => (
            <li
              key={event.id}
              className="p-4 bg-gray-50 rounded-lg shadow-sm hover:shadow-md transition"
            >
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-xl font-semibold text-nextsetPrimary">
                    {event.name}
                  </h2>
                  <p className="text-gray-600">
                    {new Date(event.event_date).toLocaleDateString()} |{" "}
                    {new Date(event.start_time).toLocaleTimeString()} -{" "}
                    {event.end_time
                      ? new Date(event.end_time).toLocaleTimeString()
                      : "N/A"}
                  </p>
                  <p className="text-gray-500">
                    {event.description || "No description available"}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-700">
                    Tickets: {event.available_tickets ?? "N/A"}
                  </p>
                  <p className="text-sm text-gray-700">
                    Price:{" "}
                    {typeof event.ticket_price === "number"
                      ? `$${event.ticket_price.toFixed(2)}`
                      : "Free"}
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export { VenueBooking };
