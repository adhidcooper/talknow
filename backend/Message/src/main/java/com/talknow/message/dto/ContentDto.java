package com.talknow.message.dto;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class ContentDto {
    private String channelId;
    private String message;
    private String userId;
    private String createdBy;
    private LocalDateTime createdTime;
}
