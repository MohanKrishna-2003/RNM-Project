package com.project.myRNM.Models.DTOs;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.Date;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class UserBookingDTO {

    private Long userId;
    private String userName;
    private String userEmail;
    private String userAddress;
    private String userMobile;
    private Date registrationDate;
    private Long bookingId;
    private String bookingEmail;
    private String bookingName;
    private String bookingPhone;
    private String bookingAddress;
    private String bookingStatus;
    private Date preferredDate;
    private String timeSlot;
    private String selectedCarDetails;
    private Long centerId;
    private String centerName;
    private String centerLocation;
    private Long brandId;
    private String brandName;

}

