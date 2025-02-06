package com.project.myRNM.Controller;

import com.project.myRNM.Models.Entity.Brand;
import com.project.myRNM.Models.Entity.Center;
import com.project.myRNM.Repository.BrandRepository;
import com.project.myRNM.Repository.CenterRepository;
import com.project.myRNM.Service.BrandService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/brands")
public class BrandController {

    @Autowired
    private BrandService brandService;

    @Autowired
    private BrandRepository brandRepository;

    @Autowired
    private CenterRepository centerRepository;

    // Add a new Brand
    @PostMapping
    public ResponseEntity<Brand> addBrand(@RequestBody Brand brand) {
        Brand createdBrand = brandService.addBrand(brand);
        return new ResponseEntity<>(createdBrand, HttpStatus.CREATED);
    }

    // Get all Brands
    @GetMapping
    public ResponseEntity<List<Brand>> getAllBrands() {
        List<Brand> brands = brandService.getAllBrands();

        // Refresh the available slots dynamically based on the current state of the database
        for (Brand brand : brands) {
            for (Center center : brand.getCenters()) {
                // Fetch the updated center from the database to ensure we get the most current available slot counts
                center = centerRepository.findById(center.getId()).orElse(center);

                // Recalculate available slots by summing the morning, afternoon, and evening slots
                center.setAvailableSlots(center.getMorningSlots() + center.getAfternoonSlots() + center.getEveningSlots());
            }
        }

        return new ResponseEntity<>(brands, HttpStatus.OK);
    }



    // Get Brand by ID.
    @GetMapping("/{id}")
    public ResponseEntity<Brand> getBrandById(@PathVariable Long id) {
        Brand brand = brandService.getBrandById(id);
        if (brand != null) {
            return new ResponseEntity<>(brand, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/delete-all")
    public ResponseEntity<?> deleteAllBrands() {
        try {
            brandService.deleteAllBrands();
            return ResponseEntity.ok("All brands have been deleted successfully.");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body("Error occurred while deleting all brands: " + e.getMessage());
        }
    }
}
