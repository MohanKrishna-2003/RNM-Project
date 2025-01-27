package com.project.myRNM.Models.Entity.DTOs;

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
