import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";
import type React from "react";
import { useLoading } from "../context/LoadingContext";
import { Center, Loader } from "@mantine/core";

/* 
A React component that serves as a protected route,
ensuring that only authenticated users can access the wrapped children components.
If the user is not authenticated, they are redirected to the home page.

@author IFD
@date 2025-06-16
*/
export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuth();

  const { loading } = useLoading();

  return loading ? (
    <Center h={"100vh"}>
      <Loader />
    </Center>
  ) : isAuthenticated ? (
    children
  ) : (
    <Navigate to="/" replace />
  );
}
