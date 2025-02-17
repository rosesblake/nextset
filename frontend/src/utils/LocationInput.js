import React, { useState, useRef } from "react";
import { Autocomplete } from "@react-google-maps/api";

const extractLocationData = (place, mode) => {
  if (!place || !place.address_components) return null;

  const locationData = {
    full_address: place.formatted_address || "",
    street: "",
    city: "",
    state: "",
    zip: "",
    country: "",
    lat: place.geometry?.location?.lat() || 0,
    lng: place.geometry?.location?.lng() || 0,
  };

  place.address_components.forEach((component) => {
    if (component.types.includes("street_number")) {
      locationData.street = component.long_name;
    }
    if (component.types.includes("route")) {
      locationData.street = locationData.street
        ? `${locationData.street} ${component.long_name}`
        : component.long_name;
    }
    if (component.types.includes("locality")) {
      locationData.city = component.long_name;
    }
    if (component.types.includes("administrative_area_level_1")) {
      locationData.state = component.short_name;
    }
    if (component.types.includes("postal_code")) {
      locationData.zip = component.long_name;
    }
    if (component.types.includes("country")) {
      locationData.country = component.long_name;
    }
  });

  // Ensure the correct fields are returned based on mode
  return mode === "venue"
    ? locationData // Return full address details
    : {
        city: locationData.city,
        state: locationData.state,
        country: locationData.country,
        lat: locationData.lat,
        lng: locationData.lng,
      }; // Return only city, state, country for artists
};

const LocationInput = ({ id, placeholder, mode = "artist", onChange }) => {
  const [autocomplete, setAutocomplete] = useState(null);
  const [inputValue, setInputValue] = useState("");
  const inputRef = useRef(null);

  const handlePlaceChanged = () => {
    const place = autocomplete?.getPlace();
    const locationData = extractLocationData(place, mode);

    if (locationData) {
      const displayValue =
        mode === "venue"
          ? locationData.full_address
          : `${locationData.city}, ${locationData.state}`;

      setInputValue(displayValue || "");
      onChange(locationData);
    }
  };

  return (
    <Autocomplete onLoad={setAutocomplete} onPlaceChanged={handlePlaceChanged}>
      <input
        ref={inputRef}
        id={id}
        type="text"
        placeholder={placeholder}
        value={inputValue || ""}
        onChange={(e) => {
          setInputValue(e.target.value || "");
          onChange(null); // Reset location data when user types manually
        }}
        className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-nextsetButton focus:border-nextsetPrimary"
        autoComplete="off"
      />
    </Autocomplete>
  );
};

export { LocationInput };
