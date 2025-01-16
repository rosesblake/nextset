import React, { createContext, useContext, useState, useEffect } from "react";
import { NextSetApi } from "../services/api";
import { useNavigate } from "react-router-dom";

const UserContext = createContext();

export const useUser = () => {
  return useContext(UserContext);
};

export const UserProvider = ({ children }) => {
  const [currUser, setCurrUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true); // Loading state for the user
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    const artist = JSON.parse(localStorage.getItem("artist"));
    const venue = JSON.parse(localStorage.getItem("venue"));
    const token = localStorage.getItem("token");

    // If you need to set the token for your API requests
    if (token) {
      NextSetApi.token = token;
    }

    // If there's no user at all, just finish loading
    if (!user) {
      setIsLoading(false);
      return;
    }

    // If user is an artist and we have artist data, merge them
    if (user.account_type === "artist" && artist) {
      setCurrUser({ ...user, artist });
    }
    // If user is a venue and we have venue data, merge them
    else if (user.account_type === "venue" && venue) {
      setCurrUser({ ...user, venue });
    }
    // Otherwise, just set the user object as is
    else {
      setCurrUser(user);
    }

    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (currUser) {
      localStorage.setItem("user", JSON.stringify(currUser));
    } else {
      localStorage.removeItem("user");
    }
  }, [currUser]);

  const logout = () => {
    NextSetApi.token = null;
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("artist");
    localStorage.removeItem("venue");
    setCurrUser(null);
    navigate("/login");
  };

  return (
    <UserContext.Provider value={{ currUser, setCurrUser, isLoading, logout }}>
      {children}
    </UserContext.Provider>
  );
};
