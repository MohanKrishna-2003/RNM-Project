package com.project.myRNM.Controller;

import com.project.myRNM.Models.Entity.Car;
import com.project.myRNM.Service.CarService;
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

import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

class CarControllerTest {

    @Mock
    private CarService carService;

    @InjectMocks
    private CarController carController;

    private MockMvc mockMvc;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
        mockMvc = MockMvcBuilders.standaloneSetup(carController).build();
    }

    @Test
    void getAllCars_Success() throws Exception {
        // Arrange
        Car car1 = new Car(1L, null, "Renault", "icon.png", "Captur", "image.jpg", "25000", 2023, 0, "Car details", 4, "Petrol", 5, "Manual", "Available", "15 km/l", "Red", "FWD", 5, null, null);
        Car car2 = new Car(2L, null, "Nissan", "icon.png", "Altima", "image.jpg", "22000", 2022, 0, "Car details", 5, "Petrol", 5, "Automatic", "Available", "17 km/l", "Blue", "FWD", 5, null, null);

        List<Car> cars = Arrays.asList(car1, car2);

        when(carService.getAllCars()).thenReturn(cars);

        // Act & Assert
        mockMvc.perform(get("/api/cars"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].brand").value("Renault"))
                .andExpect(jsonPath("$[1].brand").value("Nissan"));

        verify(carService, times(1)).getAllCars();
    }

}
