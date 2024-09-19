package com.talknow.message.model;

import jakarta.persistence.*;

@Entity
public class Message extends BaseEntity{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private String id;
    private String content;

    @ManyToOne
    @JoinColumn(name="channel_id")
    private Channel channel_id;
}
