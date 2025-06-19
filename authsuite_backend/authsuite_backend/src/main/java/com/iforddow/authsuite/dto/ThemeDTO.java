package com.iforddow.authsuite.dto;

import com.iforddow.authsuite.jpa.entity.ThemeSetting;

/**
* A Data Transfer Object (DTO) for theme settings.
*
* @author IFD
* @date 2025-06-19
* */
public record ThemeDTO(
        String primaryColor,
        String secondaryColor,
        String tertiaryColor,
        String bodyFont,
        String titleFont,
        String logo,
        String favicon,
        String lastUpdated,
        UserDTO lastUpdatedBy
) {

    // Constructor to create a ThemeDTO from a ThemeSetting entity.
    public ThemeDTO(ThemeSetting themeSetting) {
        this(
                themeSetting.getPrimaryColor(),
                themeSetting.getSecondaryColor(),
                themeSetting.getTertiaryColor(),
                themeSetting.getBodyFont(),
                themeSetting.getTitleFont(),
                themeSetting.getLogoUrl(),
                themeSetting.getFaviconUrl(),
                themeSetting.getLastUpdated() != null ? themeSetting.getLastUpdated().toString() : null,
                themeSetting.getLastUpdatedBy() != null ? new UserDTO(themeSetting.getLastUpdatedBy()) : null
        );
    }

}
