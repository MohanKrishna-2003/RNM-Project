package com.example.car.service;
import com.example.car.model.Locations;
import com.example.car.repo.LocationRepo;
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
}
