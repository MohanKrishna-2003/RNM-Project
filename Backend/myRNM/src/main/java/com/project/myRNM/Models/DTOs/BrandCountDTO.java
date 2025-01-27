package com.project.myRNM.Models.DTOs;

public class BrandCountDTO {

        private String brand;
        private Long totalUsers;

        public BrandCountDTO(String brand, Long totalUsers) {
            this.brand = brand;
            this.totalUsers = totalUsers;
        }

        // Getters and Setters
        public String getBrand() {
            return brand;
        }

        public void setBrand(String brand) {
            this.brand = brand;
        }

        public Long getTotalUsers() {
            return totalUsers;
        }

        public void setTotalUsers(Long totalUsers) {
            this.totalUsers = totalUsers;
        }
    }


