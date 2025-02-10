package com.project.myRNM.Models.Entity;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "car")
public class Car {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;


    @ManyToOne
    @JoinColumn(name = "center_id")
    private Center center;

    private String brand;
    private String brandIcon;
    private String name;
    private String image;
    private String price;
    private int releaseYear;
    private int booking;
    private String details;
    private int rating;
    private String engineType;
    private int seater;
    private String transmission;
    private String availability;
    private String fuelEfficiency;
    private String color;
    private String driveType;
    private int warranty;

    @Column(name = "extra_features")
    private String extraFeaturesAsString;  // Store the features as a JSON string or comma-separated string

    @Transient
    private List<String> extraFeatures = new ArrayList<>();  // Use this field for accessing the list

    // Converts extraFeatures list to JSON string before saving
    @PrePersist
    public void prePersist() {
        try {
            ObjectMapper objectMapper = new ObjectMapper();
            this.extraFeaturesAsString = objectMapper.writeValueAsString(this.extraFeatures);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    // Converts extraFeaturesAsString JSON back to list when retrieving
    @PostLoad
    public void postLoad() {
        try {
            ObjectMapper objectMapper = new ObjectMapper();
            this.extraFeatures = objectMapper.readValue(this.extraFeaturesAsString, new TypeReference<List<String>>() {});
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
