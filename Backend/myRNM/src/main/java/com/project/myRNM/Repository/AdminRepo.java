package com.project.myRNM.Repository;

import com.project.myRNM.Models.Entity.Admin;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface AdminRepo extends JpaRepository<Admin, Integer > {
    @Query("select data from Admin data where mail=?1 and password=?2")
    Optional<Admin> adminlogin(String email, String password);

            @Query(value = "SELECT " +
                    "u.user_id AS user_id, u.user_name AS user_name, u.user_email AS user_email, u.user_address AS user_address, u.user_mobile AS user_mobile, u.registration_date, " +
                    "sb.id AS booking_id, sb.email AS booking_email, sb.name AS booking_name, sb.phone AS booking_phone, sb.address AS booking_address, sb.status AS booking_status, " +
                    "sb.preferred_date, sb.time_slot, sb.selected_car_details, " +
                    "c.id AS center_id, c.name AS center_name, c.location AS center_location, " +
                    "b.id AS brand_id, b.name AS brand_name " +
                    "FROM user_details u " +
                    "LEFT JOIN slot_booking sb ON u.user_id = sb.user_id " +
                    "LEFT JOIN center c ON sb.center_id = c.id " +
                    "LEFT JOIN brand b ON c.brand_id = b.id", nativeQuery = true)
                    List<Object[]> findAllUserBookingsWithDetails();



}
