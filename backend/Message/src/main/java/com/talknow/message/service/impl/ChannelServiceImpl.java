package com.talknow.message.service.impl;

import com.talknow.message.dto.ChannelDto;

import com.talknow.message.dto.MembersDto;
import com.talknow.message.dto.UserDto;
import com.talknow.message.entity.Channel;
import com.talknow.message.entity.Members;
import com.talknow.message.exception.ChannelNotFoundException;
import com.talknow.message.mapper.ChannelsMapper;

import com.talknow.message.mapper.MembersMapper;
import com.talknow.message.repository.ChannelRepository;

import com.talknow.message.repository.MembersRepository;
import com.talknow.message.service.IAuthUserService;
import com.talknow.message.service.IChannelService;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Slf4j
@Service
@AllArgsConstructor
public class ChannelServiceImpl implements IChannelService {

//    @Value("${authService.authToken}")
//    public String authToken;


    private final ChannelRepository channelRepository;
    private final MembersRepository membersRepository;
    private final IAuthUserService authUserService;

    @Override
    public ChannelDto createChannel(ChannelDto channelDto) {
        UserDto currentUser = authUserService.getCurrentUser();
        Channel channel = new Channel();
        Channel mappedChannel = ChannelsMapper.mapToChannel(channelDto, channel);
        Channel savedChannel = channelRepository.save(mappedChannel);
        log.info(String.valueOf(currentUser));
//        System.out.println(currentUser);
//        Members members = new Members();
//        Members addedMember = MembersMapper.mapToMembers(new MembersDto(), members, channel);
//        Members savedMember = membersRepository.save(addedMember);
        return ChannelsMapper.mapToChannelDto(savedChannel, new ChannelDto());
    }

    @Override
    public ChannelDto getChannelById(String id) {
        Optional<Channel> channelOpt = channelRepository.findByChannelId(id);
        if (channelOpt.isPresent()) {
            return ChannelsMapper.mapToChannelDto(channelOpt.get(), new ChannelDto());  // Map entity to DTO
        } else {
            // Handle the case when the channel is not found
            throw new ChannelNotFoundException("Channel is not Found!: "+ channelOpt.get().getChannelId().toString());
        }
    }

    @Override
    public ChannelDto getChannelByName(String channelName) {
        Optional<Channel> channelOpt = channelRepository.findByChannelName(channelName);
        if (channelOpt.isPresent()) {
            return ChannelsMapper.mapToChannelDto(channelOpt.get(), new ChannelDto());  // Map entity to DTO
        } else {
            // Handle the case when the channel is not found
            throw new ChannelNotFoundException("Channel Name not found: " + channelName);
        }
    }



    // Get all channels
    @Override
    public List<ChannelDto> getAllChannels() {
        List<Channel> channels = channelRepository.findAll();
        return channels.stream()
                .map(channel -> ChannelsMapper.mapToChannelDto(channel, new ChannelDto()))
                .collect(Collectors.toList());  // Return the list of DTOs
    }

//  Update a channel by ID
    @Override
    public ChannelDto updateChannel(String id, ChannelDto channelDto) {
        Optional<Channel> channelOpt = channelRepository.findByChannelId(id);
        if (channelOpt.isPresent()) {
            Channel existingChannel = channelOpt.get();
            Channel updatedChannel = ChannelsMapper.mapToChannel(channelDto, existingChannel);  // Update entity with DTO data
            Channel savedChannel = channelRepository.save(updatedChannel);  // Save updated entity
            return ChannelsMapper.mapToChannelDto(savedChannel, new ChannelDto());  // Map back to DTO
        } else {
            // Handle the case when the channel is not found
            throw new ChannelNotFoundException("Channel is not Found!: "+ channelOpt.get().getChannelId().toString());
        }
    }

    @Override
    @Transactional
    public ChannelDto deleteChannel(String id) {
        Optional<Channel> channelOpt = channelRepository.findByChannelId(id);
        if (channelOpt.isPresent()) {
            Channel delChannel = channelOpt.get();
            channelRepository.deleteByChannelId(id);
            return ChannelsMapper.mapToChannelDto(delChannel, new ChannelDto()); // Delete the entity
        } else {
            // Handle the case when the channel is not found
            throw new ChannelNotFoundException("Channel is not Found!: "+ channelOpt.get().getChannelId());
        }

    }
}
