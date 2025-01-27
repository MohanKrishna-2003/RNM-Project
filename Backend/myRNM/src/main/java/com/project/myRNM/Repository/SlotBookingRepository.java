package com.project.myRNM.Repository;


import com.project.myRNM.DTOs.BrandCountDTO;
import com.project.myRNM.Entity.SlotBooking;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface SlotBookingRepository extends JpaRepository<SlotBooking, Long> {

    // This method checks if a user has already booked for the same brand within the last month
    public List<SlotBooking> findByUserIdAndCenterBrandIdAndBookingTimeStampAfter(Long userId, Long centerBrandId, LocalDateTime bookingTimeStamp);

    // Query for bookings by center ID and booking date range
    @Query("SELECT s FROM SlotBooking s WHERE s.center.id = :centerId AND s.bookingTimeStamp BETWEEN :startOfDay AND :endOfDay")
    List<SlotBooking> findByCenterIdAndBookingTimeStamp(@Param("centerId") Long centerId, @Param("startOfDay") LocalDateTime startOfDay, @Param("endOfDay") LocalDateTime endOfDay);

    // Other methods for monthly bookings and counts
    @Query(value = "SELECT " +
            "    CASE EXTRACT(MONTH FROM s.booking_timestamp) " +
            "        WHEN 1 THEN 'January' " +
            "        WHEN 2 THEN 'February' " +
            "        WHEN 3 THEN 'March' " +
            "        WHEN 4 THEN 'April' " +
            "        WHEN 5 THEN 'May' " +
            "        WHEN 6 THEN 'June' " +
            "        WHEN 7 THEN 'July' " +
            "        WHEN 8 THEN 'August' " +
            "        WHEN 9 THEN 'September' " +
            "        WHEN 10 THEN 'October' " +
            "        WHEN 11 THEN 'November' " +
            "        WHEN 12 THEN 'December' " +
            "    END AS month, " +
            "    COUNT(s) AS totalBookings " +
            "FROM slot_bookings s " +
            "GROUP BY EXTRACT(MONTH FROM s.booking_timestamp) " +
            "ORDER BY EXTRACT(MONTH FROM s.booking_timestamp)", nativeQuery = true)
    List<Object[]> findMonthlyBookingCountsByMonthName();

    @Query(value = "SELECT s.brand, COUNT(s) " +
            "FROM slot_bookings s " +
            "WHERE s.brand IN ('Renault', 'Nissan', 'Mitsubishi') " +
            "GROUP BY s.brand", nativeQuery = true)
    List<Object[]> findCountByBrand();
}
