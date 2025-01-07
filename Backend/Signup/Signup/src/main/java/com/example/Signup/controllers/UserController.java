package com.example.Signup.controllers;

import com.example.Signup.Entity.Users;
import com.example.Signup.response.GeneralResponse;
import com.example.Signup.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Objects;

@RequestMapping(path = "userlogin")
@RestController
@CrossOrigin(origins = "*")
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
            userService.addingUserData(users);
            return ResponseEntity.ok(new GeneralResponse("Successfully Posting"));
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().body(new GeneralResponse(e.getMessage()));
        }
    }
}













