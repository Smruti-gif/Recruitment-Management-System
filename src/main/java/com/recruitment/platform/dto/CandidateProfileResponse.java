package com.recruitment.platform.dto;

import com.recruitment.platform.entity.Role;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CandidateProfileResponse {

    private Long id;
    private String fullName;
    private String email;
    private String phone;
    private Role role;
    private Boolean enabled;
}