package com.iforddow.authsuite.request;

import lombok.Data;

@Data
public class ThemeRequest {

    private String primaryColor;
    private String secondaryColor;
    private String tertiaryColor;
    private String logoUrl;
    private String faviconUrl;

}
