// WardService.java
// Location: service/WardService.java — CREATE NEW FILE

package com.example.hospitalbackend.service;

import com.example.hospitalbackend.entity.Doctor;
import com.example.hospitalbackend.entity.Patient;
import com.example.hospitalbackend.entity.Ward;
import com.example.hospitalbackend.repository.DoctorRepository;
import com.example.hospitalbackend.repository.PatientRepository;
import com.example.hospitalbackend.repository.WardRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class WardService {

    @Autowired
    private WardRepository wardRepository;

    @Autowired
    private PatientRepository patientRepository;

    @Autowired
    private DoctorRepository doctorRepository;

    // Add Ward
    public Ward saveWard(Ward ward) {
        ward.setOccupied(false); // always starts unoccupied
        return wardRepository.save(ward);
    }

    // Get All Wards
    public List<Ward> getAllWards() {
        return wardRepository.findAll();
    }

    // Get Ward By Number
    public Ward getWardByNo(int wardNo) {
        return wardRepository.findById(wardNo).orElse(null);
    }

    // Assign Patient + Doctor to Ward
    public String assignWard(int wardNo, int patientId, String doctorName) {

        Ward ward = wardRepository.findById(wardNo).orElse(null);
        if (ward == null) return "Ward not found";

        if (ward.isOccupied()) return "Ward is already occupied";

        Patient patient = patientRepository.findById(patientId).orElse(null);
        if (patient == null) return "Patient not found";

        Doctor doctor = doctorRepository.findById(doctorName).orElse(null);
        if (doctor == null) return "Doctor not found";

        ward.setPatient(patient);
        ward.setDoctor(doctor);
        ward.setOccupied(true);

        wardRepository.save(ward);
        return "Ward assigned successfully";
    }

    // Unassign Ward (Free it up)
    public String unassignWard(int wardNo) {

        Ward ward = wardRepository.findById(wardNo).orElse(null);
        if (ward == null) return "Ward not found";

        if (!ward.isOccupied()) return "Ward is already free";

        ward.setPatient(null);
        ward.setDoctor(null);
        ward.setOccupied(false);

        wardRepository.save(ward);
        return "Ward unassigned successfully";
    }

    // Delete Ward
    public String deleteWard(int wardNo) {
        Ward ward = wardRepository.findById(wardNo).orElse(null);

        if (ward != null) {
            wardRepository.delete(ward);
            return "Ward deleted successfully";
        }

        return "Ward not found";
    }
}