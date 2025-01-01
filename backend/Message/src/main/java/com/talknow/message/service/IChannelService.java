package com.talknow.message.service;


import com.talknow.message.dto.ChannelDto;
import com.talknow.message.dto.MembersDto;
import com.talknow.message.entity.Channel;

import java.util.List;

public interface IChannelService {

    ChannelDto createChannel(ChannelDto channelDto, String api_key);

    ChannelDto getChannelById(String id);

    ChannelDto getChannelByName(String channelName);

    List<ChannelDto> getChannelsUserIn(String api_key);

    List<ChannelDto> getAllChannels();

    ChannelDto updateChannel(String id, ChannelDto channelDto, String api_key);

    ChannelDto deleteChannel(String id);

    MembersDto joinChannel(String channelId, String api_key);

    List<String> getUserIdsFromChannel(String channelId);
}
