package com.iforddow.authsuite.controller;

import com.iforddow.authsuite.dto.UserDTO;
import com.iforddow.authsuite.request.LoginRequest;
import com.iforddow.authsuite.request.RegisterRequest;
import com.iforddow.authsuite.service.AuthService;
import jakarta.servlet.http.HttpServletResponse;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CookieValue;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

/*
* A controller for handling authentication-related requests.
*
* @author IFD
* @since 2025-06-14
* */
@RestController
@AllArgsConstructor
public class AuthController {

    private final AuthService authService;

    /**
     * Handles user registration requests.
     *
     * @param registerRequest The request object containing user registration details.
     * @return ResponseEntity containing UserDTO if registration is successful.
     *
     * @author IFD
     * @date 2025-06-14
     */
    @PostMapping("/register")
    public ResponseEntity<UserDTO> register(@RequestBody RegisterRequest registerRequest) {
        // Delegate the registration request to the AuthService
        return authService.register(registerRequest);
    }

    /*
    * A method to handle user login requests.
    *
    * @param loginRequest The request object containing user login details.
    * @return ResponseEntity containing UserDTO if login is successful.
    *
    * @author IFD
    * @date 2025-06-15
    * */
    @PostMapping("/login")
    public ResponseEntity<Map<String, Object>> login(@RequestBody LoginRequest loginRequest, HttpServletResponse response) {
        // Delegate the login request to the AuthService
        return authService.login(loginRequest, response);
    }

    /*
    * A method to handle token refresh requests.
    *
    * @param refreshToken The refresh token from the request cookie.
    * @return ResponseEntity containing the new access token if refresh is successful.
    *
    * @author IFD
    * @date 2025-06-15
    * */
    @PostMapping("/refresh")
    public ResponseEntity<Map<String, String>> refresh(@CookieValue("auth_rt") String refreshToken) {
        // Delegate the refresh request to the AuthService
        return authService.refreshToken(refreshToken);
    }

}
