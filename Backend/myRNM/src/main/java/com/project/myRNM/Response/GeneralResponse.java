package com.project.myRNM.Response;

public class GeneralResponse {
    private String message;

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public GeneralResponse(String message) {
        this.message = message;
    }

}
