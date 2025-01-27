package com.project.myRNM.Service;

import com.project.myRNM.Models.Entity.Contact;
import com.project.myRNM.Repository.ContactRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ContactService {


    @Autowired
    ContactRepo contactRepo;

    public Contact post(Contact contactModel)  {

        return contactRepo.save(contactModel);
    }

    public List<Contact> getcontact() {
        return contactRepo.findAll();
    }
}
