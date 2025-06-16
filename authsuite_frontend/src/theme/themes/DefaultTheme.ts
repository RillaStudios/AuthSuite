import { createTheme, Loader } from "@mantine/core";
import LoaderCube from "../../components/loader/LoaderCube";

/* 
A Crimson theme for the application.

@author: IFD
*/
export const defaultTheme = createTheme({
    //! APP COLORS

    // Primary color
    primaryColor: 'primary',

    // Color scheme
    colors: {
        primary: [
            "#e1f8ff",
            "#cbedff",
            "#9ad7ff",
            "#64c1ff",
            "#3aaefe",
            "#20a2fe",
            "#099cff",
            "#0088e4",
            "#0079cd",
            "#0068b6"
        ],
        secondary: [
            "#e4ffee",
            "#d2f9e1",
            "#a8f0c3",
            "#7be7a3",
            "#4ade80",
            "#3cdb76",
            "#2bd96c",
            "#1ac05b",
            "#0aab4f",
            "#009440"
        ],
        tertiary: [
            "#fff0e6",
            "#ffd9cc",
            "#ffbfa6",
            "#ffa280",
            "#ff8966",
            "#ff704d",
            "#ff5c39",
            "#e64e2d",
            "#cc4325",
            "#b2381f"
        ]
    },

    // Default black color
    black: '#0B1215',

    // Default white color
    white: '#FAF9F6',

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
        xs: '36em',
        sm: '48em',
        md: '62em',
        lg: '75em',
        xl: '88em',
    },

    //! APP LOOK AND FEEL

    // Shows a focus ring on elements when they are focused
    focusRing: 'auto',

    // Default radius for components
    defaultRadius: 'sm',

    // Radius sizes
    radius: {
        xs: '0.125rem',
        sm: '0.25rem',
        md: '0.375rem',
        lg: '0.5rem',
        xl: '0.75rem',
        xxl: '1rem',
    },

    // Cursor style for all components
    cursorType: 'pointer',

    // Shadow style for all components
    shadows: {
        xs: '0 1px 2px rgba(0, 0, 0, 0.05)',
        sm: '0 1px 3px rgba(0, 0, 0, 0.1)',
        md: '0 1px 5px rgba(0, 0, 0, 0.15)',
        lg: '0 1px 10px rgba(0, 0, 0, 0.2)',
        xl: '0 1px 20px rgba(0, 0, 0, 0.25)',
    },

    // Scale factor for all components
    scale: 1,

    //! COMPONENT SETTINGS

    components: {
        // Override loader styles
        Loader: Loader.extend({
            defaultProps: {
                loaders: { ...Loader.defaultLoaders, custom: LoaderCube },
                type: 'custom',
            },
        })

    },
    

    //! FONT SETTINGS

    // Enable font smoothing
    fontSmoothing: true,

    // Font family for all components
    fontFamily: 'Roboto, -apple-system, BlinkMacSystemFont, Segoe UI, Helvetica, Arial, sans-serif',

    // Font family for headings
    headings: {
        fontFamily: 'DM Sans, -apple-system, BlinkMacSystemFont, Segoe UI, Helvetica, Arial, sans-serif',
    },
})