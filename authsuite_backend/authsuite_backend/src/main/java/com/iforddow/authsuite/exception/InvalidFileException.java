package com.iforddow.authsuite.exception;

public class InvalidFileException extends RuntimeException {
    public InvalidFileException(String message) {

        super(message != null && !message.isEmpty() ? message : "Invalid file provided");

    }
}
