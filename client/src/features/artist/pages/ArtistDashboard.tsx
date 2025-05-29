"use client";

import dynamic from "next/dynamic";

const Map = dynamic(() => import("@/features/mapbox/components/Map"), {
  ssr: false,
});

export default function ArtistDashboard() {
  return (
    <div className="w-full h-screen">
      <Map />
    </div>
  );
}
