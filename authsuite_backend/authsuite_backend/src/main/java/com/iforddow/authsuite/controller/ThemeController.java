package com.iforddow.authsuite.controller;

import com.iforddow.authsuite.dto.ThemeDTO;
import com.iforddow.authsuite.exception.BadBodyException;
import com.iforddow.authsuite.request.ThemeRequest;
import com.iforddow.authsuite.service.ThemeService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

/**
* A controller for managing theme settings in the application.
* This controller provides endpoints to retrieve and update theme settings.
*
* @author IFD
* @date 2025-06-19
* */
@RestController
@RequiredArgsConstructor
public class ThemeController {

    // ThemeService for handling theme-related operations
    private final ThemeService themeService;

    /**
    * A method to retrieve the current theme settings.
    *
    * @return A ResponseEntity containing the current ThemeDTO.
    *
    * @author IFD
    * @date 2025-06-19
    * */
    @GetMapping("/theme")
    public ResponseEntity<ThemeDTO> getTheme() {

        return themeService.getTheme();

    }

    /**
    * A method to update the theme settings.
    *
    * @param themeRequest The request object containing the theme settings to update.
    * @param reset A boolean flag indicating whether to reset the theme settings.
    *
    * @return A ResponseEntity containing the updated ThemeDTO.
    *
    * @throws BadBodyException if the last updated timestamp or user is null or empty.
    * @throws RuntimeException if the user specified in the request does not exist.
    *
    * @author IFD
    * @date 2025-06-19
    * */
    @PatchMapping(value = "/theme", consumes = "multipart/form-data")
    public ResponseEntity<ThemeDTO> updateTheme(@ModelAttribute ThemeRequest themeRequest,
                                                @RequestParam(name = "reset", required = false, defaultValue = "false") boolean reset) {
        return themeService.updateTheme(themeRequest, reset);
    }

}
