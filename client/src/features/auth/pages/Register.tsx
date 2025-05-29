"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { ArtistForm } from "../components/ArtistForm";
import { VenueForm } from "../components/VenueForm";
import { NextSetApi } from "@/lib/api";
import { useAuthStore } from "@/lib/stores/useAuthStore";

type Props = {
  accountType: "artist" | "venue";
};

export function Register({ accountType }: Props) {
  const router = useRouter();
  const setUser = useAuthStore((s) => s.setUser);
  const [error, setError] = useState<string | null>(null);

  const handleRegister = async (data: any) => {
    setError(null);
    try {
      const location = data.pendingLocationData;

      const userRes = await NextSetApi.registerUser({
        full_name: data.full_name,
        email: data.email,
        password: data.password,
        account_type: accountType,
      });

      let { user } = userRes;
      let success = false;

      if (accountType === "artist") {
        const artistRes = await NextSetApi.registerArtist({
          name: data.name,
          hometown_city: location?.city || "",
          hometown_state: location?.state || "",
          hometown_country: location?.country || "",
          hometown_lat: location?.lat || 0,
          hometown_lng: location?.lng || 0,
          spotify_id: data.spotify_id,
          spotify_photo: data.spotify_photo,
          spotify_url: data.spotify_url,
          spotify_popularity: data.spotify_popularity,
          spotify_followers: data.spotify_followers,
          created_by: user.id,
        });

        user = {
          ...user,
          artist_id: artistRes.artist.id,
          artist: artistRes.artist,
        };

        success = true;
        router.push("/artist/dashboard");
      }

      if (accountType === "venue") {
        const venueRes = await NextSetApi.registerVenue({
          name: data.venue_name,
          capacity: parseInt(data.capacity),
          full_address: data.full_address,
          city: data.city,
          state: data.state,
          street: data.street,
          zip_code: data.zip,
          lat: data.lat,
          lng: data.lng,
          created_by: user.id,
        });

        user = {
          ...user,
          venue_id: venueRes.venue.id,
          venue: venueRes.venue,
        };

        success = true;
        router.push("/venue/profile");
      }

      if (!success && user?.id) {
        await NextSetApi.deleteUser(user.id);
      }

      setUser(user);
      localStorage.setItem("isLoggedIn", "true");
    } catch (err: any) {
      console.error(err);
      setError(err.message || "An unexpected error occurred");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-background p-6">
      <div className="w-full max-w-md space-y-4">
        {error && (
          <div className="text-sm text-destructive bg-destructive/10 p-3 rounded">
            {error}
          </div>
        )}
        {accountType === "artist" && <ArtistForm onSubmit={handleRegister} />}
        {accountType === "venue" && <VenueForm onSubmit={handleRegister} />}
      </div>
    </div>
  );
}
