package com.tvms.dev1.traficmonitoring;

import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "traffic_data")
public class TrafficData {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String location;
    private String congestionLevel;
    private LocalDateTime timestamp;

    // Constructors
    public TrafficData() {
    }

    public TrafficData(String location, String congestionLevel, LocalDateTime timestamp) {
        this.location = location;
        this.congestionLevel = congestionLevel;
        this.timestamp = timestamp;
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public String getCongestionLevel() {
        return congestionLevel;
    }

    public void setCongestionLevel(String congestionLevel) {
        this.congestionLevel = congestionLevel;
    }

    public LocalDateTime getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(LocalDateTime timestamp) {
        this.timestamp = timestamp;
    }
}
