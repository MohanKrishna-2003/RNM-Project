package com.project.myRNM.Models.DTOs;

public class UserDTO {

    private Long id;
    private String userName;
    private String userEmail;
    private String userMobile;
    private String userAddress;

    // Constructor to initialize fields from the User entity
    public UserDTO(Long id, String userName, String userEmail, String userMobile, String userAddress) {
        this.id = id;
        this.userName = userName;
        this.userEmail = userEmail;
        this.userMobile = userMobile;
        this.userAddress = userAddress;
    }

    // Getters and setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getUserEmail() {
        return userEmail;
    }

    public void setUserEmail(String userEmail) {
        this.userEmail = userEmail;
    }

    public String getUserMobile() {
        return userMobile;
    }

    public void setUserMobile(String userMobile) {
        this.userMobile = userMobile;
    }

    public String getUserAddress() {
        return userAddress;
    }

    public void setUserAddress(String userAddress) {
        this.userAddress = userAddress;
    }

}
