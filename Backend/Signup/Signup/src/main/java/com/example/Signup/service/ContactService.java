package com.example.Signup.service;

import com.example.Signup.Entity.Contact;
import com.example.Signup.repository.ContactRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ContactService {


    @Autowired
    ContactRepo contactRepo;

    public Contact post(Contact contactModel)  {

        return contactRepo.save(contactModel);
    }
}
