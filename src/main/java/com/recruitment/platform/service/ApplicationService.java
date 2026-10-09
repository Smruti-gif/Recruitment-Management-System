package com.recruitment.platform.service;

import com.recruitment.platform.dto.ApplicationRequest;
import com.recruitment.platform.dto.ApplicationResponse;
import com.recruitment.platform.dto.CandidateResponse;
import com.recruitment.platform.dto.JobResponse;
import com.recruitment.platform.entity.Application;
import com.recruitment.platform.entity.ApplicationStatus;
import com.recruitment.platform.entity.Job;
import com.recruitment.platform.entity.Notification;
import com.recruitment.platform.entity.Role;
import com.recruitment.platform.entity.User;
import com.recruitment.platform.exception.DuplicateApplicationException;
import com.recruitment.platform.exception.ResourceNotFoundException;
import com.recruitment.platform.repository.ApplicationRepository;
import com.recruitment.platform.repository.JobRepository;
import com.recruitment.platform.repository.NotificationRepository;
import com.recruitment.platform.repository.UserRepository;

import lombok.RequiredArgsConstructor;

import org.springframework.security.access.AccessDeniedException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ApplicationService {

    private final NotificationRepository notificationRepository;
    private final ApplicationRepository applicationRepository;
    private final UserRepository userRepository;
    private final JobRepository jobRepository;


    // =========================================================
    // APPLY FOR JOB
    // =========================================================

    @Transactional
    public ApplicationResponse apply(ApplicationRequest request) {

        // Find candidate
        User candidate = userRepository
                .findById(request.getCandidateId())
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Candidate not found with id: "
                                        + request.getCandidateId()
                        )
                );

        // Find job
        Job job = jobRepository
                .findById(request.getJobId())
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Job not found with id: "
                                        + request.getJobId()
                        )
                );

        // Prevent duplicate application
        if (applicationRepository.existsByCandidate_IdAndJob_Id(
                request.getCandidateId(),
                request.getJobId()
        )) {

            throw new DuplicateApplicationException(
                    "Candidate has already applied for this job"
            );
        }

        // Default status
        ApplicationStatus status =
                request.getStatus() != null
                        ? request.getStatus()
                        : ApplicationStatus.APPLIED;

        // Create application
        Application application = Application.builder()
                .candidate(candidate)
                .job(job)
                .status(status)
                .coverLetter(request.getCoverLetter())
                .build();

        // Save application
        Application saved =
                applicationRepository.save(application);


        // =========================================================
        // AUTOMATIC NOTIFICATION - CANDIDATE
        // =========================================================

        Notification candidateNotification = new Notification();

        candidateNotification.setUser(candidate);
        candidateNotification.setTitle("Application Submitted");
        candidateNotification.setMessage(
                "Your application for '"
                        + job.getTitle()
                        + "' has been submitted successfully."
        );

        notificationRepository.save(candidateNotification);


        // Convert entity to response DTO
        return convertToResponse(saved);
    }


    // =========================================================
    // GET ALL APPLICATIONS
    // =========================================================

    @Transactional(readOnly = true)
    public List<ApplicationResponse> getAllApplications() {

        return applicationRepository
                .findAll()
                .stream()
                .map(this::convertToResponse)
                .toList();
    }


    // =========================================================
    // GET APPLICATION BY ID
    // =========================================================

    @Transactional(readOnly = true)
    public ApplicationResponse getApplicationById(Long id) {

        Application application = applicationRepository
                .findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Application not found with id: "
                                        + id
                        )
                );

        return convertToResponse(application);
    }


    // =========================================================
    // GET APPLICATIONS BY CANDIDATE
    // =========================================================

    @Transactional(readOnly = true)
    public List<ApplicationResponse> getApplicationsByCandidate(
            Long candidateId,
            String email
    ) {

        User loggedInUser = userRepository
                .findByEmail(email)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "User not found"
                        )
                );

        // Candidate can only access their own applications
        if (!loggedInUser.getId().equals(candidateId)) {

            throw new AccessDeniedException(
                    "You are not allowed to view another candidate's applications"
            );
        }

        return applicationRepository
                .findByCandidate_Id(candidateId)
                .stream()
                .map(this::convertToResponse)
                .toList();
    }


    // =========================================================
    // GET APPLICATIONS FOR LOGGED-IN RECRUITER
    // =========================================================

    @Transactional(readOnly = true)
    public List<ApplicationResponse> getApplicationsByRecruiter(
            String email
    ) {

        // Find logged-in recruiter
        User recruiter = userRepository
                .findByEmail(email)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Recruiter not found"
                        )
                );

        // Make sure the logged-in user is a recruiter
        if (recruiter.getRole() != Role.RECRUITER) {

            throw new AccessDeniedException(
                    "Only recruiters can view recruiter applications"
            );
        }

        // Find applications for jobs owned by this recruiter
        return applicationRepository
                .findByJob_Company_Recruiter_Id(recruiter.getId())
                .stream()
                .map(this::convertToResponse)
                .toList();
    }


    // =========================================================
    // GET APPLICATIONS BY JOB
    // =========================================================

    @Transactional(readOnly = true)
    public List<ApplicationResponse> getApplicationsByJob(
            Long jobId
    ) {

        // Verify job exists
        jobRepository
                .findById(jobId)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Job not found with id: "
                                        + jobId
                        )
                );

        return applicationRepository
                .findByJob_Id(jobId)
                .stream()
                .map(this::convertToResponse)
                .toList();
    }


    // =========================================================
    // UPDATE APPLICATION STATUS
    // RECRUITER / ADMIN
    // =========================================================

    @Transactional
    public ApplicationResponse updateApplicationStatus(
            Long applicationId,
            ApplicationStatus status
    ) {

        Application application = applicationRepository
                .findById(applicationId)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Application not found with id: "
                                        + applicationId
                        )
                );

        // Update application status
        application.setStatus(status);

        Application updated =
                applicationRepository.save(application);


        // =========================================================
        // AUTOMATIC NOTIFICATION - STATUS CHANGE
        // =========================================================

        Notification notification = new Notification();

        notification.setUser(application.getCandidate());

        notification.setTitle(
                "Application Status Updated"
        );

        notification.setMessage(
                "Your application for '"
                        + application.getJob().getTitle()
                        + "' has been updated to "
                        + status.name()
                        + "."
        );

        notificationRepository.save(notification);

        return convertToResponse(updated);
    }


    // =========================================================
    // DELETE APPLICATION
    // =========================================================

    @Transactional
    public void deleteApplication(Long id) {

        Application application = applicationRepository
                .findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Application not found with id: "
                                        + id
                        )
                );

        applicationRepository.delete(application);
    }


    // =========================================================
    // DTO CONVERSION
    // =========================================================

    private ApplicationResponse convertToResponse(
            Application application
    ) {

        User candidate = application.getCandidate();

        Job job = application.getJob();


        // ---------------------------------------------------------
        // Candidate Response
        // ---------------------------------------------------------

        CandidateResponse candidateResponse =
                CandidateResponse.builder()
                        .id(candidate.getId())
                        .fullName(candidate.getFullName())
                        .email(candidate.getEmail())
                        .role(candidate.getRole())
                        .phone(candidate.getPhone())
                        .enabled(candidate.isEnabled())
                        .build();


        // ---------------------------------------------------------
        // Job Response
        // ---------------------------------------------------------

        JobResponse jobResponse =
                JobResponse.builder()
                        .id(job.getId())
                        .title(job.getTitle())
                        .description(job.getDescription())
                        .companyName(
                                job.getCompany() != null
                                        ? job.getCompany().getName()
                                        : null
                        )
                        .location(job.getLocation())
                        .jobType(job.getJobType())
                        .experienceLevel(
                                job.getExperienceLevel()
                        )
                        .minSalary(job.getMinSalary())
                        .maxSalary(job.getMaxSalary())
                        .active(job.isActive())
                        .build();


        // ---------------------------------------------------------
        // Application Response
        // ---------------------------------------------------------

        return ApplicationResponse.builder()
                .id(application.getId())
                .candidate(candidateResponse)
                .job(jobResponse)
                .status(application.getStatus())
                .coverLetter(application.getCoverLetter())
                .appliedAt(application.getAppliedAt())
                .updatedAt(application.getUpdatedAt())
                .build();
    }
}