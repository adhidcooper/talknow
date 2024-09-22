package com.talknow.message.entity;

import jakarta.persistence.*;
import lombok.Setter;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import lombok.ToString;
import java.util.List;
import java.util.UUID;


@Entity
@Getter @Setter @ToString @AllArgsConstructor @NoArgsConstructor
public class Channel extends BaseEntity {
    @Id
    @Column(name = "channel_id")
    private String channelId = UUID.randomUUID().toString();

    @Column(nullable = false)
    private String channelName;
    private Boolean channelOpen;

    @OneToMany(mappedBy = "channel", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Members> members;

    @OneToMany(mappedBy = "channel", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Content> content;
}
