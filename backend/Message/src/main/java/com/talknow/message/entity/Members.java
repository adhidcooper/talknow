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
public class Members {
    @Id
    @Column(length = 255)
    private String memberId = UUID.randomUUID().toString();

    private String userId;

    @ManyToOne
    @JoinColumn(name="channel_id")
    private Channel channel;
}
