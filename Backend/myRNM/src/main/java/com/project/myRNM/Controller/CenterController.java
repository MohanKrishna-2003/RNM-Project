package com.project.myRNM.Controller;


import com.project.myRNM.Models.Entity.Center;
import com.project.myRNM.Repository.CenterRepository;
import com.project.myRNM.Service.CenterService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/centers")
public class CenterController {

    @Autowired
    private CenterService centerService;

    @Autowired
    private CenterRepository centerRepository;

    // Add a new Center
    @PostMapping
    public ResponseEntity<Center> addCenter(@RequestBody Center center) {
        Center createdCenter = centerService.addCenter(center);
        return new ResponseEntity<>(createdCenter, HttpStatus.CREATED);
    }

    // Get all Centers
    @GetMapping
    public ResponseEntity<List<Center>> getAllCenters() {
        List<Center> centers = centerService.getAllCenters();
        return new ResponseEntity<>(centers, HttpStatus.OK);
    }

    // Get Center by ID
    @GetMapping("/{id}")
    public ResponseEntity<Center> getCenterById(@PathVariable Long id) {
        Center center = centerService.getCenterById(id);
        if (center != null) {
            return new ResponseEntity<>(center, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/delete-all")
    public ResponseEntity<String> deleteAllCenters() {
        centerRepository.deleteAll();
        return ResponseEntity.ok("All centers have been deleted successfully.");
    }

    @PutMapping("/{id}")
    public ResponseEntity<Center> updateCenter(@PathVariable Long id, @RequestBody Center updatedCenter) {
        Optional<Center> existingCenter = centerRepository.findById(id);

        if (existingCenter.isPresent()) {
            Center center = existingCenter.get();

            // Update the details of the center
            center.setMorningSlots(updatedCenter.getMorningSlots());
            center.setAfternoonSlots(updatedCenter.getAfternoonSlots());
            center.setEveningSlots(updatedCenter.getEveningSlots());
            center.setAvailableSlots(updatedCenter.getAvailableSlots());

            // Save the updated center
            Center updated = centerRepository.save(center);

            return new ResponseEntity<>(updated, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

}
