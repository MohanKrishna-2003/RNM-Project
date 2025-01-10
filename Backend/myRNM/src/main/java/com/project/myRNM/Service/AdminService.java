package com.project.myRNM.Service;

import com.project.myRNM.Entity.Admin;
import com.project.myRNM.Repository.AdminRepo;
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