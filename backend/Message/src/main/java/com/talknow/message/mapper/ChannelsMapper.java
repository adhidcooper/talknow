package com.talknow.message.mapper;

import com.talknow.message.dto.ChannelDto;
import com.talknow.message.dto.UserDto;
import com.talknow.message.entity.Channel;

import java.time.LocalDateTime;

public class ChannelsMapper {

    public static ChannelDto mapToChannelDto(Channel channel, ChannelDto channelDto) {
        if (channel == null || channelDto == null) {
            return null; // Check for null values
        }
        channelDto.setChannelId(channel.getChannelId());
        channelDto.setChannelName(channel.getChannelName());
        channelDto.setCreatedTime(channel.getCreatedTime());
        channelDto.setCreatedBy(channel.getCreatedBy());
        channelDto.setChannelOpen(channel.getChannelOpen());
        return channelDto;
    }

    public static Channel mapToChannel(ChannelDto channelDto, Channel channel, String username) {
        if (channelDto == null || channel == null) {
            return null; // Check for null values
        }
        channel.setChannelName(channelDto.getChannelName());
        channel.setCreatedTime(LocalDateTime.now());
        channel.setCreatedBy(username);
        channel.setChannelOpen(channelDto.getChannelOpen());
        return channel;
    }
}
