package com.iforddow.authsuite.request;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

/**
 * A request object for user login containing username and password.
 * This class is used to encapsulate the login credentials provided by the user.
 *
 * @author IFD
 * @date 2025-06-19
 */
@Data
public class LoginRequest {

    private @NotNull String username;
    private @NotNull String password;

}
