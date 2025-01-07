package com.example.Signup.service;

import com.example.Signup.Entity.Users;
import com.example.Signup.repository.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {

    @Autowired
    UserRepo userRepo;

    public Users addingUserData(Users users) {

        Optional<Users> existingUser = userRepo.findByEmail(users.getEmail());
        if (existingUser.isPresent()) {
            throw new RuntimeException("Email has been already registered");
        }
        return userRepo.save(users);
    }


    public Users loginByPost(String email, String password) throws Exception {
        Optional<Users> users = userRepo.login(email, password);
        return users.orElseThrow(() -> new RuntimeException("Invalid email or password"));
    }
}
