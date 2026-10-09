package com.recruitment.platform.dto;

import com.recruitment.platform.entity.Role;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RegisterRequest {

    private String fullName;
    private String email;
    private String password;
    private String phone;
    private Role role;
}