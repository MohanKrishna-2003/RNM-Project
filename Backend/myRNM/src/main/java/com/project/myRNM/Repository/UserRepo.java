package com.project.myRNM.Repository;


//import com.project.myRNM.DTOs.MonthlyUserCount;
//import com.project.myRNM.Entity.Users;
import com.project.myRNM.Entity.Users;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.HashMap;
import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepo extends JpaRepository<Users, Long> {
    @Query("select data from Users data where email=?1 and password=?2")
    Optional<Users> login(String email, String password);

    @Query("SELECT COUNT(*) AS total_users FROM Users")
    Integer totalUsers();

    @Query("SELECT COUNT(u) FROM Users u WHERE u.registration_date >= :startDate")
    Long countUsersRegisteredInLast30Days(@Param("startDate") LocalDate startDate);


//    @Query("SELECT u.user_name, u.user_email, u.user_mobile, u.user_address FROM Users u ")
//    List<Object[]> getUsers();

    @Query(value = "SELECT TO_CHAR(u.registration_date, 'FMMonth') AS month, COUNT(u) AS total_users " +
            "FROM Users u " +
            "GROUP BY TO_CHAR(u.registration_date, 'FMMonth'), EXTRACT(MONTH FROM u.registration_date) " +
            "ORDER BY EXTRACT(MONTH FROM u.registration_date)")
    List<Object[]> findMonthlyUserCounts();

    Optional <Users> findByEmail(String email);  //customMethod

}

