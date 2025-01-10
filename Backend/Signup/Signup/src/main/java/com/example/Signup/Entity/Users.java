package com.example.Signup.Entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;



@Entity
@Data
@Table(name="userdetails")
public class Users {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="user_id")
    private Integer id;
    @Column(name="user_name")

    @Column(name="name")
    private String name;
    @Column(name="user_email")
    private String email;

    @Column(name="password")
    private String password;

    @Column(name="mobile")
    private Long mobile;

    @Column(name="user_address")
    private String address;

    @Column(name="user_mobile")
    private String mobile;

}
