// Ward.java — REPLACE entire file

package com.example.hospitalbackend.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Positive;

@Entity
@Table(name = "wards")
public class Ward {

    @Id
    @Positive(message = "Ward number must be positive")
    private int wardNo;

    @NotBlank(message = "Ward type cannot be empty")
    private String wardType;

    private boolean occupied;

    @ManyToOne
    @JoinColumn(name = "patient_id")
    @JsonIgnoreProperties("admissions")   // ← shows patient name, skips nested admissions list
    private Patient patient;

    @ManyToOne
    @JoinColumn(name = "doctor_name")
    private Doctor doctor;                // ← Doctor has no back-references, no annotation needed

    public Ward() {}

    public int getWardNo() { return wardNo; }
    public void setWardNo(int wardNo) { this.wardNo = wardNo; }

    public String getWardType() { return wardType; }
    public void setWardType(String wardType) { this.wardType = wardType; }

    public boolean isOccupied() { return occupied; }
    public void setOccupied(boolean occupied) { this.occupied = occupied; }

    public Patient getPatient() { return patient; }
    public void setPatient(Patient patient) { this.patient = patient; }

    public Doctor getDoctor() { return doctor; }
    public void setDoctor(Doctor doctor) { this.doctor = doctor; }
}