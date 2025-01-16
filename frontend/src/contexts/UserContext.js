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
    if (user) {
      setCurrUser(user); // Load user from localStorage
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (currUser) {
      localStorage.setItem("user", JSON.stringify(currUser)); // Save user to localStorage
    } else {
      localStorage.removeItem("user"); // Remove user from localStorage if null
    }
  }, [currUser]);

  const logout = () => {
    NextSetApi.token = null;
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setCurrUser(null);
    navigate("/login");
  };

  return (
    <UserContext.Provider value={{ currUser, setCurrUser, isLoading, logout }}>
      {children}
    </UserContext.Provider>
  );
};
