package com.project.myRNM.Service;

import com.project.myRNM.DTOs.MonthlyUserCount;
import com.project.myRNM.DTOs.UserDTO;
import com.project.myRNM.Entity.Users;
import com.project.myRNM.Exception.UserNotFoundException;
import com.project.myRNM.Repository.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;


import java.time.LocalDate;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class UserService {

    @Autowired
    UserRepo userRepo;

    PasswordEncoder passwordEncoder;

    public Users addUserData(Users users) {
        // checking if the user is already present if they present throws an error
        Optional<Users> existingUser = userRepo.findByEmailOrMobile(users.getEmail(), users.getMobile());
        if (existingUser.isPresent()) {
            if (existingUser.get().getEmail().equals(users.getEmail())) {
                throw new RuntimeException("Email has already been registered");
            }
            if (existingUser.get().getMobile().equals(users.getMobile())) {
                throw new RuntimeException("Mobile number has already been registered");
            }
            throw new RuntimeException("User already registered");
        }
        this.passwordEncoder = new BCryptPasswordEncoder();
        users.setPassword(passwordEncoder.encode(users.getPassword()));
        return userRepo.save(users);

    }

    public Users loginByPost(String email, String password) throws Exception {
        Optional<Users> users = userRepo.findByEmail(email);
        this.passwordEncoder = new BCryptPasswordEncoder();
        if (users.isPresent() && passwordEncoder.matches(password, users.get().getPassword())) {
            return users.get();
        } else {
            throw new RuntimeException("Invalid email or password");
        }
    }


    public List<Users> getUserData() {
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

    public Integer totalUsers() {
        return userRepo.totalUsers();
    }

    public Long last30users() {
        LocalDate thirtyDaysAgo = LocalDate.now().minusDays(30);
        Long count = userRepo.countUsersRegisteredInLast30Days(thirtyDaysAgo);
        return count;
    }

    public List<MonthlyUserCount> getMonthlyUserCounts() {
        List<Object[]> results = userRepo.findMonthlyUserCounts();
        List<MonthlyUserCount> monthlyCounts = new ArrayList<>();

        // Map results from Object[] to MonthlyUserCount DTO
        for (Object[] result : results) {
            String month = (String) result[0];  // The first element is the month
            Long totalUsers = (Long) result[1];  // The second element is the user count
            monthlyCounts.add(new MonthlyUserCount(month, totalUsers));
        }

        return monthlyCounts;
    }


    public Users updateProfile(Long id, Users users) throws Exception {
        Users foundUser = userRepo.findById(id).orElse(null);
        if (foundUser == null) {
            throw new UserNotFoundException("User with id " + id + " not found");
        }
        foundUser.setAddress(users.getAddress());
        foundUser.setMobile(users.getMobile());
        return userRepo.save(foundUser);
    }

    public Users updatePassword(Users users) throws Exception {
        Optional<Users> existingUser = userRepo.findByEmail(users.getEmail());
        if (existingUser.isPresent()) {
            Users users1 = existingUser.get();
            this.passwordEncoder = new BCryptPasswordEncoder();
            users1.setPassword(passwordEncoder.encode(users.getPassword()));
            return userRepo.save(users1);
        } else {
            throw new UserNotFoundException("Cannot update the password");
        }
    }

}