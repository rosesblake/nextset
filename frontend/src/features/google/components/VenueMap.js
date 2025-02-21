import React, { useEffect, useRef, useState } from "react";
import { GoogleMap } from "@react-google-maps/api";
import { useUser } from "../../../contexts/UserContext";
import { useNavigate } from "react-router-dom";
import { NotepadText } from "lucide-react";
import { useModal } from "../../../contexts/ModalContext";
import { useMessage } from "../../../contexts/MessageContext";
import { PitchModal } from "../../pitch/PitchModal";
import { MapLoader } from "../MapLoader";

const containerStyle = {
  width: "100%",
  height: "100%",
};

function VenueMap({ handleModal, venues }) {
  const { currUser } = useUser();
  const { openModal, closeModal } = useModal();
  const { showMessage } = useMessage();
  const navigate = useNavigate();
  const mapRef = useRef(null);
  const markersRef = useRef([]);
  const [markerLibraryLoaded, setMarkerLibraryLoaded] = useState(false);

  let center = {
    lat: currUser?.artist?.hometown_lat,
    lng: currUser?.artist?.hometown_lng,
  };

  if (!center.lat || !center.lng) {
    center = { lat: 34.0522, lng: -118.2437 }; // Default to LA
  }

  useEffect(() => {
    async function loadMarkers() {
      if (!mapRef.current || !venues?.length || !markerLibraryLoaded) return;

      // Clear existing markers
      markersRef.current.forEach((marker) => marker.setMap(null));
      markersRef.current = [];

      const { AdvancedMarkerElement } = await window.google.maps.importLibrary(
        "marker"
      );
      const placesService = new window.google.maps.places.PlacesService(
        mapRef.current
      );

      venues.forEach((venue) => {
        if (!venue.lat || !venue.lng) return;

        // Create a custom marker
        const marker = new AdvancedMarkerElement({
          position: { lat: venue.lat, lng: venue.lng },
          map: mapRef.current,
          title: venue.name,
          content: document.createElement("img"),
        });

        marker.content.src = "/images/custom-marker.png";
        marker.content.style.width = "80px";
        marker.content.style.height = "80px";

        // Check if venue address matches Google Places data
        const request = {
          location: new window.google.maps.LatLng(venue.lat, venue.lng),
          radius: 50, // Search within 50 meters
          query: venue.name,
        };

        placesService.textSearch(request, (results, status) => {
          //very jank for now
          const normalizeAddress = (address) => {
            return address
              .toLowerCase()
              .replace(/\bavenue\b/g, "ave")
              .replace(/\broad\b/g, "rd")
              .replace(/\bstreet\b/g, "st")
              .replace(/\bdrive\b/g, "dr")
              .replace(/\bboulevard\b/g, "blvd")
              .replace(/\bsouth\b/g, "s")
              .replace(/\bnorth\b/g, "n")
              .replace(/\beast\b/g, "e")
              .replace(/\bwest\b/g, "w")
              .replace(/,/g, "") // Remove commas
              .replace(/\s+/g, " ") // Replace multiple spaces with single space
              .replace(/\bunited states\b/gi, "") // Remove "United States" case-insensitively
              .replace(/\busa\b/gi, "") // Remove "United States" case-insensitively
              .trim();
          };

          if (status === window.google.maps.places.PlacesServiceStatus.OK) {
            const place = results.find((p) => {
              return (
                normalizeAddress(venue.full_address) ===
                normalizeAddress(p.formatted_address)
              );
            });

            if (place) {
              marker.addListener("click", () => {
                // Create an InfoWindow container
                const infoDiv = document.createElement("div");
                infoDiv.className = "custom-infowindow";

                infoDiv.innerHTML = `
                <h3>${place.name}</h3>
                <p>${place.formatted_address}</p>
                <p>⭐ ${place.rating || "N/A"}</p>
              
                <div class="info-buttons">
                  <button id="pitch-button-${venue.id}">Pitch to Venue</button>
                  <button id="visit-venue-${
                    venue.id
                  }">Visit Venue Profile</button>
                  <a href="https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                    place.name
                  )}" target="_blank" id="view-on-google-${
                  venue.id
                }" class="google-link">View on Google Maps</a>
                </div>
              `;

                const infoWindow = new window.google.maps.InfoWindow({
                  content: infoDiv,
                });

                infoWindow.open(mapRef.current, marker);

                // Delay event listener until the InfoWindow is fully rendered
                window.google.maps.event.addListener(
                  infoWindow,
                  "domready",
                  () => {
                    // Handle Pitch Button Click
                    const pitchButton = document.getElementById(
                      `pitch-button-${venue.id}`
                    );
                    if (pitchButton) {
                      pitchButton.addEventListener("click", () => {
                        openModal(<PitchModal venue={venue} />);
                      });
                    }

                    // Handle Visit Venue Button Click
                    const visitVenueButton = document.getElementById(
                      `visit-venue-${venue.id}`
                    );
                    if (visitVenueButton) {
                      visitVenueButton.addEventListener("click", () => {
                        navigate(`/artist/venue/${venue.id}`);
                      });
                    }
                  }
                );
              });
            } else {
              marker.addListener("click", () => {
                navigate(`/artist/venue/${venue.id}`);
              });
            }
          }
        });

        markersRef.current.push(marker);
      });
    }

    loadMarkers();
  }, [
    venues,
    markerLibraryLoaded,
    navigate,
    openModal,
    closeModal,
    showMessage,
  ]);

  return (
    <div className="h-[100vh] relative">
      <MapLoader>
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={11}
          options={{ mapId: "DEMO_MAP_ID" }}
          onLoad={async (map) => {
            mapRef.current = map;

            // Load Advanced Marker Library
            try {
              await window.google.maps.importLibrary("marker");
              setMarkerLibraryLoaded(true);
            } catch (error) {
              console.error("Failed to load Advanced Marker Library:", error);
            }
          }}
        />
      </MapLoader>

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
