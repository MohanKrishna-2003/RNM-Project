package com.example.Signup.controllers;

import com.example.Signup.response.GeneralResponse;
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
    FeedbackService feedbackService;

    @GetMapping("/feedbackchart")
    public ResponseEntity<?> feedbackchardata(){
        try {
            return  ResponseEntity.ok(feedbackService.getFeedbacks());
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new GeneralResponse("HIIII"));
        }
    }
    @GetMapping("/feedbackcount")
    public ResponseEntity<?> feedbackcount(){
        try {
            return  ResponseEntity.ok(feedbackService.getMonthlyFeedbackSummary());
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new GeneralResponse("HIIII"));
        }
    }


}
