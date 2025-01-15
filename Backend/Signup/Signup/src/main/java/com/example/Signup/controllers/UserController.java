package com.example.Signup.controllers;

import com.example.Signup.Entity.Feedback;
import com.example.Signup.Entity.Users;
import com.example.Signup.response.GeneralResponse;
import com.example.Signup.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;

@RequestMapping(path = "userlogin")
@RestController
@CrossOrigin(origins = "http://localhost:4200/")
public class UserController {

    @Autowired
    UserService userService;

    @PostMapping("/login")
    public ResponseEntity<?> loginByPost(@RequestBody HashMap<String, String> login) throws Exception {
        try{
            Users foundUsers = userService.loginByPost(login.get("email") , login.get("password"));
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
            return ResponseEntity.ok(new GeneralResponse("Successfully Registered"));
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().body(new GeneralResponse(e.getMessage()));
        }
    }
    //Admin work
    @GetMapping("/getAllTheUserList")
    public ResponseEntity<?> getAllTheUserList(){
        try{
            List<Users> list = userService.getAllTheUserList();
            return ResponseEntity.ok(list);
        }catch(Exception e){
            e.printStackTrace();
            return ResponseEntity.badRequest().body(new GeneralResponse("Error in Fetching Data"));
        }
    }
    @GetMapping("/getAllFeedback")
    public ResponseEntity<?> getAllFeedback(){
        try{
            List<Users> list = userService.getAllFeedback();
            return ResponseEntity.ok(list);
        }catch (Exception e){
            e.printStackTrace();
            return ResponseEntity.badRequest().body(new GeneralResponse(e.getMessage()));
        }
    }
    @PostMapping("/postFeedback")
    public ResponseEntity<?> postFeedback(@RequestBody Feedback feedback){
        try{
            userService.postingFeedback(feedback);
            return ResponseEntity.ok(new GeneralResponse("Successfully posting Feedback"));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new GeneralResponse(e.getMessage()));
        }
    }
}













