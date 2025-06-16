package com.iforddow.authsuite.utils;

public class PasswordUtils {

    private static final int MIN_LENGTH = 8;
    private static final int MAX_LENGTH = 64;

    /**
     * Validates the given password against the defined criteria.
     *
     * @param password the password to validate
     *
     * @return null if the password is valid, otherwise a validation error message
     *
     * @author IFD
     * @date 2025-06-14
     */
    public static String validate(String password) {
        if (password == null || password.isEmpty()) {
            return "Password cannot be null or empty";
        }
        if (password.length() < MIN_LENGTH || password.length() > MAX_LENGTH) {
            return "Password must be between " + MIN_LENGTH + " and " + MAX_LENGTH + " characters long";
        }
        if (!password.matches(".*[A-Z].*")) {
            return "Password must contain at least one uppercase letter";
        }
        if (!password.matches(".*[a-z].*")) {
            return "Password must contain at least one lowercase letter";
        }
        if (!password.matches(".*\\d.*")) {
            return "Password must contain at least one digit";
        }
        if (!password.matches(".*[!@#$%^&*(),.?\":{}|<>].*")) {
            return "Password must contain at least one special character";
        }

        return null;
    }

}
