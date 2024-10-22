package com.talknow.message.entity;

import jakarta.persistence.*;
import lombok.Setter;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import lombok.ToString;

import java.util.UUID;

@Entity
@Getter @Setter @AllArgsConstructor @NoArgsConstructor
public class Members {
    @Id
    @Column(name = "member_id")
    private String memberId = UUID.randomUUID().toString();

    @Column(name = "user_id")
    private String userId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "channel_id", nullable = false)
    @ToString.Exclude
    private Channel channel;

    // Additional getter to retrieve channelId from the Channel object
    public String getChannelId() {
        return channel != null ? channel.getChannelId() : null; // Assuming getId() is the method in Channel to get the ID
    }
}