package com.talknow.message.repository;

import com.talknow.message.entity.Members;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MembersRepository extends JpaRepository<Members, String> {
    List<Members> findByChannelId(String channelId);
}
