package com.project.myRNM.Service;

import com.project.myRNM.Models.Entity.Brand;
import com.project.myRNM.Repository.BrandRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class BrandService {

    @Autowired
    private BrandRepository brandRepository;

    // Add a new Brand
    public Brand addBrand(Brand brand) {
        return brandRepository.save(brand);
    }

    // Get all Brands
    public List<Brand> getAllBrands() {
        return brandRepository.findAll();
    }

    @Transactional
    public void deleteAllBrands() {
        // Deletes all brands and associated centers if cascade delete is enabled
        brandRepository.deleteAll();
    }

    // Get Brand by ID
    public Brand getBrandById(Long id) {
        Optional<Brand> brand = brandRepository.findById(id);
        return brand.orElse(null);  // Return null if not found
    }
}
