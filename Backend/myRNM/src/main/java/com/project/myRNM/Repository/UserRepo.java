package com.project.myRNM.Repository;


import com.project.myRNM.DTOs.MonthlyUserCount;
import com.project.myRNM.Entity.Users;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.HashMap;
import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepo extends JpaRepository<Users, Integer> {
    @Query("select data from Users data where email=?1 and password=?2")
    Optional<Users> login(String email, String password);

    @Query("SELECT COUNT(*) AS total_users FROM Users")
    Integer totalUsers();

//    @Query("SELECT u.user_name, u.user_email, u.user_mobile, u.user_address FROM Users u ")
//    List<Object[]> getUsers();

    @Query(value = "SELECT TO_CHAR(u.registration_date, 'FMMonth') AS month, COUNT(u) AS total_users " +
            "FROM Users u " +
            "GROUP BY TO_CHAR(u.registration_date, 'FMMonth') " +
            "ORDER BY TO_DATE(TO_CHAR(u.registration_date, 'FMMonth'), 'Month')", nativeQuery = true)
    List<Object[]> findMonthlyUserCounts();
}

