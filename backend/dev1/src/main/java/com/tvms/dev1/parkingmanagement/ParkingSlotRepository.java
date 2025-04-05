package com.tvms.dev1.parkingmanagement;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
interface ParkingSlotRepository extends JpaRepository<ParkingSlot, Long> {

    List<ParkingSlot> findByIsAvailableAndLotId(Boolean isAvailable, Long lotId);

    // List<ParkingSlot> findByLatitudeBetweenAndLongitudeBetween(double latMin,
    // double latMax, double lonMin,
    // double lonMax);
}