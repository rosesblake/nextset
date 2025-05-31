"use client";

import { NextSetApi } from "@/lib/api";
import { Venue } from "@/types/Venue";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const Map = dynamic(() => import("@/features/mapbox/components/Map"), {
  ssr: false,
});

export default function ArtistDashboard() {
  const [venues, setVenues] = useState<Venue[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    async function fetchVenues() {
      try {
        const venueList = await NextSetApi.allVenues();
        setVenues(venueList.venues);
      } catch (e) {
        console.error("Error fetching venues", e);
      } finally {
        setLoading(false);
      }
    }

    fetchVenues();
  }, []);

  return (
    <div className="w-full h-screen">
      <Map venues={venues} loading={loading} />
    </div>
  );
}
