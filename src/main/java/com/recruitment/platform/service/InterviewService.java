package com.recruitment.platform.service;

import com.recruitment.platform.entity.Notification;
import com.recruitment.platform.repository.NotificationRepository;
import com.recruitment.platform.exception.ResourceNotFoundException;
import com.recruitment.platform.dto.InterviewRequest;
import com.recruitment.platform.dto.InterviewResponse;
import com.recruitment.platform.entity.Application;
import com.recruitment.platform.entity.Interview;
import com.recruitment.platform.entity.InterviewStatus;
import com.recruitment.platform.entity.Job;
import com.recruitment.platform.entity.User;
import com.recruitment.platform.repository.ApplicationRepository;
import com.recruitment.platform.repository.InterviewRepository;
import com.recruitment.platform.repository.UserRepository;

import lombok.RequiredArgsConstructor;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class InterviewService {

        private final NotificationRepository notificationRepository;
        private final InterviewRepository interviewRepository;
        private final ApplicationRepository applicationRepository;
        private final UserRepository userRepository;

        // =========================================================
        // SCHEDULE INTERVIEW
        // =========================================================

        @Transactional
        public InterviewResponse scheduleInterview(
                        InterviewRequest request) {

                // Find application
                Application application = applicationRepository
                                .findById(request.getApplicationId())
                                .orElseThrow(() -> new ResourceNotFoundException(
                                                "Application not found with id: "
                                                                + request.getApplicationId()));

                // Find interviewer
                User interviewer = userRepository
                                .findById(request.getInterviewerId())
                                .orElseThrow(() -> new ResourceNotFoundException(
                                                "Interviewer not found with id: "
                                                                + request.getInterviewerId()));

                // Validate scheduled date
                if (request.getScheduledAt() == null) {
                        throw new RuntimeException(
                                        "Interview date and time are required");
                }

                // Validate interview type
                if (request.getInterviewType() == null
                                || request.getInterviewType().isBlank()) {

                        throw new RuntimeException(
                                        "Interview type is required");
                }

                // Create interview
                Interview interview = Interview.builder()
                                .application(application)
                                .interviewer(interviewer)
                                .scheduledAt(request.getScheduledAt())
                                .interviewType(request.getInterviewType())
                                .meetingLink(request.getMeetingLink())
                                .status(InterviewStatus.SCHEDULED)
                                .build();

                // Save
                Interview savedInterview = interviewRepository.save(interview);

                // =========================================================
                // AUTOMATIC NOTIFICATION - INTERVIEW SCHEDULED
                // =========================================================

                Notification notification = new Notification();

                notification.setUser(application.getCandidate());

                notification.setTitle("Interview Scheduled");

                notification.setMessage(
                                "Your interview for '" +
                                                application.getJob().getTitle() +
                                                "' has been scheduled for " +
                                                request.getScheduledAt() +
                                                ".");

                notificationRepository.save(notification);

                return convertToResponse(savedInterview);
        }

        // =========================================================
        // GET ALL INTERVIEWS
        // =========================================================

        @Transactional(readOnly = true)
        public List<InterviewResponse> getAllInterviews() {

                return interviewRepository
                                .findAll()
                                .stream()
                                .map(this::convertToResponse)
                                .toList();
        }

        // =========================================================
        // GET INTERVIEW BY ID
        // =========================================================

        @Transactional(readOnly = true)
        public InterviewResponse getInterviewById(Long id) {

                Interview interview = interviewRepository
                                .findById(id)
                                .orElseThrow(() -> new ResourceNotFoundException(
                                                "Interview not found with id: " + id));

                return convertToResponse(interview);
        }

        // =========================================================
        // GET INTERVIEWS BY APPLICATION
        // =========================================================

        @Transactional(readOnly = true)
        public List<InterviewResponse> getByApplication(Long applicationId) {

                applicationRepository.findById(applicationId)
                                .orElseThrow(() -> new ResourceNotFoundException(
                                                "Application not found with id: "
                                                                + applicationId));

                return interviewRepository
                                .findByApplicationId(applicationId)
                                .stream()
                                .map(this::convertToResponse)
                                .toList();
        }

        // =========================================================
        // GET INTERVIEWS BY INTERVIEWER
        // =========================================================

        @Transactional(readOnly = true)
        public List<InterviewResponse> getByInterviewer(Long interviewerId) {

                userRepository.findById(interviewerId)
                                .orElseThrow(() -> new ResourceNotFoundException(
                                                "Interviewer not found with id: "
                                                                + interviewerId));

                return interviewRepository
                                .findByInterviewerId(interviewerId)
                                .stream()
                                .map(this::convertToResponse)
                                .toList();
        }

        // =========================================================
        // GET INTERVIEWS BY CANDIDATE
        // =========================================================

        @Transactional(readOnly = true)
        public List<InterviewResponse> getByCandidate(Long candidateId) {

                // Verify candidate exists
                User candidate = userRepository.findById(candidateId)
                                .orElseThrow(() -> new ResourceNotFoundException(
                                                "Candidate not found with id: "
                                                                + candidateId));

                // Verify that this user is actually a candidate
                if (!candidate.getRole().name().equals("CANDIDATE")) {
                        throw new ResourceNotFoundException(
                                        "Candidate not found with id: " + candidateId);
                }

                return interviewRepository
                                .findByApplication_Candidate_Id(candidateId)
                                .stream()
                                .map(this::convertToResponse)
                                .toList();
        }

        // =========================================================
        // GET INTERVIEWS BY STATUS
        // =========================================================

        @Transactional(readOnly = true)
        public List<InterviewResponse> getByStatus(
                        InterviewStatus status) {

                return interviewRepository
                                .findByStatus(status)
                                .stream()
                                .map(this::convertToResponse)
                                .toList();
        }

        // =========================================================
        // UPDATE INTERVIEW STATUS
        // =========================================================

        @Transactional
        public InterviewResponse updateStatus(
                        Long id,
                        InterviewStatus status) {

                Interview interview = interviewRepository
                                .findById(id)
                                .orElseThrow(() -> new ResourceNotFoundException(
                                                "Interview not found with id: " + id));

                // Update interview status
                interview.setStatus(status);

                Interview updatedInterview = interviewRepository.save(interview);

                // =========================================================
                // AUTOMATIC NOTIFICATION - INTERVIEW STATUS
                // =========================================================

                Notification notification = new Notification();

                notification.setUser(
                                interview.getApplication().getCandidate());

                if (status == InterviewStatus.CANCELLED) {

                        notification.setTitle("Interview Cancelled");

                        notification.setMessage(
                                        "Your interview for '" +
                                                        interview.getApplication().getJob().getTitle() +
                                                        "' has been cancelled.");

                } else {

                        notification.setTitle("Interview Status Updated");

                        notification.setMessage(
                                        "Your interview for '" +
                                                        interview.getApplication().getJob().getTitle() +
                                                        "' has been updated to " +
                                                        status.name() +
                                                        ".");
                }

                notificationRepository.save(notification);

                return convertToResponse(updatedInterview);
        }

        // =========================================================
        // ADD FEEDBACK
        // =========================================================

        @Transactional
        public InterviewResponse addFeedback(
                        Long id,
                        String feedback) {

                Interview interview = interviewRepository
                                .findById(id)
                                .orElseThrow(() -> new ResourceNotFoundException(
                                                "Interview not found with id: " + id));

                interview.setFeedback(feedback);

                Interview updatedInterview = interviewRepository.save(interview);

                return convertToResponse(updatedInterview);
        }

        // =========================================================
        // DELETE INTERVIEW
        // =========================================================

        @Transactional
        public void deleteInterview(Long id) {

                if (!interviewRepository.existsById(id)) {
                        throw new ResourceNotFoundException(
                                        "Interview not found with id: " + id);
                }

                interviewRepository.deleteById(id);
        }

        @Transactional
        public InterviewResponse rescheduleInterview(
                        Long id,
                        LocalDateTime newScheduledAt) {

                Interview interview = interviewRepository
                                .findById(id)
                                .orElseThrow(() -> new ResourceNotFoundException(
                                                "Interview not found with id: " + id));

                // Validate new date/time
                if (newScheduledAt == null) {
                        throw new RuntimeException(
                                        "New interview date and time are required");
                }

                // Cannot reschedule completed/cancelled interviews
                if (interview.getStatus() == InterviewStatus.COMPLETED
                                || interview.getStatus() == InterviewStatus.CANCELLED) {

                        throw new RuntimeException(
                                        "Completed or cancelled interview cannot be rescheduled");
                }

                // Update date/time
                interview.setScheduledAt(newScheduledAt);

                // Change status
                interview.setStatus(InterviewStatus.RESCHEDULED);

                Interview updatedInterview = interviewRepository.save(interview);

                // =========================================================
                // AUTOMATIC NOTIFICATION - INTERVIEW RESCHEDULED
                // =========================================================

                Notification notification = new Notification();

                notification.setUser(
                                interview.getApplication().getCandidate());

                notification.setTitle("Interview Rescheduled");

                notification.setMessage(
                                "Your interview for '" +
                                                interview.getApplication().getJob().getTitle() +
                                                "' has been rescheduled to " +
                                                newScheduledAt +
                                                ".");

                notificationRepository.save(notification);

                return convertToResponse(updatedInterview);
        }

        // =========================================================
        // DTO CONVERSION
        // =========================================================

        private InterviewResponse convertToResponse(
                        Interview interview) {

                Application application = interview.getApplication();

                User candidate = application.getCandidate();

                Job job = application.getJob();

                User interviewer = interview.getInterviewer();

                return InterviewResponse.builder()

                                .id(interview.getId())

                                // Application
                                .applicationId(application.getId())

                                // Candidate
                                .candidateId(candidate.getId())
                                .candidateName(candidate.getFullName())

                                // Job
                                .jobId(job.getId())
                                .jobTitle(job.getTitle())

                                // Interviewer
                                .interviewerId(interviewer.getId())
                                .interviewerName(interviewer.getFullName())

                                // Interview details
                                .scheduledAt(interview.getScheduledAt())
                                .interviewType(interview.getInterviewType())
                                .meetingLink(interview.getMeetingLink())

                                // Status
                                .status(interview.getStatus())

                                // Feedback
                                .feedback(interview.getFeedback())

                                // Timestamps
                                .createdAt(interview.getCreatedAt())
                                .updatedAt(interview.getUpdatedAt())

                                .build();
        }
}