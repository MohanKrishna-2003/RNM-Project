package com.project.myRNM.Controller;
import com.project.myRNM.Models.DTOs.EmailDTO;
import com.project.myRNM.Service.EmailService;
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
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;

class EmailControllerTest {

    @Mock
    private EmailService emailService;

    @InjectMocks
    private EmailController emailController;

    private MockMvc mockMvc;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
        mockMvc = MockMvcBuilders.standaloneSetup(emailController).build();
    }

    @Test
    void sendEmail_Success() throws Exception {
        // Arrange
        EmailDTO emailDTO = new EmailDTO("test@example.com", "Hello", "Test Subject");

        doNothing().when(emailService).sendEmail(anyString(), anyString(), anyString());

        // Act & Assert
        mockMvc.perform(post("/mail/sendmail")
                        .contentType("application/json")
                        .content("{ \"recipient\": \"test@example.com\", \"text\": \"Hello\", \"subject\": \"Test Subject\" }"))
                .andExpect(status().isOk())
                .andExpect(content().string("Email sent successfully!"));

        verify(emailService, times(1)).sendEmail("test@example.com", "Test Subject", "Hello");
    }
}
