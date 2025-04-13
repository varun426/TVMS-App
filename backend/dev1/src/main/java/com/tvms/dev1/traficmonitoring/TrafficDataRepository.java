package com.tvms.dev1.traficmonitoring;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Repository
public interface TrafficDataRepository extends JpaRepository<TrafficData, Long> {
    List<TrafficData> findByLocation(String location);

    List<TrafficData> findByTimestampBetween(LocalDateTime start, LocalDateTime end);

    // Fetches the latest traffic record where the location contains the given keyword, ignoring case.
    Optional<TrafficData> findFirstByLocationContainingIgnoreCaseOrderByTimestampDesc(String location);


}
