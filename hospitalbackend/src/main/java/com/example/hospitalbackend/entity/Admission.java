// Admission.java — REPLACE entire file

package com.example.hospitalbackend.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "admissions")
public class Admission {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int admissionId;

    @ManyToOne
    @JoinColumn(name = "ward_no")
    @JsonIgnoreProperties({"patient", "doctor"})   // ← stops ward from nesting infinitely
    private Ward ward;

    @ManyToOne
    @JoinColumn(name = "patient_id")
    @JsonIgnoreProperties("admissions")             // ← shows patient but skips its admissions list
    private Patient patient;

    @ManyToOne
    @JoinColumn(name = "doctor_name")
    private Doctor doctor;

    private LocalDateTime admittedAt;
    private LocalDateTime dischargedAt;
    private int hoursStayed;
    private int totalBill;

    public Admission() {}

    public int getAdmissionId() { return admissionId; }
    public void setAdmissionId(int admissionId) { this.admissionId = admissionId; }

    public Ward getWard() { return ward; }
    public void setWard(Ward ward) { this.ward = ward; }

    public Patient getPatient() { return patient; }
    public void setPatient(Patient patient) { this.patient = patient; }

    public Doctor getDoctor() { return doctor; }
    public void setDoctor(Doctor doctor) { this.doctor = doctor; }

    public LocalDateTime getAdmittedAt() { return admittedAt; }
    public void setAdmittedAt(LocalDateTime admittedAt) { this.admittedAt = admittedAt; }

    public LocalDateTime getDischargedAt() { return dischargedAt; }
    public void setDischargedAt(LocalDateTime dischargedAt) { this.dischargedAt = dischargedAt; }

    public int getHoursStayed() { return hoursStayed; }
    public void setHoursStayed(int hoursStayed) { this.hoursStayed = hoursStayed; }

    public int getTotalBill() { return totalBill; }
    public void setTotalBill(int totalBill) { this.totalBill = totalBill; }
}