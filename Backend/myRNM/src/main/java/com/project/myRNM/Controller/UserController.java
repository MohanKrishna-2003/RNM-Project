package com.project.myRNM.Controller;

import com.project.myRNM.Entity.Users;

import com.project.myRNM.Repository.UserRepo;

import com.project.myRNM.Exception.UserNotFoundException;

import com.project.myRNM.Response.GeneralResponse;
import com.project.myRNM.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Objects;
import java.util.Optional;

@RequestMapping(path = "user")
@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class UserController {

    @Autowired
    UserService userService;

    @Autowired
    UserRepo userRepo;

    @PostMapping("/loginByPost")
    public ResponseEntity<?> loginByPost(@RequestBody HashMap<String, String> login) throws Exception {
        try {
            Users foundUsers = userService.loginByPost(login.get("email"), login.get("password"));
            return ResponseEntity.ok(foundUsers);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().body(new GeneralResponse(e.getMessage()));
        }
    }


    @PostMapping("/addUserData")
    public ResponseEntity<?> addUserData(@RequestBody Users users) {
        try {
            Users savedUser = userService.addUserData(users); // Ensure this returns the saved entity
            HashMap<String, Object> response = new HashMap<>();
            response.put("message", "User added successfully");
            response.put("userId", savedUser.getId()); // Return the userId in the response
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().body(new GeneralResponse(e.getMessage()));
        }
    }


    @GetMapping("/userdata")
    public ResponseEntity<?> getUserData() {
        try {
            return ResponseEntity.ok(userService.getAllUsers());
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new GeneralResponse(e.getMessage()));
        }
    }

    @GetMapping("/totaluser")
    public ResponseEntity<?> getTotalUser() {
        try {
            return ResponseEntity.ok(userService.totalUsers());
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new GeneralResponse(e.getMessage()));
        }
    }

//    @GetMapping("/getUserIdByEmail/{email}")
//    public ResponseEntity<?> getUserIdByEmail(@PathVariable String email) {
//        System.out.println("Fetching user by email: " + email);  // Log the email
//        Optional<Users> user = userRepo.findByEmail(email);
//        if (user.isPresent()) {
//            System.out.println("User found: " + user.get().getId());  // Log the found user ID
//            return ResponseEntity.ok(user.get().getId());
//        } else {
//            System.out.println("User not found for email: " + email);  // Log when user is not found
//            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
//        }
//    }



    @GetMapping("/last30")
    public ResponseEntity<?> last30() {
        try {
            return ResponseEntity.ok(userService.last30users());
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new GeneralResponse(e.getMessage()));
        }
    }

    @GetMapping("/userMonthlyCount")
    public ResponseEntity<?> getMonthlyUserCount() {
        try {
            return ResponseEntity.ok(userService.getMonthlyUserCounts());
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new GeneralResponse(e.getMessage()));
        }
    }

    @PutMapping("/updateProfile/{id}")
    public ResponseEntity<?> updateProfile(@PathVariable("id") Long id, @RequestBody Users users) {
        try {
            Users userData = userService.updateProfile(id, users);
            if (userData != null) {
                return ResponseEntity.ok().body(new GeneralResponse("Successfully Updated"));
            }
            else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new GeneralResponse("User not found or no update was made"));
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new GeneralResponse(e.getMessage()));
        }
    }
    @PutMapping("/updatePassword")
    public ResponseEntity<?> updatePassword(@RequestBody Users users) {
        try {
            Users userData = userService.updatePassword(users);
            return ResponseEntity.ok().body(new GeneralResponse("Successfully updated the password"));
        } catch (UserNotFoundException e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new GeneralResponse(e.getMessage()));
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new GeneralResponse("An error occurred: " + e.getMessage()));
        }
    }
}









//            else {
//                return ResponseEntity.status(HttpStatus.NOT_MODIFIED).body(new GeneralResponse("No changes were made"));
//            }



