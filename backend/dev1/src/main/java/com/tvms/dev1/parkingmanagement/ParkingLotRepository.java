package com.tvms.dev1.parkingmanagement;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ParkingLotRepository extends JpaRepository<ParkingLot, Long> {

    ParkingLot findIdByLotName(String lotName);

    // Find a lot by latitude and longitude
    Long findIdByLatitudeAndLongitude(Long latitude, Long longitude);

    // Find all lots by availability status
    List<ParkingLot> findByAvailable(Boolean available);

    // List<ParkingSlot> findByLatitudeBetweenAndLongitudeBetween(double latMin,
    // double latMax, double lonMin,
    // double lonMax);

    // Find a parking lot by its lotName
    ParkingLot findByLotName(String lotName);
}