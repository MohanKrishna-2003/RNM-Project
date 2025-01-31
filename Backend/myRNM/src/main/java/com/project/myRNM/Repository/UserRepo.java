package com.project.myRNM.Repository;


//import com.project.myRNM.DTOs.MonthlyUserCount;
//import com.project.myRNM.Entity.Users;
import com.project.myRNM.Models.Entity.Users;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
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

    @Query(value = "SELECT " +
            "u.user_id AS user_id, u.user_name AS user_name, u.user_email AS user_email, u.user_address AS user_address, u.user_mobile AS user_mobile, u.registration_date, " +
            "f.feedback_id AS feedback_id, f.user_ratings, f.feedback, f.feedback_date "+
            "FROM user_details u " +
            "LEFT JOIN feedback f ON u.user_id = f.user_id ", nativeQuery = true)
    List<Object[]> findAllUserandFeedbacks();
}

