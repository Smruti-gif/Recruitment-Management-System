package com.recruitment.platform.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "interviews")

@Getter
@Setter

@NoArgsConstructor
@AllArgsConstructor

@Builder
public class Interview {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    /*
     * Interview belongs to an application.
     *
     * One application can have multiple interview rounds.
     */
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "application_id", nullable = false)
    private Application application;

    /*
     * User who conducts the interview.
     */
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "interviewer_id", nullable = false)
    private User interviewer;

    /*
     * Date and time of the interview.
     */
    @Column(nullable = false)
    private LocalDateTime scheduledAt;

    /*
     * Example:
     * TECHNICAL
     * HR
     * MANAGERIAL
     * SCREENING
     */
    @Column(nullable = false, length = 50)
    private String interviewType;

    /*
     * Online meeting URL.
     */
    @Column(length = 500)
    private String meetingLink;

    /*
     * Current interview status.
     */
    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 30)
    @Builder.Default
    private InterviewStatus status = InterviewStatus.SCHEDULED;

    /*
     * Interviewer's feedback after completion.
     */
    
    @Column(length = 2000)
    private String feedback;

    @Column(nullable = false, updatable = false)
    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;

    @PrePersist
    protected void onCreate() {

        createdAt = LocalDateTime.now();
        updatedAt = LocalDateTime.now();
    }

    @PreUpdate
    protected void onUpdate() {

        updatedAt = LocalDateTime.now();
    }
}