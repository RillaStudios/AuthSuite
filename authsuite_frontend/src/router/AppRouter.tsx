import { BrowserRouter, Route, Routes } from "react-router-dom";
import NotFoundPage from "../pages/NotFoundPage";
import AuthPage from "../pages/AuthPage";
import { useAuth } from "../context/AuthProvider";
import { ProtectedRoute } from "./ProtectedRoute";
import HomePage from "../pages/HomePage";
import { useLoading } from "../context/LoadingContext";
import { Center, Loader } from "@mantine/core";
import AuthSuiteSettings from "../pages/AuthSuiteSettings";

export default function AppRouter() {
  const { isAuthenticated } = useAuth();

  const { loading } = useLoading();

  console.log("isAuthenticated:", isAuthenticated);

  return loading ? (
    <Center h={"100vh"}>
      <Loader />
    </Center>
  ) : (
    <BrowserRouter>
      <Routes>
        {/* Landing Page */}
        <Route
          path="/"
          element={
            isAuthenticated ? (
              <ProtectedRoute>
                <HomePage />
              </ProtectedRoute>
            ) : (
              <AuthPage />
            )
          }
        />
        {/* Settings Page */}
        <Route
          path="/settings"
          element={
            <ProtectedRoute>
              <AuthSuiteSettings />
            </ProtectedRoute>
          }
        />
        {/* Catch-all route for 404 Not Found */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}
