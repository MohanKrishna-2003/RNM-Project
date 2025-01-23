package com.project.myRNM.DTOs;

public class AdminDTO {
    String name, email, company,address,bio;

    public AdminDTO() {
    }

    public AdminDTO(String name, String mail, String company, String address, String bio) {
        this.name = name;
        this.email = mail;
        this.company = company;
        this.address = address;
        this.bio = bio;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getCompany() {
        return company;
    }

    public void setCompany(String company) {
        this.company = company;
    }

    public String getEMail() {
        return email;
    }

    public void setMail(String mail) {
        this.email = mail;
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
}
