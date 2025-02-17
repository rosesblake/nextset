import React from "react";
import { GoogleMap, Marker } from "@react-google-maps/api";
import { NotepadText } from "lucide-react";
import { useUser } from "../../../contexts/UserContext";

const containerStyle = {
  width: "100%",
  height: "100%",
};

function VenueMap({ handleModal }) {
  const { currUser } = useUser();

  let center = {
    lat: currUser?.artist?.hometown_lat,
    lng: currUser?.artist?.hometown_lng,
  };

  if (center.lat === null || center.lng === null) {
    center = { lat: 34.0522, lng: -118.2437 };
  }

  return (
    <div className="h-[100vh] relative">
      <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={11} />
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
