package com.recruitment.platform.service;

import com.recruitment.platform.entity.Company;
import com.recruitment.platform.entity.Job;
import com.recruitment.platform.repository.CompanyRepository;
import com.recruitment.platform.repository.JobRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class JobService {

        private final JobRepository jobRepository;
        private final CompanyRepository companyRepository;

        // Create job
        public Job createJob(Job job) {

                if (job.getCompany() == null ||
                                job.getCompany().getId() == null) {

                        throw new RuntimeException(
                                        "Company ID is required");
                }

                Long companyId = job.getCompany().getId();

                Company company = companyRepository.findById(companyId)
                                .orElseThrow(() -> new RuntimeException(
                                                "Company not found with id: " + companyId));

                job.setCompany(company);

                return jobRepository.save(job);
        }

        // Get all jobs
        public List<Job> getAllJobs() {
                return jobRepository.findAll();
        }

        // Get job by ID
        public Job getJobById(Long id) {

                return jobRepository.findById(id)
                                .orElseThrow(() -> new RuntimeException(
                                                "Job not found with id: " + id));
        }

        // Get jobs by company
        public List<Job> getJobsByCompany(Long companyId) {

                return jobRepository.findByCompanyId(companyId);
        }

        // Delete job
        public void deleteJob(Long id) {

                if (!jobRepository.existsById(id)) {
                        throw new RuntimeException(
                                        "Job not found with id: " + id);
                }

                jobRepository.deleteById(id);
        }
}