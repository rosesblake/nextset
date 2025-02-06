import React, { useState, useRef } from "react";
import { Autocomplete } from "@react-google-maps/api";

const extractLocationData = (place) => {
  if (!place || !place.address_components) return null;

  const locationData = {
    city: "",
    state: "",
    country: "",
    lat: place.geometry?.location?.lat() || 0,
    lng: place.geometry?.location?.lng() || 0,
  };

  place.address_components.forEach((component) => {
    if (component.types.includes("neighborhood") && !locationData.city) {
      locationData.city = component.long_name;
    }
    if (component.types.includes("locality") && !locationData.city) {
      locationData.city = component.long_name;
    }
    if (component.types.includes("administrative_area_level_1")) {
      locationData.state = component.short_name;
    }
    if (component.types.includes("country")) {
      locationData.country = component.long_name;
    }
  });

  return locationData;
};

const LocationInput = ({ value, onChange, onKeyDown }) => {
  const [autocomplete, setAutocomplete] = useState(null);
  const [inputValue, setInputValue] = useState(value || "");
  const inputRef = useRef(null);

  const handlePlaceChanged = () => {
    const place = autocomplete?.getPlace();
    const locationData = extractLocationData(place);

    if (locationData) {
      const displayValue = locationData.city
        ? `${locationData.city}, ${locationData.state}`
        : `${locationData.state}, ${locationData.country}`;

      setInputValue(displayValue);
      onChange(locationData);
    }
  };

  return (
    <Autocomplete onLoad={setAutocomplete} onPlaceChanged={handlePlaceChanged}>
      <input
        ref={inputRef}
        type="text"
        placeholder="Enter your hometown"
        value={inputValue}
        onChange={(e) => {
          setInputValue(e.target.value);
          onChange(null); // Clear pending location data when user types manually
        }}
        onKeyDown={onKeyDown}
        className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-nextsetButton focus:border-nextsetPrimary"
        autoComplete="off"
      />
    </Autocomplete>
  );
};

export { LocationInput };
