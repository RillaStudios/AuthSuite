import { BrowserRouter, Route, Routes } from "react-router-dom";
import NotFoundPage from "../pages/NotFoundPage";
import AuthPage from "../pages/AuthPage";
import { useAuth } from "../context/AuthProvider";
import { ProtectedRoute } from "./ProtectedRoute";
import HomePage from "../pages/HomePage";
import { useLoading } from "../context/LoadingContext";

export default function AppRouter() {
  const { isAuthenticated } = useAuth();

  const { loading } = useLoading();

  return loading ? (
    <div className="loading-screen">
      <h1>Loading...</h1>
    </div>
  ) : (
    <BrowserRouter>
      <Routes>
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
        {/* Catch-all route for 404 Not Found */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}
