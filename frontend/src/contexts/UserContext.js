import React, { createContext, useContext, useState, useEffect } from "react";
import { NextSetApi } from "../services/api";
import { useNavigate } from "react-router-dom";

const UserContext = createContext();

export const useUser = () => {
  return useContext(UserContext);
};

export const UserProvider = ({ children }) => {
  const [currUser, setCurrUser] = useState(null); // General user data
  const [artistData, setArtistData] = useState(null); // Artist-specific data
  const [venueData, setVenueData] = useState(null); // Venue-specific data
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    const artist = JSON.parse(localStorage.getItem("artist"));
    const venue = JSON.parse(localStorage.getItem("venue"));
    const token = localStorage.getItem("token");

    if (token) {
      NextSetApi.token = token;
    }

    if (!user) {
      setIsLoading(false);
      return;
    }

    setCurrUser(user);
    //set the artist or venue data to separate context
    if (user.account_type === "artist" && artist) {
      setArtistData(artist);
    } else if (user.account_type === "venue" && venue) {
      setVenueData(venue);
    }

    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (currUser) {
      localStorage.setItem("user", JSON.stringify(currUser));
    } else {
      localStorage.removeItem("user");
      setArtistData(null);
      setVenueData(null);
    }
  }, [currUser]);

  const logout = () => {
    NextSetApi.token = null;
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("artist");
    localStorage.removeItem("venue");
    setCurrUser(null);
    setArtistData(null);
    setVenueData(null);
    navigate("/login");
  };

  return (
    <UserContext.Provider
      value={{
        currUser,
        setCurrUser,
        artistData,
        setArtistData,
        venueData,
        setVenueData,
        isLoading,
        logout,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
