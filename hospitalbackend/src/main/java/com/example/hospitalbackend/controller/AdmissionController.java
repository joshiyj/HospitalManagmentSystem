// AdmissionController.java
// Location: controller/AdmissionController.java — CREATE NEW FILE

package com.example.hospitalbackend.controller;

import com.example.hospitalbackend.entity.Admission;
import com.example.hospitalbackend.service.AdmissionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/admissions")
public class AdmissionController {

    @Autowired
    private AdmissionService service;

    // POST → Admit Patient
    @PostMapping("/admit")
    public String admitPatient(
            @RequestParam int wardNo,
            @RequestParam int patientId,
            @RequestParam String doctorName
    ) {
        return service.admitPatient(wardNo, patientId, doctorName);
    }

    // PUT → Discharge Patient
    @PutMapping("/discharge/{admissionId}")
    public String dischargePatient(@PathVariable int admissionId) {
        return service.dischargePatient(admissionId);
    }

    // GET → All Admissions
    @GetMapping
    public List<Admission> getAllAdmissions() {
        return service.getAllAdmissions();
    }

    // GET → By Patient
    @GetMapping("/patient/{patientId}")
    public List<Admission> getByPatient(@PathVariable int patientId) {
        return service.getAdmissionsByPatient(patientId);
    }
}