package com.project.myRNM.Entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.util.Date;


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

    @Column(name="registration_date")
    private LocalDate registration_date;

}
