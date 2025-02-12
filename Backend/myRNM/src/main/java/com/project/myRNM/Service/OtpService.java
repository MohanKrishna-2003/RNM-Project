package com.project.myRNM.Service;

import com.project.myRNM.Models.Entity.Users;
import com.project.myRNM.Repository.UserRepo;
import jakarta.mail.MessagingException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;
import java.util.Random;

@Service
public class OtpService {
    @Autowired
    JavaMailSender javaMailSender;

    @Autowired
    UserRepo userRepo;

    @Value("${spring.mail.username}")
    private String fromMailId;

    // In-memory store for OTPs and expiration times (can be replaced with a database)
    private Map<String, OtpDetails> otpStore = new HashMap<>();

    // Helper class to store OTP and its expiration time
    private static class OtpDetails {
        String otp;
        LocalDateTime expirationTime;

        public OtpDetails(String otp, LocalDateTime expirationTime) {
            this.otp = otp;
            this.expirationTime = expirationTime;
        }
    }
    public void sendEmail(String recipient, String subject, String text) throws MessagingException {
        Optional<Users> user = userRepo.findByEmail(recipient);

        if (!user.isPresent()) {
            throw new MessagingException("User with email " + recipient + " not found.");
        }
        String otp = generateOtp();

        // Store OTP and its expiration time in memory
        otpStore.put(recipient, new OtpDetails(otp, LocalDateTime.now().plusMinutes(2)));

        // Send the OTP to the recipient's email
        sendOtpEmail(recipient, otp);
    }

        private String generateOtp() {
            Random random = new Random();
            return String.format("%04d", random.nextInt(10000)); // Generates a 4-digit OTP
        }

    private void sendOtpEmail(String recipient, String otp) throws MessagingException {
        SimpleMailMessage simpleMailMessage = new SimpleMailMessage();
        simpleMailMessage.setFrom(fromMailId);
        simpleMailMessage.setTo(recipient);
        simpleMailMessage.setSubject("Your OTP Code");
        simpleMailMessage.setText("Your OTP is: " + otp);

        // Send the email
        javaMailSender.send(simpleMailMessage);
    }

    // Method to validate OTP (should be called from a verification endpoint)
    public boolean verifyOtp(String recipient, String otp) {
        OtpDetails otpDetails = otpStore.get(recipient);

        if (otpDetails != null) {
            // Check if OTP has expired
            if (otpDetails.expirationTime.isBefore(LocalDateTime.now())) {
//                System.out.println("OTP expired");
                otpStore.remove(recipient); // Remove expired OTP
                return false;
            }

            // Check if the OTP matches
            if (otpDetails.otp.equals(otp)) {
//                System.out.println("OTP verified successfully");
                otpStore.remove(recipient); // Remove OTP after successful verification
                return true;
            }
        }

        System.out.println("Invalid OTP");
        return false;
    }
}
