package com.project.myRNM.Service;


import com.project.myRNM.DTOs.BrandCountDTO;
import com.project.myRNM.DTOs.UserSlotCount;
import com.project.myRNM.Entity.Center;
import com.project.myRNM.Entity.SlotBooking;
import com.project.myRNM.Repository.CenterRepository;
import com.project.myRNM.Repository.SlotBookingRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
public class SlotBookingService {

    @Autowired
    private SlotBookingRepository slotBookingRepository;

    @Autowired
    private CenterRepository centerRepository;

    @Transactional
    public SlotBooking bookSlot(SlotBooking slotBooking) {

        // so here checking whether the center is there or not through the id.
        Center center = centerRepository.findById(slotBooking.getCenter().getId())
                .orElseThrow(() -> new IllegalArgumentException("Center not found"));

        if (center.getBrand() == null) {
            throw new IllegalArgumentException("Center does not have a brand associated.");
        }

        // so here comes the logic that updating according to user time slot(mrng, aft, eve)
        // so reducing to -1 if it has slots available for booking!
        switch (slotBooking.getTimeSlot().toLowerCase()) {
            case "morning":
                if (center.getMorningSlots() <= 0) {
                    throw new IllegalArgumentException("No morning slots available.");
                }
                center.setMorningSlots(center.getMorningSlots() - 1);
                break;
            case "afternoon":
                if (center.getAfternoonSlots() <= 0) {
                    throw new IllegalArgumentException("No afternoon slots available.");
                }
                center.setAfternoonSlots(center.getAfternoonSlots() - 1);
                break;
            case "evening":
                if (center.getEveningSlots() <= 0) {
                    throw new IllegalArgumentException("No evening slots available.");
                }
                center.setEveningSlots(center.getEveningSlots() - 1);
                break;
            default:
                throw new IllegalArgumentException("Invalid time slot selected.");
        }

        // so after, here I am updating the center entity in database.
        centerRepository.save(center);

        // finally saving in the slot booking center data.
        slotBooking.setCenter(center);

        // hence, returning the slot booking data which will be updated in database.x
        return slotBookingRepository.save(slotBooking);
    }

    public List<SlotBooking> getAllBookings(){
        return slotBookingRepository.findAll();
    }

    public SlotBooking getBookingByEmail(Long id){
        return slotBookingRepository.findById(id).orElse(null);
    }

    public void deleteBooking(Long id){
        slotBookingRepository.deleteById(id);
    }

    public List<UserSlotCount> getMonthlyUserCounts() {
        List<Object[]> results = slotBookingRepository.findMonthlyBookingCountsByMonthName();
        List<UserSlotCount> monthlyCounts = new ArrayList<>();
        for (Object[] result : results) {
            String month = (String) result[0];
            Long totalUsers = (Long) result[1];
            monthlyCounts.add(new UserSlotCount(month, totalUsers));
        }
        return monthlyCounts;
    }

    public List<BrandCountDTO> getCountByBrand() {
        List<Object[]> queryResult = slotBookingRepository.findCountByBrand();
        List<BrandCountDTO> result = new ArrayList<>();
        for (Object[] row : queryResult) {
            String brand = (String) row[0];
            Long totalUsers = (Long) row[1];
            result.add(new BrandCountDTO(brand, totalUsers));
        }
        return result;
    }

    public boolean checkIfUserHasBooked(Long userId, Long brandId) {
        LocalDateTime oneMonthAgo = LocalDateTime.now().minusMonths(1);
        List<SlotBooking> bookings = slotBookingRepository.findByUserIdAndCenterBrandIdAndBookingTimeStampAfter(userId, brandId, oneMonthAgo);
        return !bookings.isEmpty();  // User has already booked within the last month
    }

    public void deleteAllBookings() {
        // Delete all bookings from the repository
        slotBookingRepository.deleteAll();
    }

    public List<SlotBooking> getBookingsForCenter(Long centerId, LocalDateTime bookingDate) {
        // Start and end of the day
        LocalDateTime startOfDay = bookingDate.withHour(0).withMinute(0).withSecond(0).withNano(0);
        LocalDateTime endOfDay = bookingDate.withHour(23).withMinute(59).withSecond(59).withNano(999999999);
        return slotBookingRepository.findByCenterIdAndBookingTimeStamp(centerId, startOfDay, endOfDay);
    }
}
