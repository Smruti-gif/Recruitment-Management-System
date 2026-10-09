package com.recruitment.platform.controller;

import org.springframework.security.access.prepost.PreAuthorize;
import com.recruitment.platform.entity.Job;
import com.recruitment.platform.service.JobService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/jobs")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class JobController {

        private final JobService jobService;

        // Create job
        @PreAuthorize("hasAnyRole('RECRUITER', 'ADMIN')")
        @PostMapping
        public ResponseEntity<Job> createJob(
                        @RequestBody Job job) {

                Job savedJob = jobService.createJob(job);

                return new ResponseEntity<>(
                                savedJob,
                                HttpStatus.CREATED);
        }

        // Get all jobs
        @GetMapping
        public ResponseEntity<List<Job>> getAllJobs() {

                return ResponseEntity.ok(
                                jobService.getAllJobs());
        }

        // Get job by ID
        @GetMapping("/{id}")
        public ResponseEntity<Job> getJobById(
                        @PathVariable Long id) {

                return ResponseEntity.ok(
                                jobService.getJobById(id));
        }

        // Get jobs by company
        @GetMapping("/company/{companyId}")
        public ResponseEntity<List<Job>> getJobsByCompany(
                        @PathVariable Long companyId) {

                return ResponseEntity.ok(
                                jobService.getJobsByCompany(companyId));
        }

        // Delete job

        @PreAuthorize("hasAnyRole('RECRUITER', 'ADMIN')")
        @DeleteMapping("/{id}")
        public ResponseEntity<String> deleteJob(
                        @PathVariable Long id) {

                jobService.deleteJob(id);

                return ResponseEntity.ok(
                                "Job deleted successfully");
        }
}