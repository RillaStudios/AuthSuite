import { createContext, useContext, useState, type ReactNode } from "react";
import type NavActiveContextType from "../types/NavActiveContextType";

const NavActiveContext = createContext<NavActiveContextType | undefined>(
  undefined,
);

export const NavActiveProdiver = ({ children }: { children: ReactNode }) => {
  // State to hold user information and authentication status
  const [activeLabel, setActiveLabel] = useState<string>("");

  const setLink = (label: string) => {
    setActiveLabel(label);
  };

  /* 
    A context value that provides the loading state and functions
    to manage it. This value is passed down to components
    that need to access or modify the loading state.
  
    @author IFD
    @date 2025-06-15
    */
  const value: NavActiveContextType = {
    activeLabel: activeLabel,
    setActiveLabel: setLink,
  };

  return (
    <NavActiveContext.Provider value={value}>
      {children}
    </NavActiveContext.Provider>
  );
};

export const useNavActive = () => {
  const context = useContext(NavActiveContext);
  if (!context)
    throw new Error("useNavActive must be used within a NavActiveProdiver");
  return context;
};
