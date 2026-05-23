// DoctorService.java
// Location: service/DoctorService.java — REPLACE entire file

package com.example.hospitalbackend.service;

import com.example.hospitalbackend.entity.Admission;
import com.example.hospitalbackend.entity.Doctor;
import com.example.hospitalbackend.entity.Ward;
import com.example.hospitalbackend.repository.AdmissionRepository;
import com.example.hospitalbackend.repository.DoctorRepository;
import com.example.hospitalbackend.repository.WardRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DoctorService {

    @Autowired
    private DoctorRepository doctorRepository;

    @Autowired
    private WardRepository wardRepository;

    @Autowired
    private AdmissionRepository admissionRepository;

    public Doctor saveDoctor(Doctor doctor) {
        return doctorRepository.save(doctor);
    }

    public List<Doctor> getAllDoctors() {
        return doctorRepository.findAll();
    }

    public Doctor getDoctorByName(String doctorName) {
        return doctorRepository.findById(doctorName).orElse(null);
    }

    public Doctor updateDoctor(String doctorName, Doctor updatedDoctor) {
        Doctor existing = doctorRepository.findById(doctorName).orElse(null);
        if (existing != null) {
            existing.setSpecialization(updatedDoctor.getSpecialization());
            return doctorRepository.save(existing);
        }
        return null;
    }

    public String deleteDoctor(String doctorName) {
        Doctor doctor = doctorRepository.findById(doctorName).orElse(null);

        if (doctor != null) {

            List<Ward> wards = wardRepository.findByDoctor_DoctorName(doctorName);
            for (Ward ward : wards) {
                ward.setDoctor(null);
                wardRepository.save(ward);
            }

            List<Admission> admissions =
                    admissionRepository.findByDoctor_DoctorName(doctorName); // ← updated
            for (Admission admission : admissions) {
                admission.setDoctor(null); // ← updated
                admissionRepository.save(admission);
            }

            doctorRepository.delete(doctor);
            return "Doctor deleted successfully";
        }

        return "Doctor not found";
    }
}