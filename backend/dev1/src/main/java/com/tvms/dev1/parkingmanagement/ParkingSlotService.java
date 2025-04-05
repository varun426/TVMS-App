package com.tvms.dev1.parkingmanagement;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
class ParkingSlotService {
    @Autowired
    private ParkingLotRepository parkingLotRepository;
    @Autowired
    private ParkingSlotRepository parkingSlotRepository;

    private static final double EARTH_RADIUS_KM = 63.0;
    private static final double MAX_DISTANCE_KM = 5;

    public List<ParkingSlot> getAvailableSlots(String lotName) {
        ParkingLot parkingLot = parkingLotRepository.findIdByLotName(lotName);
        if (parkingLot.getId() == 0) {
            return new ArrayList<ParkingSlot>();
        }
        return parkingSlotRepository.findByIsAvailableAndLotId(true, parkingLot.getId());
    }

    // public List<ParkingSlot> findNearbySlots(double latitude, double longitude) {
    // double range = 0.002; // Approx. 200m range
    // return repository.findByLatitudeBetweenAndLongitudeBetween(latitude - range,
    // latitude + range,
    // longitude - range, longitude + range);
    // }

    public List<ParkingLot> findNearbyLots(Long userLatitude, Long userLongitude) {

        List<ParkingLot> nearbySlots = new ArrayList<>();
        List<ParkingLot> availableLots = parkingLotRepository.findByAvailable(true);

        for (ParkingLot lot : availableLots) {
            double distance = calculateDistance(userLatitude, userLongitude,
                    lot.getLatitude(), lot.getLongitude());
            System.out.println(lot.getLotName() + " ::" + distance);
            if (distance <= MAX_DISTANCE_KM) {
                nearbySlots.add(lot);
            }
        }

        return nearbySlots;
    }

    private double calculateDistance(double lat1, double lon1, double lat2, double lon2) {
        double dLat = Math.toRadians(lat2 - lat1);
        double dLon = Math.toRadians(lon2 - lon1);
        double a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
                Math.cos(Math.toRadians(lat1)) * Math.cos(Math.toRadians(lat2)) *
                        Math.sin(dLon / 2) * Math.sin(dLon / 2);
        double c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return EARTH_RADIUS_KM * c;
    }

    public ParkingSlot addParkingSlot(ParkingSlot slot) {
        return parkingSlotRepository.save(slot);
    }

    // Update availability of a parking slot
    public ParkingSlot updateAvailability(Long id) {
        Optional<ParkingSlot> optionalSlot = parkingSlotRepository.findById(id);
        if (optionalSlot.isPresent()) {
            ParkingSlot slot = optionalSlot.get();
            slot.setAvailable(!slot.isAvailable());
            slot.setDateTime(LocalDateTime.now());
            return parkingSlotRepository.save(slot);
        }
        throw new RuntimeException("Parking slot with ID " + id + " not found.");
    }

    // Delete a parking slot (Admin only)
    public void deleteParkingSlot(Long id) {
        if (parkingSlotRepository.existsById(id)) {
            parkingSlotRepository.deleteById(id);
        } else {
            throw new RuntimeException("Parking slot with ID " + id + " not found.");
        }
    }

    public ParkingSlot updateSlotCondition(Long id, boolean isOpen) {
        Optional<ParkingSlot> optionalSlot = parkingSlotRepository.findById(id);
        if (optionalSlot.isPresent()) {
            ParkingSlot slot = optionalSlot.get();
            slot.setAvailable(isOpen);
            return parkingSlotRepository.save(slot);
        }
        throw new RuntimeException("Parking slot with ID " + id + " not found.");
    }
}
