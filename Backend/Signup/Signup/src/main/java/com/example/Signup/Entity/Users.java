package com.example.Signup.Entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;

import java.util.Date;
import java.util.List;


@Entity
@Data
@Table(name="usertable")
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















//    public Integer getId() {
//        return id;
//    }






//    public void setId(Integer id) {
//        this.id = id;
//    }
//
//    public String getName() {
//        return name;
//    }
//
//    public void setName(String name) {
//        this.name = name;
//    }
//
//    public String getEmail() {
//        return email;
//    }
//
//    public void setEmail(String email) {
//        this.email = email;
//    }
//
//    public String getPassword() {
//        return password;
//    }
//
//    public void setPassword(String password) {
//        this.password = password;
//    }
//
//    public String getAddress() {
//        return address;
//    }
//
//    public void setAddress(String address) {
//        this.address = address;
//    }
//
//    public Long getMobile() {
//        return mobile;
//    }
//
//    public void setMobile(Long mobile) {
//        this.mobile = mobile;
//    }
//
//    public List<Feedback> getFeedbacks() {
//        return feedbacks;
//    }
//
//    public void setFeedbacks(List<Feedback> feedbacks) {
//        this.feedbacks = feedbacks;
//    }

