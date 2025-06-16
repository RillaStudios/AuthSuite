package com.iforddow.authsuite.controller;

import com.iforddow.authsuite.dto.UserDTO;
import com.iforddow.authsuite.request.RegisterRequest;
import com.iforddow.authsuite.service.AuthService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

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
    public ResponseEntity<UserDTO> register(RegisterRequest registerRequest) {
        // Delegate the registration request to the AuthService
        return authService.register(registerRequest);
    }

}
