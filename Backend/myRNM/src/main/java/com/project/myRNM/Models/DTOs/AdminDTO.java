package com.project.myRNM.Models.Entity.DTOs;

public class AdminDTO {
    private String name;
    private String email;
    private String company;
    private String address;
    private String bio;
    private String password;

    // Default constructor
    public AdminDTO() {
    }

    // Constructor with parameters
    public AdminDTO(String name, String email, String company, String address, String bio, String password) {
        this.name = name;
        this.email = email;
        this.company = company;
        this.address = address;
        this.bio = bio;
        this.password = password;
    }

    // Getter and Setter methods
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getCompany() {
        return company;
    }

    public void setCompany(String company) {
        this.company = company;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getBio() {
        return bio;
    }

    public void setBio(String bio) {
        this.bio = bio;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
