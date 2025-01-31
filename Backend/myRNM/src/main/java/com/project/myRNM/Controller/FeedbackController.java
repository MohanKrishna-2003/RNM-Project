package com.project.myRNM.Controller;

import com.project.myRNM.Models.Entity.Feedback;
import com.project.myRNM.Models.Response.GeneralResponse;
import com.project.myRNM.Service.FeedbackService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/feedback")
@CrossOrigin(origins = "http://localhost:4200")
public class FeedbackController {
    @Autowired
    FeedbackService feedbackService;

    @GetMapping("/feedbackchart")
    public ResponseEntity<?> feedbackchardata(){
        try {
            return  ResponseEntity.ok(feedbackService.getFeedbacks());
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new GeneralResponse(e.getMessage()));
        }
    }
    @GetMapping("/feedbackcount")
    public ResponseEntity<?> feedbackcount(){
        try {
            return  ResponseEntity.ok(feedbackService.getMonthlyFeedbackSummary());
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new GeneralResponse(e.getMessage()));
        }
    }

    @PostMapping("/postFeedback")
    public ResponseEntity<?> postFeedback(@RequestBody Feedback feedback){
        try{
            feedbackService.postingFeedback(feedback);
            return ResponseEntity.ok(new GeneralResponse("Successfully posting Feedback"));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new GeneralResponse(e.getMessage()));
        }
    }

//    @GetMapping("/getUsersFeedback")
//    public ResponseEntity<?> getAllUsersFeedback(){
//        try{
//            List<Feedback> list = feedbackService.getAllFeedback();
//            return ResponseEntity.ok(list);
//        }catch (Exception e){
//            e.printStackTrace();
//            return ResponseEntity.badRequest().body(new GeneralResponse(e.getMessage()));
//        }
//    }
}
