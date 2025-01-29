package com.project.myRNM.Models.Entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@Data
@Entity
@Table(name="admin")
public class Admin {
    String name, mail, company,address,bio,password;

    @Id
    Integer admin_id;

    public Admin() {
    }

    public Admin(String name, String mail, String company, String address, String bio, Integer admin_id,String password) {
        this.name = name;
        this.mail = this.mail;
        this.company = company;
        this.address = address;
        this.bio = bio;
        this.admin_id = admin_id;
        this.password=password;
    }
}

