package com.iforddow.authsuite.exception;

public class ResourceAlreadyExists extends RuntimeException {

    public ResourceAlreadyExists(String message) {

        super(message != null && !message.isEmpty() ? message : "Resource already exists");

    }
}
