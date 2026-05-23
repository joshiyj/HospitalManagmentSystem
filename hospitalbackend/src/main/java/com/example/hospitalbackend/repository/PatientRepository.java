// PatientRepository.java

package com.example.hospitalbackend.repository;

import com.example.hospitalbackend.entity.Patient;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PatientRepository
        extends JpaRepository<Patient, Integer> {

}