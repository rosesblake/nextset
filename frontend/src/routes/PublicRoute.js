import React from "react";
import { Navigate } from "react-router-dom";
import { useUser } from "../contexts/UserContext";
import { Spinner } from "../shared/components/Spinner";

function PublicRoute({ children }) {
  const { currUser, isLoading } = useUser();

  if (isLoading) {
    console.log("PublicRoute - Showing spinner...");
    return <Spinner />;
  }

  return currUser ? (
    <Navigate to={`/${currUser.account_type}/dashboard`} replace />
  ) : (
    children
  );
}

export { PublicRoute };
