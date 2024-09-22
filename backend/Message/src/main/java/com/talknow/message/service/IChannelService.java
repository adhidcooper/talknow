package com.talknow.message.service;


import com.talknow.message.dto.ChannelDto;
import com.talknow.message.entity.Channel;

import java.util.List;

public interface IChannelService {

    ChannelDto createChannel(ChannelDto channelDto);

    ChannelDto getChannelById(String id);

    ChannelDto getChannelByName(String channelName);

    List<ChannelDto> getAllChannels();

    ChannelDto updateChannel(String id, ChannelDto channelDto);

    ChannelDto deleteChannel(String id);
}
