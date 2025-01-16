package com.project.myRNM.Controller;

import com.project.myRNM.Entity.SlotBooking;
import com.project.myRNM.Response.GeneralResponse;
import com.project.myRNM.Service.SlotBookingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/slot-bookings")
public class SlotBookingController {

    @Autowired
    private SlotBookingService slotBookingService;

    @PostMapping
    public ResponseEntity<?> createBooking(@RequestBody @Validated SlotBooking slotBooking){
        SlotBooking savedBooking = slotBookingService.saveSlotBooking(slotBooking);
        return ResponseEntity.ok(savedBooking);
    }

    @GetMapping
    public ResponseEntity<?> getAllBookings(){
        List<SlotBooking> bookings = slotBookingService.getAllBookings();
        return ResponseEntity.ok(bookings);
    }

    @GetMapping("/{email}")
    public ResponseEntity<?> getBookingsByEmail(@PathVariable String email){
        SlotBooking booking = slotBookingService.getBookingByEmail(email);
        if(booking == null){
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(booking);
    }

    @DeleteMapping("/{email}")
    public ResponseEntity<?> deleteBooking(@PathVariable String email){
        slotBookingService.deleteBooking(email);
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


}