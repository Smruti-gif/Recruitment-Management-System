package com.recruitment.platform.dto;

import com.recruitment.platform.entity.InterviewStatus;
import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class InterviewResponse {

    private Long id;

    // Application information
    private Long applicationId;

    // Candidate information
    private Long candidateId;
    private String candidateName;

    // Job information
    private Long jobId;
    private String jobTitle;

    // Interviewer information
    private Long interviewerId;
    private String interviewerName;

    // Interview details
    private LocalDateTime scheduledAt;
    private String interviewType;
    private String meetingLink;

    // Interview status
    private InterviewStatus status;

    // Feedback
    private String feedback;

    // Timestamps
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}