const fetch = require("node-fetch"); // Only if using Node <18

async function getLocationFromGoogleAPI(hometown) {
  const apiKey = process.env.GOOGLE_MAPS_API_KEY;
  const encodedAddress = encodeURIComponent(hometown);
  const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=${apiKey}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.status !== "OK") {
      throw new Error(
        `Google Maps API error: ${data.status} - ${
          data.error_message || "Unknown error"
        }`
      );
    }

    const result = data.results[0];
    const locationData = {
      city: "",
      state: "",
      country: "",
      lat: result.geometry.location.lat,
      lng: result.geometry.location.lng,
    };

    result.address_components.forEach((component) => {
      if (component.types.includes("locality")) {
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
  } catch (error) {
    console.error("Google Maps API error:", error);
    throw error;
  }
}

module.exports = { getLocationFromGoogleAPI };
