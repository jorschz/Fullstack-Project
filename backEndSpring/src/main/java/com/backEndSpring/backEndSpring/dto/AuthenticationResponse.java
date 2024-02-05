package com.backEndSpring.backEndSpring.dto;

public class AuthenticationResponse {

    private boolean authenticated;

    private String message;

    public AuthenticationResponse(boolean authenticated, String message){
        this.authenticated = authenticated;
        this.message = message;
    }

    public boolean isAuthenticated(){
        return authenticated;
    }

    public void setAuthenticated(boolean authenticated){
        this.authenticated = authenticated;
    }

    public String getMessage(){
        return message;
    }

    public void setMessage(String message){
        this.message = message;
    }
}
