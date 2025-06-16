package com.iforddow.authsuite.exception;

public class ResourceNotFoundException extends RuntimeException {

    public ResourceNotFoundException(String message) {

        super((message != null && !message.isEmpty()) ? message : "Requested resource not found");

    }

}
