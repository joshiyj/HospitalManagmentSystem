// PatientController.java

package com.example.hospitalbackend.controller;

import com.example.hospitalbackend.entity.Patient;
import com.example.hospitalbackend.service.PatientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import jakarta.validation.Valid;

import java.util.List;

@RestController
@RequestMapping("/patients")
public class PatientController {

    @Autowired
    private PatientService service;

    // POST API → Add Patient
    @PostMapping
    public Patient addPatient(@Valid @RequestBody Patient patient) {

        return service.savePatient(patient);

    }

    // GET API → Fetch All Patients
    @GetMapping
    public List<Patient> getAllPatients() {

        return service.getAllPatients();

    }
    // GET API → Fetch Patient By ID
    @GetMapping("/{id}")
    public Patient getPatientById(@PathVariable int id) {

        return service.getPatientById(id);

    }
    // DELETE API → Delete Patient
    @DeleteMapping("/{id}")
    public String deletePatient(@PathVariable int id) {

        return service.deletePatient(id);

    }

}