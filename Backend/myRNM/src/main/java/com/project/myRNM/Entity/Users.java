package com.project.myRNM.Entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDate;
import java.util.Date;
import java.util.List;


@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name="user_details")
public class Users {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="user_id")
    private Long id;
    @Column(name="user_name")
    private String name;
    @Column(name="user_email")
    private String email;
    @Column(name="password")
    private String password;

    @Column(name="user_address")
    private String address;

    @Column(name="user_mobile")
    private String mobile;

    @CreationTimestamp
    @Column(name = "registration_date", nullable = false, updatable = false)
    private Date registration_date;

    @OneToMany
    @JoinColumn(name = "user_id", referencedColumnName = "user_id")
    private List<Feedback> feedbacks;

}
