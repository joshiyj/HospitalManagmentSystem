// DoctorController.java
package com.example.hospitalbackend.controller;

import com.example.hospitalbackend.entity.Doctor;
import com.example.hospitalbackend.service.DoctorService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/doctors")
public class DoctorController {

    @Autowired
    private DoctorService service;

    // POST → Add Doctor
    @PostMapping
    public Doctor addDoctor(@Valid @RequestBody Doctor doctor) {
        return service.saveDoctor(doctor);
    }

    // GET → Fetch All Doctors
    @GetMapping
    public List<Doctor> getAllDoctors() {
        return service.getAllDoctors();
    }

    // GET → Fetch Doctor By Name
    @GetMapping("/{doctorName}")
    public Doctor getDoctorByName(@PathVariable String doctorName) {
        return service.getDoctorByName(doctorName);
    }

    // PUT → Update Doctor Specialization
    @PutMapping("/{doctorName}")
    public Doctor updateDoctor(
            @PathVariable String doctorName,
            @Valid @RequestBody Doctor doctor
    ) {
        return service.updateDoctor(doctorName, doctor);
    }

    // DELETE → Delete Doctor
    @DeleteMapping("/{doctorName}")
    public String deleteDoctor(@PathVariable String doctorName) {
        return service.deleteDoctor(doctorName);
    }
}