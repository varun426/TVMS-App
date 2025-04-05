package com.tvms.dev1.parkingmanagement;

import org.springframework.web.bind.annotation.RestController;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

@RestController
@RequestMapping("/parking")
class ParkingController {
    @Autowired
    private ParkingSlotService parkingSlotService;

    @GetMapping("/available")
    public List<ParkingSlot> getAvailableSlots(@RequestParam String lotName) {
        return parkingSlotService.getAvailableSlots(lotName);
    }

    @GetMapping("/nearby")
    public List<ParkingLot> findNearby(@RequestParam Long latitude,
            @RequestParam Long longitude) {
        return parkingSlotService.findNearbyLots(latitude, longitude);
    }

    @PostMapping("/add")
    public ParkingSlot addParkingSlot(@RequestBody ParkingSlot slot) {
        return parkingSlotService.addParkingSlot(slot);
    }

    // Update parking slot availability
    @PutMapping("/{id}/availability")
    public ParkingSlot updateAvailability(@PathVariable Long id) {
        return parkingSlotService.updateAvailability(id);
    }

    // Delete a parking slot (Admin only)
    @DeleteMapping("/{id}")
    public String deleteParkingSlot(@PathVariable Long id) {
        parkingSlotService.deleteParkingSlot(id);
        return "Parking slot with ID " + id + " has been deleted.";
    }

}