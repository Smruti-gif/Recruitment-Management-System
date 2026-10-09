package com.recruitment.platform.controller;

import com.recruitment.platform.entity.Job;
import com.recruitment.platform.service.JobService;

import lombok.RequiredArgsConstructor;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/recruiter")
@RequiredArgsConstructor
public class RecruiterController {

    private final JobService jobService;


    // =========================================================
    // CREATE JOB
    // RECRUITER ONLY
    // =========================================================

    @PreAuthorize("hasRole('RECRUITER')")
    @PostMapping("/jobs")
    public ResponseEntity<Job> createJob(
            @RequestBody Job job) {

        Job savedJob = jobService.createJob(job);

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(savedJob);
    }


    // =========================================================
    // GET ALL JOBS
    // RECRUITER ONLY
    // =========================================================

    @PreAuthorize("hasRole('RECRUITER')")
    @GetMapping("/jobs")
    public ResponseEntity<List<Job>> getAllJobs() {

        return ResponseEntity.ok(
                jobService.getAllJobs()
        );
    }


    // =========================================================
    // GET JOB BY ID
    // RECRUITER ONLY
    // =========================================================

    @PreAuthorize("hasRole('RECRUITER')")
    @GetMapping("/jobs/{id}")
    public ResponseEntity<Job> getJobById(
            @PathVariable Long id) {

        return ResponseEntity.ok(
                jobService.getJobById(id)
        );
    }


    // =========================================================
    // DELETE JOB
    // RECRUITER ONLY
    // =========================================================

    @PreAuthorize("hasRole('RECRUITER')")
    @DeleteMapping("/jobs/{id}")
    public ResponseEntity<String> deleteJob(
            @PathVariable Long id) {

        jobService.deleteJob(id);

        return ResponseEntity.ok(
                "Job deleted successfully"
        );
    }
}