package com.project.myRNM.Controller;

import com.project.myRNM.Models.Entity.Brand;
import com.project.myRNM.Models.Entity.Center;
import com.project.myRNM.Repository.BrandRepository;
import com.project.myRNM.Repository.CenterRepository;
import com.project.myRNM.Service.BrandService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

class BrandControllerTest {

    @Mock
    private BrandService brandService;

    @Mock
    private BrandRepository brandRepository;

    @Mock
    private CenterRepository centerRepository;

    @InjectMocks
    private BrandController brandController;

    private MockMvc mockMvc;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
        mockMvc = MockMvcBuilders.standaloneSetup(brandController).build();
    }


    @Test
    void getAllBrands_Success() throws Exception {
        // Arrange
        Center center1 = new Center(1L, "Center A", "Location A", 10, 5, 5, 5, 10.0, 20.0, 5, 5, 5, null);
        Center center2 = new Center(2L, "Center B", "Location B", 15, 7, 7, 7, 15.0, 25.0, 7, 7, 7, null);

        Brand brand = new Brand(1L, "Brand A", "iconA.png", Arrays.asList(center1, center2));

        when(brandService.getAllBrands()).thenReturn(Arrays.asList(brand));
        when(centerRepository.findById(center1.getId())).thenReturn(Optional.of(center1));
        when(centerRepository.findById(center2.getId())).thenReturn(Optional.of(center2));

        // Act & Assert
        mockMvc.perform(get("/api/brands"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].name").value("Brand A"))
                .andExpect(jsonPath("$[0].centers[0].name").value("Center A"));

        verify(brandService, times(1)).getAllBrands();
    }

   }
