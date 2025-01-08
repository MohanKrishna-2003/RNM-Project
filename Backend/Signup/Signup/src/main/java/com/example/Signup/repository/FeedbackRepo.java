package com.example.Signup.repository;

import com.example.Signup.Entity.Feedback;
import com.example.Signup.Entity.Users;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface FeedbackRepo extends JpaRepository<Feedback, Integer> {
//    @Query("select data from Users data")
//    List<Feedback> getFeedback();
}

