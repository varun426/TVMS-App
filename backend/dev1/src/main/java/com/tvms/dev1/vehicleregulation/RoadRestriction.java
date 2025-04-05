package com.tvms.dev1.vehicleregulation;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
class RoadRestriction {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String roadName;
    private String reason;
    private boolean isClosed;

    public RoadRestriction() {
    }

    public RoadRestriction(String roadName, String reason, boolean isClosed) {
        this.roadName = roadName;
        this.reason = reason;
        this.isClosed = isClosed;
    }

    public Long getId() {
        return id;
    }

    public String getRoadName() {
        return roadName;
    }

    public void setRoadName(String roadName) {
        this.roadName = roadName;
    }

    public String getReason() {
        return reason;
    }

    public void setReason(String reason) {
        this.reason = reason;
    }

    public boolean isClosed() {
        return isClosed;
    }

    public void setClosed(boolean closed) {
        isClosed = closed;
    }
}