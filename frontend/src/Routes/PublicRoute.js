import React from "react";
import { Navigate } from "react-router-dom";
import { useUser } from "../components/UserContext";

function PublicRoute({ children }) {
  const { currUser } = useUser();

  return currUser ? (
    <Navigate to={`/${currUser.account_type}/home`} replace />
  ) : (
    children
  );
}

export { PublicRoute };
