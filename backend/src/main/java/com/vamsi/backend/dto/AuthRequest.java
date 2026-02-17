package com.vamsi.backend.dto;

public class AuthRequest {

    private String email;
    private String password;

    // Default constructor (REQUIRED for JSON)
    public AuthRequest() {
    }

    // Getters
    public String getEmail() {
        return email;
    }

    public String getPassword() {
        return password;
    }

    // Setters (REQUIRED for Jackson JSON binding)
    public void setEmail(String email) {
        this.email = email;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
