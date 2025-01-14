import React from "react";
import { Navigate } from "react-router-dom";
import { useUser } from "../components/UserContext";
import { Spinner } from "../components/Spinner";

function ProtectedRoute({ children }) {
  const { currUser, isLoading } = useUser();
  const token = localStorage.getItem("token");
  if (isLoading) {
    return <Spinner />; // Show spinner while loading
  }

  return currUser && token ? children : <Navigate to="/login" replace />;
}

export { ProtectedRoute };
