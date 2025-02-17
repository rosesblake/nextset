import React, { useEffect, useRef } from "react";
import { GoogleMap } from "@react-google-maps/api";
import { useUser } from "../../../contexts/UserContext";
import { useNavigate } from "react-router-dom";
import { NotepadText } from "lucide-react";

const containerStyle = {
  width: "100%",
  height: "100%",
};

function VenueMap({ handleModal, venues }) {
  const { currUser } = useUser();
  const navigate = useNavigate();
  const mapRef = useRef(null);
  const markersRef = useRef([]);

  let center = {
    lat: currUser?.artist?.hometown_lat,
    lng: currUser?.artist?.hometown_lng,
  };

  if (!center.lat || !center.lng) {
    center = { lat: 34.0522, lng: -118.2437 }; // Default to Los Angeles
  }

  useEffect(() => {
    async function loadMarkers() {
      if (!mapRef.current || !venues) return;

      const { AdvancedMarkerElement } = await window.google.maps.importLibrary(
        "marker"
      );

      markersRef.current.forEach((marker) => marker.setMap(null));
      markersRef.current = [];

      venues.forEach((venue) => {
        if (!venue.lat || !venue.lng) return;

        const marker = new AdvancedMarkerElement({
          position: { lat: venue.lat, lng: venue.lng },
          map: mapRef.current,
          title: venue.name,
        });

        marker.addListener("click", () => {
          navigate(`/venue/${venue.id}`);
        });

        markersRef.current.push(marker);
      });
    }

    loadMarkers();
  }, [venues, navigate]);

  return (
    <div className="h-[100vh] relative">
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={11}
        options={{
          mapId: "DEMO_MAP_ID",
        }}
        onLoad={(map) => (mapRef.current = map)}
      />

      {/* Button to open Dashboard */}
      <button
        onClick={handleModal}
        className="flex flex-row text-center absolute top-2.5 right-20 text-nextsetAccent border rounded-md bg-nextsetPrimary py-2 px-4 shadow-md hover:bg-nextsetAccent hover:text-nextsetPrimary transition"
      >
        <NotepadText size={22} />
        <span className="ml-2">Dashboard</span>
      </button>
    </div>
  );
}

export { VenueMap };
