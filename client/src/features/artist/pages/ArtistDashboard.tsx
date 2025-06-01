"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { NextSetApi } from "@/lib/api";
import { Venue } from "@/types/Venue";
import { SlidingSidebar } from "@/features/mapbox/components/SlidingSideBar";
import { useAuthStore } from "@/lib/stores/useAuthStore";
import { ArtistVenueProfile } from "../components/ArtistVenueProfile";

const Map = dynamic(() => import("@/features/mapbox/components/Map"), {
  ssr: false,
});

export default function ArtistDashboard() {
  const [venues, setVenues] = useState<Venue[]>([]);
  const [selectedVenue, setSelectedVenue] = useState<Venue | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const currUser = useAuthStore((s) => s.currUser);

  useEffect(() => {
    if (!currUser) return;

    async function fetchVenues() {
      try {
        const venueList = await NextSetApi.allVenues();
        setVenues(venueList.venues);
      } catch (e) {
        console.error("Error fetching venues", e);
      }
    }

    fetchVenues();
  }, [currUser]);

  return (
    <div className="w-full h-screen relative">
      <Map
        venues={venues}
        onMarkerClick={(venue: Venue) => {
          setSelectedVenue(venue);
          setSidebarOpen(true);
        }}
      />

      <SlidingSidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      >
        {selectedVenue ? (
          <ArtistVenueProfile venueId={selectedVenue.id} />
        ) : (
          <p className="text-zinc-500">No venue selected</p>
        )}
      </SlidingSidebar>
    </div>
  );
}
