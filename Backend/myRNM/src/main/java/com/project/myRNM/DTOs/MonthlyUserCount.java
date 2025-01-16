package com.project.myRNM.DTOs;

public class MonthlyUserCount {
    String month;
    Integer count;

    public MonthlyUserCount() {
    }

    public String getMonth() {
        return month;
    }

    public MonthlyUserCount(String month, Integer count) {
        this.month = month;
        this.count = count;
    }

    public void setMonth(String month) {
        this.month = month;
    }

    public Integer getCount() {
        return count;
    }

    public void setCount(Integer count) {
        this.count = count;
    }
}
