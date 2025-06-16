package com.iforddow.authsuite.exception;

public class BadBodyException extends RuntimeException {

    public BadBodyException(String message) {

        super(message != null && !message.isEmpty() ? message : "Bad body request");

    }
}
