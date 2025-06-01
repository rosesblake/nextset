"use client";

import { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { Venue } from "@/types/Venue";
import { useAuthStore } from "@/lib/stores/useAuthStore";
import { VenueHoverCard } from "./VenueHoverCard";

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN!;

export default function Map({
  venues,
  onMarkerClick,
}: {
  venues: Venue[];
  onMarkerClick?: (venue: Venue) => void;
}) {
  const mapContainer = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const markersRef = useRef<mapboxgl.Marker[]>([]);
  const { currUser } = useAuthStore();
  const [hoveredVenue, setHoveredVenue] = useState<Venue | null>(null);
  const [hoverCoords, setHoverCoords] = useState<{
    x: number;
    y: number;
  } | null>(null);

  useEffect(() => {
    if (!mapContainer.current || mapRef.current || !currUser) return;

    const startingLat = currUser?.artist?.hometown_lat ?? 34.05;
    const startingLng = currUser?.artist?.hometown_lng ?? -118.25;

    const map = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [startingLng, startingLat],
      zoom: 10,
    });

    mapRef.current = map;

    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, [currUser]);

  useEffect(() => {
    const map = mapRef.current;
    if (!map || !venues || venues.length === 0) return;

    markersRef.current.forEach((marker) => marker.remove());
    markersRef.current = [];

    venues.forEach((venue) => {
      if (venue.lat != null && venue.lng != null) {
        const el = document.createElement("div");
        const img = document.createElement("img");

        img.src = "/markers/venue-marker.png";
        img.alt = "Venue Marker";
        img.style.width = "90px";
        img.style.height = "90px";
        img.style.objectFit = "contain";
        img.className = "venue-marker";

        el.appendChild(img);

        el.addEventListener("click", () => {
          if (onMarkerClick) onMarkerClick(venue);
        });

        el.addEventListener("mouseenter", () => {
          if (!map || !mapContainer.current) return;

          const point = map.project([venue.lng!, venue.lat!]);
          const rect = mapContainer.current.getBoundingClientRect();

          setHoveredVenue(venue);
          setHoverCoords({
            x: point.x - rect.left,
            y: point.y - rect.top - 260,
          });
        });

        el.addEventListener("mouseleave", () => {
          setHoveredVenue(null);
          setHoverCoords(null);
        });

        const marker = new mapboxgl.Marker(el)
          .setLngLat([venue.lng, venue.lat])
          .addTo(map);

        markersRef.current.push(marker);
      }
    });
  }, [venues]);

  return (
    <div className="relative h-full w-full">
      <div ref={mapContainer} className="h-full w-full" />
      {hoveredVenue && hoverCoords && (
        <VenueHoverCard venue={hoveredVenue} coords={hoverCoords} />
      )}
    </div>
  );
}
