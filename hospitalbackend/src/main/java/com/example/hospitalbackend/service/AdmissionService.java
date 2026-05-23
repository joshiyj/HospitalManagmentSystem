// AdmissionService.java
// Location: service/AdmissionService.java — CREATE NEW FILE

package com.example.hospitalbackend.service;

import com.example.hospitalbackend.entity.Admission;
import com.example.hospitalbackend.entity.Doctor;
import com.example.hospitalbackend.entity.Patient;
import com.example.hospitalbackend.entity.Ward;
import com.example.hospitalbackend.repository.AdmissionRepository;
import com.example.hospitalbackend.repository.DoctorRepository;
import com.example.hospitalbackend.repository.PatientRepository;
import com.example.hospitalbackend.repository.WardRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.List;

@Service
public class AdmissionService {

    @Autowired
    private AdmissionRepository admissionRepository;

    @Autowired
    private WardRepository wardRepository;

    @Autowired
    private PatientRepository patientRepository;

    @Autowired
    private DoctorRepository doctorRepository;

    // ── ADMIT ──────────────────────────────────────────────
    public String admitPatient(int wardNo, int patientId, String doctorName) {

        Ward ward = wardRepository.findById(wardNo).orElse(null);
        if (ward == null)        return "Ward not found";
        if (ward.isOccupied())   return "Ward is already occupied";

        Patient patient = patientRepository.findById(patientId).orElse(null);
        if (patient == null)     return "Patient not found";

        Doctor doctor = doctorRepository.findById(doctorName).orElse(null);
        if (doctor == null)      return "Doctor not found";

        // Mark ward as occupied
        ward.setPatient(patient);
        ward.setDoctor(doctor);
        ward.setOccupied(true);
        wardRepository.save(ward);

        // Create admission record
        Admission admission = new Admission();
        admission.setWard(ward);
        admission.setPatient(patient);
        admission.setDoctor(doctor);
        admission.setAdmittedAt(LocalDateTime.now());

        admissionRepository.save(admission);

        return "Patient admitted successfully to Ward " + wardNo;
    }

    // ── DISCHARGE ──────────────────────────────────────────
    public String dischargePatient(int admissionId) {

        Admission admission = admissionRepository.findById(admissionId).orElse(null);
        if (admission == null)            return "Admission not found";
        if (admission.getDischargedAt() != null) return "Patient already discharged";

        LocalDateTime now = LocalDateTime.now();
        admission.setDischargedAt(now);

        // Calculate hours stayed (minimum 1 hour)
        long hours = ChronoUnit.HOURS.between(admission.getAdmittedAt(), now);
        if (hours < 1) hours = 1;
        admission.setHoursStayed((int) hours);

        // Calculate bill based on ward type
        String wardType = admission.getWard().getWardType().toUpperCase();
        int ratePerHour = switch (wardType) {
            case "PRIVATE"   -> 150;
            case "EMERGENCY" -> 200;
            default          -> 50;   // GENERAL
        };

        admission.setTotalBill((int) hours * ratePerHour);
        admissionRepository.save(admission);

        // Free the ward
        Ward ward = admission.getWard();
        ward.setPatient(null);
        ward.setDoctor(null);
        ward.setOccupied(false);
        wardRepository.save(ward);

        return "Patient discharged. Hours: " + hours +
                " | Bill: ₹" + admission.getTotalBill();
    }

    // ── GET ALL ────────────────────────────────────────────
    public List<Admission> getAllAdmissions() {
        return admissionRepository.findAll();
    }

    // ── GET BY PATIENT ─────────────────────────────────────
    public List<Admission> getAdmissionsByPatient(int patientId) {
        return admissionRepository.findByPatient_PatientId(patientId);
    }
}