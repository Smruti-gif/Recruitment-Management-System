package com.recruitment.platform.service;

import com.recruitment.platform.entity.Company;
import com.recruitment.platform.repository.CompanyRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CompanyService { 

    private final CompanyRepository companyRepository;

    // Create company
    public Company createCompany(Company company) {

        if (companyRepository.findByName(company.getName()).isPresent()) {
            throw new RuntimeException(
                    "Company with this name already exists");
        }

        return companyRepository.save(company);
    }

    // Get all companies
    public List<Company> getAllCompanies() {
        return companyRepository.findAll();
    }

    // Get company by ID
    public Company getCompanyById(Long id) {

        return companyRepository.findById(id)
                .orElseThrow(() -> new RuntimeException(
                        "Company not found with id: " + id));
    }

    // Delete company
    public void deleteCompany(Long id) {

        if (!companyRepository.existsById(id)) {
            throw new RuntimeException(
                    "Company not found with id: " + id);
        }

        companyRepository.deleteById(id);
    }
}