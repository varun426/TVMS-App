package com.tvms.dev1.vehicleregulation;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
interface VehicleRegulationRepository extends JpaRepository<VehicleRegulation, Long> {
    // Optional<RoadRestriction> findByRoadName(String roadName);

    List<VehicleRegulation> findByVehicleNumber(String vehicleNumber);
}
