import React from "react";
import { Navigate } from "react-router-dom";
import { useUser } from "../components/UserContext";
import { Spinner } from "../components/Spinner";

function ProtectedRoute({ children }) {
  const { currUser, isLoading } = useUser();

  if (isLoading) {
    return <Spinner />; // Show spinner while loading
  }

  return currUser ? children : <Navigate to="/login" replace />;
}

export { ProtectedRoute };
