package com.iforddow.authsuite.controller;

import com.iforddow.authsuite.request.ThemeRequest;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ThemeController {

    @PatchMapping("/theme")
    public String updateTheme(@RequestBody ThemeRequest themeRequest) {
        // Logic to update the theme settings
        return "Theme updated successfully";
    }

}
