package com.project.myRNM;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class MyRnmApplication {

	public static void main(String[] args) {
		System.out.println("Backend Started!");
		SpringApplication.run(MyRnmApplication.class, args);
	}
}
