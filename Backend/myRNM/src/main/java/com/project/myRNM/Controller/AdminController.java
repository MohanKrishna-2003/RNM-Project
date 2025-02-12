package com.project.myRNM.Controller;

import com.project.myRNM.Models.DTOs.AdminDTO;
import com.project.myRNM.Models.DTOs.AdminValidateDTO;
import com.project.myRNM.Models.DTOs.UserBookingDTO;
import com.project.myRNM.Models.Entity.Admin;
import com.project.myRNM.Models.Response.GeneralResponse;
import com.project.myRNM.Service.AdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;

@RestController
@RequestMapping("/admin")
@CrossOrigin(origins = "http://localhost:4200")
public class AdminController {

    @Autowired
    AdminService adminService;

    @GetMapping("/details")
    public ResponseEntity<?> admindetails() {
        try {
            return ResponseEntity.ok(adminService.getAdminDetails());
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new GeneralResponse(e.getMessage()));
        }
    }

    @PostMapping("/update")
    public ResponseEntity<?> updateProfile(@RequestBody AdminDTO profileData) {
        Admin updatedProfile = adminService.updateAdminProfile(profileData);
        if (updatedProfile != null) {
            return ResponseEntity.ok(updatedProfile);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping("/adminlogin")
    public ResponseEntity<?> adminloginByPost(@RequestBody HashMap<String, String> login) throws Exception {
        try {
            AdminValidateDTO foundAdmin = adminService.adminloginByPost(login.get("email"), login.get("password"));
            return ResponseEntity.ok(foundAdmin);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().body(new GeneralResponse(e.getMessage()));
        }

    }

//    @GetMapping("/user_bookings")
//    public List<UserBookingDTO> getUserBookings() {
//        return adminService.getAllUserBookingsWithDetails();
//    }

}
