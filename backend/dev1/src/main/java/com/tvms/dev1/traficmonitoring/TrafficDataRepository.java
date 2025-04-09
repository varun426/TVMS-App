package com.tvms.dev1.traficmonitoring;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface TrafficDataRepository extends JpaRepository<TrafficData, Long> {
    List<TrafficData> findByLocation(String location);

    List<TrafficData> findByTimestampBetween(LocalDateTime start, LocalDateTime end);

}
