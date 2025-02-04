package com.project.myRNM.Configuration;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class CorsConfiguration {

    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/**")
                        .allowedOrigins("http://localhost:4200") // Allow frontend URL
                        .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS") // Specify methods
                        .allowedHeaders("*") // Allow all headers (can be restricted if needed)
                        .allowCredentials(true); // Allow credentials like cookies or headers
            }
        };
    }
}
