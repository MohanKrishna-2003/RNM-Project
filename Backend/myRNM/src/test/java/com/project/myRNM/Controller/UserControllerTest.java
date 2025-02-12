package com.project.myRNM.Controller;

import com.project.myRNM.Models.DTOs.UserDTO;
import com.project.myRNM.Models.DTOs.UserWithFeedbackDTO;
import com.project.myRNM.Models.Entity.Users;
import com.project.myRNM.Service.UserService;
import com.project.myRNM.Models.Response.GeneralResponse;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import java.util.HashMap;
import java.util.List;
import java.util.Optional;

import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

class UserControllerTest {

    @Mock
    private UserService userService;

    @InjectMocks
    private UserController userController;

    private MockMvc mockMvc;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
        mockMvc = MockMvcBuilders.standaloneSetup(userController).build();
    }

    @Test
    void loginByPost_Success() throws Exception {
        // Arrange
        HashMap<String, String> loginData = new HashMap<>();
        loginData.put("email", "test@example.com");
        loginData.put("password", "password");

        Users user = new Users(1L, "Test User", "test@example.com", "password", "Test Address", "1234567890", null, null);

        when(userService.loginByPost("test@example.com", "password")).thenReturn(user);

        // Act & Assert
        mockMvc.perform(post("/user/loginByPost")
                        .contentType("application/json")
                        .content("{\"email\": \"test@example.com\", \"password\": \"password\"}"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(user.getId()))
                .andExpect(jsonPath("$.name").value(user.getName()));

        verify(userService, times(1)).loginByPost("test@example.com", "password");
    }

    @Test
    void loginByPost_Failure() throws Exception {
        // Arrange
        HashMap<String, String> loginData = new HashMap<>();
        loginData.put("email", "invalid@example.com");
        loginData.put("password", "wrongpassword");

        when(userService.loginByPost("invalid@example.com", "wrongpassword")).thenThrow(new Exception("Invalid credentials"));

        // Act & Assert
        mockMvc.perform(post("/user/loginByPost")
                        .contentType("application/json")
                        .content("{\"email\": \"invalid@example.com\", \"password\": \"wrongpassword\"}"))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.message").value("Invalid credentials"));

        verify(userService, times(1)).loginByPost("invalid@example.com", "wrongpassword");
    }

    @Test
    void addUserData_Success() throws Exception {
        // Arrange
        Users user = new Users(1000L, "New User", "newuser@example.com", "password", "New Address", "9876543210", null, null);
        when(userService.addUserData(any(Users.class))).thenReturn(user);

        // Act & Assert
        mockMvc.perform(post("/user/addUserData")
                        .contentType("application/json")
                        .content("{\"name\": \"New User\", \"email\": \"newuser@example.com\", \"password\": \"password\", \"address\": \"New Address\", \"mobile\": \"9876543210\"}"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.message").value("User added successfully"))
                .andExpect(jsonPath("$.userId").value(user.getId()));

        verify(userService, times(1)).addUserData(any(Users.class));
    }

}

