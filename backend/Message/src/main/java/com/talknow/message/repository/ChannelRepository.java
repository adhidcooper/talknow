package com.talknow.message.repository;

import com.talknow.message.dto.ChannelDto;
import com.talknow.message.entity.Channel;
import jakarta.persistence.Tuple;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.Set;

@Repository
public interface ChannelRepository extends JpaRepository<Channel, String> {
    // boolean exist
    Optional<Channel> findByChannelName(String channelName);

    Optional<Channel> findByChannelId(String channelId);

    boolean existsByChannelId(String channelId);

    Optional<Channel> deleteByChannelId(String channelId);


    @Query(value = "SELECT channel_id, channel_name, created_by, channel_open, created_time FROM get_user_channels_by_user_id(:userId)", nativeQuery = true)
    List<Tuple> findChannelsForUserByUserId(String userId);


}
