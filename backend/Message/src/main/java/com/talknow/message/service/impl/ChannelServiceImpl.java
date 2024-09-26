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

import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

@Slf4j
@Service
@AllArgsConstructor
public class ChannelServiceImpl implements IChannelService {

    private final ChannelRepository channelRepository;
    private final MembersRepository membersRepository;
    private final IAuthUserService authUserService;

    @Override
    public ChannelDto createChannel(ChannelDto channelDto, String api_key) {
        UserDto currentUser = authUserService.getCurrentUser(api_key);
        Channel channel = new Channel();
        Map<String, String> userResult = (Map<String, String>) currentUser.getResult();
        String username = userResult.get("username");
        String userId = userResult.get("id");
        Channel mappedChannel = ChannelsMapper.mapToChannel(channelDto, channel, username);
        Channel savedChannel = channelRepository.save(mappedChannel);

        Members members = new Members();
        Members membersMapped = MembersMapper.mapToMembers(members, mappedChannel, userId);
        Members savedMembers = membersRepository.save(membersMapped);

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

    @Override
    public List<MembersDto> getChannelsUserIn(String api_key) {
        UserDto currentUser = authUserService.getCurrentUser(api_key);
        Map<String, String> userResult = (Map<String, String>) currentUser.getResult();
        String userId = userResult.get("id");
        List<Members> findMyChannels = membersRepository.findByUserId(userId);
        return findMyChannels.stream()
                .map(members -> MembersMapper.mapToMembersDto(members, new MembersDto()))
                .collect(Collectors.toList());

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
    public ChannelDto updateChannel(String id, ChannelDto channelDto, String api_key) {
        UserDto currentUser = authUserService.getCurrentUser(api_key);
        Map<String, String> userResult = (Map<String, String>) currentUser.getResult();
        String username = userResult.get("username");
        Optional<Channel> channelOpt = channelRepository.findByChannelId(id);
        if (channelOpt.isPresent()) {
            Channel existingChannel = channelOpt.get();
            Channel updatedChannel = ChannelsMapper.mapToChannel(channelDto, existingChannel, username);  // Update entity with DTO data
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
