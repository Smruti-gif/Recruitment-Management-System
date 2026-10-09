package com.recruitment.platform.dto;

import com.recruitment.platform.entity.Role;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CandidateResponse {

    private Long id;

    private String fullName;

    private String email;

    private Role role;

    private String phone;

    private boolean enabled;
}