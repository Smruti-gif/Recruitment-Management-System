package com.recruitment.platform.controller;

import com.recruitment.platform.dto.InterviewRequest;
import com.recruitment.platform.dto.InterviewResponse;
import com.recruitment.platform.entity.InterviewStatus;
import com.recruitment.platform.service.InterviewService;

import lombok.RequiredArgsConstructor;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/interviews")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
public class InterviewController {

        private final InterviewService interviewService;

        // =========================================================
        // SCHEDULE INTERVIEW
        // =========================================================

        @PostMapping("/schedule")
        public ResponseEntity<InterviewResponse> scheduleInterview(
                        @RequestBody InterviewRequest request) {

                InterviewResponse response = interviewService.scheduleInterview(request);

                return ResponseEntity
                                .status(HttpStatus.CREATED)
                                .body(response);
        }

        // =========================================================
        // GET ALL INTERVIEWS
        // =========================================================

        @GetMapping
        public ResponseEntity<List<InterviewResponse>> getAllInterviews() {

                return ResponseEntity.ok(
                                interviewService.getAllInterviews());
        }

        // =========================================================
        // GET INTERVIEW BY ID
        // =========================================================

        @GetMapping("/{id}")
        public ResponseEntity<InterviewResponse> getInterviewById(
                        @PathVariable Long id) {

                return ResponseEntity.ok(
                                interviewService.getInterviewById(id));
        }

        // =========================================================
        // GET INTERVIEWS BY APPLICATION
        // =========================================================

        @GetMapping("/application/{applicationId}")
        public ResponseEntity<List<InterviewResponse>> getByApplication(
                        @PathVariable Long applicationId) {

                return ResponseEntity.ok(
                                interviewService.getByApplication(applicationId));
        }

        // =========================================================
        // GET INTERVIEWS BY INTERVIEWER
        // =========================================================

        @GetMapping("/interviewer/{interviewerId}")
        public ResponseEntity<List<InterviewResponse>> getByInterviewer(
                        @PathVariable Long interviewerId) {

                return ResponseEntity.ok(
                                interviewService.getByInterviewer(interviewerId));
        }

        // =========================================================
        // GET INTERVIEWS BY STATUS
        // =========================================================

        @GetMapping("/status/{status}")
        public ResponseEntity<List<InterviewResponse>> getByStatus(
                        @PathVariable InterviewStatus status) {

                return ResponseEntity.ok(
                                interviewService.getByStatus(status));
        }

        // =========================================================
        // UPDATE INTERVIEW STATUS
        // =========================================================

        @PatchMapping("/{id}/status")
        public ResponseEntity<InterviewResponse> updateStatus(
                        @PathVariable Long id,
                        @RequestParam InterviewStatus status) {

                return ResponseEntity.ok(
                                interviewService.updateStatus(id, status));
        }

        // =========================================================
        // RESCHEDULE INTERVIEW
        // =========================================================

        @PatchMapping("/{id}/reschedule")
        public ResponseEntity<InterviewResponse> rescheduleInterview(
                        @PathVariable Long id,
                        @RequestParam LocalDateTime scheduledAt) {

                return ResponseEntity.ok(
                                interviewService.rescheduleInterview(
                                                id,
                                                scheduledAt));
        }

        // =========================================================
        // ADD INTERVIEW FEEDBACK
        // =========================================================

        @PatchMapping("/{id}/feedback")
        public ResponseEntity<InterviewResponse> addFeedback(
                        @PathVariable Long id,
                        @RequestBody String feedback) {

                return ResponseEntity.ok(
                                interviewService.addFeedback(id, feedback));
        }

        // =========================================================
        // DELETE INTERVIEW
        // =========================================================

        @DeleteMapping("/{id}")
        public ResponseEntity<String> deleteInterview(
                        @PathVariable Long id) {

                interviewService.deleteInterview(id);

                return ResponseEntity.ok(
                                "Interview deleted successfully");
        }
}