package com.example.Signup.controllers;

import com.example.Signup.Entity.Users;
import com.example.Signup.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.nio.file.Path;
import java.util.HashMap;
import java.util.List;

@RequestMapping(path="userlogin")
@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class UserController {

    @Autowired
    UserService userService;

    @PostMapping("/loginByPost")
    public List<Users> loginByPost(@RequestBody HashMap<String, String> login) throws Exception {
        List<Users> foundUsers = userService.loginByPost(login.get("email"), login.get("password"));
        if (foundUsers.isEmpty()) {
            throw new Exception("Invalid email or password");
        }
        System.out.println(foundUsers);
        return foundUsers;
    }

    @PostMapping("/addUserData")
    public Users addUserData(@RequestBody Users users) {

        return userService.addUserData(users);
    }


}
