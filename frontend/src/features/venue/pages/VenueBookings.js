import React, { useEffect, useState } from "react";
import { NextSetApi } from "../../../services/api";
import { useUser } from "../../../contexts/UserContext";
import { Spinner } from "../../../shared/components/Spinner";

function VenueBookings() {
  const [bookings, setBookings] = useState([]);
  const { currUser, isLoading } = useUser();

  useEffect(() => {
    const fetchBookings = async () => {
      if (currUser?.venue?.id) {
        try {
          // Fetch all pitches and filter confirmed ones
          const response = await NextSetApi.getVenuePitches(
            currUser.venue.id,
            currUser.account_type
          );
          const confirmedBookings = response.filter(
            (pitch) => pitch.status === "confirmed"
          );
          setBookings(confirmedBookings);
        } catch (e) {
          console.error("Error fetching bookings:", e);
        }
      }
    };

    fetchBookings();
  }, [currUser]);

  if (isLoading) {
    return <Spinner />;
  }

  if (!bookings.length) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <p className="text-xl font-semibold text-gray-600">
          No bookings found.
        </p>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-10">
      <div className="w-full max-w-4xl bg-white p-6 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-nextsetAccent mb-6">
          Confirmed Bookings
        </h1>
        <ul className="space-y-4">
          {bookings.map((booking) => {
            const artist = booking.artist_pitches[0]?.artists; // Extract artist details

            return (
              <li
                key={booking.id}
                className="p-4 bg-gray-50 rounded-lg shadow hover:shadow-md transition"
              >
                <div className="flex flex-col space-y-2">
                  {/* Booking Details */}
                  <p className="text-xl font-semibold text-gray-800">
                    Event: {booking.content}
                  </p>
                  <p className="text-sm text-gray-500">
                    Date:{" "}
                    <span className="font-medium">
                      {new Date(booking.date).toLocaleDateString()}
                    </span>
                  </p>
                  <p className="text-sm text-gray-500">
                    Average Tickets Sold:{" "}
                    <span className="font-medium">
                      {booking.avg_ticket_sales}
                    </span>
                  </p>
                  <p className="text-sm text-gray-500">
                    Support Acts:{" "}
                    <span className="font-medium">
                      {booking.support_acts || "N/A"}
                    </span>
                  </p>
                  <p className="text-sm text-gray-500">
                    Role: <span className="font-medium">{booking.role}</span>
                  </p>
                </div>

                {/* Artist Details */}
                {artist && (
                  <div className="mt-4 p-4 bg-gray-100 rounded-md shadow-inner">
                    <h3 className="text-lg font-bold text-nextsetAccent">
                      Artist: {artist.name}
                    </h3>
                    <p className="text-sm text-gray-500">
                      Hometown: {artist.hometown || "N/A"}
                    </p>
                    {artist.spotify_url && (
                      <p className="text-sm text-gray-500">
                        <a
                          href={artist.spotify_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-nextsetAccent font-semibold hover:underline"
                        >
                          Spotify
                        </a>
                      </p>
                    )}
                    {artist.spotify_photo && (
                      <img
                        src={artist.spotify_photo}
                        alt={artist.name}
                        className="w-16 h-16 rounded-full mt-4 shadow-md"
                      />
                    )}
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export { VenueBookings };
