package com.example.Signup.controllers;

import com.example.Signup.Entity.Contact;
import com.example.Signup.service.ContactService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin("*")
public class ContactController {

    @Autowired
    ContactService contactService;
    @PostMapping("/contact")
    public Contact postData(@RequestBody Contact contact) {
        return contactService.post(contact);
    }

}
