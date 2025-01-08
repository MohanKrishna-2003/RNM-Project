package com.example.Signup.service;

import com.example.Signup.Entity.Feedback;
import com.example.Signup.Entity.Users;
import com.example.Signup.repository.FeedbackRepo;
import com.example.Signup.repository.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
public class FeedbackService {

    @Autowired
    FeedbackRepo feedbackRepo;

    public List<Feedback> getFeedbacks() throws Exception {
        try{
            List<Feedback> feedbackList = feedbackRepo.findAll();
            return feedbackList;
        }
     catch (Exception e){
            e.printStackTrace();
         return List.of();

     }
    }

        // Method to categorize feedbacks and return counts for each month
        public Map<String, Map<String, Integer>> getMonthlyFeedbackSummary() {
            List<Object[]> feedbacks = feedbackRepo.findFeedbacks();

            Map<String, Map<String, Integer>> monthlyFeedbackCounts = new HashMap<>();

            // Categorize the feedbacks by month and count positive/negative feedbacks
            for (Object[] feedback : feedbacks) {
                String feedbackDate = feedback[0].toString();
                String feedbackText = feedback[1].toString();

                // Extract the month and year from feedbackDate
                String monthNumber = feedbackDate.substring(5, 7); // Get the month (e.g., "01", "02", ...)
                String year = feedbackDate.substring(0, 4); // Get the year (e.g., "2024")

                // Convert the month number to a full month name (e.g., "01" -> "January")
                String monthName = getMonthName(monthNumber);

                // Category based on feedback
                String category = categorizeFeedback(feedbackText);

                // Build the month-year key
                String monthYearKey = monthName + " " + year;

                // Initialize counts for the month if not present
                monthlyFeedbackCounts.putIfAbsent(monthYearKey, new HashMap<>());
                Map<String, Integer> categoryCounts = monthlyFeedbackCounts.get(monthYearKey);
                categoryCounts.put(category, categoryCounts.getOrDefault(category, 0) + 1);
            }

            return monthlyFeedbackCounts;
        }

        // Method to categorize feedbacks as positive, negative, or neutral
        private String categorizeFeedback(String feedback) {
            if (feedback.equals("Excellent") || feedback.equals("Very nice")) {
                return "positive";
            } else if (feedback.equals("Very bad") || feedback.equals("Average")) {
                return "negative";
            }
            return "neutral";
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
    }

