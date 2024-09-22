package com.talknow.message.service.impl;

import com.talknow.message.dto.MembersDto;
import com.talknow.message.entity.Channel;
import com.talknow.message.entity.Members;
import com.talknow.message.mapper.MembersMapper;
import com.talknow.message.repository.ChannelRepository;
import com.talknow.message.repository.MembersRepository;
import com.talknow.message.service.IMembersService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
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
        String id = membersDto.getChannelId();
        Optional<Channel> channelOpt = channelRepository.findByChannelId(id);
        if (channelOpt.isPresent()) {
            Members members = new Members();
            Channel channel = channelOpt.get();
            Members addedMember = MembersMapper.mapToMembers(new MembersDto(), members, channel);
            Members savedMember = membersRepository.save(addedMember);
            return MembersMapper.mapToMembersDto(savedMember, new MembersDto());
        }else {

            throw new RuntimeException("Channel not found for ID: " + id);
      }
    }

    @Override
    public MembersDto getMemberById(String memberId) {
        Optional<Members> memberOpt = membersRepository.findByMemberId(memberId);
        if (memberOpt.isPresent()) {
            return MembersMapper.mapToMembersDto(memberOpt.get(), new MembersDto());
        } else {
            throw new RuntimeException("Member not found for ID: " + memberId);
        }
    }

    @Override
    public List<MembersDto> getAllMembersByChannel(String channelId) {
        List<Members> members = membersRepository.findByChannel_ChannelId(channelId);
        return members.stream()
                .map(member -> MembersMapper.mapToMembersDto(member, new MembersDto()))
                .collect(Collectors.toList());
    }

//    @Override
//    public MembersDto updateMember(String memberId, MembersDto membersDto) {
//        Optional<Members> memberOpt = membersRepository.findByMemberId(memberId);
//        if (memberOpt.isPresent()) {
//            Members existingMember = memberOpt.get();
//            MembersMapper.mapToMembers(membersDto, existingMember, );
//            existingMember.setChannel(channelRepository.findById(membersDto.getChannelId())
//                    .orElseThrow(() -> new RuntimeException("Channel not found for ID: " + membersDto.getChannelId())));
//            Members updatedMember = membersRepository.save(existingMember);
//            return MembersMapper.mapToMembersDto(updatedMember, new MembersDto());
//        } else {
//            throw new RuntimeException("Member not found for ID: " + memberId);
//        }
//    }

    @Override
    public void deleteMember(String id) {
        if (membersRepository.existsById(id)) {
            membersRepository.deleteById(id);
        } else {
            throw new RuntimeException("Member not found for ID: " + id);
        }
    }
}