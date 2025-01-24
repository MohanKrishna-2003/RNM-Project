package com.project.myRNM.Repository;

import com.project.myRNM.Entity.Admin;
import com.project.myRNM.Entity.Users;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface AdminRepo extends JpaRepository<Admin, Integer > {

}
