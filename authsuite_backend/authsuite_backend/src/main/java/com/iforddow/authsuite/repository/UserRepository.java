package com.iforddow.authsuite.repository;
import com.iforddow.authsuite.jpa.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.UUID;

/**
* A repository interface for managing user entities.
* This interface extends JpaRepository to provide CRUD operations
* for User entities.
*
* @author IFD
* @date 2025-06-19
* */
public interface UserRepository extends JpaRepository<User, UUID> {

    Optional<User> findByEmail(String email);

}
