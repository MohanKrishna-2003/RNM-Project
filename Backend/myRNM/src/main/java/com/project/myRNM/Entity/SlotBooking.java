package com.project.myRNM.Entity;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.antlr.v4.runtime.misc.NotNull;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "slot_booking")
public class SlotBooking {


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private Users user;

    @ManyToOne
    @JoinColumn(name = "center_id")
    private Center center;

    @Column(nullable = false, unique = true)
    private String email;

    private String name;
    private String phone;
    private String address;
    private String status;

    @Column(name = "preferred_date")
    private LocalDate preferredDate;

    @Column(name = "time_slot")
    private String timeSlot;

//    @Column(name = "showroom_location")
//    private String showroomLocation;

    private Boolean confirmation;

    @Column(name = "booking_timestamp", nullable = false, updatable = false)
    private LocalDateTime bookingTimeStamp = LocalDateTime.now();

    @Column(name = "selected_car_details")
//    @JsonProperty("selectedCarDetails")
    private String selectedCarDetails;

//    @Column(name = "brand")
//    private String brand;

}
