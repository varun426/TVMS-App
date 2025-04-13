package com.tvms.dev1.parkingmanagement;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
interface ParkingSlotRepository extends JpaRepository<ParkingSlot, Long> {

    // Find available slots by lotId
    List<ParkingSlot> findByIsAvailableAndLotId(Boolean isAvailable, Long lotId);

    // Optional: Additional method to find slots by date range
    List<ParkingSlot> findByDateTimeBetween(LocalDateTime from, LocalDateTime to);
}