package com.example.Signup.Entity;

import jakarta.persistence.*;
import jakarta.persistence.criteria.CriteriaBuilder;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

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

    @Column(name="feedback_date")
    private String feedback_date;

    @Column(name="user_id")
    private String user_email;



}
