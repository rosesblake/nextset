import React from "react";
import { Navigate } from "react-router-dom";
import { useUser } from "../contexts/UserContext";
import { Spinner } from "../shared/components/Spinner";
import { useLoading } from "../contexts/LoadingContext";

function ProtectedRoute({ children, accountType }) {
  const { currUser } = useUser();
  const { isLoading } = useLoading();
  const token = localStorage.getItem("token");

  if (isLoading) {
    return <Spinner />;
  }

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
