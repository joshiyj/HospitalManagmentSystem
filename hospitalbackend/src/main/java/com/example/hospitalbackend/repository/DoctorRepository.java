// DoctorRepository.java
package com.example.hospitalbackend.repository;

import com.example.hospitalbackend.entity.Doctor;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DoctorRepository extends JpaRepository<Doctor, String> {

}