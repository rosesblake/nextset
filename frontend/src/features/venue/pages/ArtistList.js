import React, { useEffect, useState } from "react";
import { NextSetApi } from "../../../services/api";
import { ArtistCard } from "../components/ArtistCard";
import { useUser } from "../../../contexts/UserContext";
import { Spinner } from "../../../shared/components/Spinner";
import { useLoading } from "../../../contexts/LoadingContext";

function ArtistList() {
  const [artists, setArtists] = useState([]);
  const { currUser } = useUser();
  const { isLoading, setIsLoading } = useLoading();

  useEffect(() => {
    async function fetchArtists() {
      try {
        setIsLoading(true);
        const artistList = await NextSetApi.allArtists();
        setArtists(artistList);
      } catch (e) {
        console.error("Error fetching artists:", e);
      } finally {
        setIsLoading(false);
      }
    }

    if (currUser?.venue) {
      fetchArtists();
    }
  }, [currUser, setIsLoading]);

  if (isLoading) {
    return <Spinner />;
  }

  if (!artists.length) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <p className="text-xl font-semibold text-gray-600">No artists found.</p>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-10">
      <div className="w-full max-w-4xl bg-white p-6 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-nextsetAccent mb-6">
          Explore Artists
        </h1>
        <ul className="space-y-4">
          {artists.map((artist) => (
            <ArtistCard key={artist.id} artist={artist} />
          ))}
        </ul>
      </div>
    </div>
  );
}

export { ArtistList };
