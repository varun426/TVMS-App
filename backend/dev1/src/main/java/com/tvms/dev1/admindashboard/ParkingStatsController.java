package com.tvms.dev1.admindashboard;

import com.tvms.dev1.parkingmanagement.ParkingLot;
import com.tvms.dev1.parkingmanagement.ParkingLotRepository;
import com.tvms.dev1.parkingmanagement.ParkingSlotRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.*;

@RestController
@RequestMapping("/api/stats")
@CrossOrigin(origins = "http://localhost:3000")
public class ParkingStatsController {

    @Autowired
    private ParkingLotRepository lotRepo;

    @Autowired
    private ParkingSlotRepository slotRepo;

    @GetMapping("/occupancy")
    public List<ParkingOccupancyDTO> getOccupancyStats() {
        List<ParkingLot> lots = lotRepo.findAll();
        List<ParkingOccupancyDTO> stats = new ArrayList<>();

        for (ParkingLot lot : lots) {
            Long lotId = lot.getId();
            int total = slotRepo.countByLotId(lotId);
            int occupied = slotRepo.countByLotIdAndIsAvailable(lotId, false); // false = occupied

            double percentage = total == 0 ? 0.0 : (occupied * 100.0) / total;
            stats.add(new ParkingOccupancyDTO(lot.getLotName(), percentage));
        }

        return stats;
    }
} 

class ParkingOccupancyDTO {
    private String lotName;
    private double occupancyPercent;

    public ParkingOccupancyDTO(String lotName, double occupancyPercent) {
        this.lotName = lotName;
        this.occupancyPercent = occupancyPercent;
    }

    public String getLotName() {
        return lotName;
    }

    public double getOccupancyPercent() {
        return occupancyPercent;
    }
} 
