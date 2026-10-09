package com.recruitment.platform.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class JobResponse {

    private Long id;

    private String title;

    private String description;

    private String companyName;

    private String location;

    private String jobType;

    private String experienceLevel;

    private Double minSalary;

    private Double maxSalary;

    private boolean active;
}