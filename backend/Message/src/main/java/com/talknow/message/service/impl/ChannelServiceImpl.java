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
import jakarta.persistence.Tuple;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.sql.Timestamp;
import java.util.*;
import java.util.stream.Collectors;

@Slf4j
@Service
@AllArgsConstructor
public class ChannelServiceImpl implements IChannelService {

    private final ChannelRepository channelRepository;
    private final MembersRepository membersRepository;
    private final IAuthUserService authUserService;
    private RestTemplate restTemplate;

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
            return ChannelsMapper.mapToChannelDto(channelOpt.get(), new ChannelDto()); // Map entity to DTO
        } else {
            // Handle the case when the channel is not found
            throw new ChannelNotFoundException("Channel is not Found!: " + channelOpt.get().getChannelId().toString());
        }
    }

    @Override
    public ChannelDto getChannelByName(String channelName) {
        Optional<Channel> channelOpt = channelRepository.findByChannelName(channelName);
        if (channelOpt.isPresent()) {
            return ChannelsMapper.mapToChannelDto(channelOpt.get(), new ChannelDto()); // Map entity to DTO
        } else {
            // Handle the case when the channel is not found
            throw new ChannelNotFoundException("Channel Name not found: " + channelName);
        }
    }


    @Override
    public List<ChannelDto> getChannelsUserIn(String api_key) {
        try {
            // Get current user details
            UserDto currentUser = authUserService.getCurrentUser(api_key);
            if (currentUser == null) {
                log.error("No user found for the provided API key: " + api_key);
                throw new RuntimeException("No user found");
            }

            Map<String, String> userResult = (Map<String, String>) currentUser.getResult();
            String userId = userResult.get("id");

            log.info("Fetching channels for userId: " + userId);

            // Fetch data as a list of maps and manually map to ChannelDto

            List<Tuple> result = channelRepository.findChannelsForUserByUserId(userId);
            log.info("data: " + result);

            List<ChannelDto> channels = result.stream().map(tuple -> {
                ChannelDto dto = new ChannelDto();
                dto.setChannelId(tuple.get("channel_id", String.class));
                dto.setChannelName(tuple.get("channel_name", String.class));
                dto.setCreatedBy(tuple.get("created_by", String.class));
                dto.setChannelOpen(tuple.get("channel_open", Boolean.class));
//                dto.setCreatedTime(tuple.get("created_time", LocalDateTime.class));
                // Convert Timestamp to LocalDateTime
                Timestamp timestamp = tuple.get("created_time", Timestamp.class);
                dto.setCreatedTime(timestamp.toLocalDateTime());
                return dto;
            }).collect(Collectors.toList());




            log.info("Successfully fetched channels for user with userId " + userId);

            return channels;

        } catch (Exception e) {
            log.error("Error fetching channels for user", e);
            throw new RuntimeException("Failed to fetch channels");
        }
    }

    // Get all channels
    @Override
    public List<ChannelDto> getAllChannels() {
        List<Channel> channels = channelRepository.findAll();
        return channels.stream()
                .map(channel -> ChannelsMapper.mapToChannelDto(channel, new ChannelDto()))
                .collect(Collectors.toList()); // Return the list of DTOs
    }

    // Update a channel by ID
    @Override
    public ChannelDto updateChannel(String id, ChannelDto channelDto, String api_key) {
        UserDto currentUser = authUserService.getCurrentUser(api_key);
        Map<String, String> userResult = (Map<String, String>) currentUser.getResult();
        String username = userResult.get("username");
        Optional<Channel> channelOpt = channelRepository.findByChannelId(id);
        if (channelOpt.isPresent()) {
            Channel existingChannel = channelOpt.get();
            Channel updatedChannel = ChannelsMapper.mapToChannel(channelDto, existingChannel, username); // Update
                                                                                                         // entity with
                                                                                                         // DTO data
            Channel savedChannel = channelRepository.save(updatedChannel); // Save updated entity
            return ChannelsMapper.mapToChannelDto(savedChannel, new ChannelDto()); // Map back to DTO
        } else {
            // Handle the case when the channel is not found
            throw new ChannelNotFoundException("Channel is not Found!: " + channelOpt.get().getChannelId().toString());
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
            throw new ChannelNotFoundException("Channel is not Found!: " + channelOpt.get().getChannelId());
        }

    }

    @Override
    public MembersDto joinChannel(String channelId, String api_key) {
        UserDto currentUser = authUserService.getCurrentUser(api_key);
        Map<String, String> userResult = (Map<String, String>) currentUser.getResult();
        String username = userResult.get("username");
        String userId = userResult.get("id");

        Optional<Channel> channelOpt = channelRepository.findByChannelId(channelId);
        if (channelOpt.isPresent()) {
            Members newMembers = new Members();
            Members membersMapped = MembersMapper.mapToMembers(newMembers, channelOpt.get(), userId);
            Members savedMembers = membersRepository.save(membersMapped);
            return MembersMapper.mapToMembersDto(savedMembers, new MembersDto());
        } else {
            throw new ChannelNotFoundException("Channel is not Found in Id: " + channelId);
        }
    }

    @Override
    public List<String> getUserIdsFromChannel(String channelId) {
        List<String> userIds = channelRepository.findUserIdsByChannelId(channelId);
        return userIds;
    }
}
