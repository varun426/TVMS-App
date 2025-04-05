package com.tvms.dev1.parkingmanagement;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
interface ParkingLotRepository extends JpaRepository<ParkingLot, Long> {

    ParkingLot findIdByLotName(String lotName);

    Long findIdByLatitudeAndLongitude(Long latitude, Long longitude);

    List<ParkingLot> findByAvailable(Boolean available);

    // List<ParkingSlot> findByLatitudeBetweenAndLongitudeBetween(double latMin,
    // double latMax, double lonMin,
    // double lonMax);
}