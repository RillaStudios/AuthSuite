package com.iforddow.authsuite.dto;
import com.iforddow.authsuite.jpa.entity.User;
import java.util.UUID;

/**
* A Data Transfer Object (DTO) for User entity.
*
* @author IFD
* @since 2025-06-14
* */
public record UserDTO(UUID id, String email) {

    /**
    * A constructor to create a UserDTO from a User entity.
    *
    * @param user The User entity to convert.
    *
    * @author IFD
    * @since 2025-06-14
    * */
    public UserDTO(User user) {
        this(user.getId(), user.getEmail());
    }

}
