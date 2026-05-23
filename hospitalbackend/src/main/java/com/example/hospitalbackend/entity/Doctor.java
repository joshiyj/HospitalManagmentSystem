// Doctor.java
package com.example.hospitalbackend.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;

@Entity
@Table(name = "doctors")
public class Doctor {

    @Id
    @NotBlank(message = "Doctor name cannot be empty")
    private String doctorName;

    @NotBlank(message = "Specialization cannot be empty")
    private String specialization;

    public Doctor() {
    }

    public String getDoctorName() {
        return doctorName;
    }

    public void setDoctorName(String doctorName) {
        this.doctorName = doctorName;
    }

    public String getSpecialization() {
        return specialization;
    }

    public void setSpecialization(String specialization) {
        this.specialization = specialization;
    }
}