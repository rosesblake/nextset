"use client";

import { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { Venue } from "@/types/Venue";
import { useAuthStore } from "@/lib/stores/useAuthStore";

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN!;

export default function Map({
  venues,
  loading,
  onMarkerClick,
}: {
  venues: Venue[];
  loading: boolean;
  onMarkerClick?: (venue: Venue) => void;
}) {
  const mapContainer = useRef<HTMLDivElement | null>(null);
  const { currUser } = useAuthStore();

  useEffect(() => {
    if (!mapContainer.current || !currUser || loading) return;

    const startingLat = currUser?.artist?.hometown_lat ?? 34.05;
    const startingLng = currUser?.artist?.hometown_lng ?? -118.25;

    const map = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [startingLng, startingLat],
      zoom: 10,
    });

    map.on("load", () => {
      venues?.forEach((venue) => {
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

          new mapboxgl.Marker(el)
            .setLngLat([venue.lng, venue.lat])
            .setPopup(
              new mapboxgl.Popup({ offset: 24 }).setHTML(`
              <strong>${venue.name}</strong><br/>
              ${venue.city}, ${venue.state}
            `)
            )
            .addTo(map);
        }
      });
    });

    return () => map.remove();
  }, [venues, currUser, loading]);

  return <div ref={mapContainer} className="h-full w-full" />;
}
