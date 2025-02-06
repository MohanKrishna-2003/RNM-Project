package com.project.myRNM.Service;

import com.project.myRNM.Models.Entity.Contact;
import com.project.myRNM.Repository.ContactRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

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

    public Contact updateStatus(Integer messageid) {
        Optional<Contact> selectedcontact = contactRepo.findById(messageid);
        if (selectedcontact.isPresent()) {
            Contact updatecontact = selectedcontact.get();
            updatecontact.setStatus(true);
            return contactRepo.save(updatecontact);
        }
        return null;
    }
}
