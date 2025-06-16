package com.iforddow.authsuite.exception;

public class InsufficientPermissions extends RuntimeException {

    public InsufficientPermissions(String message) {

      super(message != null && !message.isEmpty() ? message : "Insufficient permissions to perform this action.");

    }

}
