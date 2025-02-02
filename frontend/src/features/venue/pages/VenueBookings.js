import React, { useEffect, useState } from "react";
import { NextSetApi } from "../../../services/api";
import { useUser } from "../../../contexts/UserContext";
import { Spinner } from "../../../shared/components/Spinner";
import { generatePdfThumbnail } from "../../../utils/pdfUtils";

function VenueBookings() {
  const [bookings, setBookings] = useState([]);
  const { currUser, isLoading } = useUser();
  const [pdfThumbnails, setPdfThumbnails] = useState({});

  useEffect(() => {
    const fetchBookings = async () => {
      if (currUser?.venue?.id) {
        try {
          // Fetch confirmed bookings
          const response = await NextSetApi.getVenuePitches(
            currUser.venue.id,
            currUser.account_type
          );
          setBookings(response.filter((pitch) => pitch.status === "confirmed"));
        } catch (e) {
          console.error("Error fetching bookings:", e);
        }
      }
    };

    fetchBookings();
  }, [currUser]);

  useEffect(() => {
    bookings.forEach((booking) => {
      ["epk", "rider", "stage_plot", "w9"].forEach((fileType) => {
        if (booking[fileType]) {
          handlePdf(booking[fileType], booking.id, fileType);
        }
      });
    });
  }, [bookings]);

  const handlePdf = async (url, bookingId, fileType) => {
    if (url?.endsWith(".pdf")) {
      try {
        const thumbnail = await generatePdfThumbnail(url);
        setPdfThumbnails((prev) => ({
          ...prev,
          [bookingId]: { ...(prev[bookingId] || {}), [fileType]: thumbnail },
        }));
      } catch (error) {
        console.error(`Error generating PDF thumbnail for ${fileType}:`, error);
      }
    } else {
      setPdfThumbnails((prev) => ({
        ...prev,
        [bookingId]: { ...(prev[bookingId] || {}), [fileType]: url },
      }));
    }
  };

  if (isLoading) return <Spinner />;

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
        <h1 className="text-3xl font-bold text-nextsetAccent mb-6 text-center">
          Confirmed Bookings
        </h1>
        <ul className="divide-y divide-gray-200">
          {bookings.map((booking) => {
            const artist = booking.artist_pitches[0]?.artists;

            return (
              <li
                key={booking.id}
                className="bg-gray-100 rounded-lg shadow-md mb-6 overflow-hidden"
              >
                {/* Booking Info - White Background */}
                <div className="p-6 text-center bg-white">
                  <h3 className="text-2xl font-bold text-nextsetPrimary">
                    {booking.content}
                  </h3>

                  {/* Date Badge */}
                  <div className="inline-block bg-nextsetAccent text-white text-sm font-semibold px-4 py-1 rounded-full mt-2">
                    {new Date(booking.date).toLocaleDateString("en-US", {
                      weekday: "long",
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </div>

                  {/* Support Acts */}
                  {booking.support_acts?.length > 0 && (
                    <div className="mt-4">
                      <h4 className="text-sm text-gray-600 font-semibold mb-2">
                        Support Acts:
                      </h4>
                      <div className="flex flex-wrap justify-center gap-2">
                        {booking.support_acts.map((act) => (
                          <a
                            key={act.spotify_id}
                            href={act.spotify_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-gray-200 text-gray-700 text-xs font-semibold px-3 py-1 rounded-full hover:bg-nextsetAccent hover:text-white transition"
                          >
                            {act.name}
                          </a>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Artist Info - Gray Background */}
                {artist && (
                  <div className="p-6 bg-gray-50 text-center">
                    {/* Artist Photo & Name (Centered) */}
                    {artist.spotify_photo && (
                      <img
                        src={artist.spotify_photo}
                        alt={artist.name}
                        className="w-24 h-24 rounded-full shadow-lg mx-auto"
                      />
                    )}
                    <h3 className="text-2xl font-bold text-nextsetAccent mt-3">
                      {artist.name}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {artist.genre || "N/A"} | {artist.hometown || "N/A"}
                    </p>

                    {/* Bio */}
                    <p className="text-gray-600 mt-4 px-4 leading-relaxed">
                      {artist.bio}
                    </p>

                    {/* Social Media & Music Links */}
                    <div className="mt-4 flex flex-wrap justify-center gap-4">
                      {artist.instagram_handle && (
                        <a
                          href={artist.instagram_handle}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <img
                            src="/images/instagram_icon.svg"
                            alt="Instagram"
                            className="w-8 h-8"
                          />
                        </a>
                      )}
                      {artist.tiktok && (
                        <a
                          href={artist.tiktok}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <img
                            src="/images/tiktok_icon.png"
                            alt="Tiktok"
                            className="w-8 h-8"
                          />
                        </a>
                      )}
                      {artist.x_handle && (
                        <a
                          href={artist.x_handle}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <img
                            src="/images/twitter_icon.png"
                            alt="Twitter/X"
                            className="w-8 h-8"
                          />
                        </a>
                      )}
                      {artist.facebook_url && (
                        <a
                          href={artist.facebook_url}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <img
                            src="/images/facebook_icon.png"
                            alt="Facebook"
                            className="w-8 h-8"
                          />
                        </a>
                      )}
                      {artist.spotify_url && (
                        <a
                          href={artist.spotify_url}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <img
                            src="/images/spotify_icon.svg"
                            alt="Spotify"
                            className="w-8 h-8"
                          />
                        </a>
                      )}
                      {artist.live_show_url && (
                        <a
                          href={artist.live_show_url}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <img
                            src="/images/youtube_icon.png"
                            alt="YouTube"
                            className="w-8 h-8"
                          />
                        </a>
                      )}
                      {artist.soundcloud && (
                        <a
                          href={artist.soundcloud}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <img
                            src="/images/soundcloud_icon.png"
                            alt="Soundcloud"
                            className="w-8 h-8"
                          />
                        </a>
                      )}
                    </div>
                    <div className="p-4 bg-white rounded-lg shadow-md mt-4">
                      <h2 className="text-2xl font-bold text-nextsetPrimary mb-4">
                        Documents
                      </h2>
                      <div className="grid grid-cols-2 gap-4">
                        {["rider", "epk", "stage_plot", "w9"].map(
                          (fileType) =>
                            booking[fileType] && (
                              <a
                                key={fileType}
                                href={booking[fileType]}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 bg-gray-50 hover:bg-gray-100 p-3 rounded-lg shadow transition"
                              >
                                <img
                                  src={
                                    pdfThumbnails[booking.id]?.[fileType] ||
                                    "/images/doc_icon.svg"
                                  }
                                  alt={fileType.toUpperCase()}
                                  className="w-6 h-6"
                                />
                                <span className="text-nextsetAccent font-semibold">
                                  {fileType.replace("_", " ").toUpperCase()}
                                </span>
                              </a>
                            )
                        )}
                      </div>
                    </div>

                    {/* Action Buttons - Inside Artist Section */}
                    <div className="mt-6 flex justify-center space-x-4">
                      <button className="px-6 py-2 bg-gray-500 text-white font-semibold rounded-md hover:bg-gray-600 transition">
                        View Details
                      </button>
                      <button className="px-6 py-2 bg-nextsetAccent text-white font-semibold rounded-md hover:bg-nextsetButton transition">
                        Message Artist
                      </button>
                    </div>
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
