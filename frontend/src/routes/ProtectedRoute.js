import React from "react";
import { Navigate } from "react-router-dom";
import { useUser } from "../contexts/UserContext";

function ProtectedRoute({ children, accountType }) {
  const { currUser, isLoading } = useUser();

  if (isLoading) return null;

  const notAuthed =
    !currUser || (accountType && currUser.account_type !== accountType);

  if (notAuthed) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export { ProtectedRoute };
