package com.iforddow.authsuite.service;

import com.iforddow.authsuite.dto.UserDTO;
import com.iforddow.authsuite.exception.*;
import com.iforddow.authsuite.jpa.entity.User;
import com.iforddow.authsuite.repository.UserRepository;
import com.iforddow.authsuite.request.LoginRequest;
import com.iforddow.authsuite.request.RegisterRequest;
import com.iforddow.authsuite.utils.AuthSuiteUtils;
import com.iforddow.authsuite.utils.PasswordUtils;
import jakarta.servlet.ServletResponse;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AccountStatusException;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.Map;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;

    private final PasswordEncoder passwordEncoder;

    private final AuthenticationManager authenticationManager;

    private final JwtService jwtService;
    private final ServletResponse servletResponse;

    /*
    * A method to handle user registration.
    *
    * @param registerRequest The request object containing user registration details.
    *
    * @return ResponseEntity containing UserDTO if registration is successful.
    *
    * @throws BadBodyException if the request body is invalid.
    *
    * @author IFD
    * @date 2025-06-14
    * */
    @Transactional
    public ResponseEntity<UserDTO> register(RegisterRequest registerRequest) {

        // Check to ensure the email is not null or empty
        if(registerRequest.getEmail() == null || registerRequest.getEmail().isEmpty()) {
            throw new BadBodyException("Email is required");
        }

        if(!AuthSuiteUtils.isValidEmail(registerRequest.getEmail())) {
            throw new EmailException("Invalid email format");
        }

        // Check to ensure the password is not null or empty
        if(AuthSuiteUtils.isNullOrEmpty(registerRequest.getPassword())) {
            throw new BadBodyException("Password is required");
        }

        // Check to ensure confirmation password is not null or empty
        if(AuthSuiteUtils.isNullOrEmpty(registerRequest.getConfirmPassword())) {
            throw new BadBodyException("Confirmation password is required");
        }

        // Check to ensure the password and confirmation password match
        if(!registerRequest.getPassword().equals(registerRequest.getConfirmPassword())) {
            throw new BadBodyException("Passwords do not match");
        }

        // Validate the password strength
        String validationError = PasswordUtils.validate(registerRequest.getPassword());

        if(validationError != null) {
            throw new BadBodyException(validationError);
        }

        // Check to ensure the password is not null or empty
        Optional<User> existingUser = userRepository.findByEmail(registerRequest.getEmail());

        // If a user with the same email already exists, throw an exception
        if(existingUser.isPresent()) {
            throw new ResourceAlreadyExists("A user with this email already exists");
        }

        // Create a new user
        User user = User.builder()
                .email(registerRequest.getEmail())
                .password(passwordEncoder.encode(registerRequest.getPassword()))
                .lastActive(new Date().toInstant())
                .createdAt(new Date().toInstant())
                .isSuperuser(false)
                .build();

        // Save the user to the database
        userRepository.save(user);

        // Create a UserDTO to return
        UserDTO userDTO = new UserDTO(user);

        // Return the UserDTO wrapped in a ResponseEntity
        return ResponseEntity.ok(userDTO);

    }

    /*
    * A method to handle user login.
    *
    * @param loginRequest The request object containing user login details.
    *
    * @return ResponseEntity containing UserDTO if login is successful.
    *
    * @throws ResourceNotFoundException if the user is not found with the provided email.
    *
    * @author IFD
    * @date 2025-06-15
    * */
    public ResponseEntity<Map<String, Object>> login(LoginRequest loginRequest, HttpServletResponse response) {

        Optional<User> user = userRepository.findByEmail(loginRequest.getUsername());

        // Check if the user exists
        if(user.isEmpty()) {
            throw new ResourceNotFoundException("User not found with email: " + loginRequest.getUsername());
        }

        try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword())
            );

            SecurityContextHolder.getContext().setAuthentication(authentication);

        } catch (AuthenticationException ex) {

            if(ex instanceof BadCredentialsException) {
                throw new InvalidCredentialsException("Invalid credentials provided");
            }
            // Log or return the specific error
            throw new BadBodyException("Authentication failed: " + ex.getMessage());
        }

        String accessToken = jwtService.generateJwtToken(loginRequest.getUsername());
        String refreshToken = jwtService.generateRefreshToken(loginRequest.getUsername());

        Cookie refreshCookie = new Cookie("auth_rt", refreshToken);

        refreshCookie.setHttpOnly(true);
        refreshCookie.setPath("/");
        refreshCookie.setMaxAge(jwtService.jwtRefreshExpirationMs / 1000);
        refreshCookie.setSecure(true);

        response.addCookie(refreshCookie);

        //Make UserDTO
        UserDTO userDTO = new UserDTO(user.get());

        return ResponseEntity.ok(Map.of("user", userDTO, "accessToken", accessToken));

    }

    /*
    * A method to handle token refresh requests.
    *
    * @param refreshToken The refresh token from the request cookie.
    * @return ResponseEntity containing the new access token if refresh is successful.
    *
    * @throws BadBodyException if the refresh token is invalid.
    *
    * @author IFD
    * @date 2025-06-15
    * */
    public ResponseEntity<Map<String, String>> refreshToken(String refreshToken) {

        if (jwtService.validateJwtToken(refreshToken)) {

            String username = jwtService.getUsernameFromToken(refreshToken);
            String newAccessToken = jwtService.generateJwtToken(username);

            return ResponseEntity.ok(Map.of("accessToken", newAccessToken));

        } else {

            throw new BadBodyException("Invalid refresh token");

        }
    }

}
