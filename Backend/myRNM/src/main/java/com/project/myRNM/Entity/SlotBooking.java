package com.project.myRNM.Entity;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
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
@Table(name = "slot_bookings")
public class SlotBooking {
    @Id
    @NotNull
    @Column(nullable = false, unique = true)
    // yoo, I have set mail here as the primary key.
    private String email;

    private String name;
    private String phone;
    private String address;

    @Column(name = "preferred_date")
    private LocalDate preferredDate;

    @Column(name = "time_slot")
    private String timeSlot;

    @Column(name = "showroom_location")
    private String showroomLocation;

    private Boolean confirmation;

    @Column(name = "booking_timestamp", nullable = false, updatable = false)
    private LocalDateTime bookingTimeStamp = LocalDateTime.now();

    @Column(name = "selected_car_details")
//    @JsonProperty("selectedCarDetails")
    private String selectedCarDetails;
}
