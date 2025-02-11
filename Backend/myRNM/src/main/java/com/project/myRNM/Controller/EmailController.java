package com.project.myRNM.Controller;

import com.project.myRNM.Models.DTOs.EmailDTO;
import com.project.myRNM.Service.EmailService;
import jakarta.mail.MessagingException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RequestMapping("/mail")
@RestController
public class EmailController {

    @Autowired
    EmailService emailService;

    @PostMapping("/sendmail")
    public String sendEmail(@RequestBody EmailDTO emailDTO) {
        try {
            emailService.sendEmail(emailDTO.getRecipient(), emailDTO.getSubject(), emailDTO.getText());
        } catch (Exception e) {
            return e.getMessage();
        }
        return "Email sent successfully!";
    }

}
