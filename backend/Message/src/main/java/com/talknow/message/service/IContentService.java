package com.talknow.message.service;

import com.talknow.message.dto.ContentDto;
import com.talknow.message.dto.ContentRequestDto;

import java.util.List;

public interface IContentService {
    ContentDto createMessage(ContentRequestDto contentRequestDTo, String api_key);

    List<ContentDto> getMessageByChannelId(String channelId);
}
