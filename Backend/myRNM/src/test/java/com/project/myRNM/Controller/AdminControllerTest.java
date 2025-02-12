package com.project.myRNM.Controller;

import com.project.myRNM.Models.DTOs.AdminDTO;
import com.project.myRNM.Models.DTOs.AdminValidateDTO;
import com.project.myRNM.Models.DTOs.UserBookingDTO;
import com.project.myRNM.Models.Entity.Admin;
import com.project.myRNM.Models.Response.GeneralResponse;
import com.project.myRNM.Service.AdminService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.Arrays;
import java.util.HashMap;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.*;

public class AdminControllerTest {

    @Mock
    private AdminService adminService;

    @InjectMocks
    private AdminController adminController;

    private Admin testAdmin;
    private AdminDTO testAdminDTO;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);

        // Setup test admin data
        testAdmin = new Admin();
        testAdmin.setAdmin_id(1);
        testAdmin.setName("Admin Name");
        testAdmin.setMail("admin@example.com");
        testAdmin.setCompany("Test Company");
        testAdmin.setAddress("Test Address");
        testAdmin.setBio("Admin Bio");
        testAdmin.setPassword("password");

        testAdminDTO = new AdminDTO();
        testAdminDTO.setName("Updated Name");
        testAdminDTO.setEmail("updated@example.com");
        testAdminDTO.setCompany("Updated Company");
        testAdminDTO.setAddress("Updated Address");
        testAdminDTO.setBio("Updated Bio");
        testAdminDTO.setPassword("updatedpassword");
    }

    @Test
    void getAdminDetails_Success() throws Exception {
        // Arrange
        when(adminService.getAdminDetails()).thenReturn(Arrays.asList(testAdmin));

        // Act
        ResponseEntity<?> response = adminController.admindetails();

        // Assert
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertTrue(response.getBody() instanceof List);
        List<?> admins = (List<?>) response.getBody();
        assertEquals(1, admins.size());
        verify(adminService, times(1)).getAdminDetails();
    }

    @Test
    void updateAdminProfile_Success() {
        // Arrange
        when(adminService.updateAdminProfile(any(AdminDTO.class))).thenReturn(testAdmin);

        // Act
        ResponseEntity<?> response = adminController.updateProfile(testAdminDTO);

        // Assert
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertTrue(response.getBody() instanceof Admin);
        Admin updatedAdmin = (Admin) response.getBody();
        assertEquals("Admin Name", updatedAdmin.getName());  // Ensure the correct field is asserted
        verify(adminService, times(1)).updateAdminProfile(any(AdminDTO.class));
    }

    @Test
    void updateAdminProfile_NotFound() {
        // Arrange
        when(adminService.updateAdminProfile(any(AdminDTO.class))).thenReturn(null);

        // Act
        ResponseEntity<?> response = adminController.updateProfile(testAdminDTO);

        // Assert
        assertEquals(HttpStatus.NOT_FOUND, response.getStatusCode());
        verify(adminService, times(1)).updateAdminProfile(any(AdminDTO.class));
    }

    @Test
    void adminLogin_Success() throws Exception {
        // Arrange
        HashMap<String, String> loginData = new HashMap<>();
        loginData.put("email", "admin@example.com");
        loginData.put("password", "password");

        AdminValidateDTO adminValidateDTO = new AdminValidateDTO("admin@example.com", "password", "Admin Name");
        when(adminService.adminloginByPost(anyString(), anyString())).thenReturn(adminValidateDTO);

        // Act
        ResponseEntity<?> response = adminController.adminloginByPost(loginData);

        // Assert
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertTrue(response.getBody() instanceof AdminValidateDTO);
        AdminValidateDTO adminResponse = (AdminValidateDTO) response.getBody();
        assertEquals("admin@example.com", adminResponse.getAdminEmail());
        verify(adminService, times(1)).adminloginByPost(anyString(), anyString());
    }

    @Test
    void adminLogin_Failure() throws Exception {
        // Arrange
        HashMap<String, String> loginData = new HashMap<>();
        loginData.put("email", "wrong@example.com");
        loginData.put("password", "wrongpassword");

        when(adminService.adminloginByPost(anyString(), anyString())).thenThrow(new RuntimeException("Invalid admin email or password"));

        // Act
        ResponseEntity<?> response = adminController.adminloginByPost(loginData);

        // Assert
        assertEquals(HttpStatus.BAD_REQUEST, response.getStatusCode());
        assertTrue(response.getBody() instanceof GeneralResponse);
        GeneralResponse errorResponse = (GeneralResponse) response.getBody();
        assertTrue(errorResponse.getMessage().contains("Invalid admin email or password"));
    }

    @Test
    void getUserBookings_Success() {
        // Arrange
        List<UserBookingDTO> mockUserBookings = Arrays.asList(new UserBookingDTO(), new UserBookingDTO());
        when(adminService.getAllUserBookingsWithDetails()).thenReturn(mockUserBookings);

        // Act
        ResponseEntity<?> response = ResponseEntity.ok(adminController.getUserBookings());

        // Assert
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertNotNull(response.getBody());
        verify(adminService, times(1)).getAllUserBookingsWithDetails();
    }

}
