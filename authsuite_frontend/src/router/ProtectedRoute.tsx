import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";
import type React from "react";

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/auth" replace />;
  }

  return children;
}
