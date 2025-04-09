package com.tvms.dev1.traficmonitoring;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.http.ResponseEntity;
import org.springframework.beans.factory.annotation.Value;
import java.time.LocalDateTime;
import java.util.List;

@Service
public class TomTomTrafficService {

    private final RestTemplate restTemplate = new RestTemplate();
    private final TrafficDataRepository trafficDataRepository;

    @Value("${tomtom.api.key}")
    private String apiKey;

    private static final String TOMTOM_API_URL =
        "https://api.tomtom.com/traffic/services/4/flowSegmentData/absolute/10/json";

    public TomTomTrafficService(TrafficDataRepository trafficDataRepository) {
        this.trafficDataRepository = trafficDataRepository;
    }

    private TrafficData parseAndSaveTrafficData(String responseBody, double lat, double lon) {
        try {
            ObjectMapper objectMapper = new ObjectMapper();
            JsonNode jsonResponse = objectMapper.readTree(responseBody);
    
            if (jsonResponse.has("flowSegmentData")) {
                JsonNode flowSegmentData = jsonResponse.get("flowSegmentData");
    
                // 🛠️ Pass lat, lon correctly here!
                String location = getRealLocationName(lat, lon);
    
                int congestionLevel = (int) (flowSegmentData.get("currentSpeed").asDouble() / 
                                             flowSegmentData.get("freeFlowSpeed").asDouble() * 100);
    
                TrafficData trafficData = new TrafficData(location, congestionLevel, LocalDateTime.now());
    
                return trafficDataRepository.save(trafficData);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }
    
    
    // Reverse Geocode function
    private String getRealLocationName(double lat, double lon) {
    String url = String.format("https://api.tomtom.com/search/2/reverseGeocode/%.6f,%.6f.json?key=%s", lat, lon, apiKey);

    try {
        ResponseEntity<String> response = restTemplate.getForEntity(url, String.class);
        ObjectMapper objectMapper = new ObjectMapper();
        JsonNode jsonResponse = objectMapper.readTree(response.getBody());

        if (jsonResponse.has("addresses") && jsonResponse.get("addresses").size() > 0) {
            return jsonResponse.get("addresses").get(0).get("address").get("freeformAddress").asText();
        }
    } catch (JsonProcessingException e) {
        e.printStackTrace();  // Log the error
    } catch (Exception e) {
        e.printStackTrace();  // Catch all other exceptions
    }
    
    return "Unknown Location";
}

    

    public List<TrafficData> getTrafficByLocation(String location) {
        return trafficDataRepository.findByLocation(location);
    }

    public TrafficData getTrafficData(double lat, double lon) {
        String url = String.format("%s?key=%s&point=%f,%f", TOMTOM_API_URL, apiKey, lat, lon);
        System.out.println(url);
        ResponseEntity<String> response = restTemplate.getForEntity(url, String.class);
    
        return parseAndSaveTrafficData(response.getBody(), lat, lon);
    }
    
    public List<TrafficData> getTrafficByTimestampRange(LocalDateTime start, LocalDateTime end) {
        return trafficDataRepository.findByTimestampBetween(start, end);
    }
    
    public List<TrafficData> getAllTrafficData() {
        return trafficDataRepository.findAll();
    }
}
