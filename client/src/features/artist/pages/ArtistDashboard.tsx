"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { NextSetApi } from "@/lib/api";
import { Venue } from "@/types/Venue";
import { SlidingSidebar } from "@/components/ui/SlidingSideBar";

const Map = dynamic(() => import("@/features/mapbox/components/Map"), {
  ssr: false,
});

export default function ArtistDashboard() {
  const [venues, setVenues] = useState<Venue[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedVenue, setSelectedVenue] = useState<Venue | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

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
    <div className="w-full h-screen relative">
      <Map
        venues={venues}
        loading={loading}
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
          <div>
            <h2 className="text-xl font-bold mb-2">{selectedVenue.name}</h2>
            <p className="text-sm text-zinc-600 mb-1">{selectedVenue.street}</p>
            <p className="text-sm text-zinc-600 mb-1">
              Capacity: {selectedVenue.capacity}
            </p>
          </div>
        ) : (
          <p className="text-zinc-500">No venue selected</p>
        )}
      </SlidingSidebar>
    </div>
  );
}
