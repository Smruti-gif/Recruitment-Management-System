package com.recruitment.platform.repository;

import com.recruitment.platform.entity.Interview;
import com.recruitment.platform.entity.InterviewStatus;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface InterviewRepository
                extends JpaRepository<Interview, Long> {

        List<Interview> findByApplicationId(
                        Long applicationId);

        List<Interview> findByApplication_Candidate_Id(
                        Long candidateId);

        List<Interview> findByInterviewerId(
                        Long interviewerId);

        List<Interview> findByStatus(
                        InterviewStatus status);

        boolean existsByApplicationId(
                        Long applicationId);

        long countByApplication_Candidate_Id(
                        Long candidateId);

        long countByApplication_Candidate_IdAndStatus(
                        Long candidateId,
                        InterviewStatus status);
}