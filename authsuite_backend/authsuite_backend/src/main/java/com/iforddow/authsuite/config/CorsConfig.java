package com.iforddow.authsuite.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

/**
* A configuration class for setting up CORS
* (Cross-Origin Resource Sharing) in the Spring
* Boot application.
*
* @author IFD
* @since 2025-06-14
* */
@Configuration
public class CorsConfig {

    /**
     * Configures CORS settings for the application.
     *
     * @return CorsConfigurationSource that defines the CORS configuration.
     *
     * @author IFD
     * @date 2025-06-14
     */
    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration corsConfiguration = new CorsConfiguration();

        corsConfiguration.addAllowedOriginPattern("*"); // Allow all origins
        corsConfiguration.addAllowedMethod("*"); // Allow all HTTP methods
        corsConfiguration.addAllowedHeader("*"); // Allow all headers
        corsConfiguration.setAllowCredentials(true); // Allow credentials (cookies, authorization headers, etc.)

        UrlBasedCorsConfigurationSource urlBasedCorsConfigurationSource = new UrlBasedCorsConfigurationSource();
        urlBasedCorsConfigurationSource.registerCorsConfiguration("/**", corsConfiguration); // Apply CORS configuration to all endpoints

        return urlBasedCorsConfigurationSource;

    }

}
