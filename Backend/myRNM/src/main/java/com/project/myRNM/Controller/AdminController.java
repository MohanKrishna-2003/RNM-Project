package com.project.myRNM.Controller;

import com.project.myRNM.DTOs.AdminDTO;
import com.project.myRNM.Entity.Admin;
import com.project.myRNM.Entity.Users;
import com.project.myRNM.Response.GeneralResponse;
import com.project.myRNM.Service.AdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;

@RestController
@RequestMapping("/admin")
@CrossOrigin(origins = "http://localhost:4200")
public class AdminController {

    @Autowired
    AdminService adminService;

@GetMapping("/details")
public ResponseEntity<?> admindetails(){
    try {
        return  ResponseEntity.ok(adminService.getAdminDetails());
    } catch (Exception e) {
        return ResponseEntity.badRequest().body(new GeneralResponse(e.getMessage()));
    }
}

    @PostMapping("/update")
    public ResponseEntity<?> updateProfile( @RequestBody AdminDTO profileData) {
        Admin updatedProfile = adminService.updateAdminProfile(profileData);
        if (updatedProfile != null) {
            return ResponseEntity.ok(updatedProfile);
        } else {
            return ResponseEntity.notFound().build();
        }
    }


}
