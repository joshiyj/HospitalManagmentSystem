// AdmissionRepository.java
// Location: repository/AdmissionRepository.java — REPLACE entire file

package com.example.hospitalbackend.repository;

import com.example.hospitalbackend.entity.Admission;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AdmissionRepository extends JpaRepository<Admission, Integer> {

    List<Admission> findByPatient_PatientId(int patientId);

    List<Admission> findByDoctor_DoctorName(String doctorName); // ← updated

}