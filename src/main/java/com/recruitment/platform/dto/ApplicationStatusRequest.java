package com.recruitment.platform.dto;

import com.recruitment.platform.entity.ApplicationStatus;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ApplicationStatusRequest {

    private ApplicationStatus status;
}