package com.talknow.message.service.impl;

import com.talknow.message.dto.ChannelDto;

import com.talknow.message.entity.Channel;
import com.talknow.message.mapper.ChannelsMapper;

import com.talknow.message.repository.ChannelRepository;

import com.talknow.message.service.IChannelService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ChannelServiceImpl implements IChannelService {

    private final ChannelRepository channelRepository;

    @Autowired
    public ChannelServiceImpl(ChannelRepository channelRepository) {
        this.channelRepository = channelRepository;
    }

    @Override
    public ChannelDto createChannel(ChannelDto channelDto) {
        Channel channel = new Channel();
        ChannelsMapper.mapToChannel(channelDto, channel);
        Channel savedChannel = channelRepository.save(channel);
        return ChannelsMapper.mapToChannelDto(savedChannel, new ChannelDto());
    }

    @Override
    public ChannelDto getChannelById(String id) {
        Optional<Channel> channelOpt = channelRepository.findById(id);
        if (channelOpt.isPresent()) {
            return ChannelsMapper.mapToChannelDto(channelOpt.get(), new ChannelDto());  // Map entity to DTO
        } else {
            // Handle the case when the channel is not found
            throw new RuntimeException("Channel not found for ID: " + id);
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

    // Update a channel by ID
    @Override
    public ChannelDto updateChannel(String id, ChannelDto channelDto) {
        Optional<Channel> channelOpt = channelRepository.findById(id);
        if (channelOpt.isPresent()) {
            Channel existingChannel = channelOpt.get();
            ChannelsMapper.mapToChannel(channelDto, existingChannel);  // Update entity with DTO data
            Channel updatedChannel = channelRepository.save(existingChannel);  // Save updated entity
            return ChannelsMapper.mapToChannelDto(updatedChannel, new ChannelDto());  // Map back to DTO
        } else {
            // Handle the case when the channel is not found
            throw new RuntimeException("Channel not found for ID: " + id);
        }
    }

    @Override
    public void deleteChannel(String id) {
        if (channelRepository.existsById(id)) {
            channelRepository.deleteById(id);  // Delete the entity
        } else {
            // Handle the case when the channel is not found
            throw new RuntimeException("Channel not found for ID: " + id);
        }
    }




}
