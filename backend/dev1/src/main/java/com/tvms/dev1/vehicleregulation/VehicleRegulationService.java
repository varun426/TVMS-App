package com.tvms.dev1.vehicleregulation;

import org.springframework.stereotype.Service;

import java.time.DayOfWeek;
import java.time.LocalDate;
import java.util.List;
import java.util.Map;

@Service
class VehicleRegulationService {
    private static final Map<DayOfWeek, Boolean> RULES = Map.of(
            DayOfWeek.MONDAY, true,
            DayOfWeek.TUESDAY, false,
            DayOfWeek.WEDNESDAY, true,
            DayOfWeek.THURSDAY, false,
            DayOfWeek.FRIDAY, true,
            DayOfWeek.SATURDAY, false,
            DayOfWeek.SUNDAY, true);

    private VehicleRegulationRepository vehicleRegulationRepository;

    private IncidentRepository incidentRepository;

    public VehicleRegulationService(VehicleRegulationRepository vehicleRegulationRepository,
                                    IncidentRepository incidentRepository) {
        this.vehicleRegulationRepository = vehicleRegulationRepository;
        this.incidentRepository = incidentRepository;
    }

    // Even/Odd Vehicle Rule Feature
    public boolean isVehicleAllowed(String vehicleNumber) {
        char lastChar = vehicleNumber.charAt(vehicleNumber.length() - 1);
        if (!Character.isDigit(lastChar))
            return false;
        int lastDigit = Character.getNumericValue(lastChar);
        boolean isOdd = lastDigit % 2 != 0;

        DayOfWeek today = LocalDate.now().getDayOfWeek();
        return RULES.getOrDefault(today, false) == isOdd;
    }

    // Road Restriction Feature
    // public void addRestriction(String roadName, String reason, boolean isClosed)
    // {
    // restrictionRepository.save(new RoadRestriction(roadName, reason, isClosed));
    // }

    // public void removeRestriction(String roadName) {
    // restrictionRepository.findByRoadName(roadName).ifPresent(restrictionRepository::delete);
    // }

    // public String getRestriction(String roadName) {
    // return restrictionRepository.findByRoadName(roadName)
    // .map(r -> r.isClosed() ? "Road is closed: " + r.getReason() : "No major
    // restrictions.")
    // .orElse("No restrictions on this road.");
    // }

    public List<VehicleRegulation> getVehicleInformation(String vehicleNumber) {
        return vehicleRegulationRepository.findByVehicleNumber(vehicleNumber);
    }

    public List<Incidents> getIncidents(String vehicleNumber) {
        return incidentRepository.findByVehicleNumber(vehicleNumber);
    }

}