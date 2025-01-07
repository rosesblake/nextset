import React, { createContext, useContext, useState, useEffect } from "react";

// Create a Context for the current user
const UserContext = createContext();

// Custom hook to use the UserContext
export const useUser = () => {
  return useContext(UserContext);
};

// Provider to wrap your app and provide the user state
export const UserProvider = ({ children }) => {
  const [currUser, setCurrUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true); // Add a loading state

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

  return (
    <UserContext.Provider value={{ currUser, setCurrUser, isLoading }}>
      {children}
    </UserContext.Provider>
  );
};
