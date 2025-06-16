package com.iforddow.authsuite.exception;

public class PasswordException extends RuntimeException {

    public PasswordException(String message) {

      super(message != null && !message.isEmpty() ? message : "Password validation failed");

    }
}
