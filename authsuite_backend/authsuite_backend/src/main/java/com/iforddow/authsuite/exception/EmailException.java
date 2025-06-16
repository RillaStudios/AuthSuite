package com.iforddow.authsuite.exception;

public class EmailException extends RuntimeException {

    public EmailException(String message) {

        super(message != null && !message.isEmpty() ? message : "Email is not valid");

    }

}
