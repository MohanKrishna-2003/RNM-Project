package com.project.myRNM.Service;

import com.project.myRNM.Models.DTOs.AdminDTO;
import com.project.myRNM.Models.Entity.Admin;
import com.project.myRNM.Repository.AdminRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

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

    public Admin updateAdminProfile( AdminDTO profileData) {
        // Check if the profile with the given id exists
        Optional<Admin> existingProfileOpt = adminRepo.findById(1);
        if (existingProfileOpt.isPresent()) {
            Admin existingProfile = existingProfileOpt.get();
            existingProfile.setName(profileData.getName());
            existingProfile.setMail(profileData.getEmail());
            existingProfile.setCompany(profileData.getCompany());
            existingProfile.setAddress(profileData.getAddress());
            existingProfile.setBio(profileData.getBio());
            existingProfile.setPassword(profileData.getPassword() );
            return adminRepo.save(existingProfile);
        }
        return null;
    }


}