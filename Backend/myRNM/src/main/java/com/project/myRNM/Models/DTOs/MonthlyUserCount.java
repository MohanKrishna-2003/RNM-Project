package com.project.myRNM.Models.DTOs;

public class MonthlyUserCount {
    String month;
    Long count;

    public MonthlyUserCount() {
    }

    public String getMonth() {
        return month;
    }

    public MonthlyUserCount(String month, Long count) {
        this.month = month;
        this.count = count;
    }

    public void setMonth(String month) {
        this.month = month;
    }

    public Long getCount() {
        return count;
    }

    public void setCount(Long count) {
        this.count = count;
    }
}
