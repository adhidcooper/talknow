package com.talknow.message.service;


import com.talknow.message.dto.ChannelDto;

import java.util.List;

public interface IChannelService {
    ChannelDto createChannel(ChannelDto channelDto);

    ChannelDto getChannelById(String id);

    List<ChannelDto> getAllChannels();

    ChannelDto updateChannel(String id, ChannelDto channelDto);

    void deleteChannel(String id);
}
