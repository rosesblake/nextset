import React, { createContext, useContext, useState, useEffect } from "react";

// Create a Context for the artist data
const ArtistContext = createContext();

// Custom hook to use the ArtistContext
export const useArtist = () => {
  return useContext(ArtistContext);
};

// Provider to wrap your app and provide the artist state
export const ArtistProvider = ({ children }) => {
  const [artist, setArtist] = useState(null);

  // Load artist from localStorage when app starts
  useEffect(() => {
    const storedArtist = JSON.parse(localStorage.getItem("artist"));
    if (storedArtist) {
      setArtist(storedArtist); // If an artist exists in localStorage, set it as the current artist
    }
  }, []);

  // Update localStorage whenever the artist changes
  useEffect(() => {
    if (artist) {
      localStorage.setItem("artist", JSON.stringify(artist)); // Save updated artist in localStorage
    }
  }, [artist]);

  return (
    <ArtistContext.Provider value={{ artist, setArtist }}>
      {children}
    </ArtistContext.Provider>
  );
};
