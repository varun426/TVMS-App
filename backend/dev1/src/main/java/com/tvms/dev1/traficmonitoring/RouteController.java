package com.tvms.dev1.traficmonitoring;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/routes")
public class RouteController {

    @Autowired
    private RouteService routeService;

    @GetMapping("/{source}/{destination}")
    public List<String> getRoutes(@PathVariable String source, @PathVariable String destination) {
        return routeService.getRecommendedRoutes(source, destination);
    }

}
