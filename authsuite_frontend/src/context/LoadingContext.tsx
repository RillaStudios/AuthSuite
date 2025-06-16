import { createContext, useContext, useState, type ReactNode } from "react";
import type LoadingContextType from "../types/LoadingContextType";

// A React context for managing loading state.
const LoadingContext = createContext<LoadingContextType | undefined>(undefined);

export const LoadingProvider = ({ children }: { children: ReactNode }) => {
  // This hook is used to manage loading state in components.
  // It provides a simple way to show and hide loading indicators.

  const [loading, setLoading] = useState(false);

  // Function to toggle the loading state
  const toggleLoading = (state: boolean) => {
    setLoading(state);
  };

  /* 
  A context value that provides the loading state and functions
  to manage it. This value is passed down to components
  that need to access or modify the loading state.

  @author IFD
  @date 2025-06-15
  */
  const value: LoadingContextType = {
    loading,
    toggleLoading,
  };

  return (
    <LoadingContext.Provider value={value}>{children}</LoadingContext.Provider>
  );
};

export const useLoading = () => {
  const context = useContext(LoadingContext);
  if (!context)
    throw new Error("useLoading must be used within a LoadingProvider");
  return context;
};
