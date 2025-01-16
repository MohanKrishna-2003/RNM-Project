package com.project.myRNM.Entity;

import jakarta.persistence.*;

@Entity
@Table(name = "locations")
public class Locations {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) // For auto-increment (SERIAL)
    private Long id;

    private String name;

    private String address;

    private Double lat;

    private Double lng;

    private String icon;

    // Default constructor
    public Locations() {}

    // Constructor with fields
    public Locations(String name, String address, Double lat, Double lng, String icon) {
        this.name = name;
        this.address = address;
        this.lat = lat;
        this.lng = lng;
        this.icon = icon;
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public Double getLat() {
        return lat;
    }

    public void setLat(Double lat) {
        this.lat = lat;
    }

    public Double getLng() {
        return lng;
    }

    public void setLng(Double lng) {
        this.lng = lng;
    }

    public String getIcon() {
        return icon;
    }

    public void setIcon(String icon) {
        this.icon = icon;
    }


}
