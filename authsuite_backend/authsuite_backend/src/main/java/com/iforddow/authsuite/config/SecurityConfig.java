package com.iforddow.authsuite.config;

import com.iforddow.authsuite.filter.JwtFilter;
import com.iforddow.authsuite.service.JwtService;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.argon2.Argon2PasswordEncoder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.*;
import org.springframework.security.crypto.scrypt.SCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import java.util.HashMap;
import java.util.Map;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity(securedEnabled = true, jsr250Enabled = true)
@RequiredArgsConstructor
public class SecurityConfig {

    private final JwtService jwtService;
    private final UserDetailsService userDetailsService;

    /*
    * A bean to provide the SecurityFilterChain for the application.
    * This filter chain configures the security settings for HTTP requests,
    * including CSRF protection, session management, and authorization rules.
    *
    * @param http HttpSecurity instance to configure security settings
    * @return SecurityFilterChain instance
    *
    * @author IFD
    * @date 2025-06-15
    * */
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        return http
                .csrf(AbstractHttpConfigurer::disable)
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers("/auth/api/**").permitAll())
                .addFilterBefore(jwtAuthFilter(), UsernamePasswordAuthenticationFilter.class)
                .build();
    }

    /**
     * Provides a PasswordEncoder bean that supports multiple password encoding algorithms.
     * The default encoding algorithm is Argon2, but it also supports legacy encoders like bcrypt, pbkdf2, scrypt, and sha256.
     * Note that the `DelegatingPasswordEncoder` is used to allow for multiple password encodings, but the application
     * will only ever use Argon2 for new passwords. Legacy encoders are included for compatibility with existing passwords.
     *
     * @return a DelegatingPasswordEncoder with the specified encoders
     */
    @SuppressWarnings("deprecation")
    @Bean
    public PasswordEncoder passwordEncoder() {

        String defaultEncodingId = "argon2@SpringSecurity_v5_8";

        Map<String, PasswordEncoder> encoders = new HashMap<>();

        encoders.put("bcrypt", new BCryptPasswordEncoder()); // used only for legacy support
        encoders.put("noop", NoOpPasswordEncoder.getInstance()); // used only for legacy support
        encoders.put("pbkdf2", Pbkdf2PasswordEncoder.defaultsForSpringSecurity_v5_5()); // used only for legacy support
        encoders.put("pbkdf2@SpringSecurity_v5_8", Pbkdf2PasswordEncoder.defaultsForSpringSecurity_v5_8()); // used only for legacy support
        encoders.put("scrypt", SCryptPasswordEncoder.defaultsForSpringSecurity_v4_1()); // used only for legacy support
        encoders.put("scrypt@SpringSecurity_v5_8", SCryptPasswordEncoder.defaultsForSpringSecurity_v5_8()); // used only for legacy support
        encoders.put("argon2", Argon2PasswordEncoder.defaultsForSpringSecurity_v5_2()); // used only for legacy support
        encoders.put("sha256", new StandardPasswordEncoder()); // used only for legacy support
        encoders.put("argon2@SpringSecurity_v5_8", Argon2PasswordEncoder.defaultsForSpringSecurity_v5_8());

        return new DelegatingPasswordEncoder(defaultEncodingId, encoders);
    }

    /*
    * A bean to provide the AuthenticationManager for the application.
    * This manager is used to authenticate users based on their credentials.
    *
    * @param config AuthenticationConfiguration instance that provides the authentication manager
    * @return AuthenticationManager instance
    *
    * @author IFD
    * @date 2025-06-15
    * */
    @Bean
    public AuthenticationManager authManager(AuthenticationConfiguration config) throws Exception {
        return config.getAuthenticationManager();
    }

    /*
    * A bean to provide the JwtFilter for the application.
    *
    * This filter is responsible for validating JWT tokens in incoming requests
    * and setting the authentication context if the token is valid.
    *
    * @return JwtFilter instance
    *
    * @author IFD
    * @date 2025-06-15
    * */
    @Bean
    public JwtFilter jwtAuthFilter() {
        return new JwtFilter(jwtService, userDetailsService);
    }

}
