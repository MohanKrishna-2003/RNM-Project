package com.project.myRNM.Repository;


import com.project.myRNM.Models.Entity.Feedback;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FeedbackRepo extends JpaRepository<Feedback, Integer> {
    // Query to fetch feedbacks with their month and year
    @Query("SELECT f.feedback_date, f.users_ratings FROM Feedback f ")
    List<Object[]> findFeedbacks();

   @Query("SELECT f FROM Feedback f ORDER BY feedback_date DESC")
    List<Feedback> findsortFeedback();

}


