package com.project.myRNM.Models.DTOs;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class EmailDTO {
    String recipient;
    String text;
    String subject;

}
