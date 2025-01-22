package com.project.myRNM.Controller;


import com.project.myRNM.Entity.Contact;
import com.project.myRNM.Service.ContactService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin("*")
@RequestMapping("/contact")
public class ContactController {

    @Autowired
    ContactService contactService;
    @PostMapping("/postcontact")
    public Contact postData(@RequestBody Contact contact) {
        return contactService.post(contact);
    }

}