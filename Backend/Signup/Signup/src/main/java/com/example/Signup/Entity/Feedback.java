package com.example.Signup.Entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDate;
import java.util.Date;

@Entity
@Table(name="feedback")
@AllArgsConstructor
@NoArgsConstructor
@Data
public class Feedback {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer feedback_id;

    @Column(name="user_id")
    private Integer user_id;

    @Column(name="user_name")
    private String user_name;

    @Column(name="feedback")
    private String feedback;


    @Column(name="user_email")
    private String user_email;

    @Column(name="users_ratings")
    private Integer users_ratings;

    @CreationTimestamp
    @Column(name = "feedback_date", nullable = false, updatable = false)
    private Date feedback_date;

}
