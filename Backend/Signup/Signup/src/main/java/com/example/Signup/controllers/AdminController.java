package com.example.Signup.controllers;

import com.example.Signup.response.GeneralResponse;
import com.example.Signup.service.AdminService;
import com.example.Signup.service.FeedbackService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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


}
