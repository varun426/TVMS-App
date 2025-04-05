package com.tvms.dev1.traficmonitoring;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
// import java.sql.Date;
import java.util.List;

@RestController
@RequestMapping("/api/traffic")
public class TrafficController {

    @Autowired
    private TrafficService trafficService;

    // Get all traffic data
    @GetMapping
    public List<TrafficData> getAllTraffic() {
        return trafficService.getAllTrafficData();
    }

    // Get traffic data by location
    @GetMapping("/location")
    public List<TrafficData> getTrafficByLocation(@RequestParam String location) {
        return trafficService.getTrafficByLocation(location);
    }

    // get by time specific for each area sample timestamp 2025-04-01 08:30:00
    // Fix the end point as the error is with Date parsing
    @GetMapping("/timestamp")
    public List<TrafficData> getTrafficByTime(
            @RequestParam LocalDateTime timestamp) {
        return trafficService.getTrafficByTime(timestamp);
    }

    // Add traffic data
    @PostMapping
    public TrafficData addTrafficData(@RequestBody TrafficData trafficData) {
        trafficData.setTimestamp(LocalDateTime.now());
        return trafficService.saveTrafficData(trafficData);
    }
}
