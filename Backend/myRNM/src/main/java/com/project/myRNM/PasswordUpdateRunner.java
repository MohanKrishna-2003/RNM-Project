package com.project.myRNM;

import com.project.myRNM.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class PasswordUpdateRunner implements CommandLineRunner {

    @Autowired
    private UserService userService;

    @Override
    public void run(String... args) throws Exception {
        userService.updateAllPasswordsToEncrypted();
        System.out.println("Passwords updated successfully!");
    }
}