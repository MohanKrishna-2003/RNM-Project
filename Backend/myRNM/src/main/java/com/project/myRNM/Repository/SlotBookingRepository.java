package com.project.myRNM.Repository;


import com.project.myRNM.Entity.SlotBooking;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SlotBookingRepository extends JpaRepository<SlotBooking, String> {

//    @Query("SELECT CONCAT(YEAR(s.bookingTimeStamp), '-', LPAD(CAST(MONTH(s.bookingTimeStamp) AS string), 2, '0')) AS month, COUNT(s) AS totalBookings " +
//            "FROM SlotBooking s " +
//            "GROUP BY YEAR(s.bookingTimeStamp), MONTH(s.bookingTimeStamp) " +
//            "ORDER BY YEAR(s.bookingTimeStamp), MONTH(s.bookingTimeStamp)")
//    List<Object[]> findMonthlyBookingCounts();

    @Query("SELECT CONCAT(YEAR(s.bookingTimeStamp), '-', LPAD(CAST(MONTH(s.bookingTimeStamp) AS string), 2, '0')) AS month, " +
            "s.brand AS brand, COUNT(s) AS totalBookings " +
            "FROM SlotBooking s " +
            "GROUP BY YEAR(s.bookingTimeStamp), MONTH(s.bookingTimeStamp), s.brand " +
            "ORDER BY YEAR(s.bookingTimeStamp), MONTH(s.bookingTimeStamp), s.brand")
    List<Object[]> findMonthlyBookingCountsByBrand();




}
