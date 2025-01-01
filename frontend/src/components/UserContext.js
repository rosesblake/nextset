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

  // Load user from localStorage when app starts
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      setCurrUser(user); // If a user exists in localStorage, set it as the current user
    }
  }, []);

  // Update localStorage whenever the user changes
  useEffect(() => {
    if (currUser) {
      localStorage.setItem("user", JSON.stringify(currUser)); // Save updated user in localStorage
    }
  }, [currUser]);

  return (
    <UserContext.Provider value={{ currUser, setCurrUser }}>
      {children}
    </UserContext.Provider>
  );
};
