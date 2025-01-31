package com.project.myRNM.Service;

import com.project.myRNM.Models.DTOs.AdminDTO;
import com.project.myRNM.Models.DTOs.AdminValidateDTO;
import com.project.myRNM.Models.DTOs.UserBookingDTO;
import com.project.myRNM.Models.Entity.Admin;
import com.project.myRNM.Models.Entity.Users;
import com.project.myRNM.Repository.AdminRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Date;
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

    public List<UserBookingDTO> getAllUserBookingsWithDetails() {
        List<Object[]> results = adminRepo.findAllUserBookingsWithDetails();

        List<UserBookingDTO> userBookingDTOs = new ArrayList<>();

        for (Object[] row : results) {
            UserBookingDTO dto = new UserBookingDTO(
                    (Long) row[0],  // user_id
                    (String) row[1], // user_name
                    (String) row[2], // user_email
                    (String) row[3], // user_address
                    (String) row[4], // user_mobile
                    (Date) row[5], // registration_date
                    (Long) row[6], // booking_id
                    (String) row[7], // booking_email
                    (String) row[8], // booking_name
                    (String) row[9], // booking_phone
                    (String) row[10], // booking_address
                    (String) row[11], // booking_status
                    (Date) row[12], // preferred_date
                    (String) row[13], // time_slot
                    (String) row[14], // selected_car_details
                    (Long) row[15], // center_id
                    (String) row[16], // center_name
                    (String) row[17], // center_location
                    (Long) row[18], // brand_id
                    (String) row[19] // brand_name
            );
            userBookingDTOs.add(dto);
        }

        return userBookingDTOs;
    }

}