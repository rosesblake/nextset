import React, { useState, useEffect } from "react";
import { useUser } from "../../../contexts/UserContext";
import { NextSetApi } from "../../../services/api";
import { GigCard } from "../components/GigCard";
import { Spinner } from "../../../shared/components/Spinner";
import { useLoading } from "../../../contexts/LoadingContext";

function GigDetails() {
  const { currUser } = useUser();
  const { isLoading, setIsLoading } = useLoading();
  const [gigs, setGigs] = useState([]);

  useEffect(() => {
    const fetchGigs = async () => {
      try {
        setIsLoading(true);
        if (!currUser?.artist?.id) return;
        const gigsData = await NextSetApi.getArtistPitches(currUser.artist.id);
        setGigs(
          gigsData.filter((pitch) => pitch.pitches?.status === "confirmed")
        );
      } catch (error) {
        console.error("Error fetching gigs:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchGigs();
  }, [currUser, setIsLoading]);

  if (isLoading) {
    return <Spinner />;
  }
  console.log(gigs[0]?.pitches?.date);
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <div className="w-full max-w-5xl bg-white p-8 rounded-lg shadow-lg flex flex-col items-center">
        <h2 className="text-3xl font-bold text-nextsetAccent text-center mb-6">
          My Next Set
        </h2>

        {/* Ensure GigCard is centered inside the parent */}
        <div className="flex justify-center w-full">
          <GigCard gigs={gigs} />
        </div>
      </div>
    </div>
  );
}

export { GigDetails };
