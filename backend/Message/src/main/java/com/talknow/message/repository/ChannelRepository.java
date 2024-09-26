package com.talknow.message.repository;

import com.talknow.message.entity.Channel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ChannelRepository extends JpaRepository<Channel, String> {
//    boolean exist
    Optional<Channel> findByChannelName(String channelName);
    Optional<Channel> findByChannelId(String channelId);
    boolean existsByChannelId(String channelId);
    Optional<Channel> deleteByChannelId(String channelId);
    List<Channel> findByChannelIdIn(List<String> channelIds);
}
