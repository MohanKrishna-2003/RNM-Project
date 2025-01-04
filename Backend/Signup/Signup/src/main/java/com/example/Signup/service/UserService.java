package com.example.Signup.service;

import com.example.Signup.Entity.Users;
import com.example.Signup.repository.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {

    @Autowired
    UserRepo userRepo;
    public Users addUserData(Users users) {
        return userRepo.save(users);
    }


    public List<Users> loginByPost(String email , String password) {
        return userRepo.findByEmailAndPassword(email,password);
    }
}
