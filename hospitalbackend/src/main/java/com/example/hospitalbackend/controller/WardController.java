// WardController.java
// Location: controller/WardController.java — CREATE NEW FILE

package com.example.hospitalbackend.controller;

import com.example.hospitalbackend.entity.Ward;
import com.example.hospitalbackend.service.WardService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/wards")
public class WardController {

    @Autowired
    private WardService service;

    // POST → Add Ward
    @PostMapping
    public Ward addWard(@Valid @RequestBody Ward ward) {
        return service.saveWard(ward);
    }

    // GET → All Wards
    @GetMapping
    public List<Ward> getAllWards() {
        return service.getAllWards();
    }

    // GET → Ward By Number
    @GetMapping("/{wardNo}")
    public Ward getWardByNo(@PathVariable int wardNo) {
        return service.getWardByNo(wardNo);
    }

    // PUT → Assign Patient + Doctor to Ward
    @PutMapping("/{wardNo}/assign")
    public String assignWard(
            @PathVariable int wardNo,
            @RequestParam int patientId,
            @RequestParam String doctorName
    ) {
        return service.assignWard(wardNo, patientId, doctorName);
    }

    // PUT → Unassign Ward
    @PutMapping("/{wardNo}/unassign")
    public String unassignWard(@PathVariable int wardNo) {
        return service.unassignWard(wardNo);
    }

    // DELETE → Delete Ward
    @DeleteMapping("/{wardNo}")
    public String deleteWard(@PathVariable int wardNo) {
        return service.deleteWard(wardNo);
    }
}