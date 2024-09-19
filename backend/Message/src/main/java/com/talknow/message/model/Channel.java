package com.talknow.message.model;

import jakarta.persistence.*;
import lombok.*;

import java.util.List;
//import java.util.UUID;

@Entity
@Getter @Setter @ToString @AllArgsConstructor @NoArgsConstructor
public class Channel extends BaseEntity{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private String cId;
    private String channelName;

    @OneToMany(mappedBy = "channel", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Members> members;

    @OneToMany(mappedBy = "channel", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Members> messages;
}
