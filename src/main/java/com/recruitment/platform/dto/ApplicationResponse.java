package com.recruitment.platform.dto;

import com.recruitment.platform.entity.ApplicationStatus;
import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ApplicationResponse {

    private Long id;

    private CandidateResponse candidate;

    private JobResponse job;

    private ApplicationStatus status;

    private String coverLetter;

    private LocalDateTime appliedAt;

    private LocalDateTime updatedAt;
}