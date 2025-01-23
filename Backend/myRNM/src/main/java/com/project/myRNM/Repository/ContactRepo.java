package com.project.myRNM.Repository;

import com.project.myRNM.Entity.Contact;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.RestController;

@Repository
public interface ContactRepo extends JpaRepository<Contact, Integer> {

}
