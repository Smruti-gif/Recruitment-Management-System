package com.recruitment.platform.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CandidateDashboardResponse {

    private long totalApplications;

    private long appliedApplications;
    private long underReviewApplications;
    private long shortlistedApplications;
    private long interviewApplications;
    private long selectedApplications;
    private long rejectedApplications;
    private long withdrawnApplications;

    private long totalInterviews;
    private long scheduledInterviews;
    private long inProgressInterviews;
    private long completedInterviews;
    private long cancelledInterviews;
    private long rescheduledInterviews;
}