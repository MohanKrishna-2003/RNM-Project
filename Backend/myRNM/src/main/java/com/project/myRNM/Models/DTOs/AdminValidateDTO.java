package com.project.myRNM.Models.DTOs;

import lombok.AllArgsConstructor;

@AllArgsConstructor
public class AdminValidateDTO {
    private String adminEmail;
    private String adminpassword;
    private String name;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }


    public String getAdminEmail() {
        return adminEmail;
    }

    public void setAdminEmail(String adminEmail) {
        this.adminEmail = adminEmail;
    }
    public String getAdminpassword() {
        return adminpassword;
    }

    public void setAdminpassword(String adminpassword) {
        this.adminpassword = adminpassword;
    }



}
