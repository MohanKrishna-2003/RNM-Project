package com.example.Signup.Entity;

import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;
import java.util.Date;
import java.util.List;


@Entity
@Data
@Table(name = "usertable")
public class Users {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "name")
    private String name;

    @Column(name = "email")
    private String email;

    @Column(name = "password")
    private String password;

    @Column(name = "mobile")
    private Long mobile;

    @Column(name = "address")
    private String address;

    @CreationTimestamp
    @Column(name = "registration_date", nullable = false, updatable = false)
    private Date registrationDate; // This field will store the registration date and time

    @OneToMany
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    private List<Feedback> feedbacks;
}


