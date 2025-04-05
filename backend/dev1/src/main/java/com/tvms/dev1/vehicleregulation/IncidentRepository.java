package com.tvms.dev1.vehicleregulation;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
interface IncidentRepository extends JpaRepository<Incidents, Long> {
    // Optional<RoadRestriction> findByRoadName(String roadName);

    List<Incidents> findByVehicleNumber(String vehicleNumber);
}