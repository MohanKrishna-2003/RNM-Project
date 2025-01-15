package com.project.myRNM.Controller;


import com.project.myRNM.Entity.Users;
import com.project.myRNM.Response.GeneralResponse;
import com.project.myRNM.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Objects;

@RequestMapping(path = "user")
@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class UserController {

    @Autowired
    UserService userService;

    @PostMapping("/loginByPost")
    public ResponseEntity<?> loginByPost(@RequestBody HashMap<String, String> login) throws Exception {
        try{
            Users foundUsers = userService.loginByPost(login.get("email"), login.get("password"));
            return ResponseEntity.ok(foundUsers);
        }catch (Exception e){
            e.printStackTrace();
            return ResponseEntity.badRequest().body(new GeneralResponse(e.getMessage()));
        }
    }


    @PostMapping("/addUserData")
    public ResponseEntity<?> addUserData(@RequestBody Users users) {
        try {
            userService.addUserData(users);
            return ResponseEntity.ok(new GeneralResponse("Successfully Posting"));
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

    @GetMapping("/userMonthlyCount")
    public ResponseEntity<?> getMonthlyUserCount() {
        try {
            return ResponseEntity.ok(userService.getMonthlyUserCounts());
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new GeneralResponse(e.getMessage()));
        }
    }
}













