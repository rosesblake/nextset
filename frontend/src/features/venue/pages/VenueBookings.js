import React, { useEffect, useState, useCallback } from "react";
import { NextSetApi } from "../../../services/api";
import { useUser } from "../../../contexts/UserContext";
import { Spinner } from "../../../shared/components/Spinner";
import { generatePdfThumbnail } from "../../../utils/pdfUtils";
import { ArtistBookingCard } from "../components/ArtistBookingCard";
import { useLoading } from "../../../contexts/LoadingContext";
import { useMessage } from "../../../contexts/MessageContext";

function VenueBookings() {
  const [bookings, setBookings] = useState([]);
  const { currUser, setCurrUser } = useUser();
  const [pdfThumbnails, setPdfThumbnails] = useState({});
  const { isLoading, setIsLoading } = useLoading();
  const { showMessage } = useMessage();

  useEffect(() => {
    const fetchBookings = async () => {
      if (currUser?.venue?.id) {
        try {
          setIsLoading(true);
          // Fetch confirmed bookings
          const response = await NextSetApi.getVenuePitches(
            currUser.venue.id,
            currUser.account_type
          );
          setBookings(
            response.filter(
              (pitch) =>
                pitch.status === "confirmed" || pitch.status === "canceled"
            )
          );
        } catch (e) {
          console.error("Error fetching bookings:", e);
        } finally {
          setIsLoading(false);
        }
      }
    };

    fetchBookings();
  }, [currUser, setIsLoading]);

  const handlePdf = useCallback(
    async (url, bookingId, fileType) => {
      if (url?.endsWith(".pdf")) {
        try {
          setIsLoading(true);
          const thumbnail = await generatePdfThumbnail(url);
          setPdfThumbnails((prev) => ({
            ...prev,
            [bookingId]: { ...(prev[bookingId] || {}), [fileType]: thumbnail },
          }));
        } catch (error) {
          console.error(
            `Error generating PDF thumbnail for ${fileType}:`,
            error
          );
        } finally {
          setIsLoading(false); // This was incorrectly set to `true` before
        }
      } else {
        setPdfThumbnails((prev) => ({
          ...prev,
          [bookingId]: { ...(prev[bookingId] || {}), [fileType]: url },
        }));
      }
    },
    [setIsLoading]
  );

  useEffect(() => {
    bookings.forEach((booking) => {
      ["epk", "rider", "stage_plot", "w9"].forEach((fileType) => {
        if (booking[fileType]) {
          handlePdf(booking[fileType], booking.id, fileType);
        }
      });
    });
  }, [bookings, handlePdf]);

  const handleCancelBooking = async (pitch_id, data) => {
    try {
      setIsLoading(true);

      await NextSetApi.updatePitchStatus(pitch_id, data);

      //trigger refresh
      setCurrUser({ ...currUser });

      showMessage("Booking successfully canceled", "success");
    } catch (e) {
      return console.error(e);
    } finally {
      setIsLoading(false);
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
              <ArtistBookingCard
                key={booking.id}
                artist={artist}
                booking={booking}
                pdfThumbnails={pdfThumbnails}
                handleCancelBooking={handleCancelBooking}
              />
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export { VenueBookings };
