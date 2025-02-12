package com.project.myRNM.Controller;

import com.project.myRNM.Models.Entity.Center;
import com.project.myRNM.Repository.CenterRepository;
import com.project.myRNM.Service.CenterService;
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
import java.util.Optional;

import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

class CenterControllerTest {

    @Mock
    private CenterService centerService;

    @Mock
    private CenterRepository centerRepository;

    @InjectMocks
    private CenterController centerController;

    private MockMvc mockMvc;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
        mockMvc = MockMvcBuilders.standaloneSetup(centerController).build();
    }

    @Test
    void getAllCenters_Success() throws Exception {
        // Arrange
        Center center1 = new Center(1L, "Center A", "Location A", 10, 5, 5, 5, 10.0, 20.0, 5, 5, 5, null);
        Center center2 = new Center(2L, "Center B", "Location B", 15, 7, 7, 7, 15.0, 25.0, 7, 7, 7, null);
        when(centerService.getAllCenters()).thenReturn(Arrays.asList(center1, center2));

        // Act & Assert
        mockMvc.perform(get("/api/centers"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].name").value("Center A"))
                .andExpect(jsonPath("$[1].name").value("Center B"));

        verify(centerService, times(1)).getAllCenters();
    }

}
