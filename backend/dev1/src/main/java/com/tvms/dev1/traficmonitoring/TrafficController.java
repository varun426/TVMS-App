package com.tvms.dev1.traficmonitoring;

import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/traffic")
public class TrafficController {

    private final TomTomTrafficService tomTomTrafficService;

    public TrafficController(TomTomTrafficService tomTomTrafficService) {
        this.tomTomTrafficService = tomTomTrafficService;
    }

    // 1. Fetch Live Traffic Data & Store in DB
    @GetMapping("/location")
    public TrafficData getTrafficByLocation(@RequestParam double lat, @RequestParam double lon) {
        return tomTomTrafficService.getTrafficData(lat, lon);
    }

    // 2. Fetch Past Traffic Data by Location
    @GetMapping("/history/location")
    public List<TrafficData> getPastTrafficByLocation(@RequestParam String location) {
        return tomTomTrafficService.getTrafficByLocation(location);
    }

    // 3. Fetch Traffic Data by Time Range (-30 to +30 mins)
    @GetMapping("/history/timestamp")
    public List<TrafficData> getTrafficByTimestamp(@RequestParam String timestamp) {
        LocalDateTime requestedTime = LocalDateTime.parse(timestamp);
        LocalDateTime start = requestedTime.minusMinutes(30);
        LocalDateTime end = requestedTime.plusMinutes(30);

        return tomTomTrafficService.getTrafficByTimestampRange(start, end);
    }

    // 4. Fetch All Stored Traffic Data
    @GetMapping("/total")
    public List<TrafficData> getAllTrafficData() {
        return tomTomTrafficService.getAllTrafficData();
    }

}
