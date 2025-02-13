import React from "react";
import { Navigate } from "react-router-dom";
import { useUser } from "../contexts/UserContext";

function ProtectedRoute({ children, accountType }) {
  const { currUser } = useUser();
  const token = localStorage.getItem("token");

  // Check authentication and account type
  if (
    !currUser ||
    !token ||
    (accountType && currUser.account_type !== accountType)
  ) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export { ProtectedRoute };
