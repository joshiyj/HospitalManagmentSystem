// PatientService.java

package com.example.hospitalbackend.service;

import com.example.hospitalbackend.entity.Patient;
import com.example.hospitalbackend.repository.PatientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.example.hospitalbackend.entity.Ward;
import com.example.hospitalbackend.repository.WardRepository;

import java.util.List;

@Service
public class PatientService {

    @Autowired
    private PatientRepository repository;

    @Autowired
    private WardRepository wardRepository;

    public Patient savePatient(Patient patient) {

        return repository.save(patient);

    }

    public List<Patient> getAllPatients() {

        return repository.findAll();

    }

    public Patient getPatientById(int id) {

        return repository.findById(id).orElse(null);

    }

    public String deletePatient(int id) {

        Patient patient = repository.findById(id).orElse(null);

        if(patient != null) {

            // Remove patient from wards
            List<Ward> wards =
                    wardRepository.findByPatient_PatientId(id);

            for(Ward ward : wards) {

                ward.setPatient(null);
                ward.setDoctor(null);
                ward.setOccupied(false);

                wardRepository.save(ward);
            }

            repository.delete(patient);

            return "Patient deleted successfully";
        }

        return "Patient not found";
    }

}