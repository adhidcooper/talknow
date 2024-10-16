package com.talknow.message.repository;

import com.talknow.message.entity.Channel;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.Set;

@Repository
public interface ChannelRepository extends JpaRepository<Channel, String> {
//    boolean exist
    Optional<Channel> findByChannelName(String channelName);
    Optional<Channel> findByChannelId(String channelId);
    boolean existsByChannelId(String channelId);
    Optional<Channel> deleteByChannelId(String channelId);
//    List<Channel> findByChannelIdIn(Set<String> channelIds);
    @Query("SELECT c FROM Channel c WHERE c.channelId IN :channelIds")
    List<Channel> findChannelsByIds(@Param("channelIds") Set<String> channelIds);
}
