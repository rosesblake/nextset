import React, { useCallback, useEffect, useState } from "react";
import { useUser } from "../../../contexts/UserContext";
import { NextSetApi } from "../../../services/api";
import { Spinner } from "../../../shared/components/Spinner";
import { useLoading } from "../../../contexts/LoadingContext";
import { VenueReccomendModal } from "../components/VenueReccomendModal";
import { useModal } from "../../../contexts/ModalContext";
import { VenueMap } from "../../google/components/VenueMap";

function ArtistDashboard() {
  const { currUser } = useUser();
  const { isLoading, setIsLoading } = useLoading();
  const [venues, setVenues] = useState(null);
  const [pitches, setPitches] = useState([]);
  const [upcomingGigs, setUpcomingGigs] = useState([]);
  const { openModal } = useModal();

  useEffect(() => {
    async function fetchVenues() {
      try {
        setIsLoading(true);
        const allVenues = await NextSetApi.allVenues();
        const artistPitches = await NextSetApi.getArtistPitches(
          currUser.artist.id
        );
        setVenues(allVenues.venues);
        setPitches(artistPitches);
        setUpcomingGigs(
          artistPitches.filter((pitch) => pitch.pitches?.status === "confirmed")
        );
      } catch (e) {
        console.error("Error fetching venues:", e);
      } finally {
        setIsLoading(false);
      }
    }

    fetchVenues();
  }, [currUser, setIsLoading]);

  // Ensure venues and pitches are arrays
  const validVenues = Array.isArray(venues) ? venues : [];
  const validPitches = Array.isArray(pitches) ? pitches : [];

  // Only filter out confirmed venues if pitches exist, otherwise keep all venues
  const unconfirmedVenues =
    validPitches.length > 0
      ? validVenues.filter((venue) => {
          const venuePitches = validPitches.filter(
            (pitch) => pitch.pitches?.venue_id === venue.id
          );
          return venuePitches.length > 0;
        })
      : validVenues;

  // Sort unconfirmed venues, prioritizing the user's hometown city
  const recommendedVenues = [...unconfirmedVenues]
    .slice(0, 3) // Keep only the first 3 unconfirmed venues
    .sort((a, b) => {
      const isAHomeCity = a.city === currUser?.artist?.hometown_city ? 1 : 0;
      const isBHomeCity = b.city === currUser?.artist?.hometown_city ? 1 : 0;
      return isBHomeCity - isAHomeCity;
    });

  const handleOpenVenueRec = useCallback(() => {
    if (venues) {
      openModal(
        <VenueReccomendModal
          recommendedVenues={recommendedVenues}
          pitches={pitches}
          upcomingGigs={upcomingGigs}
        />
      );
    }
  }, [openModal, pitches, upcomingGigs, recommendedVenues, venues]);

  //upon login show modal
  useEffect(() => {
    if (localStorage.getItem("justLoggedIn") && venues) {
      handleOpenVenueRec();
      localStorage.removeItem("justLoggedIn");
    } else return;
  }, [handleOpenVenueRec, venues]);

  if (isLoading || !venues) {
    return <Spinner />;
  }
  return <VenueMap handleModal={handleOpenVenueRec} venues={venues} />;
}

export { ArtistDashboard };
