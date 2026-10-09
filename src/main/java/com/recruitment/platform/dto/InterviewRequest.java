package com.recruitment.platform.dto;

import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class InterviewRequest {

    private Long applicationId;

    private Long interviewerId;

    private LocalDateTime scheduledAt;

    private String interviewType;

    private String meetingLink;
}