package com.project.myRNM.Controller;

import com.project.myRNM.DTOs.OtpDTO;
import com.project.myRNM.Models.Response.GeneralResponse;
import com.project.myRNM.Service.OtpService;
import jakarta.mail.MessagingException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
public class OtpController {
    @Autowired
    OtpService otpService;

//    @PostMapping("/sendmail")
//    public String sendEmail(@RequestBody OtpDTO otpDTO) {
//        try {
//            otpService.sendEmail(otpDTO.getRecipient(), otpDTO.getSubject(), otpDTO.getText());
//        } catch (MessagingException e) {
//            return e.getMessage();
//        }
//        return "Email sent successfully!";
//    }
//    @PostMapping("/verifyotp")
//    public String verifyOtp(@RequestBody OtpDTO otpDTO) {
//        boolean isVerified = otpService.verifyOtp(otpDTO.getRecipient(), otpDTO.getText());  // otpDTO.getText() is the OTP here;
//        return isVerified ? "OTP verified successfully" : "Invalid OTP or OTP expired";
//    }
@PostMapping("/sendmail")
public ResponseEntity<GeneralResponse> sendEmail(@RequestBody OtpDTO otpDTO) {
    try {
        otpService.sendEmail(otpDTO.getRecipient(), otpDTO.getSubject(), otpDTO.getText());
        GeneralResponse response = new GeneralResponse("Email sent successfully!");
        return ResponseEntity.status(HttpStatus.OK).body(response);
    } catch (Exception e) {
        GeneralResponse response = new GeneralResponse(e.getMessage());
        e.printStackTrace();
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
    }
}

    @PostMapping("/verifyotp")
    public ResponseEntity<GeneralResponse> verifyOtp(@RequestBody OtpDTO otpDTO) {
        boolean isVerified = otpService.verifyOtp(otpDTO.getRecipient(), otpDTO.getText());  // otpDTO.getText() is the OTP here;

        if (isVerified) {
            GeneralResponse response = new GeneralResponse("OTP verified successfully");
            return ResponseEntity.status(HttpStatus.OK).body(response);
        } else {
            GeneralResponse response = new GeneralResponse("Invalid OTP or OTP expired");
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
        }
    }
}
