package com.example.Signup.repository;

import com.example.Signup.Entity.Users;
import org.apache.catalina.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepo extends JpaRepository<Users, Integer> {
    @Query("select data from Users data where email=?1 and password=?2")
    Optional<Users> login(String email, String password);


    Optional <Users> findByEmail(String email);  //customMethod

//    Optional<Users> findByEmailOrPhone(String email , Long mobile);
}

