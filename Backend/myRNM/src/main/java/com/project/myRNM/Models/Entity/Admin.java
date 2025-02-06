package com.project.myRNM.Models.Entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@Table(name="admin")
@AllArgsConstructor
@NoArgsConstructor
public class Admin {
    String name;
  String   mail;
   String  company;
   String  address;
   String  bio;
    String password;

    @Id
    Integer admin_id;

}

