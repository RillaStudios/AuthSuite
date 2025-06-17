import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";
import type React from "react";
import { useLoading } from "../context/LoadingContext";
import { Center, Loader } from "@mantine/core";

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuth();

  const { loading } = useLoading();

  console.log("isAuthenticated for Protected Route:", isAuthenticated);

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
