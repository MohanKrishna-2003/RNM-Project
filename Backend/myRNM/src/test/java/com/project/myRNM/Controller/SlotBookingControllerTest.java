package com.project.myRNM.Controller;

import com.project.myRNM.Models.Entity.Center;
import com.project.myRNM.Models.Entity.SlotBooking;
import com.project.myRNM.Models.Entity.Users;
import com.project.myRNM.Models.Response.GeneralResponse;
import com.project.myRNM.Service.SlotBookingService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.ResponseEntity;

import java.time.LocalDate;
import java.util.Arrays;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

class SlotBookingControllerTest {

    @Mock
    private SlotBookingService slotBookingService;

    @InjectMocks
    private SlotBookingController slotBookingController;

    private SlotBooking testSlotBooking;
    private Center testCenter;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);

        // Setting-up the test data
        testCenter = new Center();
        testCenter.setId(1L);
        testCenter.setMorningSlots(5);
        testCenter.setAfternoonSlots(5);
        testCenter.setEveningSlots(5);

        Users testUser = new Users();
        testUser.setId(144L);

        testSlotBooking = new SlotBooking();
        testSlotBooking.setId(144L);
        testSlotBooking.setCenter(testCenter);
        testSlotBooking.setUser(testUser);
        testSlotBooking.setEmail("test@test.com");
        testSlotBooking.setTimeSlot("morning");
        testSlotBooking.setPreferredDate(LocalDate.now());
        testSlotBooking.setSelectedCarDetails("Renault Kiger");
    }

    @Test
    void saveSlotBooking_Success() {

        // Arrange
        // here, we're booking slot using service method and giving the data according to slot booking entity
        when(slotBookingService.bookSlot(any(SlotBooking.class))).thenReturn(testSlotBooking);

        // Act
        // here, we're getting the response in the controller from the service testslotbooking(i.e, book slot)
        ResponseEntity<?> response = slotBookingController.saveSlotBooking(testSlotBooking);

        // Assert
        assertTrue(response.getStatusCode().is2xxSuccessful());
        assertTrue(response.getBody() instanceof GeneralResponse);
        GeneralResponse generalResponse = (GeneralResponse) response.getBody();
        System.out.println("Response Message: " + generalResponse.getMessage());

        assertTrue(generalResponse.getMessage().contains("Slot booked successfully"));
        assertTrue(generalResponse.getMessage().contains("morning"));

        verify(slotBookingService, times(1)).bookSlot(any(SlotBooking.class));
    }

    @Test
    void saveSlotBooking_DuplicateBooking() {
        // Arrange
        when(slotBookingService.bookSlot(any(SlotBooking.class)))
                .thenThrow(new IllegalArgumentException("You cannot book the same car within 7 days"));

        // Act
        ResponseEntity<?> response = slotBookingController.saveSlotBooking(testSlotBooking);

        // Assert
        assertEquals(500, response.getStatusCodeValue());
        assertTrue(response.getBody() instanceof GeneralResponse);
        GeneralResponse generalResponse = (GeneralResponse) response.getBody();
        assertTrue(generalResponse.getMessage().contains("You cannot book the same car within 7 days"));
    }
}
