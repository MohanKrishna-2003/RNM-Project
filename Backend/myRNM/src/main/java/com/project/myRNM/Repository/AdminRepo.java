package com.project.myRNM.Repository;

import com.project.myRNM.Models.DTOs.AdminValidateDTO;
import com.project.myRNM.Models.Entity.Admin;
import com.project.myRNM.Models.Entity.Users;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface AdminRepo extends JpaRepository<Admin, Integer > {
    @Query("select data from Admin data where mail=?1 and password=?2")
    Optional<Admin> adminlogin(String email, String password);


}
