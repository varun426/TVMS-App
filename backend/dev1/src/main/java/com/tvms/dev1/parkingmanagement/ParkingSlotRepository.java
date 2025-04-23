package com.tvms.dev1.parkingmanagement;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ParkingSlotRepository extends JpaRepository<ParkingSlot, Long> {

    // Find available slots by lotId
    List<ParkingSlot> findByIsAvailableAndLotId(Boolean isAvailable, Long lotId);

    // Find slots by time range
    List<ParkingSlot> findByDateTimeBetween(LocalDateTime from, LocalDateTime to);

    // Count total slots in a lot
    int countByLotId(Long lotId);

    // Count available slots in a lot
    int countByLotIdAndIsAvailable(Long lotId, boolean isAvailable);
}
