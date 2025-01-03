package com.example.Signup.repository;

import com.example.Signup.Entity.Users;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserRepo extends JpaRepository<Users,Integer> {
    List<Users> findByNameAndEmail(String name, String email);

    List<Users> findByEmailAndPassword(String email, String password);
}

