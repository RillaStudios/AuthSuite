package com.iforddow.authsuite.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.argon2.Argon2PasswordEncoder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.*;
import org.springframework.security.crypto.scrypt.SCryptPasswordEncoder;

import java.util.HashMap;
import java.util.Map;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity(securedEnabled = true, jsr250Enabled = true)
public class SecurityConfig {

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

}
