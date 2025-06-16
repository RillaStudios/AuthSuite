import { type MantineThemeOverride } from "@mantine/core";
import { defaultTheme } from "./themes/DefaultTheme";

/* 
A collection of themes for authentication app. Note that this will
definitley change in the future. Perhaps a more dynamic or even custom
theme maker. Right now it is just a single theme (Default Theme).

@Author: IFD
*/
export const AuthThemes: MantineThemeOverride[] = [
    defaultTheme,
]