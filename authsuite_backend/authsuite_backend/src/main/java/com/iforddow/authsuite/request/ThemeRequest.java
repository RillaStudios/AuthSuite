package com.iforddow.authsuite.request;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Null;
import lombok.Data;
import org.springframework.web.multipart.MultipartFile;
import java.time.Instant;

/**
 * A request object for updating theme settings.
 * Contains fields for primary, secondary, and tertiary colors,
 * body and title fonts, logo and favicon files, last updated timestamp,
 * and the user who last updated the theme.
 *
 * @author IFD
 * @date 2025-06-19
 */
@Data
public class ThemeRequest {

    private String primaryColor;
    private String secondaryColor;
    private String tertiaryColor;
    private String bodyFont;
    private String titleFont;
    private @Null MultipartFile logo;
    private @Null MultipartFile favicon;
    private @NotNull Instant lastUpdated;
    private @NotNull String lastUpdatedBy;

}
