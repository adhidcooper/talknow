package com.talknow.message.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter @Setter @ToString @AllArgsConstructor @NoArgsConstructor
public class Members extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private String mId;
    private String userId;

    @ManyToOne
    @JoinColumn(name = "channel_id")
    private Channel channel_id;
}
