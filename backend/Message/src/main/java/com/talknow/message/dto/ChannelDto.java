package com.talknow.message.dto;

import lombok.*;

import java.time.LocalDateTime;

@Setter @Getter @AllArgsConstructor @NoArgsConstructor
public class ChannelDto {
    private String channelId;
    private String channelName;
    private String createdBy;
    private Boolean channelOpen;
    private LocalDateTime createdTime;
}
