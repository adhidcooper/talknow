package com.talknow.message.repository;

import com.talknow.message.entity.Members;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface MembersRepository extends JpaRepository<Members, String> {
    List<Members> findByChannel_ChannelId(String channelId);
    Optional<Members> findByMemberId(String memberId);
    List<Members> findByUserId(String userId);
}
