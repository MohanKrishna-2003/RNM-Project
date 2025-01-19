package com.project.myRNM.Repository;


import com.project.myRNM.Entity.Feedback;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface FeedbackRepo extends JpaRepository<Feedback, Integer> {
    // Query to fetch feedbacks with their month and year
    @Query("SELECT f.feedback_date, f.feedback FROM Feedback f ")
    List<Object[]> findFeedbacks();

   @Query("SELECT f FROM Feedback f ORDER BY feedback_date DESC")
    List<Feedback> findsortFeedback();
}


