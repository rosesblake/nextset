import React, { createContext, useContext, useState, useEffect } from "react";
import { NextSetApi } from "../services/api";
import { useNavigate } from "react-router-dom";

const UserContext = createContext();

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const [currUser, setCurrUser] = useState(null);
  const [artistData, setArtistData] = useState(null);
  const [venueData, setVenueData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  // Fetch user from backend (based on cookies)
  useEffect(() => {
    async function loadUser() {
      try {
        const res = await NextSetApi.request("auth/me");

        const user = res.user;

        setCurrUser(user);
        if (user.account_type === "artist" && user.artist) {
          setArtistData(user.artist);
        } else if (user.account_type === "venue" && user.venue) {
          setVenueData(user.venue);
        }
      } catch (err) {
        console.warn("Failed to load user from cookies", err.message);
        setCurrUser(null);
      } finally {
        setIsLoading(false);
      }
    }

    loadUser();
  }, []);

  const logout = async () => {
    try {
      await NextSetApi.request("auth/logout", {}, "post"); // backend clears cookies
    } catch (err) {
      console.warn("Logout failed", err.message);
    }
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
