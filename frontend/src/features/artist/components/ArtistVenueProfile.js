import React from "react";
import { MyCalendar } from "../../../shared/components/MyCalendar";

function ArtistVenueProfile({ venue, pitches }) {
  //show only confirmed shows
  const bookedEvents = pitches?.filter((pitch) => pitch.status === "confirmed");

  const calendarEvents = [
    ...bookedEvents?.map((pitch) => ({
      title: pitch.artist_pitches[0].artists.name.toLowerCase(),
      start: new Date(pitch.date),
      end: new Date(pitch.date),
      allDay: true,
      type: "blocked",
    })),
  ];

  return (
    <div>
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
        <h3 className="text-lg font-bold text-nextsetAccent mb-4">Amenities</h3>
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
          <MyCalendar myEventsList={calendarEvents} height="450px" />
        </div>
      </div>
    </div>
  );
}

export { ArtistVenueProfile };
