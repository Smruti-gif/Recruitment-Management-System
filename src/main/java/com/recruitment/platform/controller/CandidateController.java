package com.recruitment.platform.controller;

import com.recruitment.platform.dto.CandidateDashboardResponse;
import com.recruitment.platform.entity.ApplicationStatus;
import com.recruitment.platform.entity.InterviewStatus;
import com.recruitment.platform.repository.ApplicationRepository;
import com.recruitment.platform.repository.InterviewRepository;
import com.recruitment.platform.dto.InterviewResponse;
import com.recruitment.platform.service.InterviewService;
import com.recruitment.platform.dto.ApplicationResponse;
import com.recruitment.platform.dto.CandidateProfileResponse;
import com.recruitment.platform.dto.CandidateProfileUpdateRequest;
import com.recruitment.platform.entity.User;
import com.recruitment.platform.repository.UserRepository;
import com.recruitment.platform.service.ApplicationService;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/candidates")
@CrossOrigin(origins = "http://localhost:3000")
public class CandidateController {

        private final ApplicationRepository applicationRepository;
        private final InterviewRepository interviewRepository;
        private final UserRepository userRepository;
        private final ApplicationService applicationService;
        private final InterviewService interviewService;

        public CandidateController(
                        UserRepository userRepository,
                        ApplicationService applicationService,
                        InterviewService interviewService,
                        ApplicationRepository applicationRepository,
                        InterviewRepository interviewRepository) {

                this.userRepository = userRepository;
                this.applicationService = applicationService;
                this.interviewService = interviewService;
                this.applicationRepository = applicationRepository;
                this.interviewRepository = interviewRepository;
        }

        @GetMapping("/{id}/dashboard")
        public ResponseEntity<CandidateDashboardResponse> getCandidateDashboard(
                        @PathVariable Long id) {

                User candidate = userRepository.findById(id)
                                .orElse(null);

                if (candidate == null ||
                                !candidate.getRole().name().equals("CANDIDATE")) {

                        return ResponseEntity.notFound().build();
                }

                long totalApplications = applicationRepository.countByCandidate_Id(id);

                long applied = applicationRepository.countByCandidate_IdAndStatus(
                                id,
                                ApplicationStatus.APPLIED);

                long underReview = applicationRepository.countByCandidate_IdAndStatus(
                                id,
                                ApplicationStatus.UNDER_REVIEW);

                long shortlisted = applicationRepository.countByCandidate_IdAndStatus(
                                id,
                                ApplicationStatus.SHORTLISTED);

                long interview = applicationRepository.countByCandidate_IdAndStatus(
                                id,
                                ApplicationStatus.INTERVIEW);

                long selected = applicationRepository.countByCandidate_IdAndStatus(
                                id,
                                ApplicationStatus.SELECTED);

                long rejected = applicationRepository.countByCandidate_IdAndStatus(
                                id,
                                ApplicationStatus.REJECTED);

                long withdrawn = applicationRepository.countByCandidate_IdAndStatus(
                                id,
                                ApplicationStatus.WITHDRAWN);

                long totalInterviews = interviewRepository.countByApplication_Candidate_Id(id);

                long scheduled = interviewRepository
                                .countByApplication_Candidate_IdAndStatus(
                                                id,
                                                InterviewStatus.SCHEDULED);

                long inProgress = interviewRepository
                                .countByApplication_Candidate_IdAndStatus(
                                                id,
                                                InterviewStatus.IN_PROGRESS);

                long completed = interviewRepository
                                .countByApplication_Candidate_IdAndStatus(
                                                id,
                                                InterviewStatus.COMPLETED);

                long cancelled = interviewRepository
                                .countByApplication_Candidate_IdAndStatus(
                                                id,
                                                InterviewStatus.CANCELLED);

                long rescheduled = interviewRepository
                                .countByApplication_Candidate_IdAndStatus(
                                                id,
                                                InterviewStatus.RESCHEDULED);

                CandidateDashboardResponse response = CandidateDashboardResponse.builder()
                                .totalApplications(totalApplications)

                                .appliedApplications(applied)
                                .underReviewApplications(underReview)
                                .shortlistedApplications(shortlisted)
                                .interviewApplications(interview)
                                .selectedApplications(selected)
                                .rejectedApplications(rejected)
                                .withdrawnApplications(withdrawn)

                                .totalInterviews(totalInterviews)
                                .scheduledInterviews(scheduled)
                                .inProgressInterviews(inProgress)
                                .completedInterviews(completed)
                                .cancelledInterviews(cancelled)
                                .rescheduledInterviews(rescheduled)

                                .build();

                return ResponseEntity.ok(response);
        }
        // ==========================================
        // GET MY INTERVIEWS
        // ==========================================

        @GetMapping("/{id}/interviews")
        public ResponseEntity<List<InterviewResponse>> getMyInterviews(
                        @PathVariable Long id) {

                return ResponseEntity.ok(
                                interviewService.getByCandidate(id));
        }

        // ==========================================
        // GET CANDIDATE PROFILE
        // ==========================================

        @GetMapping("/{id}")
        public ResponseEntity<CandidateProfileResponse> getCandidateProfile(
                        @PathVariable Long id) {

                return userRepository.findById(id)
                                .filter(user -> user.getRole().name().equals("CANDIDATE"))
                                .map(this::convertToResponse)
                                .map(ResponseEntity::ok)
                                .orElse(ResponseEntity.notFound().build());
        }

        // ==========================================
        // UPDATE CANDIDATE PROFILE
        // ==========================================

        @PutMapping("/{id}")
        public ResponseEntity<CandidateProfileResponse> updateCandidateProfile(
                        @PathVariable Long id,
                        @RequestBody CandidateProfileUpdateRequest request) {

                return userRepository.findById(id)
                                .filter(user -> user.getRole().name().equals("CANDIDATE"))
                                .map(user -> {

                                        user.setFullName(request.getFullName());
                                        user.setPhone(request.getPhone());

                                        User updatedUser = userRepository.save(user);

                                        return convertToResponse(updatedUser);
                                })
                                .map(ResponseEntity::ok)
                                .orElse(ResponseEntity.notFound().build());
        }

        // ==========================================
        // GET MY APPLICATIONS
        // ==========================================

        @GetMapping("/{id}/applications")
        public ResponseEntity<List<ApplicationResponse>> getMyApplications(
                        @PathVariable Long id) {

                return ResponseEntity.ok(
                                applicationService.getApplicationsByCandidate(id, null));
        }

        // ==========================================
        // DTO CONVERSION
        // ==========================================

        private CandidateProfileResponse convertToResponse(User user) {

                return CandidateProfileResponse.builder()
                                .id(user.getId())
                                .fullName(user.getFullName())
                                .email(user.getEmail())
                                .phone(user.getPhone())
                                .role(user.getRole())
                                .enabled(user.isEnabled())
                                .build();
        }
}