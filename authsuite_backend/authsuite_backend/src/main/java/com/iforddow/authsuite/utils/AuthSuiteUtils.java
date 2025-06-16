package com.iforddow.authsuite.utils;

/**
 * Utility class for common operations in the AuthSuite application.
 *
 * @author IFD
 * @since 2025-06-14
 */
public class AuthSuiteUtils {

    /*
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

    /*
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

    /*
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

}
