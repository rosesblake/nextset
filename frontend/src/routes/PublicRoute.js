import React from "react";
import { Navigate } from "react-router-dom";
import { useUser } from "../contexts/UserContext";

function PublicRoute({ children }) {
  const { currUser } = useUser();

  return currUser ? (
    <Navigate to={`/${currUser.account_type}/dashboard`} replace />
  ) : (
    children
  );
}

export { PublicRoute };
