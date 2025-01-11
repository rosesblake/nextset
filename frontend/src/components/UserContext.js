import React, { createContext, useContext, useState, useEffect } from "react";
import { NextSetApi } from "../api/api";
import { useNavigate } from "react-router-dom";
import { useArtist } from "./ArtistContext";

// Create a Context for the current user
const UserContext = createContext();

// Custom hook to use the UserContext
export const useUser = () => {
  return useContext(UserContext);
};

// Provider to wrap your app and provide the user state
export const UserProvider = ({ children }) => {
  const [currUser, setCurrUser] = useState(null);
  const { setArtist } = useArtist();
  const [isLoading, setIsLoading] = useState(true); // Add a loading state
  const navigate = useNavigate();

  // Load user from localStorage when app starts
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      setCurrUser(user); // If a user exists in localStorage, set it as the current user
    }
    setIsLoading(false); // Mark loading as complete
  }, []);

  // Update localStorage whenever the user changes
  useEffect(() => {
    if (currUser) {
      localStorage.setItem("user", JSON.stringify(currUser)); // Save updated user in localStorage
    } else {
      localStorage.removeItem("user"); // Remove user from localStorage if null
    }
  }, [currUser]);

  const logout = () => {
    NextSetApi.token = null;
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("artist");
    setCurrUser(null);
    setArtist(null);
    navigate("/login");
  };

  return (
    <UserContext.Provider value={{ currUser, setCurrUser, isLoading, logout }}>
      {children}
    </UserContext.Provider>
  );
};
