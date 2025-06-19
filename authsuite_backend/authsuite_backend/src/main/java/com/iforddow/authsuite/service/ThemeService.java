package com.iforddow.authsuite.service;
import com.iforddow.authsuite.dto.ThemeDTO;
import com.iforddow.authsuite.exception.BadBodyException;
import com.iforddow.authsuite.jpa.entity.ThemeSetting;
import com.iforddow.authsuite.jpa.entity.User;
import com.iforddow.authsuite.repository.ThemeRepository;
import com.iforddow.authsuite.repository.UserRepository;
import com.iforddow.authsuite.request.ThemeRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import java.net.MalformedURLException;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.UUID;
import static com.iforddow.authsuite.utils.AuthSuiteUtils.uploadImage;

@Service
@RequiredArgsConstructor
public class ThemeService {

    // Repository for theme data access
    private final ThemeRepository themeRepository;

    // Repository for user data access
    private final UserRepository userRepository;

    /**
    * A method to retrieve the current theme settings.
    *
    * @return A ResponseEntity containing the current ThemeDTO.
    *
    * @author IFD
    * @date 2025-06-19
    * */
    public ResponseEntity<ThemeDTO> getTheme() {

        ThemeDTO themeDTO = new ThemeDTO(themeRepository.findFirstByOrderByIdDesc());

        return ResponseEntity.ok(themeDTO);
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
    public ResponseEntity<ThemeDTO> updateTheme(ThemeRequest themeRequest, boolean reset) {

        // Validate that lastUpdated and lastUpdatedBy are not null or empty
        if (themeRequest.getLastUpdated() == null || themeRequest.getLastUpdatedBy() == null
                || themeRequest.getLastUpdatedBy().isEmpty() || themeRequest.getLastUpdated().toString().isEmpty()) {
            throw new BadBodyException("Last updated timestamp and/or user must not be null");
        }

        // Validate that the user exists
        User user = userRepository.findById(UUID.fromString(themeRequest.getLastUpdatedBy()))
                .orElseThrow(() -> new RuntimeException("User not found"));

        // Fetch the latest theme setting
        ThemeSetting theme = themeRepository.findFirstByOrderByIdDesc();

        // Check to see if reset flag is set
        if(!reset) {

            // If reset is false, update the theme with the provided images (if any)
            MultipartFile logoFile = themeRequest.getLogo();
            MultipartFile faviconFile = themeRequest.getFavicon();

            if (logoFile != null && !logoFile.isEmpty()) {
                theme.setLogoUrl(uploadImage(logoFile));
            }

            if (faviconFile != null && !faviconFile.isEmpty()) {
                theme.setFaviconUrl(uploadImage(faviconFile));
            }
        }   else {

            // If reset is true, clear the logo and favicon URLs
            theme.setLogoUrl(null);
            theme.setFaviconUrl(null);
        }

        // Update the theme with the provided colors, fonts, and last updated information
        theme.setPrimaryColor(themeRequest.getPrimaryColor());
        theme.setSecondaryColor(themeRequest.getSecondaryColor());
        theme.setTertiaryColor(themeRequest.getTertiaryColor());
        theme.setLastUpdated(themeRequest.getLastUpdated());
        theme.setLastUpdatedBy(user);
        theme.setBodyFont(themeRequest.getBodyFont());
        theme.setTitleFont(themeRequest.getTitleFont());

        // Save the updated theme setting
        themeRepository.save(theme);

        // Create a ThemeDTO from the updated theme setting
        ThemeDTO themeDTO = new ThemeDTO(theme);

        // Return the updated theme as a ResponseEntity
        return ResponseEntity.ok(themeDTO);
    }

    public Resource getLogo(String filename) {
        try {
            Path path = Paths.get("/opt/authsuite/uploads/" + filename);
            return new UrlResource(path.toUri());
        } catch (MalformedURLException e) {
            throw new RuntimeException("Could not load logo: " + filename, e);
        } catch (Exception e) {
            throw new RuntimeException("Error retrieving logo: " + filename, e);
        }
    }

}
