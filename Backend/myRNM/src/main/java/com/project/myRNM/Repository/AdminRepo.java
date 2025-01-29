package com.project.myRNM.Repository;

import com.project.myRNM.DTOs.AdminValidateDTO;
import com.project.myRNM.Entity.Admin;
import com.project.myRNM.Entity.Users;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface AdminRepo extends JpaRepository<Admin, Integer > {
    @Query("select data from Admin data where mail=?1 and password=?2")
    Optional<Admin> adminlogin(String email, String password);


}
