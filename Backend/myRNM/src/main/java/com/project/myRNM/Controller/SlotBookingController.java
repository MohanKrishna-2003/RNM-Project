package com.project.myRNM.Controller;

import com.project.myRNM.Models.DTOs.SlotBookingDTO;
import com.project.myRNM.Models.Entity.SlotBooking;
import com.project.myRNM.Models.Response.GeneralResponse;
import com.project.myRNM.Service.SlotBookingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/api/slot-bookings")
public class SlotBookingController {

    @Autowired
    private SlotBookingService slotBookingService;

    @PostMapping
    public ResponseEntity<?> createBooking(@RequestBody @Validated SlotBooking slotBooking) {
        SlotBooking savedBooking = slotBookingService.saveSlotBooking(slotBooking);
        return ResponseEntity.ok(savedBooking);
    }

    @GetMapping
    public ResponseEntity<?> getAllBookings() {
        List<SlotBooking> bookings = slotBookingService.getAllBookings();
        return ResponseEntity.ok(bookings);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getBookingsByEmail(@PathVariable Integer id) {
        SlotBooking booking = slotBookingService.getBookingByEmail(id);
        if (booking == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(booking);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteBooking(@PathVariable Integer id) {
        slotBookingService.deleteBooking(id);
        return ResponseEntity.noContent().build();
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