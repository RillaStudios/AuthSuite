import { BrowserRouter, Route, Routes } from "react-router-dom";
import NotFoundPage from "../pages/NotFoundPage";
import AuthPage from "../pages/AuthPage";
import { useAuth } from "../context/AuthProvider";
import { ProtectedRoute } from "./ProtectedRoute";
import HomePage from "../pages/HomePage";
import { useLoading } from "../context/LoadingContext";
import { Center, Loader } from "@mantine/core";
import AuthSuiteSettings from "../pages/AuthSuiteSettings";

/* 
A React component that serves as the main router for the application,
handling routing and authentication logic. 

@author IFD
@date 2025-06-15
*/
export default function AppRouter() {
  // isAuthenticated is a boolean indicating if the user is authenticated
  const { isAuthenticated } = useAuth();

  // loading is a boolean indicating if the application is currently loading
  const { loading } = useLoading();

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
