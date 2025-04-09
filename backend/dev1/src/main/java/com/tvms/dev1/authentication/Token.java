package com.tvms.dev1.authentication;

import java.time.LocalDateTime;

import jakarta.persistence.*;

@Entity
public class Token {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int tokenId;
    private String token;

    public Token() {

    }

    public Token(String token, int userId, LocalDateTime createdTime, LocalDateTime expireTime) {
        this.token = token;
        this.userId = userId;
        this.createdTime = createdTime;
        this.expireTime = expireTime;
    }

    private int userId;
    private LocalDateTime createdTime;
    private LocalDateTime expireTime;

    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public LocalDateTime getCreatedTime() {
        return createdTime;
    }

    public void setCreatedTime(LocalDateTime createdTime) {
        this.createdTime = createdTime;
    }

    public LocalDateTime getExpireTime() {
        return expireTime;
    }

    public void setExpireTime(LocalDateTime expireTime) {
        this.expireTime = expireTime;
    }
}