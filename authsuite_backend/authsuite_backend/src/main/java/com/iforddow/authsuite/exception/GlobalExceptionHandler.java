package com.iforddow.authsuite.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.Map;

/*
* A global exception handler for the application that handles various exceptions
* and returns appropriate HTTP responses.
*
* This class uses Spring's @RestControllerAdvice to handle exceptions globally
* across all controllers in the application.
*
* @author IFD
* @date 2025-06-14
* */
@RestControllerAdvice
public class GlobalExceptionHandler {

    // Handle exception when a resource is not found
    @ExceptionHandler(ResourceNotFoundException.class)
    public ResponseEntity<?> handleResourceNotFoundException(ResourceNotFoundException ex) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("error", ex.getMessage()));
    }

    // Handle exception when no content is available
    @ExceptionHandler(NoContentException.class)
    public ResponseEntity<?> handleNoContentException(NoContentException ex) {
        return ResponseEntity.status(HttpStatus.NO_CONTENT).body(Map.of("error", ex.getMessage()));
    }

    // Handle exception when a resource already exists
    @ExceptionHandler(ResourceAlreadyExists.class)
    public ResponseEntity<?> handleResourceAlreadyExists(ResourceAlreadyExists ex) {
        return ResponseEntity.status(HttpStatus.CONFLICT).body(Map.of("error", ex.getMessage()));
    }

    // Handle exception when a user does not have sufficient permissions
    @ExceptionHandler(InsufficientPermissions.class)
    public ResponseEntity<?> handleInsufficientPermissions(InsufficientPermissions ex) {
        return ResponseEntity.status(HttpStatus.FORBIDDEN).body(Map.of("error", ex.getMessage()));
    }

    @ExceptionHandler(BadBodyException.class)
    public ResponseEntity<?> handleBadBodyException(BadBodyException ex) {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Map.of("error", ex.getMessage()));
    }

}
