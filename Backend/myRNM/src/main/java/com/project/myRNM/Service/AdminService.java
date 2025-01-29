package com.project.myRNM.Service;

import com.project.myRNM.Models.DTOs.AdminDTO;
import com.project.myRNM.Models.DTOs.AdminValidateDTO;
import com.project.myRNM.Models.Entity.Admin;
import com.project.myRNM.Models.Entity.Users;
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
    public AdminValidateDTO adminloginByPost(String mail, String password) throws Exception {
        Optional<Admin> admin = adminRepo.adminlogin(mail, password);

        if (admin.isPresent()) {
            Admin foundAdmin = admin.get();
            // Manually map Admin entity to AdminValidateDTO
            return new AdminValidateDTO(foundAdmin.getMail(), foundAdmin.getPassword(),foundAdmin.getName());
        } else {
            throw new RuntimeException("Invalid admin email or admin password");
        }    }



}