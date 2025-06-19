package com.iforddow.authsuite.utils;

import com.iforddow.authsuite.exception.InvalidFileException;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;

/**
 * Utility class for common operations in the AuthSuite application.
 *
 * @author IFD
 * @since 2025-06-14
 */
public class AuthSuiteUtils {

    /**
    * A method to check if a string is not null and not empty.
    *
    * @param str the string to check
    *
    * @return true if the string is not null and not empty, false otherwise
    *
    * @author IFD
    * @date 2025-06-14
    * */
    public static boolean isNotNullOrEmpty(String str) {
        return str != null && !str.isEmpty();
    }

    /**
    * A method to check if a string is null or empty.
    *
    * @param str the string to check
    *
    * @return true if the string is null or empty, false otherwise
    *
    * @author IFD
    * @date 2025-06-14
    * */
    public static boolean isNullOrEmpty(String str) {
        return str == null || str.isEmpty();
    }

    /**
    * A method to validate if a string is a valid email format.
    *
    * @param email the email string to validate
    *
    * @return true if the email is valid, false otherwise
    *
    * @author IFD
    * @date 2025-06-14
    * */
    public static boolean isValidEmail(String email) {

        if(isNullOrEmpty(email)) {
            return false;
        }

        // Simple regex for basic email validation
        String emailRegex = "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$";

        return email.matches(emailRegex);
    }

    /**
    * A method to validate if a file is an image.
    *
    * @param file the MultipartFile to validate
    *
    * @throws RuntimeException if the file is not an image
    *
    * @author IFD
    * @date 2025-06-14
    * */
    public static boolean validImage(MultipartFile file) {
        String contentType = file.getContentType();
        return contentType != null && contentType.startsWith("image/");
    }

    /**
    * A method to help in the uploading of images.
    * This method checks if the file is valid, creates the necessary directories,
    * and saves the file to the specified path.
    *
    * @param file the MultipartFile to upload
    *
    * @return the path where the image is saved
    *
    * @throws InvalidFileException if the file is empty or not a valid image
    * @throws UnknownError if there is an error during file upload
    *
    * @author IFD
    * @date 2025-06-14
    * */
    public static String uploadImage(MultipartFile file) {
        if (file == null || file.isEmpty()) {
            throw new InvalidFileException("File is empty or not provided. Please upload a valid image.");
        }

        if (!validImage(file)) {
            throw new InvalidFileException("Invalid logo file. Please upload a valid image.");
        }
        try {
            String logoExt = file.getOriginalFilename() != null ?
                    file.getOriginalFilename().substring(file.getOriginalFilename().lastIndexOf('.')) : "";

            if (logoExt.isEmpty()) {
                throw new InvalidFileException("Invalid file extension. Please upload a valid image.");
            }

            Path logoPath = Paths.get("/opt/authsuite/uploads/logo" + logoExt);
            if (!Files.exists(logoPath.getParent())) {
                Files.createDirectories(logoPath.getParent());
            }
            Files.copy(file.getInputStream(), logoPath, StandardCopyOption.REPLACE_EXISTING);

            return "/uploads/logo" + logoExt;

        } catch (IOException e) {
            throw new RuntimeException("Failed to upload logo" + e);
        }
    }

}
