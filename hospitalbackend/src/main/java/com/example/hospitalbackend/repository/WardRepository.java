// WardRepository.java
// Location: repository/WardRepository.java — REPLACE entire file

package com.example.hospitalbackend.repository;

import com.example.hospitalbackend.entity.Ward;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface WardRepository extends JpaRepository<Ward, Integer> {

    List<Ward> findByPatient_PatientId(int patientId);

    List<Ward> findByDoctor_DoctorName(String doctorName);

}