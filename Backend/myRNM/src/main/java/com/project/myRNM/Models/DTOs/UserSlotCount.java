package com.project.myRNM.Models.DTOs;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserSlotCount {

    String month;
//    String brand;
    Long count;

}
