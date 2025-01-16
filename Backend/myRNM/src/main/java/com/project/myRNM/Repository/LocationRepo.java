package com.project.myRNM.Repository;

import com.project.myRNM.Entity.Locations;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LocationRepo extends JpaRepository<Locations,Integer> {

}
