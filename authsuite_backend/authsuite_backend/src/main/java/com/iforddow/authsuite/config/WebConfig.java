package com.iforddow.authsuite.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.config.annotation.PathMatchConfigurer;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

/**
* A configuration class for setting up web-related configurations in the Spring Boot application.
* This class configures path matching for REST controllers and resource handlers for serving static files.
*
* @author IFD
* @since 2025-06-14
*/
@Configuration
public class WebConfig implements WebMvcConfigurer {

    /**
     * Configures path matching for REST controllers.
     * This method adds a prefix to the paths of all REST controllers annotated with @RestController.
     *
     * @param configurer PathMatchConfigurer instance to configure path matching
     *
     * @author IFD
     * @date 2025-06-14
     */
    @Override
    public void configurePathMatch(PathMatchConfigurer configurer) {
        configurer.addPathPrefix("/auth/api", c -> c.isAnnotationPresent(RestController.class));
    }

    /**
     * Configures resource handlers for serving static files.
     * This method maps requests to the "/uploads/**" path to the local file system directory "/opt/authsuite/uploads/".
     *
     * @param registry ResourceHandlerRegistry instance to register resource handlers
     *
     * @author IFD
     * @date 2025-06-14
     */
    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        registry.addResourceHandler("/uploads/**")
                .addResourceLocations("file:/opt/authsuite/uploads/");
    }

}
