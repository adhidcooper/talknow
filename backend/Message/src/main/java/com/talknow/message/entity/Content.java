package com.talknow.message.entity;

import jakarta.persistence.*;
import lombok.Setter;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import lombok.ToString;

import java.util.UUID;

@Entity
@Getter @Setter @ToString @AllArgsConstructor @NoArgsConstructor
public class Content extends BaseEntity {
    @Id
    @Column(name = "content_id")
    private String contentId = UUID.randomUUID().toString();
    @Column(name = "user_id")
    private String userId;
    private String message;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "channel_id", nullable = false)
    private Channel channel;
}