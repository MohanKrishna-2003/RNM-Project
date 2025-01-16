package com.example.car.controller;

import com.example.car.service.LocationsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class LocationsControl {

    @Autowired
    LocationsService locationsService;

    // Define the path for the GET request
    @GetMapping("/locations")  // Use "/locations" as the endpoint
    public ResponseEntity<?> LocationDisp() {
        return ResponseEntity.ok(locationsService.disp());
    }
}
