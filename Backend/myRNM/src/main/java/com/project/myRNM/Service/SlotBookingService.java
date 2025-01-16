package com.project.myRNM.Service;


import com.project.myRNM.DTOs.UserSlotCount;
import com.project.myRNM.Entity.SlotBooking;
import com.project.myRNM.Repository.SlotBookingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
public class SlotBookingService {

    @Autowired
    private SlotBookingRepository slotBookingRepository;

    public SlotBooking saveSlotBooking(SlotBooking slotBooking){
        if (slotBooking.getEmail() == null || slotBooking.getEmail().isEmpty()) {
            throw new IllegalArgumentException("Mail is required and cannot be empty");
        }
        if (slotBooking.getBookingTimeStamp() == null) {
            slotBooking.setBookingTimeStamp(LocalDateTime.now());
        }
        return slotBookingRepository.save(slotBooking);
    }

    public List<SlotBooking> getAllBookings(){
        return slotBookingRepository.findAll();
    }

    public SlotBooking getBookingByEmail(String email){
        return slotBookingRepository.findById(email).orElse(null);
    }

    public void deleteBooking(String email){
        slotBookingRepository.deleteById(email);
    }


//    public List<UserSlotCount> getMonthlyUserCounts() {
//        List<Object[]> results = slotBookingRepository.findMonthlyBookingCounts();
//        List<UserSlotCount> monthlyCounts = new ArrayList<>();
//
//        // Map results from Object[] to MonthlyUserCount DTO
//        for (Object[] result : results) {
//            String month = (String) result[0];  // The first element is the month
//            Long totalUsers = (Long) result[1];  // The second element is the user count
//            monthlyCounts.add(new UserSlotCount(month, totalUsers));
//        }
//
//        return monthlyCounts;
//    }

    public List<UserSlotCount> getMonthlyUserCounts() {
        List<Object[]> results = slotBookingRepository.findMonthlyBookingCountsByMonthName();
        List<UserSlotCount> monthlyCounts = new ArrayList<>();

        // Map results from Object[] to MonthlyUserCount DTO
        for (Object[] result : results) {
            String month = (String) result[0];  // The first element is the month
            Long totalUsers = (Long) result[1];
// The second element is the user count
            monthlyCounts.add(new UserSlotCount(month, totalUsers));
        }

        return monthlyCounts;
    }


}
