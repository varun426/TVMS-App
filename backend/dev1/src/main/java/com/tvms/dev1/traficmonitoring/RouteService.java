package com.tvms.dev1.traficmonitoring;

import org.springframework.stereotype.Service;
import java.util.List;
import java.util.ArrayList;

@Service
public class RouteService {

    public List<String> getRecommendedRoutes(String source, String destination) {
        List<String> routes = new ArrayList<>();
        routes.add("Route 1: " + source + " → Highway 101 → " + destination);
        routes.add("Route 2: " + source + " → Downtown → " + destination);
        routes.add("Route 3: " + source + " → Expressway → " + destination);
        return routes;
    }
}
