package com.talknow.message.service.impl;

import com.talknow.message.dto.MembersDto;
import com.talknow.message.entity.Channel;
import com.talknow.message.entity.Members;
import com.talknow.message.mapper.MembersMapper;
import com.talknow.message.repository.ChannelRepository;
import com.talknow.message.repository.MembersRepository;
import com.talknow.message.service.IMembersService;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

public class MembersServiceImpl implements IMembersService {

    private final MembersRepository membersRepository;
    private final ChannelRepository channelRepository;

    @Autowired
    public MembersServiceImpl(MembersRepository membersRepository, ChannelRepository channelRepository) {
        this.membersRepository = membersRepository;
        this.channelRepository = channelRepository;
    }

    @Override
    public MembersDto addMember(MembersDto membersDto) {
        Members members = new Members();
        MembersMapper.mapToMembers(membersDto, members);
        Channel channel = channelRepository.findById(membersDto.getChannelId())
                .orElseThrow(() -> new RuntimeException("Channel not found for ID: " + membersDto.getChannelId()));
        members.setChannel(channel);
        Members savedMember = membersRepository.save(members);
        return MembersMapper.mapToMembersDto(savedMember, new MembersDto());
    }

    @Override
    public MembersDto getMemberById(String id) {
        Optional<Members> memberOpt = membersRepository.findById(id);
        if (memberOpt.isPresent()) {
            return MembersMapper.mapToMembersDto(memberOpt.get(), new MembersDto());
        } else {
            throw new RuntimeException("Member not found for ID: " + id);
        }
    }

    @Override
    public List<MembersDto> getAllMembersByChannel(String channelId) {
        List<Members> members = membersRepository.findByChannelId(channelId);
        return members.stream()
                .map(member -> MembersMapper.mapToMembersDto(member, new MembersDto()))
                .collect(Collectors.toList());
    }

    @Override
    public MembersDto updateMember(String id, MembersDto membersDto) {
        Optional<Members> memberOpt = membersRepository.findById(id);
        if (memberOpt.isPresent()) {
            Members existingMember = memberOpt.get();
            MembersMapper.mapToMembers(membersDto, existingMember);
            existingMember.setChannel(channelRepository.findById(membersDto.getChannelId())
                    .orElseThrow(() -> new RuntimeException("Channel not found for ID: " + membersDto.getChannelId())));
            Members updatedMember = membersRepository.save(existingMember);
            return MembersMapper.mapToMembersDto(updatedMember, new MembersDto());
        } else {
            throw new RuntimeException("Member not found for ID: " + id);
        }
    }

    @Override
    public void deleteMember(String id) {
        if (membersRepository.existsById(id)) {
            membersRepository.deleteById(id);
        } else {
            throw new RuntimeException("Member not found for ID: " + id);
        }
    }
}