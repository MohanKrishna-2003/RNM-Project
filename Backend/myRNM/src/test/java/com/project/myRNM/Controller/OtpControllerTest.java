package com.project.myRNM.Controller;

import com.project.myRNM.Models.DTOs.OtpDTO;
import com.project.myRNM.Models.Response.GeneralResponse;
import com.project.myRNM.Service.OtpService;
import jakarta.mail.MessagingException;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

class OtpControllerTest {

    @Mock
    private OtpService otpService;

    @InjectMocks
    private OtpController otpController;

    private MockMvc mockMvc;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
        mockMvc = MockMvcBuilders.standaloneSetup(otpController).build();
    }

    @Test
    void sendEmail_Success() throws Exception {
        // Arrange
        OtpDTO otpDTO = new OtpDTO("test@example.com", "123456", "OTP for verification");

        doNothing().when(otpService).sendEmail(anyString(), anyString(), anyString());

        // Act & Assert
        mockMvc.perform(post("/sendmail")
                        .contentType("application/json")
                        .content("{\"recipient\": \"test@example.com\", \"text\": \"123456\", \"subject\": \"OTP for verification\"}"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.message").value("Email sent successfully!"));

        verify(otpService, times(1)).sendEmail("test@example.com", "OTP for verification", "123456");
    }

    @Test
    void sendEmail_Failure() throws Exception {
        // Arrange
        OtpDTO otpDTO = new OtpDTO("invalid@example.com", "123456", "OTP for verification");

        doThrow(new MessagingException("Email sending failed")).when(otpService).sendEmail(anyString(), anyString(), anyString());

        // Act & Assert
        mockMvc.perform(post("/sendmail")
                        .contentType("application/json")
                        .content("{\"recipient\": \"invalid@example.com\", \"text\": \"123456\", \"subject\": \"OTP for verification\"}"))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.message").value("Email sending failed"));

        verify(otpService, times(1)).sendEmail("invalid@example.com", "OTP for verification", "123456");
    }

    @Test
    void verifyOtp_Success() throws Exception {
        // Arrange
        OtpDTO otpDTO = new OtpDTO("test@example.com", "123456", "OTP for verification");

        when(otpService.verifyOtp("test@example.com", "123456")).thenReturn(true);

        // Act & Assert
        mockMvc.perform(post("/verifyotp")
                        .contentType("application/json")
                        .content("{\"recipient\": \"test@example.com\", \"text\": \"123456\", \"subject\": \"OTP for verification\"}"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.message").value("OTP verified successfully"));

        verify(otpService, times(1)).verifyOtp("test@example.com", "123456");
    }

    @Test
    void verifyOtp_Failure() throws Exception {
        // Arrange
        OtpDTO otpDTO = new OtpDTO("test@example.com", "wrongotp", "OTP for verification");

        when(otpService.verifyOtp("test@example.com", "wrongotp")).thenReturn(false);

        // Act & Assert
        mockMvc.perform(post("/verifyotp")
                        .contentType("application/json")
                        .content("{\"recipient\": \"test@example.com\", \"text\": \"wrongotp\", \"subject\": \"OTP for verification\"}"))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.message").value("Invalid OTP or OTP expired"));

        verify(otpService, times(1)).verifyOtp("test@example.com", "wrongotp");
    }
}
