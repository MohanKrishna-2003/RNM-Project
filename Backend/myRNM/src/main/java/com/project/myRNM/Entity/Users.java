package com.project.myRNM.Entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;


@Entity
@Data
@Table(name="userdetails")
public class Users {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="user_id")
    private Integer id;
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
    private Date registration_date;

}
