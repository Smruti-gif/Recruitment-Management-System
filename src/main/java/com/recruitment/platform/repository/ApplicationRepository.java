package com.recruitment.platform.repository;

import com.recruitment.platform.entity.Application;
import com.recruitment.platform.entity.ApplicationStatus;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ApplicationRepository
                extends JpaRepository<Application, Long> {

        // ==============================
        // CANDIDATE APPLICATIONS
        // ==============================

        boolean existsByCandidate_IdAndJob_Id(
                        Long candidateId,
                        Long jobId);

        List<Application> findByCandidate_Id(
                        Long candidateId);

        long countByCandidate_Id(
                        Long candidateId);

        long countByCandidate_IdAndStatus(
                        Long candidateId,
                        ApplicationStatus status);


        // ==============================
        // JOB APPLICATIONS
        // ==============================

        List<Application> findByJob_Id(
                        Long jobId);


        // ==============================
        // RECRUITER APPLICATIONS
        // ==============================

        List<Application> findByJob_Company_Recruiter_Id(
                        Long recruiterId);
}