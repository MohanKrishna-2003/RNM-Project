package com.project.myRNM.Service;

import com.project.myRNM.Models.Entity.Feedback;
import com.project.myRNM.Repository.FeedbackRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import java.util.stream.Collectors;

@Service
public class FeedbackService {

    @Autowired
    FeedbackRepo feedbackRepo;
    private static final Logger logger = LoggerFactory.getLogger(FeedbackService.class);
    public List<Feedback> getFeedbacks() throws Exception {
        try{
            List<Feedback> feedbackList = feedbackRepo.findsortFeedback();
            return feedbackList;
        }
     catch (Exception e){
            e.printStackTrace();
         return List.of();

     }
    }

    // Method to categorize feedbacks and return counts for each month based on user ratings
    public Map<String, Map<String, Integer>> getMonthlyFeedbackSummary() {
        List<Object[]> feedbacks = feedbackRepo.findFeedbacks();

        Map<String, Map<String, Integer>> monthlyFeedbackCounts = new HashMap<>();

        // Categorize the feedbacks by month and count good/bad feedbacks
        for (Object[] feedback : feedbacks) {
            String feedbackDate = feedback[0].toString();
            Integer userRating = Integer.parseInt(feedback[1].toString());

            // Extract the month and year from feedbackDate
            String monthNumber = feedbackDate.substring(5, 7); // Get the month (e.g., "01", "02", ...)
            String year = feedbackDate.substring(0, 4); // Get the year (e.g., "2024")

            String monthName = getMonthName(monthNumber);

            String category = categorizeRating(userRating);

            // Build the month-year key
            String monthYearKey = monthName + " " + year;

            // Initialize counts for the month if not present
            monthlyFeedbackCounts.putIfAbsent(monthYearKey, new HashMap<>());
            Map<String, Integer> categoryCounts = monthlyFeedbackCounts.get(monthYearKey);
            categoryCounts.put(category, categoryCounts.getOrDefault(category, 0) + 1);
        }

        return monthlyFeedbackCounts;
    }

    // Method to categorize feedbacks based on user ratings (1,2 -> bad, 3,4,5 -> good)
    private String categorizeRating(int rating) {
        if (rating == 1 || rating == 2) {
            return "negative";  // bad feedback
        } else if (rating >= 3 && rating <= 5) {
            return "positive";  // good feedback
        }
        return "neutral"; // In case of unexpected rating (if any)
    }

    // Method to convert month number to month name
    private String getMonthName(String monthNumber) {
        switch (monthNumber) {
            case "01": return "January";
            case "02": return "February";
            case "03": return "March";
            case "04": return "April";
            case "05": return "May";
            case "06": return "June";
            case "07": return "July";
            case "08": return "August";
            case "09": return "September";
            case "10": return "October";
            case "11": return "November";
            case "12": return "December";
            default: return "Invalid Month";
        }
    }

    public Feedback postingFeedback(Feedback feedback) throws Exception{
        try{
            return feedbackRepo.save(feedback);
        } catch (Exception e) {
            throw new RuntimeException("Error in Posting Feedback");
        }
    }
    public List<Feedback> getAllFeedback() {
        try {
            logger.info("Attempting to fetch all feedback entries.");
            List<Feedback> feedbackList = feedbackRepo.findAll();
            List<Feedback> feedbacks = feedbackList.stream().filter((res)->res.getUsers_ratings()>=4).collect(Collectors.toList());
            if (feedbackList.isEmpty()) {
                logger.warn("No feedback found in the system.");
            } else {
                logger.info("Successfully fetched {} feedback entries.", feedbackList.size());
            }
            return feedbacks;
        } catch (Exception e) {
            logger.error("Error occurred while fetching all feedback entries: {}", e.getMessage());
            throw new RuntimeException("Unable to fetch feedback at the moment.");
        }
    }
    }

