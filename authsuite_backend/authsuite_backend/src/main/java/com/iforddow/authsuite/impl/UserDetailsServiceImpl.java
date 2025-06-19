package com.iforddow.authsuite.impl;

import com.iforddow.authsuite.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

/**
* A service that implements UserDetailsService to load user details by username.
* This service is used by Spring Security to authenticate users.
* It retrieves user details from the UserRepository based on the provided username (email).
* If the user is not found, it throws a UsernameNotFoundException.
*
* @author IFD
* @date 2025-06-15
* */
@Service
@RequiredArgsConstructor
public class UserDetailsServiceImpl implements UserDetailsService {

    // Repository to access user data
    private final UserRepository userRepository;

    /**
     * Loads user details by username (email).
     *
     * @param username the email of the user
     * @return UserDetails object containing user information
     * @throws UsernameNotFoundException if the user is not found
     */
    @Override
    public UserDetails loadUserByUsername(String username) {
        return userRepository.findByEmail(username)
                .orElseThrow(() -> new UsernameNotFoundException("User not found with username: " + username));
    }
}
