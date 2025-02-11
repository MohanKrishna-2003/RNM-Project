package com.project.myRNM.Controller;

import com.project.myRNM.Models.DTOs.SlotBookingDTO;
import com.project.myRNM.Models.Entity.SlotBooking;
import com.project.myRNM.Repository.CenterRepository;
import com.project.myRNM.Repository.SlotBookingRepository;
import com.project.myRNM.Models.Response.GeneralResponse;
import com.project.myRNM.Service.SlotBookingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/api/slot-bookings")
public class SlotBookingController {

    @Autowired
    private SlotBookingService slotBookingService;

    @Autowired
    private CenterRepository centerRepository;

    @Autowired
    private SlotBookingRepository slotBookingRepository;


    @PostMapping
    public ResponseEntity<?> saveSlotBooking(@RequestBody SlotBooking slotBooking) {
        try {
            SlotBooking savedSlotBooking = slotBookingService.bookSlot(slotBooking);

            // here, for response message I have surpassing the updatedd available slots for booking further bookings.
            int availableSlots = switch (slotBooking.getTimeSlot().toLowerCase()) {
                case "morning" -> savedSlotBooking.getCenter().getMorningSlots();
                case "afternoon" -> savedSlotBooking.getCenter().getAfternoonSlots();
                case "evening" -> savedSlotBooking.getCenter().getEveningSlots();
                default -> 0;
            };

            return ResponseEntity.ok(new GeneralResponse("Slot booked successfully. Available slots for " +
                    slotBooking.getTimeSlot() + ": " + availableSlots));

        }
        catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body(new GeneralResponse("Internal Server Error: " + e.getMessage()));
        }
    }


    @GetMapping
    public ResponseEntity<?> getAllBookings() {
        List<SlotBooking> bookings = slotBookingService.getAllBookings();
        return ResponseEntity.ok(bookings);
    }

}