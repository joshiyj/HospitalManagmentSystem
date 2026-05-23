// Patient.java — REPLACE entire file

package com.example.hospitalbackend.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Positive;

import java.util.List;

@Entity
@Table(name = "patients")
public class Patient {

    @Id
    @Positive(message = "Patient ID must be positive")
    private int patientId;

    @NotBlank(message = "Patient name cannot be empty")
    private String patientName;

    @OneToMany(
            mappedBy = "patient",
            cascade = CascadeType.ALL,
            orphanRemoval = true,
            fetch = FetchType.LAZY
    )
    @JsonIgnoreProperties("patient")   // ← replaces @JsonManagedReference
    private List<Admission> admissions;

    public Patient() {}

    public int getPatientId() { return patientId; }
    public void setPatientId(int patientId) { this.patientId = patientId; }

    public String getPatientName() { return patientName; }
    public void setPatientName(String patientName) { this.patientName = patientName; }

    public List<Admission> getAdmissions() { return admissions; }
    public void setAdmissions(List<Admission> admissions) { this.admissions = admissions; }
}