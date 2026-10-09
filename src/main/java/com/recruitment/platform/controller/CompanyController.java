package com.recruitment.platform.controller;

import com.recruitment.platform.entity.Company;
import com.recruitment.platform.service.CompanyService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/companies")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
public class CompanyController {

    private final CompanyService companyService;

    // Create company
    @PostMapping
    public ResponseEntity<Company> createCompany(
            @RequestBody Company company) {

        Company savedCompany =
                companyService.createCompany(company);

        return new ResponseEntity<>(
                savedCompany,
                HttpStatus.CREATED
        );
    }

    // Get all companies
    @GetMapping
    public ResponseEntity<List<Company>> getAllCompanies() {

        return ResponseEntity.ok(
                companyService.getAllCompanies()
        );
    }

    // Get company by ID
    @GetMapping("/{id}")
    public ResponseEntity<Company> getCompanyById(
            @PathVariable Long id) {

        return ResponseEntity.ok(
                companyService.getCompanyById(id)
        );
    }

    // Delete company
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteCompany(
            @PathVariable Long id) {

        companyService.deleteCompany(id);

        return ResponseEntity.ok(
                "Company deleted successfully"
        );
    }
}