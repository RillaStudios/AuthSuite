import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import type { ThemeContextType } from "../types/theme/ThemeContextType";
import type ThemeType from "../types/theme/ThemeType";
import { createTheme, Loader, type MantineThemeOverride } from "@mantine/core";
import { generateColors } from "@mantine/colors-generator";
import LoaderCube from "../components/loader/LoaderCube";
import axios from "axios";
import { useLoading } from "./LoadingContext";
import { AUTH_API_ENDPOINTS } from "../config/auth_api_config";

// A React context for managing theme state.
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

/* 
A React context provider for managing, creating, and updating 
the theme of the application.

@author IFD
@date 2025-06-17
*/
export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  // The default theme object with initial values for colors, fonts, favicon, and logo.
  const defaultTheme: ThemeType = {
    primaryColor: "#20a2fe",
    secondaryColor: "#3cdb76",
    tertiaryColor: "#ff704d",
    titleFont: "DM Sans",
    bodyFont: "Roboto",
    favicon: null,
    logo: null,
  };

  // Get the loading context to manage loading state.
  const { toggleLoading } = useLoading();

  // A state variable to hold the current theme.
  const [theme, setTheme] = useState<MantineThemeOverride>();

  const [currentThemeType, setCurrentThemeType] =
    useState<ThemeType>(defaultTheme);

  /* 
  A useEffect hook that runs when the component mounts.
  It fetches the current theme from the server and sets it in the state.

  @author IFD
  @date 2025-06-17
  */
  useEffect(() => {
    // Fetch the current theme when the component mounts.
    fetchTheme();
  }, []);

  /* 
  A method to generate an updated theme based on the provided new theme.
  It creates a new Mantine theme override object with colors, fonts,
  and other properties derived from the new theme.

  @param newTheme - A partial theme object containing properties to update.

  @author IFD
  @date 2025-06-17
  */
  const generateTheme = (
    newTheme: Partial<ThemeType>,
  ): MantineThemeOverride => {
    // Generate colors based on the new theme's primary, secondary, and tertiary colors.
    const primaryColorList = generateColors(
      newTheme.primaryColor ?? defaultTheme.primaryColor,
    );
    const secondaryColorList = generateColors(
      newTheme.secondaryColor ?? defaultTheme.secondaryColor,
    );
    const tertiaryColorList = generateColors(
      newTheme.tertiaryColor ?? defaultTheme.tertiaryColor,
    );

    const updatedTheme = createTheme({
      //! APP COLORS

      // Primary color
      primaryColor: "primary",

      // Color scheme
      colors: {
        primary: primaryColorList,
        secondary: secondaryColorList,
        tertiary: tertiaryColorList,
      },

      // Default black color
      black: "#0B1215",

      // Default white color
      white: "#FAF9F6",

      //! COLOR SETTINGS

      // The primary color shade to use
      primaryShade: 5,

      // Disable auto contrast for all components
      autoContrast: true,

      // The threshold to use for luminance-based color scheme switching
      // will switch text color to black if the luminance of the background
      // color is above this value
      luminanceThreshold: 0.5,

      //! APP BREKPOINTS

      // App breakpoints
      breakpoints: {
        xs: "36em",
        sm: "48em",
        md: "62em",
        lg: "75em",
        xl: "88em",
      },

      //! APP LOOK AND FEEL

      // Shows a focus ring on elements when they are focused
      focusRing: "auto",

      // Default radius for components
      defaultRadius: "sm",

      // Radius sizes
      radius: {
        xs: "0.125rem",
        sm: "0.25rem",
        md: "0.375rem",
        lg: "0.5rem",
        xl: "0.75rem",
        xxl: "1rem",
      },

      // Cursor style for all components
      cursorType: "pointer",

      // Shadow style for all components
      shadows: {
        xs: "0 1px 2px rgba(0, 0, 0, 0.05)",
        sm: "0 1px 3px rgba(0, 0, 0, 0.1)",
        md: "0 1px 5px rgba(0, 0, 0, 0.15)",
        lg: "0 1px 10px rgba(0, 0, 0, 0.2)",
        xl: "0 1px 20px rgba(0, 0, 0, 0.25)",
      },

      // Scale factor for all components
      scale: 1,

      //! COMPONENT SETTINGS

      components: {
        // Override loader styles
        Loader: Loader.extend({
          defaultProps: {
            loaders: { ...Loader.defaultLoaders, custom: LoaderCube },
            type: "custom",
          },
        }),
      },

      //! FONT SETTINGS

      // Enable font smoothing
      fontSmoothing: true,

      // Font family for all components
      fontFamily: `${
        newTheme.bodyFont ?? defaultTheme.bodyFont
      }, -apple-system, BlinkMacSystemFont, Segoe UI, Helvetica, Arial, sans-serif`,

      // Font family for headings
      headings: {
        fontFamily: `${
          newTheme.titleFont ?? defaultTheme.titleFont
        }, -apple-system, BlinkMacSystemFont, Segoe UI, Helvetica, Arial, sans-serif`,
      },
    });

    return updatedTheme;
  };

  /* 
  A method to get the current theme.
  It returns the current theme state.

  @author IFD
  @date 2025-06-17
  */
  const fetchTheme = async () => {
    toggleLoading(true);

    await axios
      .get(`${AUTH_API_ENDPOINTS.THEME}`)
      .then((response) => {
        const data = response.data as ThemeType;
        setTheme(generateTheme(data));
        setCurrentThemeType(data);
      })
      .catch((error) => {
        console.error("Error fetching theme from database:", error);
        setTheme(generateTheme(defaultTheme));
      })
      .finally(() => {
        toggleLoading(false);
      });
  };

  /* 
  A method to save the theme to the database.
  It takes a new theme object as a parameter, updates the state,
  and sends a PATCH request to the server to save the theme.

  @author IFD
  @date 2025-06-17
  */
  const saveTheme = async (formData: FormData) => {
    toggleLoading(true);

    await axios
      .patch(`${AUTH_API_ENDPOINTS.THEME}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        const data = response.data as ThemeType;
        setTheme(generateTheme(data));
        setCurrentThemeType(data);
      })
      .catch((error) => {
        console.error("Error saving theme to database:", error);
        throw error;
      })
      .finally(() => {
        toggleLoading(false);
      });
  };

  /* 
  A value object that contains methods to fetch, save, and reset the theme,
  as well as the current theme state.

  @author IFD
  @date 2025-06-17
  */
  const value: ThemeContextType = {
    saveTheme,
    defaultTheme,
    currentThemeType,
    theme: theme,
  };

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};

/* 
A custom hook to access the theme context.

@author IFD
@date 2025-06-18
*/
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
