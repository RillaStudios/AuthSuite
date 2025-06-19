import type { MantineThemeOverride } from "@mantine/core";
import type ThemeType from "./ThemeType";

/* 
This interface defines the structure of the 
ThemeContextType used in the application.

@author IFD
@date 2025-06-17
*/
export interface ThemeContextType {
    theme: MantineThemeOverride | undefined;
    defaultTheme: ThemeType;
    currentThemeType: ThemeType;
    saveTheme: (theme: FormData) => Promise<void>;
}