package com.project.myRNM.Models.DTOs;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserWithFeedbackDTO {
    private Long userId;
    private String userName;
    private String userEmail;
    private String userAddress;
    private String userMobile;
    private Date registrationDate;
    private List<FeedbackDTO> feedbacks;

    @Data
    @NoArgsConstructor
    public static class FeedbackDTO {
        private Integer feedbackId;
        private Integer userRatings;
        private String feedback;
        private Date feedbackDate;

        public FeedbackDTO(Integer feedbackId, Integer userRatings, String feedback, Date feedbackDate) {
            this.feedbackId = feedbackId;
            this.userRatings = userRatings;
            this.feedback = feedback;
            this.feedbackDate = feedbackDate;
        }
    }
}
