package com.recruitment.platform.controller;

import org.springframework.security.core.Authentication;
import com.recruitment.platform.dto.ApplicationRequest;
import com.recruitment.platform.dto.ApplicationResponse;
import com.recruitment.platform.dto.ApplicationStatusRequest;
import com.recruitment.platform.service.ApplicationService;

import lombok.RequiredArgsConstructor;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/applications")
@RequiredArgsConstructor
public class ApplicationController {

        private final ApplicationService applicationService;

        // =========================================================
        // APPLY FOR JOB
        // CANDIDATE ONLY
        // =========================================================

        @PreAuthorize("hasRole('CANDIDATE')")
        @PostMapping("/apply")
        public ResponseEntity<ApplicationResponse> apply(
                        @RequestBody ApplicationRequest request) {

                ApplicationResponse response = applicationService.apply(request);

                return ResponseEntity
                                .status(HttpStatus.CREATED)
                                .body(response);
        }

        // =========================================================
        // GET ALL APPLICATIONS
        // RECRUITER + ADMIN
        // =========================================================

        @PreAuthorize("hasAnyRole('RECRUITER', 'ADMIN')")
        @GetMapping
        public ResponseEntity<List<ApplicationResponse>> getAllApplications() {

                return ResponseEntity.ok(
                                applicationService.getAllApplications());
        }

        // =========================================================
        // GET APPLICATIONS BY CANDIDATE
        // CANDIDATE ONLY
        // =========================================================

        @PreAuthorize("hasRole('CANDIDATE')")
        @GetMapping("/candidate/{candidateId}")
        public ResponseEntity<List<ApplicationResponse>> getApplicationsByCandidate(
                        @PathVariable Long candidateId,
                        Authentication authentication) {

                return ResponseEntity.ok(
                                applicationService.getApplicationsByCandidate(
                                                candidateId,
                                                authentication.getName()));
        }

        // =========================================================
        // GET APPLICATIONS FOR LOGGED-IN RECRUITER
        // RECRUITER ONLY
        // =========================================================

        @PreAuthorize("hasRole('RECRUITER')")
        @GetMapping("/recruiter")
        public ResponseEntity<List<ApplicationResponse>> getApplicationsByRecruiter(
                        Authentication authentication) {

                return ResponseEntity.ok(
                                applicationService.getApplicationsByRecruiter(
                                                authentication.getName()));
        }

        // =========================================================
        // GET APPLICATION BY ID
        // RECRUITER + ADMIN
        // =========================================================

        @PreAuthorize("hasAnyRole('RECRUITER', 'ADMIN')")
        @GetMapping("/{id}")
        public ResponseEntity<ApplicationResponse> getApplicationById(
                        @PathVariable Long id) {

                return ResponseEntity.ok(
                                applicationService.getApplicationById(id));
        }

        // =========================================================
        // UPDATE APPLICATION STATUS
        // RECRUITER + ADMIN
        // =========================================================

        @PreAuthorize("hasAnyRole('RECRUITER', 'ADMIN')")
        @PutMapping("/{id}/status")
        public ResponseEntity<ApplicationResponse> updateStatus(
                        @PathVariable Long id,
                        @RequestBody ApplicationStatusRequest request) {

                ApplicationResponse response = applicationService.updateApplicationStatus(
                                id,
                                request.getStatus());

                return ResponseEntity.ok(response);
        }

}