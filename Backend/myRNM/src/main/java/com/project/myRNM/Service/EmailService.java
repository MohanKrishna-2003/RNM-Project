package com.project.myRNM.Service;

//import jakarta.mail.MessagingException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;


@Service
public class EmailService {
    @Autowired
    JavaMailSender javaMailSender;

    @Value("${spring.mail.username}")
    private String fromMailId;

    public void sendEmail(String recipient, String subject, String text)  {
        SimpleMailMessage simpleMailMessage= new SimpleMailMessage();
        simpleMailMessage.setFrom(fromMailId);
        simpleMailMessage.setTo(recipient);
        simpleMailMessage.setText(text);
        simpleMailMessage.setSubject(subject);

        javaMailSender.send(simpleMailMessage);
    }

}
