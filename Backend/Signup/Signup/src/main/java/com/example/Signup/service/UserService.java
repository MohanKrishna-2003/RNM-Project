package com.example.Signup.service;

import com.example.Signup.Entity.Feedback;
import com.example.Signup.Entity.Users;
import com.example.Signup.repository.FeedBackRepo;
import com.example.Signup.repository.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class UserService {

    @Autowired
    UserRepo userRepo;
    @Autowired
    FeedBackRepo feedBackRepo;
    private static final Logger logger = LoggerFactory.getLogger(UserService.class);

    public Users addingUserData(Users users) {
//        checking if the user is already present or not if it is not it throws an error
        Optional <Users> existingUser = userRepo.findByEmail(users.getEmail());
        if (existingUser.isPresent()) {
            throw new RuntimeException("Email has been already registered");
        }
        return userRepo.save(users);
    }


    public Users loginByPost(String email, String password) throws Exception {
        Optional<Users> users = userRepo.login(email, password);
        return users.orElseThrow(() -> new RuntimeException("Invalid email or password"));
    }
    public List<Users> getUserData(){
        return userRepo.findAll();
    }

    public List<UserDTO> getAllUsers() {
        // Fetch all User entities from the database
        List<Users> users = userRepo.findAll();

        // Convert each User entity to a UserDTO using Java 8 streams
        return users.stream()
                .map(user -> new UserDTO(user.getId(), user.getName(), user.getEmail(), user.getMobile(), user.getAddress()))
                .collect(Collectors.toList());
    }



    public List<Users> getAllTheUserList() throws Exception {
        return userRepo.findAll();
    }



    public List<Feedback> getAllFeedback() {
        try {
            logger.info("Attempting to fetch all feedback entries.");
            List<Feedback> feedbackList = feedBackRepo.findAll();
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


    public Feedback postingFeedback(Feedback feedback) throws Exception{
        try{
            return feedBackRepo.save(feedback);
        } catch (Exception e) {
           throw new RuntimeException("Error in Posting Feedback");
        }
    }
}
