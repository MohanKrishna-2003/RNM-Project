package com.example.Signup.repository;

import com.example.Signup.Entity.Feedback;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FeedBackRepo extends JpaRepository<Feedback,Integer> {
}
