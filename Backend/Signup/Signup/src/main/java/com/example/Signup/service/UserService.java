package com.example.Signup.service;
import com.example.Signup.response.*;
import com.example.Signup.Entity.Users;
import com.example.Signup.repository.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class UserService {

    @Autowired
    UserRepo userRepo;

    public Users addUserData(Users users) {
        return userRepo.save(users);
    }


    public Users loginByPost(String email, String password) throws Exception {
        Optional<Users> users = userRepo.login(email, password);
        return users.orElseThrow(() -> new RuntimeException("Invalid email or password"));
    }
    public List<Users> getUserData(){
        return userRepo.findAll();
    }

    public List<UserDTO> getAllUsers() {
        // Fetch all User entities from the database
        List<Users> users = userRepo.findAll();

        // Convert each User entity to a UserDTO using Java 8 streams
        return users.stream()
                .map(user -> new UserDTO(user.getId(), user.getName(), user.getEmail(), user.getMobile(), user.getAddress()))
                .collect(Collectors.toList());
    }


}
