package com.talknow.message.repository;

import com.talknow.message.entity.Content;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ContentRepository extends JpaRepository<Content, String> {
    List<Content> findByChannel_ChannelId(String channelId);
}
