package com.tvms.dev1.admindashboard;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.*;
import com.tvms.dev1.vehicleregulation.*;
import com.tvms.dev1.parkingmanagement.*;

@RestController
@RequestMapping("/dashboard")
public class DashboardController {

    @Autowired
    private VehicleRegulationService vehicleRegulationService;

    @Autowired
    private ParkingSlotService parkingSlotService;



    @GetMapping("/violations/{startTime}/{endTime}")
    public Map<String, Integer> getViolationDetails(
        @PathVariable @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime startTime,
        @PathVariable @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime endTime) {

        System.out.println(startTime.toString() + "::" + endTime.toString());

        return vehicleRegulationService.getViolationsByTime(startTime, endTime);
    }

    @GetMapping("/slots/{startTime}/{endTime}")
    public Map<LocalDateTime, Integer> getSlotDetails(@PathVariable LocalDateTime startTime,
            @PathVariable LocalDateTime endTime) {
        return parkingSlotService.findSlotsByTime(startTime, endTime);
    }

}