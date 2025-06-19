/* 
A TypeScript interface representing the structure of a theme object.
It includes properties for primary, secondary, and tertiary colors,
title and body fonts, as well as favicon and logo images.

@author IFD
@date 2025-06-17
*/
export default interface ThemeType {
    primaryColor: string;
    secondaryColor: string;
    tertiaryColor: string;
    titleFont: string;
    bodyFont: string;
    favicon: string | null;
    logo: string | null;
    lastUpdated?: Date;
    lastUpdatedBy?: string;
}