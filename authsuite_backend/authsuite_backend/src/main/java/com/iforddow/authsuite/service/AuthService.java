package com.iforddow.authsuite.service;

import com.iforddow.authsuite.dto.UserDTO;
import com.iforddow.authsuite.exception.BadBodyException;
import com.iforddow.authsuite.exception.EmailException;
import com.iforddow.authsuite.exception.ResourceAlreadyExists;
import com.iforddow.authsuite.jpa.entity.User;
import com.iforddow.authsuite.repository.UserRepository;
import com.iforddow.authsuite.request.RegisterRequest;
import com.iforddow.authsuite.utils.AuthSuiteUtils;
import com.iforddow.authsuite.utils.PasswordUtils;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;

    private final PasswordEncoder passwordEncoder;

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
        if(AuthSuiteUtils.isNotNullOrEmpty(registerRequest.getPassword())) {
            throw new BadBodyException("Password is required");
        }

        // Check to ensure confirmation password is not null or empty
        if(AuthSuiteUtils.isNotNullOrEmpty(registerRequest.getConfirmPassword())) {
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
                .build();

        // Save the user to the database
        userRepository.save(user);

        // Create a UserDTO to return
        UserDTO userDTO = new UserDTO(user);

        // Return the UserDTO wrapped in a ResponseEntity
        return ResponseEntity.ok(userDTO);

    }

}
