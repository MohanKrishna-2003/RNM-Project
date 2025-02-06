package com.project.myRNM;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication(exclude = SecurityAutoConfiguration.class)
@EnableScheduling
public class MyRnmApplication {

	public static void main(String[] args) {
		System.out.println("Backend Started!x");
		SpringApplication.run(MyRnmApplication.class, args);
	}
}
