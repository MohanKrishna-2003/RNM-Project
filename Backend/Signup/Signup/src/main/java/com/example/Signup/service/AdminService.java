package com.example.Signup.service;

import com.example.Signup.Entity.Admin;
import com.example.Signup.repository.AdminRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AdminService {

    @Autowired
    AdminRepo adminRepo;

    public List<Admin> getAdminDetails() throws Exception {
        try {
            List<Admin> adminDetails = adminRepo.findAll();
            return adminDetails;
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }
}