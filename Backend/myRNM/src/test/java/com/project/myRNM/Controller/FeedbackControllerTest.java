package com.project.myRNM.Controller;

import com.project.myRNM.Models.Entity.Feedback;
import com.project.myRNM.Models.Response.GeneralResponse;
import com.project.myRNM.Service.FeedbackService;
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
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

class FeedbackControllerTest {

    @Mock
    private FeedbackService feedbackService;

    @InjectMocks
    private FeedbackController feedbackController;

    private MockMvc mockMvc;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
        mockMvc = MockMvcBuilders.standaloneSetup(feedbackController).build();
    }

    @Test
    void feedbackchardata_Success() throws Exception {
        // Arrange
        Feedback feedback1 = new Feedback(1, 1, "John Doe", "Great service", 5, "john@example.com", null);
        Feedback feedback2 = new Feedback(2, 2, "Jane Smith", "Good experience", 4, "jane@example.com", null);
        List<Feedback> feedbackList = Arrays.asList(feedback1, feedback2);

        when(feedbackService.getFeedbacks()).thenReturn(feedbackList);

        // Act & Assert
        mockMvc.perform(get("/feedback/feedbackchart"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].user_name").value("John Doe"))
                .andExpect(jsonPath("$[1].user_name").value("Jane Smith"));

        verify(feedbackService, times(1)).getFeedbacks();
    }


    @Test
    void postFeedback_Success() throws Exception {
        // Arrange
        Feedback feedback = new Feedback(null, 1, "John Doe", "Great service", 5, "john@example.com", null); // feedback_id is null

        // Mock the service call for posting feedback
        when(feedbackService.postingFeedback(any(Feedback.class))).thenReturn(feedback);

        // Act & Assert
        mockMvc.perform(post("/feedback/postFeedback")
                        .contentType("application/json")
                        .content("{\"user_id\": 1, \"user_name\": \"John Doe\", \"feedback\": \"Great service\", \"users_ratings\": 5, \"user_email\": \"john@example.com\"}"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.message").value("Successfully posting Feedback"));  // Ensure correct response body

        // Verify that postingFeedback was called exactly once with any Feedback object
        verify(feedbackService, times(1)).postingFeedback(any(Feedback.class));
    }


    @Test
    void getAllUsersFeedback_Success() throws Exception {
        // Arrange
        Feedback feedback1 = new Feedback(1, 1, "John Doe", "Great service", 5, "john@example.com", null);
        Feedback feedback2 = new Feedback(2, 2, "Jane Smith", "Good experience", 4, "jane@example.com", null);
        List<Feedback> feedbackList = Arrays.asList(feedback1, feedback2);

        when(feedbackService.getAllFeedback()).thenReturn(feedbackList);

        // Act & Assert
        mockMvc.perform(get("/feedback/getUsersFeedback"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].user_name").value("John Doe"))
                .andExpect(jsonPath("$[1].user_name").value("Jane Smith"));

        verify(feedbackService, times(1)).getAllFeedback();
    }

    @Test
    void getAllUsersFeedback_Failure() throws Exception {
        // Arrange
        when(feedbackService.getAllFeedback()).thenThrow(new RuntimeException("Error fetching feedback"));

        // Act & Assert
        mockMvc.perform(get("/feedback/getUsersFeedback"))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.message").value("Error fetching feedback"));

        verify(feedbackService, times(1)).getAllFeedback();
    }
}
