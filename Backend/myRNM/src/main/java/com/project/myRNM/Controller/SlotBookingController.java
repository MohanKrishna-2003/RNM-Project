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

    @GetMapping("/{id}")
    public ResponseEntity<?> getBookingsByEmail(@PathVariable Long id) {
        SlotBooking booking = slotBookingService.getBookingByEmail(id);
        if (booking == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(booking);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteBooking(@PathVariable Long id) {
        slotBookingService.deleteBooking(id);
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/delete-all")
    public ResponseEntity<?> deleteAllBookings() {
        try {
            slotBookingService.deleteAllBookings();
            return ResponseEntity.noContent().build();
        } catch (Exception e) {
            return ResponseEntity.status(500).body(new GeneralResponse("Error deleting all bookings: " + e.getMessage()));
        }
    }


    @GetMapping("/userMonthlyCount")
    public ResponseEntity<?> getMonthlyUserCount() {
        try {
            return ResponseEntity.ok(slotBookingService.getMonthlyUserCounts());
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new GeneralResponse(e.getMessage()));
        }
    }

    @GetMapping("/brandCount")
    public ResponseEntity<?> getUserCountByBrand() {
        try {
            return ResponseEntity.ok(slotBookingService.getCountByBrand());
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new GeneralResponse(e.getMessage()));
        }
    }
    @PostMapping("/updatestatus")
    public ResponseEntity<?> updateUserStatus(@RequestBody SlotBookingDTO slotBookingDTO){
        try{
            slotBookingService.updateStatus(slotBookingDTO);
            return ResponseEntity.ok(new GeneralResponse("SUCCESSFULLY UPDATED !!"));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new GeneralResponse(e.getMessage()));
        }
    }
}