package com.recruitment.platform.dto;

import com.recruitment.platform.entity.ApplicationStatus;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ApplicationRequest {

    private Long candidateId;

    private Long jobId;

    private ApplicationStatus status;

    private String coverLetter;

    public String getRecruiterEmail() {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'getRecruiterEmail'");
    }
}