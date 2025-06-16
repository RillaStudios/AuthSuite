package com.iforddow.authsuite.exception;

public class NoContentException extends RuntimeException {

    public NoContentException(String message) {

        super(message != null && !message.isEmpty() ? message : "No content available");

    }
}
