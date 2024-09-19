package com.talknow.message.repository;

import com.talknow.message.entity.Channel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ChannelRepository extends JpaRepository<Channel, String> {
//    boolean exist
}
