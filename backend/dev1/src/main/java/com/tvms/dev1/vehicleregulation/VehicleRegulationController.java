package com.tvms.dev1.vehicleregulation;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/vehicle-regulation")
class VehicleRegulationController {
    @Autowired
    private VehicleRegulationService service;

    @Autowired
    private IncidentRepository incidentsRepository;

    // Road Restriction Endpoints (Traffic administrator)
    // @PostMapping("/admin/restriction/add")
    // public String addRestriction(@RequestParam String roadName, @RequestParam
    // String reason,
    // @RequestParam boolean isClosed) {
    // service.addRestriction(roadName, reason, isClosed);
    // return "Restriction added: " + roadName + " - " + reason + " (Closed: " +
    // isClosed + ")";
    // }

    // @DeleteMapping("/admin/restriction/remove")
    // public String removeRestriction(@RequestParam String roadName) {
    // service.removeRestriction(roadName);
    // return "Restriction removed for: " + roadName;
    // }

    // @GetMapping("/restriction/check")
    // public String checkRestriction(@RequestParam String roadName) {
    // return service.getRestriction(roadName);
    // }

    // test this againn
    @GetMapping("/vehicleinformation")
    public List<VehicleRegulation> getVehicleInformation(@RequestParam String vehicleNumber) {
        return service.getVehicleInformation(vehicleNumber);
    }

    @GetMapping("/incidents")
    public List<Incidents> getIncidents(@RequestParam String vehicleNumber) {
        return service.getIncidents(vehicleNumber);
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/count-by-type")
    public List<IncidentCountDTO> getIncidentCountsByType() {
        return incidentsRepository.countIncidentsByType();
    }

}