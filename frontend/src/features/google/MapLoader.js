import React from "react";
import { useJsApiLoader } from "@react-google-maps/api";
import { Spinner } from "../../shared/components/Spinner";

const libraries = ["places", "marker"];

const MapLoader = ({ children }) => {
  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries,
  });

  if (loadError) {
    return <div>Error loading maps</div>;
  }

  if (!isLoaded) {
    return <Spinner />;
  }

  return <>{children}</>;
};

export { MapLoader };
