package com.example.Signup.controllers;

import com.example.Signup.Entity.Users;
import com.example.Signup.response.GeneralResponse;
import com.example.Signup.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.nio.file.Path;
import java.util.HashMap;
import java.util.List;
import java.util.Objects;

@RequestMapping(path = "userlogin")
@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class UserController {

    @Autowired
    UserService userService;

    @PostMapping("/loginByPost")
    public Users loginByPost(@RequestBody HashMap<String, String> login) throws Exception {
        Users foundUsers = userService.loginByPost(login.get("email"), login.get("password"));
        if (Objects.isNull(foundUsers)) {
            throw new Exception("Invalid email or password");
        }
        System.out.println(foundUsers);
        return foundUsers;
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
}













