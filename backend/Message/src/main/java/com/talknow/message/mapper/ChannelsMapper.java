package com.talknow.message.mapper;

import com.talknow.message.dto.ChannelDto;
import com.talknow.message.entity.Channel;

public class ChannelsMapper {

    public static ChannelDto mapToChannelDto(Channel channel, ChannelDto channelDto) {
        if (channel == null || channelDto == null) {
            return null; // Check for null values
        }
        channelDto.setChannelName(channel.getChannelName());
        channelDto.setCreatedBy(channel.getCreatedBy());
        channelDto.setCreatedTime(channel.getCreatedTime());
        return channelDto;
    }

    public static Channel mapToChannel(ChannelDto channelDto, Channel channel) {
        if (channelDto == null || channel == null) {
            return null; // Check for null values
        }
        channel.setChannelName(channelDto.getChannelName());
        channel.setCreatedBy(channelDto.getCreatedBy());
        channel.setCreatedTime(channelDto.getCreatedTime());
        return channel;
    }
}
