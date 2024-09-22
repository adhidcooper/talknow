package com.talknow.message.entity;

import jakarta.persistence.Column;
import jakarta.persistence.MappedSuperclass;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.time.LocalDateTime;

@MappedSuperclass
@Getter @Setter @ToString
public class BaseEntity {

    @Column(name = "created_by")
    private String createdBy;

    @Column(updatable = false, name = "created_time")
    private LocalDateTime createdTime;
}
