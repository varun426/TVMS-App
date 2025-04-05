package com.tvms.dev1.traficmonitoring;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class TrafficService {

    @Autowired
    private TrafficRepository trafficRepository;

    public List<TrafficData> getAllTrafficData() {
        return trafficRepository.findAll();
    }

    public List<TrafficData> getTrafficByLocation(String location) {
        return trafficRepository.findByLocation(location);
    }

    public TrafficData saveTrafficData(TrafficData trafficData) {
        return trafficRepository.save(trafficData);
    }

    public List<TrafficData> getTrafficByTime(LocalDateTime timestamp) {
        LocalDateTime start = timestamp.minusMinutes(30);
        LocalDateTime end = timestamp.plusMinutes(30);
        return trafficRepository.findByTimestampBetween(start, end);
    }
}
