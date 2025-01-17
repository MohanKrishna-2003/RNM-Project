package com.project.myRNM.Service;

import com.project.myRNM.Entity.Locations;
import com.project.myRNM.Repository.LocationRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class LocationsService {

    @Autowired
    LocationRepo locationRepo;
    public List<Locations> disp(){
        return locationRepo.findAll();

    }
    public Integer showroomcount(){
        return locationRepo.totalshowrooms();
    }
}
